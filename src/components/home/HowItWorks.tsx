
import React from "react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Start a Conversation",
    description: "Click the microphone button and start speaking naturally about how you're feeling.",
    image: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    number: "02",
    title: "AI Listens & Responds",
    description: "Our AI processes your words and responds with supportive guidance based on therapeutic principles.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    number: "03",
    title: "Continue Your Journey",
    description: "Return anytime to continue conversations and track your emotional wellbeing over time.",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="rounded-2xl overflow-hidden aspect-video mb-6 shadow-md">
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                  <span className="font-bold text-therapy-primary">{step.number}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
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
