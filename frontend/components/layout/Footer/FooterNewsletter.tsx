"use client";

import { useState } from "react";

import { Mail } from "lucide-react";

import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";

interface FooterNewsletterProps {
  onSubscribe?: (email: string) => Promise<void> | void;
}

export default function FooterNewsletter({
  onSubscribe,
}: FooterNewsletterProps) {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setMessage("");

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email.");
      return;
    }

    try {
      setLoading(true);

      await onSubscribe?.(email);

      setMessage("Thanks for subscribing!");

      setEmail("");
    } catch {
      setMessage("Subscription failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="
        rounded-3xl
        border
        bg-card
        p-6
        shadow-sm
      "
    >
      <div className="mb-5 flex items-center gap-3">
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-primary/10
            text-primary
          "
        >
          <Mail className="h-5 w-5" />
        </div>

        <div>
          <h3 className="text-lg font-semibold">
            Stay Updated
          </h3>

          <p className="text-sm text-muted-foreground">
            Weekly AI templates, updates and exclusive
            releases.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <AppInput
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <AppButton
          type="submit"
          loading={loading}
          className="w-full"
        >
          Subscribe
        </AppButton>
      </form>

      {message && (
        <p
          className="
            mt-4
            text-sm
            text-muted-foreground
          "
        >
          {message}
        </p>
      )}
    </section>
  );
}