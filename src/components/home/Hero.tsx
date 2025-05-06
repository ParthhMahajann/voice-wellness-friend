
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
              {/* Animated image replaces static photo */}
              <div className="relative w-full aspect-video bg-gradient-to-r from-therapy-light to-therapy-accent/30 rounded-2xl overflow-hidden">
                {/* Floating bubbles animation */}
                <div className="absolute w-24 h-24 bg-therapy-primary/20 rounded-full top-1/4 left-1/4 animate-float"></div>
                <div className="absolute w-16 h-16 bg-therapy-secondary/30 rounded-full bottom-1/4 right-1/3 animate-float animation-delay-1000"></div>
                <div className="absolute w-20 h-20 bg-therapy-accent/40 rounded-full top-1/2 right-1/4 animate-float animation-delay-2000"></div>
                
                {/* Central therapy companion visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-therapy-primary/80 flex items-center justify-center animate-pulse-subtle">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                        <span className="text-therapy-primary text-2xl font-bold">AI</span>
                      </div>
                    </div>
                    
                    {/* Sound waves animation */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-2 border-white/20 animate-ping opacity-70"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-white/10 animate-ping opacity-50 animation-delay-500"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border-2 border-white/5 animate-ping opacity-30 animation-delay-1000"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
