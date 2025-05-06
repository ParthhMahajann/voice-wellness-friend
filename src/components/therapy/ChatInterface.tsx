
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import VoiceRecorder from "./VoiceRecorder";
import ChatBubble from "./ChatBubble";
import { ArrowDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: Date;
  audioUrl?: string;
}

// Simulate AI responses - these would come from your backend in a real implementation
const mockResponses = [
  "I understand that can be challenging. How long have you been feeling this way?",
  "Thank you for sharing that with me. It takes courage to express these feelings.",
  "Let's explore that a bit more. What do you think might be contributing to these thoughts?",
  "That sounds difficult. Have you tried any strategies to help manage these feelings?",
  "I'm here to listen. Would it help to talk about some coping mechanisms that might be useful?",
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello, I'm your AI wellness companion. How are you feeling today? You can speak to me by clicking the microphone button below.",
      isAI: true,
      timestamp: new Date(),
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { toast } = useToast();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check if we need to show scroll button
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // Show button if user has scrolled up more than 100px from bottom
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAudioRecorded = async (audioBlob: Blob) => {
    // Create temporary URL for the recorded audio
    const audioUrl = URL.createObjectURL(audioBlob);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: "Audio message", // In a real app, this would be transcribed text
      isAI: false,
      timestamp: new Date(),
      audioUrl,
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate processing delay
    setIsProcessing(true);
    
    // In a real implementation, you would:
    // 1. Send the audio to your backend
    // 2. Transcribe the audio to text
    // 3. Process with AI to get a response
    // 4. Convert response to speech
    // 5. Return both text and audio to display
    
    setTimeout(() => {
      // Get random mock response
      const mockResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: mockResponse,
        isAI: true,
        timestamp: new Date(),
        // In a real app, this would be a URL to synthesized speech
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
      
      toast({
        title: "Voice Processing Complete",
        description: "In a real implementation, your voice would be processed by AI.",
      });
    }, 2000);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg border-therapy-accent/30">
      <CardContent className="p-0">
        <div className="p-4 therapy-gradient text-white">
          <h2 className="text-lg font-semibold">Your Wellness Session</h2>
          <p className="text-sm opacity-90">Speak naturally and share how you're feeling</p>
        </div>
        
        <div 
          ref={chatContainerRef}
          className="h-[400px] overflow-y-auto p-4 bg-gradient-to-b from-therapy-light/30 to-white/70"
        >
          {messages.map((msg) => (
            <ChatBubble 
              key={msg.id}
              isAI={msg.isAI}
              message={msg.content}
              timestamp={msg.timestamp}
              audioUrl={msg.audioUrl}
            />
          ))}
          {isProcessing && (
            <div className="flex justify-start mb-4">
              <div className="bg-white rounded-2xl px-4 py-3 shadow-sm max-w-[85%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-therapy-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-therapy-primary animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-therapy-primary animate-bounce" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {showScrollButton && (
          <Button 
            className="absolute bottom-24 right-4 rounded-full w-10 h-10 p-0 bg-therapy-primary/90 shadow-md"
            onClick={scrollToBottom}
          >
            <ArrowDown className="w-5 h-5" />
          </Button>
        )}
        
        <div className="p-4 border-t bg-white">
          <VoiceRecorder onAudioRecorded={handleAudioRecorded} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
