"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestTokenPage() {
  const [testResult, setTestResult] = useState<string>("");

  const testTokenStorage = () => {
    try {
      // Test localStorage
      const testToken = "test_jwt_token_12345";
      const testUser = { id: "1", name: "Test User", email: "test@example.com" };
      
      localStorage.setItem('jwt_token', testToken);
      localStorage.setItem('user', JSON.stringify(testUser));
      
      // Test cookies
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      document.cookie = `jwt_token=${testToken}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
      document.cookie = `user=${JSON.stringify(testUser)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
      
      // Verify storage
      const storedToken = localStorage.getItem('jwt_token');
      const storedUser = localStorage.getItem('user');
      const cookies = document.cookie.split(';');
      const jwtCookie = cookies.find(cookie => cookie.trim().startsWith('jwt_token='));
      const userCookie = cookies.find(cookie => cookie.trim().startsWith('user='));
      
      const result = `
Token Storage Test Results:
==========================
localStorage:
- jwt_token: ${storedToken ? '✅ EXISTS' : '❌ NOT FOUND'}
- user: ${storedUser ? '✅ EXISTS' : '❌ NOT FOUND'}

Cookies:
- jwt_token: ${jwtCookie ? '✅ EXISTS' : '❌ NOT FOUND'}
- user: ${userCookie ? '✅ EXISTS' : '❌ NOT FOUND'}

All cookies: ${cookies.join(', ')}
      `;
      
      setTestResult(result);
    } catch (error) {
      setTestResult(`Error: ${error}`);
    }
  };

  const clearTokens = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    document.cookie = 'jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setTestResult("Tokens cleared!");
  };

  const checkCurrentTokens = () => {
    const storedToken = localStorage.getItem('jwt_token');
    const storedUser = localStorage.getItem('user');
    const cookies = document.cookie.split(';');
    const jwtCookie = cookies.find(cookie => cookie.trim().startsWith('jwt_token='));
    const userCookie = cookies.find(cookie => cookie.trim().startsWith('user='));
    
    const result = `
Current Token Status:
====================
localStorage:
- jwt_token: ${storedToken ? '✅ EXISTS' : '❌ NOT FOUND'}
- user: ${storedUser ? '✅ EXISTS' : '❌ NOT FOUND'}

Cookies:
- jwt_token: ${jwtCookie ? '✅ EXISTS' : '❌ NOT FOUND'}
- user: ${userCookie ? '✅ EXISTS' : '❌ NOT FOUND'}
    `;
    
    setTestResult(result);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Token Storage Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-4">
              <Button onClick={testTokenStorage}>Test Token Storage</Button>
              <Button onClick={clearTokens} variant="outline">Clear Tokens</Button>
              <Button onClick={checkCurrentTokens} variant="outline">Check Current</Button>
            </div>
            
            {testResult && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm">{testResult}</pre>
              </div>
            )}
            
            <div className="mt-4 text-sm text-gray-600">
              <p>This page helps debug token storage issues. Use the buttons above to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Test Token Storage:</strong> Attempts to store test tokens in both localStorage and cookies</li>
                <li><strong>Clear Tokens:</strong> Removes all stored tokens</li>
                <li><strong>Check Current:</strong> Shows the current status of stored tokens</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
