"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Calendar, 
  FileText, 
  Edit, 
  Trash2, 
  Download,
  Upload,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Assignment, Submission } from "@/types";
import { apiClient } from "@/lib/apiClient";
import { useAuth } from "@/hooks/useApi";
import { Navbar } from "@/components/Navbar";

export default function AssignmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const assignmentId = params.id as string;
  const { user } = useAuth();
  
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form states for editing
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    maxPoints: 0
  });
  
  // Form states for submission
  const [submissionForm, setSubmissionForm] = useState({
    content: '',
    attachments: [] as string[]
  });

  useEffect(() => {
    const fetchAssignmentData = async () => {
      try {
        setLoading(true);
        const assignmentData = await apiClient.getAssignment(assignmentId);
        setAssignment(assignmentData);
        
        // Set edit form data
        setEditForm({
          title: assignmentData.title,
          description: assignmentData.description,
          dueDate: assignmentData.dueDate ? new Date(assignmentData.dueDate).toISOString().split('T')[0] : '',
          maxPoints: assignmentData.maxPoints || 0
        });

        // Check if user has already submitted
        if (user) {
          try {
            const submissions = await apiClient.getMySubmissions();
            const userSubmission = submissions.find(sub => sub.assignmentId === assignmentId);
            setSubmission(userSubmission || null);
          } catch {
            // Silently handle submission fetch errors
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load assignment');
      } finally {
        setLoading(false);
      }
    };

    if (assignmentId) {
      fetchAssignmentData();
    }
  }, [assignmentId, user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    if (!assignment) return;
    
    try {
      const updatedAssignment = await apiClient.updateAssignment(assignmentId, {
        title: editForm.title,
        description: editForm.description,
        dueDate: editForm.dueDate,
        maxPoints: editForm.maxPoints
      });
      
      setAssignment(updatedAssignment);
      setIsEditing(false);
      alert('Assignment updated successfully!');
    } catch {
      alert('Failed to update assignment. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form to original values
    if (assignment) {
      setEditForm({
        title: assignment.title,
        description: assignment.description,
        dueDate: assignment.dueDate ? new Date(assignment.dueDate).toISOString().split('T')[0] : '',
        maxPoints: assignment.maxPoints || 0
      });
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this assignment? This action cannot be undone.')) {
      return;
    }
    
    try {
      setIsDeleting(true);
      await apiClient.deleteAssignment(assignmentId);
      alert('Assignment deleted successfully!');
      router.push('/assignments');
    } catch {
      alert('Failed to delete assignment. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmitAssignment = async () => {
    if (!user || !assignment) return;
    
    if (!submissionForm.content.trim()) {
      alert('Please provide assignment content before submitting.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      const newSubmission = await apiClient.createSubmission({
        assignmentId: assignmentId,
        studentId: user.id,
        content: submissionForm.content,
        status: 'submitted',
        attachments: submissionForm.attachments
      });
      
      setSubmission(newSubmission);
      alert('Assignment submitted successfully!');
    } catch {
      alert('Failed to submit assignment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canEdit = user && (user.role === 'admin' || user.role === 'teacher');
  const canDelete = user && user.role === 'admin';
  const canSubmit = user && user.role === 'student' && !submission;
  const isOverdue = assignment?.dueDate && new Date(assignment.dueDate) < new Date();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading assignment...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !assignment) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <div className="text-red-600 text-xl mb-4">⚠️ Error Loading Assignment</div>
              <p className="text-gray-600">{error || 'Assignment not found'}</p>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Button 
                  variant="outline" 
                  onClick={() => router.push('/assignments')}
                  className="mb-4"
                >
                  ← Back to Assignments
                </Button>
                <h1 className="text-3xl font-bold text-gray-900">{assignment.title}</h1>
              </div>
              <div className="flex items-center space-x-2">
                {canEdit && (
                  <Button onClick={handleEdit} variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
                {canDelete && (
                  <Button 
                    onClick={handleDelete} 
                    variant="destructive" 
                    size="sm"
                    disabled={isDeleting}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </Button>
                )}
              </div>
            </div>
            
            {/* Status Badges */}
            <div className="flex items-center space-x-3 mb-4">
              <Badge variant={assignment.status === 'published' ? 'default' : 'secondary'}>
                {assignment.status}
              </Badge>
              {isOverdue && (
                <Badge variant="destructive">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Overdue
                </Badge>
              )}
              {submission && (
                <Badge variant="outline" className="text-green-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Submitted
                </Badge>
              )}
            </div>
          </div>

          {/* Assignment Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Assignment Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Assignment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <input
                          id="title"
                          type="text"
                          value={editForm.title}
                          onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                          className="w-full p-2 border rounded-md mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={editForm.description}
                          onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                          className="mt-1"
                          rows={4}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="dueDate">Due Date</Label>
                          <input
                            id="dueDate"
                            type="date"
                            value={editForm.dueDate}
                            onChange={(e) => setEditForm({...editForm, dueDate: e.target.value})}
                            className="w-full p-2 border rounded-md mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="maxPoints">Max Points</Label>
                          <input
                            id="maxPoints"
                            type="number"
                            value={editForm.maxPoints}
                            onChange={(e) => setEditForm({...editForm, maxPoints: parseInt(e.target.value) || 0})}
                            className="w-full p-2 border rounded-md mt-1"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleSaveEdit}>Save Changes</Button>
                        <Button onClick={handleCancelEdit} variant="outline">Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {assignment.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>Due: {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : 'No due date'}</span>
                        </div>
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-2" />
                          <span>Max Points: {assignment.maxPoints || 'Not specified'}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Course Info */}
              {assignment.courseId && (
                <Card>
                  <CardHeader>
                    <CardTitle>Course Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Course ID: {assignment.courseId}
                    </p>
                    {/* You can fetch and display course details here */}
                  </CardContent>
                </Card>
              )}

              {/* Submission Section for Students */}
              {canSubmit && (
                <Card>
                  <CardHeader>
                    <CardTitle>Submit Assignment</CardTitle>
                    <CardDescription>
                      Upload your completed assignment before the due date
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="content">Assignment Content</Label>
                      <Textarea
                        id="content"
                        placeholder="Write your assignment content here..."
                        value={submissionForm.content}
                        onChange={(e) => setSubmissionForm({...submissionForm, content: e.target.value})}
                        className="mt-1"
                        rows={6}
                      />
                    </div>
                    <div>
                      <Label>Attachments</Label>
                      <div className="mt-2 p-4 border-2 border-dashed border-gray-300 rounded-md text-center">
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          Drag and drop files here, or click to browse
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Supported formats: PDF, DOC, DOCX, TXT
                        </p>
                      </div>
                    </div>
                    <Button 
                      onClick={handleSubmitAssignment}
                      disabled={isSubmitting || !submissionForm.content.trim()}
                      className="w-full"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
                    </Button>
                  </CardContent>
                </Card>
              )}

                             {/* Existing Submission Display */}
               {submission && (
                 <Card>
                   <CardHeader>
                     <CardTitle>Your Submission</CardTitle>
                     <CardDescription>
                       Submitted on {new Date(submission.submittedAt).toLocaleDateString()}
                     </CardDescription>
                   </CardHeader>
                   <CardContent>
                     <div className="space-y-3">
                       <div>
                         <Label className="text-sm font-medium">Content:</Label>
                         <p className="mt-1 p-3 bg-gray-50 rounded-md text-gray-700">
                           {submission.content}
                         </p>
                       </div>
                       {submission.attachments && submission.attachments.length > 0 && (
                         <div>
                           <Label className="text-sm font-medium">Attachments:</Label>
                           <div className="mt-1 space-y-2">
                             {submission.attachments.map((attachment, index) => (
                               <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md">
                                 <FileText className="w-4 h-4 text-gray-500" />
                                 <span className="text-sm text-gray-700">{attachment}</span>
                                 <Button size="sm" variant="outline">
                                   <Download className="w-3 h-3 mr-1" />
                                   Download
                                 </Button>
                               </div>
                             ))}
                           </div>
                         </div>
                       )}
                       {submission.grade !== undefined && (
                         <div>
                           <Label className="text-sm font-medium">Grade:</Label>
                           <p className="mt-1 text-lg font-semibold text-green-600">
                             {submission.grade} / {assignment.maxPoints || 'N/A'}
                           </p>
                         </div>
                       )}
                     </div>
                   </CardContent>
                 </Card>
               )}

               {/* Teacher Grading Section */}
               {user?.role === 'teacher' && (
                 <Card>
                   <CardHeader>
                     <CardTitle>Grade Student Submissions</CardTitle>
                     <CardDescription>
                       Review and grade student work for this assignment
                     </CardDescription>
                   </CardHeader>
                   <CardContent>
                     <div className="space-y-4">
                       {/* Mock student submissions for grading */}
                       <div className="border rounded-lg p-4">
                         <div className="flex items-center justify-between mb-3">
                           <div>
                             <h4 className="font-medium">Student: John Doe</h4>
                             <p className="text-sm text-gray-500">Submitted: {new Date().toLocaleDateString()}</p>
                           </div>
                           <Badge variant="secondary">Pending Grade</Badge>
                         </div>
                         <div className="mb-3">
                           <Label className="text-sm font-medium">Submission Content:</Label>
                           <div className="mt-1 p-3 bg-gray-50 rounded-md">
                             <p className="text-sm text-gray-700">
                               &ldquo;I completed the JavaScript assignment focusing on ES6 features including arrow functions, 
                               destructuring, and template literals. The code follows best practices and includes proper error handling.&rdquo;
                             </p>
                           </div>
                         </div>
                         <div className="flex items-center space-x-4">
                           <div className="flex-1">
                             <Label htmlFor="grade" className="text-sm font-medium">Grade (0-{assignment.maxPoints || 100})</Label>
                             <input
                               id="grade"
                               type="number"
                               min="0"
                               max={assignment.maxPoints || 100}
                               className="w-full p-2 border rounded-md mt-1"
                               placeholder="Enter grade"
                             />
                           </div>
                           <div className="flex-1">
                             <Label htmlFor="feedback" className="text-sm font-medium">Feedback</Label>
                             <textarea
                               id="feedback"
                               className="w-full p-2 border rounded-md mt-1"
                               rows={3}
                               placeholder="Provide feedback to the student"
                             />
                           </div>
                         </div>
                         <div className="mt-3 flex space-x-2">
                           <Button className="flex-1" variant="outline">
                             Save Draft
                           </Button>
                           <Button className="flex-1">
                             Submit Grade
                           </Button>
                         </div>
                       </div>

                       <div className="border rounded-lg p-4">
                         <div className="flex items-center justify-between mb-3">
                           <div>
                             <h4 className="font-medium">Student: Jane Smith</h4>
                             <p className="text-sm text-gray-500">Submitted: {new Date(Date.now() - 86400000).toLocaleDateString()}</p>
                           </div>
                           <Badge variant="default">Graded: 85/100</Badge>
                         </div>
                         <div className="mb-3">
                           <Label className="text-sm font-medium">Submission Content:</Label>
                           <div className="mt-1 p-3 bg-gray-50 rounded-md">
                             <p className="text-sm text-gray-700">
                               &ldquo;Completed the assignment with good understanding of JavaScript fundamentals. 
                               Used proper variable declarations and function syntax.&rdquo;
                             </p>
                           </div>
                         </div>
                         <div className="text-sm">
                           <span className="font-medium">Grade:</span> 85/100
                           <br />
                           <span className="font-medium">Feedback:</span> &ldquo;Good work! Consider using more modern ES6 features next time.&rdquo;
                         </div>
                       </div>
                     </div>
                   </CardContent>
                 </Card>
               )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Assignment Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Assignment Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <Badge variant={assignment.status === 'published' ? 'default' : 'secondary'}>
                      {assignment.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Due Date</span>
                    <span className="text-sm">
                      {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : 'No due date'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max Points</span>
                    <span className="text-sm">{assignment.maxPoints || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Your Role</span>
                    <span className="text-sm capitalize">{user?.role || 'Guest'}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {canSubmit && (
                    <Button 
                      onClick={() => document.getElementById('content')?.focus()}
                      className="w-full"
                      variant="outline"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Start Writing
                    </Button>
                  )}
                  <Button 
                    onClick={() => window.print()}
                    className="w-full"
                    variant="outline"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Print Assignment
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
