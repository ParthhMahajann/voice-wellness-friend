
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Voice Conversations",
    description: "Speak naturally and receive thoughtful responses with our advanced voice technology.",
    icon: "🎙️",
  },
  {
    title: "24/7 Availability",
    description: "Get support whenever you need it, day or night, without scheduling or waiting.",
    icon: "🕒",
  },
  {
    title: "Private & Secure",
    description: "Your conversations are encrypted and your privacy is our top priority.",
    icon: "🔒",
  },
  {
    title: "Evidence-Based Techniques",
    description: "Access therapeutic approaches like CBT and mindfulness through natural conversation.",
    icon: "📝",
  },
  {
    title: "Personalized Support",
    description: "Receive guidance tailored to your specific needs and preferences.",
    icon: "👤",
  },
  {
    title: "Progress Tracking",
    description: "Monitor your emotional wellbeing and see improvements over time.",
    icon: "📈",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-therapy-light/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">How VoiceTherapy Helps</h2>
          <p className="text-muted-foreground">
            Our AI companion offers supportive features designed with your wellbeing in mind.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-therapy-accent/30 transition-all hover:shadow-md">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-therapy-light flex items-center justify-center mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
