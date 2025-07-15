import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  arrayUnion, 
  arrayRemove, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/src/lib/firebase';
import { Discussion, Reply } from '@/src/types/firebase';

export class DiscussionService {
  // Create new discussion
  static async createDiscussion(discussionData: Omit<Discussion, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const discussionRef = doc(collection(db, 'discussions'));
      const discussion: Discussion = {
        ...discussionData,
        id: discussionRef.id,
        replies: [],
        likes: [],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      await setDoc(discussionRef, discussion);
      return { success: true, discussion };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get group discussions
  static async getGroupDiscussions(groupId: string) {
    try {
      const discussionsRef = collection(db, 'discussions');
      const q = query(
        discussionsRef,
        where('groupId', '==', groupId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const discussions: Discussion[] = [];
      
      querySnapshot.forEach((doc) => {
        discussions.push(doc.data() as Discussion);
      });

      return { success: true, discussions };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Add reply to discussion
  static async addReply(discussionId: string, reply: Omit<Reply, 'id' | 'createdAt'>) {
    try {
      const discussionRef = doc(db, 'discussions', discussionId);
      const replyWithId: Reply = {
        ...reply,
        id: Date.now().toString(),
        likes: [],
        createdAt: Timestamp.now()
      };

      await updateDoc(discussionRef, {
        replies: arrayUnion(replyWithId),
        updatedAt: Timestamp.now()
      });

      return { success: true, reply: replyWithId };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Like/unlike discussion
  static async toggleDiscussionLike(discussionId: string, userId: string) {
    try {
      const discussionRef = doc(db, 'discussions', discussionId);
      const discussionDoc = await getDoc(discussionRef);
      
      if (!discussionDoc.exists()) {
        return { success: false, error: 'Discussion not found' };
      }

      const discussion = discussionDoc.data() as Discussion;
      const isLiked = discussion.likes.includes(userId);

      if (isLiked) {
        await updateDoc(discussionRef, {
          likes: arrayRemove(userId),
          updatedAt: Timestamp.now()
        });
      } else {
        await updateDoc(discussionRef, {
          likes: arrayUnion(userId),
          updatedAt: Timestamp.now()
        });
      }

      return { success: true, isLiked: !isLiked };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Like/unlike reply
  static async toggleReplyLike(discussionId: string, replyId: string, userId: string) {
    try {
      const discussionRef = doc(db, 'discussions', discussionId);
      const discussionDoc = await getDoc(discussionRef);
      
      if (!discussionDoc.exists()) {
        return { success: false, error: 'Discussion not found' };
      }

      const discussion = discussionDoc.data() as Discussion;
      const updatedReplies = discussion.replies.map(reply => {
        if (reply.id === replyId) {
          const isLiked = reply.likes.includes(userId);
          return {
            ...reply,
            likes: isLiked 
              ? reply.likes.filter(id => id !== userId)
              : [...reply.likes, userId]
          };
        }
        return reply;
      });

      await updateDoc(discussionRef, {
        replies: updatedReplies,
        updatedAt: Timestamp.now()
      });

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Delete discussion
  static async deleteDiscussion(discussionId: string, userId: string) {
    try {
      const discussionDoc = await getDoc(doc(db, 'discussions', discussionId));
      
      if (!discussionDoc.exists()) {
        return { success: false, error: 'Discussion not found' };
      }

      const discussion = discussionDoc.data() as Discussion;
      
      // Only allow deletion by the author
      if (discussion.userId !== userId) {
        return { success: false, error: 'Unauthorized to delete this discussion' };
      }

      await deleteDoc(doc(db, 'discussions', discussionId));
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get discussion by ID
  static async getDiscussionById(discussionId: string) {
    try {
      const discussionDoc = await getDoc(doc(db, 'discussions', discussionId));
      
      if (discussionDoc.exists()) {
        return { success: true, discussion: discussionDoc.data() as Discussion };
      } else {
        return { success: false, error: 'Discussion not found' };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}