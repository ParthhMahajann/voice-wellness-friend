'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
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
            <Link href="/resources">
              <Button variant="link" className={`text-foreground/80 hover:text-therapy-primary ${pathname === '/resources' ? 'text-therapy-primary' : ''}`}>
                Resources
              </Button>
            </Link>
            <Link href="/history">
              <Button variant="link" className={`text-foreground/80 hover:text-therapy-primary ${pathname === '/history' ? 'text-therapy-primary' : ''}`}>
                History
              </Button>
            </Link>
            <Button variant="link" className="text-foreground/80 hover:text-therapy-primary">
              About
            </Button>
          </>
        )}
        <Link href="/session">
          <Button className="therapy-button">Get Started</Button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
