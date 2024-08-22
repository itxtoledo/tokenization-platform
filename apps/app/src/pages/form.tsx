import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const templateParams = {
      name,
      email,
      message,
    };

    // Check if any of the fields are empty
    if (
      message.valueOf() === "" ||
      email.valueOf() === "" ||
      name.valueOf() === ""
    ) {
      alert("Please fill in all fields");
      return; // stop the function from executing further
    } else {
      emailjs
        .send(
          "service_fxip7fc", // this is service ID
          "template_7l85d98", // this is template ID
          templateParams,
          "8VMmL_Iie93KDdXaB" // this is public key instead of user ID
        )
        .then(
          (result) => {
            console.log("Email successfully sent!", result.text);
            setIsOpen(true); // Show the dialog only when the email is successfully sent
          },
          (error) => {
            console.error("There was an error sending the email", error.text);
          }
        );
    }
  };

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          placeholder="Describe your question or issue"
          className="min-h-[120px]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <Button
        variant="outline"
        type="submit"
        className="w-full bg-black text-white"
      >
        Send Message
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white text-black">
          <DialogHeader>
            <DialogTitle>Message Sent</DialogTitle>
            <DialogDescription>
              Your message has been successfully sent!
            </DialogDescription>
          </DialogHeader>
          <Card className="border-0 shadow-none">
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 rounded-full bg-green-100 animate-ping"></div>
                <div className="relative flex items-center justify-center w-full h-full rounded-full bg-green-500">
                  <CheckCircle2 className="w-8 h-8 text-white animate-bounce" />
                </div>
              </div>
              <p className="text-center text-sm text-gray-500">
                Your recipient will be notified shortly.
              </p>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </form>
  );
};

export default ContactForm;
