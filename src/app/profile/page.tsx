"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Edit, Save, X, Shield } from "lucide-react";
import { apiClient } from "@/lib/apiClient";
import { useAuth } from "@/hooks/useApi";
import { Navbar } from "@/components/Navbar";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
      });
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Update user profile
      await apiClient.updateUser(user.id, formData);
      
      // Refresh user data
      // You might want to implement a refresh method in useAuth
      setIsEditing(false);
      
      // Show success message
      alert('Profile updated successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <div className="text-red-600 text-xl mb-4">⚠️ User not found</div>
              <p className="text-gray-600">Please log in to view your profile.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Profile</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button onClick={handleEdit} variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button onClick={handleSave} disabled={loading} size="sm">
                        <Save className="w-4 h-4 mr-2" />
                        {loading ? 'Saving...' : 'Save'}
                      </Button>
                      <Button onClick={handleCancel} variant="outline" size="sm">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>

                <div className="pt-4 border-t">
                  <Label>Full Name</Label>
                  <p className="text-gray-700 font-medium mt-1">
                    {user.fullName || `${user.firstName} ${user.lastName}`}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Info Sidebar */}
          <div className="space-y-6">
            {/* User Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Account Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-lg">
                      {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{user.fullName || `${user.firstName} ${user.lastName}`}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Role</span>
                    <Badge variant="secondary" className="capitalize">
                      {user.role}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">User ID</span>
                    <span className="text-sm font-mono text-gray-500">{user.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={logout} 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
