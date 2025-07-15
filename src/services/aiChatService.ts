import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/src/lib/firebase';
import { ChatHistory, ChatMessage } from '@/src/types/firebase';

export class AIChatService {
  // Create new chat session
  static async createChatSession(userId: string, title: string) {
    try {
      const chatRef = doc(collection(db, 'chatHistory'));
      const chatSession: ChatHistory = {
        id: chatRef.id,
        userId,
        title,
        messages: [],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      await setDoc(chatRef, chatSession);
      return { success: true, chatSession };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get user's chat history
  static async getUserChatHistory(userId: string) {
    try {
      const chatRef = collection(db, 'chatHistory');
      const q = query(
        chatRef,
        where('userId', '==', userId),
        orderBy('updatedAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const chatHistory: ChatHistory[] = [];
      
      querySnapshot.forEach((doc) => {
        chatHistory.push(doc.data() as ChatHistory);
      });

      return { success: true, chatHistory };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Add message to chat session
  static async addMessageToChat(chatId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) {
    try {
      const chatRef = doc(db, 'chatHistory', chatId);
      const messageWithId: ChatMessage = {
        ...message,
        id: Date.now().toString(),
        timestamp: Timestamp.now()
      };

      // Get current chat data
      const chatDoc = await getDocs(query(collection(db, 'chatHistory'), where('id', '==', chatId)));
      let currentMessages: ChatMessage[] = [];
      
      chatDoc.forEach((doc) => {
        const data = doc.data() as ChatHistory;
        currentMessages = data.messages || [];
      });

      // Add new message
      currentMessages.push(messageWithId);

      await updateDoc(chatRef, {
        messages: currentMessages,
        updatedAt: Timestamp.now()
      });

      return { success: true, message: messageWithId };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Generate AI response (you'll need to integrate with OpenAI API)
  static async generateAIResponse(userMessage: string, chatHistory?: ChatMessage[]) {
    try {
      // This is a simplified response generator
      // In production, you would integrate with OpenAI API
      let response = "I'm here to help with your coding questions!";

      if (userMessage.toLowerCase().includes('binary search')) {
        response = "Binary search is an efficient algorithm for finding an item from a sorted list. It works by repeatedly dividing the search interval in half. The time complexity is O(log n).";
      } else if (userMessage.toLowerCase().includes('dynamic programming')) {
        response = "Dynamic Programming (DP) is a method for solving complex problems by breaking them down into simpler subproblems. Key principles include optimal substructure and overlapping subproblems.";
      } else if (userMessage.toLowerCase().includes('stack') && userMessage.toLowerCase().includes('queue')) {
        response = "Stack follows LIFO (Last In, First Out) principle, while Queue follows FIFO (First In, First Out). Stack operations: push(), pop(), peek(). Queue operations: enqueue(), dequeue(), front().";
      }

      return { success: true, response };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Search previous Q&A
  static async searchPreviousQA(userId: string, searchTerm: string) {
    try {
      const chatRef = collection(db, 'chatHistory');
      const q = query(chatRef, where('userId', '==', userId));
      
      const querySnapshot = await getDocs(q);
      const relevantMessages: ChatMessage[] = [];
      
      querySnapshot.forEach((doc) => {
        const chatData = doc.data() as ChatHistory;
        chatData.messages.forEach((message) => {
          if (message.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
              message.response.toLowerCase().includes(searchTerm.toLowerCase())) {
            relevantMessages.push(message);
          }
        });
      });

      return { success: true, messages: relevantMessages };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}