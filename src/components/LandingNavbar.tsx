"use client";

import { Button } from "@/components/ui/button";
import { Sun } from "lucide-react";
import Link from "next/link";

export function LandingNavbar() {
  return (
    <header className="px-6 py-4 border-b border-[#C9C3D9] bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[#2B2E4A] to-[#6EEBFF] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">L</span>
          </div>
          <Link href="/" className="text-xl font-bold text-[#2B2E4A] hover:text-[#6EEBFF] transition-colors">
            Luminark
          </Link>
        </div>

        {/* Navigation */}
                  <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#features" className="hover:text-[#6EEBFF] transition-colors text-[#2B2E4A]">Features</Link>
            <Link href="/#about" className="hover:text-[#6EEBFF] transition-colors text-[#2B2E4A]">About</Link>
            <Link href="/contact" className="hover:text-[#6EEBFF] transition-colors text-[#2B2E4A]">Contact</Link>
          </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="border-[#2B2E4A] text-[#2B2E4A] hover:bg-[#C9C3D9]" asChild>
            <a href="/login">Login</a>
          </Button>
          <Button className="bg-gradient-to-r from-[#2B2E4A] to-[#6EEBFF] hover:from-[#1A1D2E] hover:to-[#5DD8E8] text-white" asChild>
            <a href="/register">Sign Up</a>
          </Button>
          <Button variant="ghost" size="sm" className="text-[#2B2E4A] hover:text-[#6EEBFF]">
            <Sun className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
