"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useApi";
import Link from "next/link";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAuth();

  // Note: Middleware will handle the redirect automatically when login succeeds

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (email && password) {
        console.log("🔍 LoginForm: Attempting login with:", { email, password: '***' });
        
        // Use the auth hook for login
        const response = await login({ email, password });
        console.log("🔍 LoginForm: Login response received:", response);
        
        // Check if token was stored
        const storedToken = localStorage.getItem('jwt_token');
        const storedUser = localStorage.getItem('user');
        console.log("🔍 LoginForm: After login - localStorage token:", storedToken ? 'EXISTS' : 'NOT FOUND');
        console.log("🔍 LoginForm: After login - localStorage user:", storedUser ? 'EXISTS' : 'NOT FOUND');
        
        if (storedToken && storedUser) {
          console.log("🔍 LoginForm: Token stored successfully, redirecting...");
          // Wait a moment for state to update, then redirect
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 100);
        } else {
          console.error("🔍 LoginForm: Token storage failed!");
          setError("Login succeeded but token storage failed. Please try again.");
        }
      } else {
        setError("Please fill in all fields");
      }
    } catch (err) {
      console.error("🔍 LoginForm: Login error:", err);
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
                 <div className="flex items-center justify-center space-x-3 mb-4">
           <div className="w-10 h-10 bg-gradient-to-r from-[#2B2E4A] to-[#6EEBFF] rounded-lg flex items-center justify-center">
             <span className="text-white font-bold text-xl">L</span>
           </div>
           <span className="text-xl font-bold text-[#2B2E4A]">Luminark</span>
         </div>
        <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
              {error}
            </div>
          )}
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        
        <div className="mt-4 text-center text-sm text-[#2B2E4A]">
          <p>Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#6EEBFF] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Connected to backend API</p>
          <p className="text-xs mt-1">Make sure your backend is running</p>
          {isAuthenticated && (
            <p className="text-green-600 mt-2">✓ Authenticated! Redirecting...</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
