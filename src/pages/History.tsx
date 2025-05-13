import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SessionHistory from "@/components/therapy/SessionHistory";
import { Button } from "@/components/ui/button";
import { sessionStorage } from "@/lib/services/sessionStorage";
import { useToast } from "@/components/ui/use-toast";

const History = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sessions, setSessions] = useState(sessionStorage.getAllSessions());

  const handleDeleteSession = (sessionId: string) => {
    try {
      sessionStorage.deleteSession(sessionId);
      setSessions(sessionStorage.getAllSessions());
      toast({
        title: "Session Deleted",
        description: "The session has been successfully deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the session. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Your Therapy History</h1>
            <Button onClick={() => navigate("/session")}>
              Start New Session
            </Button>
          </div>

          <SessionHistory
            sessions={sessions}
            onDeleteSession={handleDeleteSession}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default History; 