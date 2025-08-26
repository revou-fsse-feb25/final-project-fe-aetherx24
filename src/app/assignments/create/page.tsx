"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft,
  Save,
  X
} from "lucide-react";

import { apiClient } from "@/lib/apiClient";
import { useAuth } from "@/hooks/useApi";
import { Navbar } from "@/components/Navbar";

export default function CreateAssignmentPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    courseId: '',
    dueDate: '',
    maxPoints: 100,
    status: 'draft'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user has permission to create assignments
  if (!user || (user.role !== 'teacher' && user.role !== 'admin')) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center py-12">
              <div className="text-red-600 text-xl mb-4">⚠️ Access Denied</div>
                             <p className="text-gray-600">You don&apos;t have permission to create assignments.</p>
              <Button 
                onClick={() => router.push('/assignments')} 
                className="mt-4"
                variant="outline"
              >
                Back to Assignments
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
             const newAssignment = await apiClient.createAssignment({
         title: formData.title,
         description: formData.description,
         courseId: formData.courseId || '',
         dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : '',
         maxPoints: formData.maxPoints,
         status: formData.status as 'draft' | 'published' | 'closed'
       });
      
      alert('Assignment created successfully!');
      router.push(`/assignments/${newAssignment.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create assignment');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => router.push('/assignments')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Assignments
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Create New Assignment</h1>
            <p className="text-gray-600 mt-2">Fill in the details below to create a new assignment</p>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Assignment Details</CardTitle>
              <CardDescription>
                Provide the basic information for your new assignment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <Label htmlFor="title">Assignment Title *</Label>
                  <Input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter assignment title"
                    className="mt-1"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Provide a detailed description of the assignment"
                    className="mt-1"
                    rows={4}
                    required
                  />
                </div>

                {/* Course ID */}
                <div>
                  <Label htmlFor="courseId">Course ID (Optional)</Label>
                  <Input
                    id="courseId"
                    type="text"
                    value={formData.courseId}
                    onChange={(e) => handleInputChange('courseId', e.target.value)}
                    placeholder="Enter course ID if applicable"
                    className="mt-1"
                  />
                </div>

                {/* Due Date */}
                <div>
                  <Label htmlFor="dueDate">Due Date (Optional)</Label>
                  <Input
                    id="dueDate"
                    type="datetime-local"
                    value={formData.dueDate}
                    onChange={(e) => handleInputChange('dueDate', e.target.value)}
                    className="mt-1"
                  />
                </div>

                {/* Max Points */}
                <div>
                  <Label htmlFor="maxPoints">Maximum Points</Label>
                  <Input
                    id="maxPoints"
                    type="number"
                    value={formData.maxPoints}
                    onChange={(e) => handleInputChange('maxPoints', parseInt(e.target.value) || 0)}
                    min="1"
                    className="mt-1"
                  />
                </div>

                {/* Status */}
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleInputChange('status', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Error Display */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Create Assignment
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => router.push('/assignments')}
                    disabled={loading}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
