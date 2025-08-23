import { LoginForm } from "@/components/login-form"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Luminark",
  description: "Sign in to your Luminark learning account",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#F5F3E7] flex items-center justify-center p-4">
      <LoginForm />
    </main>
  )
}
