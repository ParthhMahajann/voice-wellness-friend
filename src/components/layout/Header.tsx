
import React from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full therapy-gradient flex items-center justify-center">
          <span className="text-white font-bold">AI</span>
        </div>
        <h1 className="text-lg md:text-xl font-bold bg-clip-text text-transparent therapy-gradient">
          VoiceTherapy
        </h1>
      </Link>
      
      <nav className="flex items-center gap-4">
        {!isMobile && (
          <>
            <Link to="/resources">
              <Button variant="link" className={`text-foreground/80 hover:text-therapy-primary ${location.pathname === '/resources' ? 'text-therapy-primary' : ''}`}>
                Resources
              </Button>
            </Link>
            <Button variant="link" className="text-foreground/80 hover:text-therapy-primary">
              About
            </Button>
          </>
        )}
        <Link to="/session">
          <Button className="therapy-button">Get Started</Button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
