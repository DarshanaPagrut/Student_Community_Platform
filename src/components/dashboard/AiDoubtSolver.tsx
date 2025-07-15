"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Send, Bot, User, Plus, MessageCircle, Clock, Trash2, Menu } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatHistory {
  id: number;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
}

export default function AiDoubtSolver() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your AI doubt solver. Ask me anything about Data Structures, Algorithms, or programming concepts!",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    // Simulated AI response
    let aiResponseText = "That's a great question! Let me help you understand this concept.";

    if (inputMessage.toLowerCase().includes('binary search')) {
      aiResponseText = "Binary search is an efficient algorithm for finding an item from a sorted list...";
    }

    const aiMessage: Message = {
      id: messages.length + 2,
      text: aiResponseText,
      sender: 'ai',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, aiMessage]);
    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startNewChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hi! I'm your AI doubt solver. Ask me anything about Data Structures, Algorithms, or programming concepts!",
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
    setCurrentChatId(null);
  };

  const loadChatHistory = (chatId: number) => {
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages([
        {
          id: 1,
          text: "Hi! I'm your AI doubt solver. Ask me anything about Data Structures, Algorithms, or programming concepts!",
          sender: 'ai',
          timestamp: new Date()
        },
        {
          id: 2,
          text: `Let's continue our discussion about "${chat.title}"`,
          sender: 'ai',
          timestamp: new Date()
        }
      ]);
    }
  };

  const deleteChatHistory = (chatId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) startNewChat();
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
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
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Chat History</CardTitle>
                  <Button size="sm" onClick={startNewChat}>
                    <Plus className="h-4 w-4 mr-2" /> New
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-[520px] overflow-y-auto">
                <div className="space-y-2">
                  {chatHistory.map(chat => (
                    <div
                      key={chat.id}
                      onClick={() => loadChatHistory(chat.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors group relative ${
                        currentChatId === chat.id
                          ? 'bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800'
                          : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <h4 className="text-sm font-medium truncate pr-8">{chat.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                        {chat.lastMessage}
                      </p>
                      <div className="flex items-center space-x-2 mt-2 text-xs text-gray-400">
                        <MessageCircle className="h-3 w-3" />
                        <span>{chat.messageCount}</span>
                        <Clock className="h-3 w-3" />
                        <span>{formatTimestamp(chat.timestamp)}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 h-6 w-6"
                        onClick={e => deleteChatHistory(chat.id, e)}
                      >
                        <Trash2 className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Chat Window */}
        <div className={`${isSidebarOpen ? 'lg:col-span-3' : 'col-span-4'}`}>
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="h-5 w-5 mr-2 text-blue-600" />
                Chat with AI Assistant
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col min-h-0">
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 min-h-0 max-h-full"
              >
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start space-x-2 max-w-[85%] ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        )}
                      </div>
                      <div className={`rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <textarea
                  placeholder="Ask your doubt here..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                  rows={2}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="self-end"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
