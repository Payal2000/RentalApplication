'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, ArrowLeft, Settings } from 'lucide-react';
import { Markdown } from "@/components/ui/markdown";
import { ResponseStream } from "@/components/ui/response-stream";

interface ChatInterfaceProps {
  onBack?: () => void;
  showBackButton?: boolean;
}

export default function ChatInterface({ onBack, showBackButton = false }: ChatInterfaceProps) {
  const { messages, sendMessage, status } = useChat();
  
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && onBack && (
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-black">AI Assistant</h1>
                <p className="text-sm text-black">Powered by GPT-4</p>
              </div>
            </div>
          </div>
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bot className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-black mb-2">Welcome to AI Assistant</h2>
            <p className="text-black max-w-md mx-auto">
              I'm here to help you with any questions or tasks. Start a conversation by typing below!
            </p>
          </div>
        )}
        
        {messages.filter(msg => msg.parts && msg.parts.length > 0).map((message) => {
          const isUser = message.role === 'user';
          
          return (
            <div
              key={message.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3 max-w-[85%]`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 ${
                  isUser 
                    ? 'ml-3' 
                    : 'mr-3'
                }`}>
                  {isUser ? (
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Message bubble */}
                <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                  isUser
                    ? 'text-white'
                    : 'bg-white border border-slate-200'
                }`}
                style={isUser ? { backgroundColor: '#003F32' } : {}}>
                  <div className={`text-xs font-medium mb-1 ${
                    isUser ? 'text-white/80' : 'text-slate-500'
                  }`}>
                    {isUser ? 'You' : 'AI Assistant'}
                  </div>
                  
                  <div className={`${isUser ? 'text-white' : 'text-slate-800'}`}>
                                         {isUser ? (
                       <div className="text-sm leading-relaxed whitespace-pre-wrap">
                         {message.parts.map((part, index) =>
                           part.type === 'text' ? part.text : null
                         ).filter(Boolean).join('')}
                       </div>
                     ) : (
                       <div className="text-sm leading-relaxed">
                         <ResponseStream
                           textStream={message.parts.map((part, index) =>
                             part.type === 'text' ? part.text : null
                           ).filter(Boolean).join('')}
                           mode="fade"
                           speed={45}
                           onComplete={() => scrollToBottom()}
                         />
                       </div>
                     )}
                  </div>
                  
                  <div className={`text-xs mt-2 ${
                    isUser ? 'text-white/70' : 'text-slate-400'
                  }`}>
                    {new Date().toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Show loader when AI is processing */}
        {status === 'streaming' && (
          <div className="flex justify-start mb-4">
            <div className="flex items-start space-x-3 max-w-[85%]">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
                <div className="text-xs font-medium text-slate-500 mb-1">AI Assistant</div>
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span className="text-sm text-slate-600">Analyzing...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <form onSubmit={onSubmit} className="max-w-4xl mx-auto">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-black"
                disabled={status !== 'ready'}
              />
            </div>
            <button
              type="submit"
              disabled={status !== 'ready' || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl transition-colors duration-200 flex items-center gap-2 font-medium"
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </div>
          <p className="text-xs text-black mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </form>
      </div>
    </div>
  );
}
