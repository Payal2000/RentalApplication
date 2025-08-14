import { Bot, User } from 'lucide-react';

interface MessageProps {
  role: 'user' | 'assistant';
  content: string;
  isCompact?: boolean;
}

export default function Message({ role, content, isCompact = false }: MessageProps) {
  const isUser = role === 'user';
  
  if (isCompact) {
    // Compact version for floating chat
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-[80%] rounded-lg px-4 py-2 ${
            isUser
              ? 'bg-blue-600 text-white rounded-br-none'
              : 'bg-white text-black rounded-bl-none border border-gray-200'
          }`}
        >
          <div className="flex items-start gap-2">
            {!isUser && (
              <Bot className="w-4 h-4 mt-1 text-blue-600 flex-shrink-0" />
            )}
            <div className="text-sm leading-relaxed text-black">
              {content}
            </div>
            {isUser && (
              <User className="w-4 h-4 mt-1 text-blue-200 flex-shrink-0" />
            )}
          </div>
        </div>
      </div>
    );
  }

  // Full version for dedicated chat page
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className="flex gap-3 max-w-3xl">
        {!isUser && (
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <Bot className="w-4 h-4 text-white" />
          </div>
        )}
        
        <div
          className={`rounded-2xl px-6 py-4 ${
            isUser
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
          }`}
        >
          <div className="text-base leading-relaxed whitespace-pre-wrap">
            {content}
          </div>
        </div>
        
        {isUser && (
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <User className="w-4 h-4 text-gray-600" />
          </div>
        )}
      </div>
    </div>
  );
}
