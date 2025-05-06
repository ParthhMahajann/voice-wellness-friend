
import React from "react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-therapy-light rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 rounded-full bg-therapy-primary opacity-10"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full bg-therapy-secondary opacity-10"></div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to start your wellness journey?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Begin your conversation with VoiceTherapy today and experience supportive AI-powered guidance whenever you need it.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="therapy-button text-base px-8 py-6">
                Start Your First Session
              </Button>
              <Button variant="outline" className="border-therapy-primary text-therapy-primary hover:bg-therapy-light/70 text-base px-8 py-6">
                Explore Resources
              </Button>
            </div>
            
            <p className="mt-6 text-sm text-muted-foreground">
              No registration required. Your privacy is our priority.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
