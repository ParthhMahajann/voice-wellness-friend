
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatInterface from "@/components/therapy/ChatInterface";
import { Card, CardContent } from "@/components/ui/card";

const TherapySession = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-therapy-light/50 to-white">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">Your Wellness Session</h1>
          
          <div className="mb-8">
            <ChatInterface />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">How to get the most from your session</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  <li>Speak naturally about how you're feeling</li>
                  <li>Try to be specific about your thoughts and emotions</li>
                  <li>Take time to reflect on the AI's responses</li>
                  <li>Remember this is a safe, confidential space</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Need immediate support?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  If you're in crisis or need urgent help, please use these resources:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li><strong>988</strong> - Suicide & Crisis Lifeline</li>
                  <li>Text <strong>HOME</strong> to <strong>741741</strong> - Crisis Text Line</li>
                  <li>Call your local emergency services</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TherapySession;
