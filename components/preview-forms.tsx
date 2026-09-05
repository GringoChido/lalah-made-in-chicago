"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// No network request or storage. Provider and inbox need approval.
export function ContactForm() {
  const [status, setStatus] = useState("");
  function checkForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Your form is ready. This preview does not send or save messages.");
  }
  return (
    <form className="contact-form" onSubmit={checkForm} aria-describedby="contact-preview">
      <div className="form-pair">
        <label htmlFor="contact-name">Name<Input className="form-input" id="contact-name" name="name" autoComplete="name" required maxLength={120} /></label>
        <label htmlFor="contact-email">Email<Input className="form-input" id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} /></label>
      </div>
      <label htmlFor="contact-message">Message<Textarea className="form-input form-message" id="contact-message" name="message" required minLength={5} maxLength={5000} /></label>
      <div className="form-bottom"><Button className="cream-button" type="submit">Preview message</Button><p id="contact-preview" className="form-note">Preview only. Message delivery is not connected.</p></div>
      <p className="form-status" role="status">{status}</p>
    </form>
  );
}

export function SignupForm() {
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("");
  function checkSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) { setStatus("Please select the email consent box."); return; }
    setStatus("Your form is ready. This preview does not save your email or subscribe you.");
  }
  return (
    <form className="signup-form" onSubmit={checkSignup} aria-describedby="signup-preview">
      <h2>Stay in touch</h2><p>Music, show announcements, and updates from Lalah.</p>
      <label htmlFor="signup-email">Email address<Input className="form-input" id="signup-email" name="email" type="email" autoComplete="email" maxLength={254} required /></label>
      <div className="consent-row"><Checkbox id="signup-consent" checked={consent} onCheckedChange={checked => setConsent(checked === true)} /><label htmlFor="signup-consent">I agree to receive email updates from Lalah Hathaway.</label></div>
      <Button className="cream-button" type="submit">Preview sign up</Button>
      <p className="form-note" id="signup-preview">Preview only. The mailing list is not connected.</p>
      <p className="form-status" role="status">{status}</p>
    </form>
  );
}
