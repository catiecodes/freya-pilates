"use client";

import { useState } from "react";
import Button from "./Button";

const INQUIRY_TYPES = [
  "Private Session",
  "Duet Session",
  "Virtual Session",
  "Group Class",
  "Retreat / Event",
  "Other",
];

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      inquiry_type: formData.get("inquiry_type") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Something went wrong");
      }

      setFormState("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setFormState("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (formState === "success") {
    return (
      <div className="text-center py-16">
        <p className="font-serif text-3xl text-charcoal mb-4">
          Thank you for reaching out.
        </p>
        <p className="text-sm text-charcoal-light">
          Freya will be in touch with you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] tracking-[0.25em] uppercase text-charcoal-light mb-2 font-sans">
            Name <span className="text-gold">*</span>
          </label>
          <input
            name="name"
            type="text"
            required
            className="w-full border border-cream-dark bg-white px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-olive transition-colors"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.25em] uppercase text-charcoal-light mb-2 font-sans">
            Email <span className="text-gold">*</span>
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full border border-cream-dark bg-white px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-olive transition-colors"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] tracking-[0.25em] uppercase text-charcoal-light mb-2 font-sans">
            Phone
          </label>
          <input
            name="phone"
            type="tel"
            className="w-full border border-cream-dark bg-white px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-olive transition-colors"
            placeholder="(optional)"
          />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.25em] uppercase text-charcoal-light mb-2 font-sans">
            I&apos;m interested in <span className="text-gold">*</span>
          </label>
          <select
            name="inquiry_type"
            required
            defaultValue=""
            className="w-full border border-cream-dark bg-white px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-olive transition-colors appearance-none"
          >
            <option value="" disabled>
              Select an option
            </option>
            {INQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-[10px] tracking-[0.25em] uppercase text-charcoal-light mb-2 font-sans">
          Message <span className="text-gold">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full border border-cream-dark bg-white px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-olive transition-colors resize-none"
          placeholder="Tell Freya a little about yourself and what you're looking for..."
        />
      </div>

      {formState === "error" && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}

      <Button
        type="submit"
        disabled={formState === "submitting"}
        variant="primary"
      >
        {formState === "submitting" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
