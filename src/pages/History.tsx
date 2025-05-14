import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SessionHistory from "@/components/therapy/SessionHistory";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/lib/supabase/client";

const History = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('start_time', { ascending: false });
      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch sessions. Please try again.",
          variant: "destructive",
        });
      } else {
        setSessions(data || []);
      }
      setLoading(false);
    };
    fetchSessions();
  }, [user, toast]);

  const handleDeleteSession = async (sessionId: string) => {
    try {
      const { error } = await supabase.from('sessions').delete().eq('id', sessionId);
      if (error) throw error;
      setSessions(sessions.filter(session => session.id !== sessionId));
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

          {loading ? (
            <div className="text-center text-gray-500">Loading sessions...</div>
          ) : (
            <SessionHistory
              sessions={sessions}
              onDeleteSession={handleDeleteSession}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default History; 