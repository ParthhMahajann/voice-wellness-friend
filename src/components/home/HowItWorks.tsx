
import React from "react";
import { Button } from "@/components/ui/button";
import { Mic, MessageSquare, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Start a Conversation",
    description: "Click the microphone button and start speaking naturally about how you're feeling.",
    icon: Mic,
  },
  {
    number: "02",
    title: "AI Listens & Responds",
    description: "Our AI processes your words and responds with supportive guidance based on therapeutic principles.",
    icon: MessageSquare,
  },
  {
    number: "03",
    title: "Continue Your Journey",
    description: "Return anytime to continue conversations and track your emotional wellbeing over time.",
    icon: TrendingUp,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground">
            Getting started with VoiceTherapy is simple and intuitive.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="rounded-2xl overflow-hidden aspect-video mb-6 shadow-md relative">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-therapy-light to-therapy-accent/20"></div>
                  
                  {/* Animated content */}
                  <div className="relative h-full w-full flex flex-col items-center justify-center p-6">
                    {/* Animated icon */}
                    <div className="mb-4 relative">
                      <div className="absolute -inset-4 bg-therapy-primary/20 rounded-full animate-pulse opacity-70"></div>
                      <div className="relative bg-white p-4 rounded-full shadow-lg">
                        <Icon className="h-8 w-8 text-therapy-primary" />
                      </div>
                    </div>
                    
                    {/* Animated particles */}
                    <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-therapy-primary/30 rounded-full animate-float"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-therapy-secondary/40 rounded-full animate-float animation-delay-700"></div>
                    <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-therapy-accent/20 rounded-full animate-float animation-delay-1500"></div>
                  </div>
                  
                  {/* Step number */}
                  <div className="absolute bottom-4 left-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-10">
                    <span className="font-bold text-therapy-primary">{step.number}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className="text-center">
          <Button className="therapy-button text-base px-8 py-6">
            Try It Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
