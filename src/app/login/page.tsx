import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <span className="font-serif text-3xl tracking-widest text-charcoal uppercase block">
            Freya
          </span>
          <span className="text-[10px] tracking-[0.3em] text-gold uppercase">
            Pilates
          </span>
          <p className="mt-6 text-[10px] tracking-[0.3em] uppercase text-charcoal-light font-sans">
            Admin Access
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
