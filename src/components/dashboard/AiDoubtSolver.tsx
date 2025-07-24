"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Send,
  Loader2,
  Bot,
  User,
  Plus,
  Clock,
  MessageCircle,
  Trash2,
  Menu,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: string;
}

interface ChatMeta {
  id: string;
  title: string;
  messageCount: number;
  timestamp: string;
}

export default function AiDoubtSolver() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMeta[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      return;
    }
    fetch(`/api/chat?chatId=${chatId}`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(
          data.messages.map((m: any) => ({
            id: `${m.timestamp?.seconds || Date.now()}-${m.sender}`,
            text: m.text,
            sender: m.sender,
            timestamp: m.timestamp?.seconds
              ? new Date(m.timestamp.seconds * 1000).toISOString()
              : new Date().toISOString(),
          }))
        );
        scrollToBottom();
      });
  }, [chatId]);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 100);
  };

  const sendMessage = async (overrideText?: string) => {
    const text = overrideText ?? inputMessage.trim();
    if (!text) return;
    setIsLoading(true);

    const userMsg: Message = {
      id: `${Date.now()}-user`,
      text,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    setMessages((m) => [...m, userMsg]);
    setInputMessage("");
    scrollToBottom();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, text }),
      });
      if (!res.ok) throw new Error("Network error");
      const { chatId: newId, aiText } = await res.json();
      setChatId(newId);

      const aiMsg: Message = {
        id: `${Date.now()}-ai`,
        text: aiText,
        sender: "ai",
        timestamp: new Date().toISOString(),
      };
      setMessages((m) => [...m, aiMsg]);
      scrollToBottom();

      const title = text.slice(0, 40);
      setChatHistory((prev) => {
        const existing = prev.find((chat) => chat.id === newId);
        if (existing) {
          return prev.map((c) =>
            c.id === newId
              ? {
                  ...c,
                  title,
                  messageCount: c.messageCount + 2,
                  timestamp: new Date().toISOString(),
                }
              : c
          );
        } else {
          return [
            {
              id: newId,
              title,
              messageCount: 2,
              timestamp: new Date().toISOString(),
            },
            ...prev,
          ];
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleDelete = (id: string) => {
    setChatHistory((prev) => prev.filter((c) => c.id !== id));
    if (chatId === id) setChatId(null);
  };

  const formatRelativeTime = (timestamp: string) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diff = now.getTime() - past.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes} min ago`;
    return "Just now";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className="p-2"
          title="Toggle Chat History"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">AI Doubt Solver</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        {isSidebarOpen && (
          <aside className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Chat History</CardTitle>
                  <Button size="sm" onClick={() => setChatId(null)}>
                    <Plus className="h-4 w-4 mr-1" /> New
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-[520px] space-y-2 pr-6 overflow-y-auto scrollbar-hide">
                {chatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setChatId(chat.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors relative border text-sm ${
                      chat.id === chatId
                        ? "bg-blue-100 text-blue-900 border-blue-300"
                        : "bg-white hover:bg-gray-100 text-gray-800 border-gray-200"
                    }`}
                  >
                    <h4 className="font-medium truncate pr-8">{chat.title}</h4>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{chat.messageCount}</span>
                      <Clock className="h-3 w-3" />
                      <span>{formatRelativeTime(chat.timestamp)}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 p-1 h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(chat.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        )}

        {/* Chat Window */}
        <section className={`${isSidebarOpen ? "lg:col-span-3" : "col-span-4"} h-full`}>
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="h-5 w-5 mr-2 text-blue-600" />
                Chat with AI Assistant
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col min-h-0">
              {/* Scrollable chat messages */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto px-0 py-1 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                style={{ maxHeight: "calc(100vh - 18rem)" }} // Adjust this value to control height
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-[85%] ${
                        msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          msg.sender === "user" ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      >
                        {msg.sender === "user" ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        )}
                      </div>
                      <div
                        className={`rounded-lg p-3 break-words ${
                          msg.sender === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">
                          {msg.text}
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.sender === "user" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing loader */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2 max-w-[85%]">
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      </div>
                      <div className="rounded-lg p-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-200" />
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Fixed Input at Bottom */}
              
                <div className="flex space-x-1 pt-12">
                  <textarea
                    placeholder="Ask your doubt here..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    rows={2}
                    disabled={isLoading}
                    className="flex-1 border px-2 border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                  />
                  <Button
                    onClick={() => sendMessage()}
                    disabled={!inputMessage.trim() || isLoading}
                    className="self-end"
                  >
                    {isLoading ? <Loader2 className="animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
