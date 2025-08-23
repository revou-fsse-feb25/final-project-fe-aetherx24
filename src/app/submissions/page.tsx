"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, 
  Upload, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Download,
  Eye,
  Edit
} from "lucide-react";
import { Submission, Assignment } from "@/types";
import { apiClient } from "@/lib/apiClient";
import { useAuth } from "@/hooks/useApi";
import { Navbar } from "@/components/Navbar";

export default function SubmissionsPage() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<string>('');
  const [submissionText, setSubmissionText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [submissionsData, assignmentsData] = await Promise.all([
          apiClient.getSubmissions(),
          apiClient.getAssignments()
        ]);
        setSubmissions(submissionsData);
        setAssignments(assignmentsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmitAssignment = async () => {
    if (!selectedAssignment || !submissionText.trim() || !user) return;

    try {
      setSubmitting(true);
      const newSubmission = await apiClient.createSubmission({
        studentId: user.id,
        assignmentId: selectedAssignment,
        content: submissionText,
        status: 'submitted'
      });
      
      setSubmissions(prev => [newSubmission, ...prev]);
      setShowSubmitForm(false);
      setSelectedAssignment('');
      setSubmissionText('');
      
      alert('Assignment submitted successfully!');
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Failed to submit assignment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'default';
      case 'graded':
        return 'secondary';
      case 'late':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <FileText className="w-4 h-4" />;
      case 'graded':
        return <CheckCircle className="w-4 h-4" />;
      case 'late':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const isTeacher = user?.role === 'teacher';
  const isStudent = user?.role === 'student';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading submissions...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <div className="text-red-600 text-xl mb-4">⚠️ Error Loading Submissions</div>
              <p className="text-gray-600">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-4"
                variant="outline"
              >
                Try Again
              </Button>
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
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Assignment Submissions</h1>
              <p className="text-gray-600">
                {isTeacher ? 'Review and grade student submissions' : 'Submit and track your assignments'}
              </p>
            </div>
            {isStudent && (
              <Button onClick={() => setShowSubmitForm(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Submit Assignment
              </Button>
            )}
          </div>
        </div>

        {/* Submit Form */}
        {showSubmitForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Submit New Assignment</CardTitle>
              <CardDescription>Upload your assignment submission</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="assignment">Select Assignment</Label>
                <select
                  id="assignment"
                  value={selectedAssignment}
                  onChange={(e) => setSelectedAssignment(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Choose an assignment...</option>
                  {assignments
                    .filter(assignment => assignment.status === 'published')
                    .map(assignment => (
                      <option key={assignment.id} value={assignment.id}>
                        {assignment.title}
                      </option>
                    ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor="submission">Submission Content</Label>
                <Textarea
                  id="submission"
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  placeholder="Enter your assignment content here..."
                  rows={6}
                  className="mt-1"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  onClick={handleSubmitAssignment}
                  disabled={submitting || !selectedAssignment || !submissionText.trim()}
                >
                  {submitting ? 'Submitting...' : 'Submit Assignment'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowSubmitForm(false);
                    setSelectedAssignment('');
                    setSubmissionText('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submissions List */}
        <div className="space-y-6">
          {submissions.map((submission) => {
            const assignment = assignments.find(a => a.id === submission.assignmentId);
            
            return (
              <Card key={submission.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {assignment?.title || 'Unknown Assignment'}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 mb-3">
                        Submitted by: {submission.studentId}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusColor(submission.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(submission.status)}
                          <span className="capitalize">{submission.status}</span>
                        </div>
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Submission Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Submitted: {new Date(submission.submittedAt).toLocaleDateString()}</span>
                      </div>
                      
                      {submission.gradedAt && (
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          <span>Graded: {new Date(submission.gradedAt).toLocaleDateString()}</span>
                        </div>
                      )}
                      
                      {submission.grade !== undefined && (
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>Score: {submission.grade}/{assignment?.maxPoints || 'N/A'}</span>
                        </div>
                      )}
                    </div>

                    {/* Submission Content */}
                    <div className="bg-gray-50 p-4 rounded-md">
                      <Label className="text-sm font-medium mb-2 block">Submission Content</Label>
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {submission.content || 'No content provided'}
                      </p>
                    </div>

                    {/* Feedback */}
                    {submission.feedback && (
                      <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                        <Label className="text-sm font-medium mb-2 block text-blue-800">Instructor Feedback</Label>
                        <p className="text-blue-700">{submission.feedback}</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-2">
                      {isTeacher && submission.status === 'submitted' && (
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Grade Submission
                        </Button>
                      )}
                      
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      
                      {submission.attachments && submission.attachments.length > 0 && (
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download Attachments
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {submissions.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions yet</h3>
            <p className="text-gray-600">
              {isStudent 
                ? 'Submit your first assignment to get started!' 
                : 'Students will appear here once they submit assignments.'
              }
            </p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
