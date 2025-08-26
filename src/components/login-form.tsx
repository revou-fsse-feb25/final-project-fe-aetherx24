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

        {/* Test Credentials Card */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-center mb-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Test Credentials (For Testing Only)</h3>
            <p className="text-xs text-gray-500">Use these credentials to test different user roles</p>
          </div>
          
          <div className="space-y-3">
            {/* Student */}
            <div className="flex items-center space-x-3 p-2 bg-white rounded border border-gray-200">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xs font-semibold">S</span>
              </div>
              <div className="flex-1 text-left">
                <div className="text-xs font-medium text-gray-700">Student</div>
                <div className="text-xs text-gray-500">student1@lms.com / student123</div>
              </div>
            </div>

            {/* Teacher */}
            <div className="flex items-center space-x-3 p-2 bg-white rounded border border-gray-200">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xs font-semibold">T</span>
              </div>
              <div className="flex-1 text-left">
                <div className="text-xs font-medium text-gray-700">Teacher</div>
                <div className="text-xs text-gray-500">teacher1@lms.com / teacher123</div>
              </div>
            </div>

            {/* Admin */}
            <div className="flex items-center space-x-3 p-2 bg-white rounded border border-gray-200">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-xs font-semibold">A</span>
              </div>
              <div className="flex-1 text-left">
                <div className="text-xs font-medium text-gray-700">Admin</div>
                <div className="text-xs text-gray-500">admin@lms.com / admin123</div>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-center space-x-1 text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
            <span className="text-amber-600">⚠</span>
            <span>These are demo credentials for testing different user roles</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
