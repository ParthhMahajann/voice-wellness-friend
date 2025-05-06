
import React, { useState } from "react";
import AudioPlayer from "./AudioPlayer";

interface ChatBubbleProps {
  isAI: boolean;
  message: string;
  timestamp: Date;
  audioUrl?: string;
}

const ChatBubble = ({ isAI, message, timestamp, audioUrl }: ChatBubbleProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-[85%] ${isAI ? 'bg-white' : 'bg-therapy-primary text-white'} rounded-2xl px-4 py-3 shadow-sm`}>
        {audioUrl && (
          <div className="mb-3">
            <AudioPlayer audioSrc={audioUrl} isAIResponse={isAI} />
          </div>
        )}
        
        <p className={`text-sm ${message.length > 150 && !expanded ? 'line-clamp-3' : ''}`}>
          {message}
        </p>
        
        {message.length > 150 && (
          <button 
            className={`text-xs font-medium mt-1 ${isAI ? 'text-therapy-primary' : 'text-therapy-light'}`}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        )}
        
        <div className="flex justify-end mt-1">
          <span className={`text-xs ${isAI ? 'text-gray-400' : 'text-therapy-light/80'}`}>
            {formatTime(timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
