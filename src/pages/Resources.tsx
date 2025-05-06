
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Resources = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center">Wellness Resources</h1>
          <p className="text-center text-muted-foreground mb-8">
            Educational content and tools to support your mental wellbeing journey.
          </p>
          
          <Tabs defaultValue="articles" className="mb-12">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="techniques">Techniques</TabsTrigger>
              <TabsTrigger value="emergency">Emergency Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="articles" className="pt-6">
              <div className="grid gap-6">
                {articles.map((article, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                      <a 
                        href="#" 
                        className="text-therapy-primary font-medium hover:underline text-sm"
                      >
                        Read more
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="techniques" className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {techniques.map((technique, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-full bg-therapy-light flex items-center justify-center mb-4">
                        <span className="text-2xl">{technique.icon}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{technique.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{technique.description}</p>
                      <a 
                        href="#" 
                        className="text-therapy-primary font-medium hover:underline text-sm"
                      >
                        Learn this technique
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="emergency" className="pt-6">
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-amber-900 mb-4">
                    Crisis Resources
                  </h3>
                  <p className="mb-6 text-amber-800">
                    If you or someone you know is experiencing a mental health crisis, 
                    please use these resources for immediate help:
                  </p>
                  
                  <div className="space-y-6">
                    {emergencyResources.map((resource, index) => (
                      <div key={index} className="border-b border-amber-200 pb-4 last:border-0">
                        <h4 className="font-semibold text-amber-900 mb-1">{resource.name}</h4>
                        <p className="text-amber-800 mb-2">{resource.description}</p>
                        <div className="flex flex-col space-y-1">
                          {resource.contact.map((contact, i) => (
                            <p key={i} className="text-amber-900 font-medium">{contact}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Sample data
const articles = [
  {
    title: "Understanding Anxiety: Causes and Management Strategies",
    excerpt: "Anxiety is a natural response to stress, but when it becomes overwhelming, it may interfere with daily activities. Learn about different types of anxiety and evidence-based strategies to manage symptoms."
  },
  {
    title: "The Science of Mindfulness: How Being Present Changes Your Brain",
    excerpt: "Research shows that mindfulness meditation can actually change the structure and function of the brain. Discover the neurological benefits of mindfulness and how to incorporate it into your daily routine."
  },
  {
    title: "Sleep and Mental Health: The Crucial Connection",
    excerpt: "Sleep and mental health are closely connected. Poor sleep can worsen mental health conditions, and mental health issues can make it harder to sleep. Learn strategies for improving both simultaneously."
  },
  {
    title: "Building Resilience: Bouncing Back from Life's Challenges",
    excerpt: "Resilience is the ability to adapt well in the face of adversity, trauma, or significant sources of stress. Explore practical ways to build your resilience and improve your mental wellbeing."
  }
];

const techniques = [
  {
    icon: "🧘",
    title: "5-Minute Meditation",
    description: "A simple guided meditation technique that you can practice anywhere to quickly reduce stress and improve focus."
  },
  {
    icon: "🫁",
    title: "4-7-8 Breathing",
    description: "A breathing technique that promotes relaxation by regulating your breath pattern to calm your nervous system."
  },
  {
    icon: "🧠",
    title: "Cognitive Reframing",
    description: "Learn to identify negative thought patterns and transform them into more balanced and helpful perspectives."
  },
  {
    icon: "🌱",
    title: "Gratitude Practice",
    description: "A simple daily practice of acknowledging things you're thankful for to improve mood and wellbeing."
  },
  {
    icon: "📝",
    title: "Expressive Writing",
    description: "A therapeutic technique that involves writing about your thoughts and feelings to process emotions."
  },
  {
    icon: "🏃‍♂️",
    title: "Movement for Mood",
    description: "Simple physical activities that can be done anywhere to boost your mood through movement."
  }
];

const emergencyResources = [
  {
    name: "National Suicide Prevention Lifeline",
    description: "24/7, free and confidential support for people in distress, prevention and crisis resources.",
    contact: [
      "Call 988 or 1-800-273-8255",
      "Chat: suicidepreventionlifeline.org"
    ]
  },
  {
    name: "Crisis Text Line",
    description: "Free 24/7 support for those in crisis, connecting people to counselors.",
    contact: [
      "Text HOME to 741741"
    ]
  },
  {
    name: "SAMHSA's National Helpline",
    description: "Treatment referral and information service for individuals facing mental health or substance use disorders.",
    contact: [
      "1-800-662-HELP (4357)",
      "Available 24/7, 365 days a year"
    ]
  },
  {
    name: "Emergency Services",
    description: "For immediate danger to yourself or others.",
    contact: [
      "Call 911 (US) or your local emergency number"
    ]
  }
];

export default Resources;
