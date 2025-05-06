
import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 max-w-3xl mx-auto leading-tight">
          Your compassionate AI voice companion for{" "}
          <span className="bg-clip-text text-transparent therapy-gradient">mental wellness</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Speak naturally and receive supportive guidance whenever you need it, with privacy and understanding at the core of every conversation.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="therapy-button text-base px-8 py-6">
            Start Talking Now
          </Button>
          <Button variant="outline" className="border-therapy-primary text-therapy-primary hover:bg-therapy-light text-base px-8 py-6">
            Learn How It Works
          </Button>
        </div>
        
        <div className="mt-8 text-sm text-muted-foreground">
          <p>Not a replacement for professional therapy. Always seek help in emergencies.</p>
        </div>
        
        <div className="relative mt-8 md:mt-16">
          <div className="absolute inset-0 bg-gradient-radial from-therapy-accent/30 to-transparent opacity-70 blur-xl"></div>
          <div className="relative z-10">
            <div className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1541199249251-f713e6145474?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Person using AI therapy companion" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
