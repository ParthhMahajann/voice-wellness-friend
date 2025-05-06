
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 px-6 mt-10 border-t">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-3">VoiceTherapy</h3>
            <p className="text-sm text-muted-foreground">
              An AI companion for mental wellness, available whenever you need support.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-3">Important Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Ethical Guidelines</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-3">Emergency Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="tel:988" className="text-muted-foreground hover:text-foreground transition-colors">988 - Suicide & Crisis Lifeline</a></li>
              <li><a href="sms:741741" className="text-muted-foreground hover:text-foreground transition-colors">Text HOME to 741741 - Crisis Text Line</a></li>
            </ul>
            <p className="text-xs text-muted-foreground mt-4">
              This AI is not a replacement for professional help. If you're in crisis, please use the resources above.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} VoiceTherapy. All rights reserved.</p>
          <p className="mt-1">This is a simulated therapeutic tool and not a replacement for professional mental health services.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
