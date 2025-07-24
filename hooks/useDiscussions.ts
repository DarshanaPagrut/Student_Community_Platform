"use client";

import { useState, useEffect } from "react";
import {
  collection,
  doc,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  limit,
  startAfter,
  increment,
  serverTimestamp,
  Timestamp,
  DocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/src/lib/firebase";

import { Discussion, DiscussionReply, PaginatedResponse } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

export const useDiscussions = () => {
  const { user, userProfile } = useAuth();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);

  useEffect(() => {
    loadDiscussions();
  }, []);

  const loadDiscussions = async (loadMore = false) => {
    try {
      setLoading(true);

      const discussionsRef = collection(db, "discussions");
      let q = query(discussionsRef, orderBy("createdAt", "desc"), limit(20));

      if (loadMore && lastDoc) {
        q = query(
          discussionsRef,
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(20)
        );
      }

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const discussionsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Discussion[];

        if (loadMore) {
          setDiscussions((prev) => [...prev, ...discussionsData]);
        } else {
          setDiscussions(discussionsData);
        }

        setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
        setHasMore(snapshot.docs.length === 20);
        setLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      console.error("Error loading discussions:", error);
      setError((error as Error).message);
      setLoading(false);
    }
  };

  const addDiscussion = async (
    title: string,
    content: string,
    category: Discussion["category"] = "general",
    tags: string[] = []
  ) => {
    if (!user || !userProfile) return;

    try {
      const discussionsRef = collection(db, "discussions");
      const newDiscussion: Omit<Discussion, "id"> = {
        authorId: user.uid,
        authorName: userProfile.displayName || userProfile.username,
        authorAvatar: userProfile.photoURL ?? null,
        title,
        content,
        tags,
        category,
        likes: 0,
        replies: 0,
        views: 0,
        isResolved: false,
        isPinned: false,
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp,
      };

      const docRef = await addDoc(discussionsRef, newDiscussion);
      return docRef.id;
    } catch (error) {
      console.error("Error adding discussion:", error);
      setError((error as Error).message);
      throw error;
    }
  };

  const updateDiscussion = async (
    discussionId: string,
    updates: Partial<Discussion>
  ) => {
    if (!user) return;

    try {
      const discussionRef = doc(db, "discussions", discussionId);
      await updateDoc(discussionRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating discussion:", error);
      setError((error as Error).message);
    }
  };

  const deleteDiscussion = async (discussionId: string) => {
    if (!user) return;

    try {
      const discussionRef = doc(db, "discussions", discussionId);
      await deleteDoc(discussionRef);
    } catch (error) {
      console.error("Error deleting discussion:", error);
      setError((error as Error).message);
    }
  };

  const likeDiscussion = async (discussionId: string) => {
    if (!user) return;

    try {
      const discussionRef = doc(db, "discussions", discussionId);
      await updateDoc(discussionRef, {
        likes: increment(1),
      });
    } catch (error) {
      console.error("Error liking discussion:", error);
      setError((error as Error).message);
    }
  };

  const addReply = async (
    discussionId: string,
    content: string,
    parentReplyId?: string
  ) => {
    if (!user || !userProfile) return;  

    try {
      const repliesRef = collection(db, "discussions", discussionId, "replies");
      const newReply: any = {
        discussionId,
        authorId: user.uid,
        authorName: userProfile.displayName || userProfile.username,
        content,
        likes: 0,
        isAccepted: false,

        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp,
      };
      if (parentReplyId !== undefined) {
        newReply.parentReplyId = parentReplyId; // Only add if explicitly provided
      }
      // Only set authorAvatar if defined
      if (userProfile.photoURL !== undefined) {
        newReply.authorAvatar = userProfile.photoURL ?? null;
      }
      await addDoc(repliesRef, newReply);

      // Update discussion reply count and last reply info
      const discussionRef = doc(db, "discussions", discussionId);
      await updateDoc(discussionRef, {
        replies: increment(1),
        lastReplyAt: serverTimestamp(),
        lastReplyBy: userProfile.displayName || userProfile.username,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error adding reply:", error);
      setError((error as Error).message);
    }
  };

  const markReplyAsAccepted = async (discussionId: string, replyId: string) => {
    if (!user) return;

    try {
      const replyRef = doc(db, "discussions", discussionId, "replies", replyId);
      await updateDoc(replyRef, {
        isAccepted: true,
        updatedAt: serverTimestamp(),
      });

      // Mark discussion as resolved
      const discussionRef = doc(db, "discussions", discussionId);
      await updateDoc(discussionRef, {
        isResolved: true,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error marking reply as accepted:", error);
      setError((error as Error).message);
    }
  };

  const incrementViews = async (discussionId: string) => {
    try {
      const discussionRef = doc(db, "discussions", discussionId);
      await updateDoc(discussionRef, {
        views: increment(1),
      });
    } catch (error) {
      console.error("Error incrementing views:", error);
    }
  };

  const searchDiscussions = async (
    searchTerm: string,
    category?: Discussion["category"],
    tags?: string[]
  ) => {
    try {
      const discussionsRef = collection(db, "discussions");
      let q = query(discussionsRef, orderBy("createdAt", "desc"));

      if (category) {
        q = query(q, where("category", "==", category));
      }

      if (tags && tags.length > 0) {
        q = query(q, where("tags", "array-contains-any", tags));
      }

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const discussionsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Discussion[];

        // Filter by search term (client-side since Firestore doesn't support full-text search)
        const filteredDiscussions = discussionsData.filter(
          (discussion) =>
            discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            discussion.content.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setDiscussions(filteredDiscussions);
        setLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      console.error("Error searching discussions:", error);
      setError((error as Error).message);
    }
  };

  const loadMoreDiscussions = () => {
    if (hasMore && !loading) {
      loadDiscussions(true);
    }
  };

  return {
    discussions,
    loading,
    error,
    hasMore,
    addDiscussion,
    updateDiscussion,
    deleteDiscussion,
    likeDiscussion,
    addReply,
    markReplyAsAccepted,
    incrementViews,
    searchDiscussions,
    loadMoreDiscussions,
  };
};
