"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const contactEmail = "info@secondsonproductions.com";

export function ContactForm() {
  const [status, setStatus] = useState("");
  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Lalah Hathaway website enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\r\nEmail: ${email}\r\n\r\n${message}`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setStatus("Finish sending your message in your email app. If no draft opens, use the email link above.");
  }
  return (
    <form className="contact-form" onSubmit={prepareEmail} aria-describedby="contact-details contact-email-note">
      <p id="contact-details" className="contact-details">Email <a href={`mailto:${contactEmail}`}>{contactEmail}</a> or use the form below.</p>
      <div className="form-pair">
        <label htmlFor="contact-name">Name<Input className="form-input" id="contact-name" name="name" autoComplete="name" required maxLength={120} /></label>
        <label htmlFor="contact-email">Email<Input className="form-input" id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} /></label>
      </div>
      <label htmlFor="contact-message">Message<Textarea className="form-input form-message" id="contact-message" name="message" required minLength={5} maxLength={5000} /></label>
      <div className="form-bottom"><Button className="cream-button" type="submit">Open email</Button><p id="contact-email-note" className="form-note">Opens your email app with your message ready to send.</p></div>
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
