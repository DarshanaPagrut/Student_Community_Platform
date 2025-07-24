import { NextRequest, NextResponse } from "next/server";
import {
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
  serverTimestamp,
  getDocsFromCache,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface ChatMessage {
  text: string;
  sender: "user" | "ai";
  timestamp: any;
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// GET: fetch messages for a chat
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const chatId = url.searchParams.get("chatId");
  if (!chatId) {
    return NextResponse.json({ error: "Missing chatId" }, { status: 400 });
  }
  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("timestamp", "asc")
  );
  const snapshot = await getDocs(q);
  const messages = snapshot.docs.map((doc) => doc.data());
  return NextResponse.json({ messages });
}

// POST: save user message, call Gemini, return AI reply
export async function POST(request: NextRequest) {
  try {
    const { chatId, text } = await request.json();

    let finalChatId = chatId;
    if (!chatId) {
      const chatRef = await addDoc(collection(db, "chats"), {
        created: serverTimestamp(),
      });
      finalChatId = chatRef.id;
    }

    // Save user
    await addDoc(collection(db, "chats", finalChatId!, "messages"), {
      text,
      sender: "user",
      timestamp: serverTimestamp(),
    } as ChatMessage);

    // Call Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(text);
    const response = await result.response;
    const aiText = response.text().trim();

    // Save AI
    await addDoc(collection(db, "chats", finalChatId!, "messages"), {
      text: aiText,
      sender: "ai",
      timestamp: serverTimestamp(),
    } as ChatMessage);

    return NextResponse.json({ chatId: finalChatId, aiText });
  } catch (error: any) {
    console.error("Error in chat POST route:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
