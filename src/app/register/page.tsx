import { RegisterForm } from "../../components/register-form"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Luminark",
  description: "Create your Luminark learning account",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#F5F3E7] flex items-center justify-center p-4">
      <RegisterForm />
    </main>
  )
}
