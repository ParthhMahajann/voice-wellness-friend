
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "Having someone to talk to whenever I feel anxious has been incredibly helpful. The voice interaction feels natural and supportive.",
    name: "Jamie L.",
    title: "Daily User",
  },
  {
    quote: "I appreciate how VoiceTherapy guides me through breathing exercises when I'm stressed. It's like having a pocket therapist.",
    name: "Alex R.",
    title: "Weekly User",
  },
  {
    quote: "The voice conversations feel much more personal than typing. I find myself opening up more easily, which has helped me process my feelings.",
    name: "Morgan T.",
    title: "Monthly User",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-therapy-gradient text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">User Experiences</h2>
          <p className="opacity-90">
            See how VoiceTherapy is making a difference in people's daily lives.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="pt-6">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-300 mr-1">★</span>
                  ))}
                </div>
                <p className="italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm opacity-80">{testimonial.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
