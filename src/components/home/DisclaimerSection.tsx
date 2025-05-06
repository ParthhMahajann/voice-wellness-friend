
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertOctagon } from "lucide-react";

const DisclaimerSection = () => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-amber-800">
              <AlertOctagon className="mr-2 h-5 w-5" /> 
              Important Information
            </CardTitle>
          </CardHeader>
          <CardContent className="text-amber-700">
            <p className="mb-4">
              VoiceTherapy is designed to provide supplementary emotional support and is not a replacement 
              for professional mental health services. Please be aware of the following:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>This AI companion cannot diagnose medical conditions or provide medical advice.</li>
              <li>In case of emergency or crisis situations, please contact your local emergency services immediately.</li>
              <li>For ongoing mental health concerns, consult with a licensed healthcare professional.</li>
              <li>Your conversations are private and encrypted, but please review our privacy policy for details on data handling.</li>
            </ul>
            <div className="mt-4 pt-3 border-t border-amber-200">
              <p className="font-medium">
                For immediate crisis support:
              </p>
              <p>
                National Suicide Prevention Lifeline: <strong>988</strong> or <strong>1-800-273-8255</strong>
              </p>
              <p>
                Crisis Text Line: Text <strong>HOME</strong> to <strong>741741</strong>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DisclaimerSection;
