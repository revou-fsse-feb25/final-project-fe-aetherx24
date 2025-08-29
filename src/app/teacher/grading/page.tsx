"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Download,
  Eye,
  Award,
  TrendingUp,
  Filter,
  Search,
  Edit
} from "lucide-react";
import { Navbar } from "@/components/Navbar";

interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  assignmentId: string;
  assignmentTitle: string;
  courseTitle: string;
  content: string;
  submittedAt: string;
  status: 'submitted' | 'graded' | 'late';
  grade?: number;
  maxPoints: number;
  feedback?: string;
  attachments?: string[];
  isLate: boolean;
  daysLate: number;
}

interface Rubric {
  id: string;
  name: string;
  criteria: RubricCriteria[];
}

interface RubricCriteria {
  id: string;
  name: string;
  description: string;
  maxPoints: number;
  weight: number;
}

export default function GradingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'submitted' | 'graded' | 'late'>('all');
  const [courseFilter, setCourseFilter] = useState('all');

  const mockSubmissions: Submission[] = [
    {
      id: '1',
      studentId: 'student1',
      studentName: 'John Doe',
      assignmentId: 'assign1',
      assignmentTitle: 'JavaScript Fundamentals Quiz',
      courseTitle: 'Introduction to Computer Science',
      content: 'I completed the JavaScript assignment focusing on ES6 features including arrow functions, destructuring, and template literals. The code follows best practices and includes proper error handling.',
      submittedAt: '2024-01-14T10:30:00Z',
      status: 'submitted',
      maxPoints: 100,
      isLate: false,
      daysLate: 0,
      attachments: ['assignment1.js', 'screenshot.png']
    },
    {
      id: '2',
      studentId: 'student2',
      studentName: 'Jane Smith',
      assignmentId: 'assign1',
      assignmentTitle: 'JavaScript Fundamentals Quiz',
      courseTitle: 'Introduction to Computer Science',
      content: 'Completed the assignment with good understanding of JavaScript fundamentals. Used proper variable declarations and function syntax.',
      submittedAt: '2024-01-18T14:20:00Z',
      status: 'graded',
      grade: 85,
      maxPoints: 100,
      feedback: 'Good work! Consider using more modern ES6 features next time. Your understanding of fundamentals is solid.',
      isLate: true,
      daysLate: 3,
      attachments: ['assignment2.js']
    },
    {
      id: '3',
      studentId: 'student3',
      studentName: 'Mike Johnson',
      assignmentId: 'assign2',
      assignmentTitle: 'HTML Structure Assignment',
      courseTitle: 'Web Development Fundamentals',
      content: 'Built HTML page with proper semantic elements. Used header, nav, main, section, and footer tags appropriately.',
      submittedAt: '2024-01-20T09:15:00Z',
      status: 'submitted',
      maxPoints: 50,
      isLate: false,
      daysLate: 0,
      attachments: ['index.html', 'styles.css']
    },
    {
      id: '4',
      studentId: 'student4',
      studentName: 'Sarah Wilson',
      assignmentId: 'assign2',
      assignmentTitle: 'HTML Structure Assignment',
      courseTitle: 'Web Development Fundamentals',
      content: 'Created a responsive HTML structure with accessibility features. Included proper alt text and ARIA labels.',
      submittedAt: '2024-01-19T16:45:00Z',
      status: 'graded',
      grade: 48,
      maxPoints: 50,
      feedback: 'Excellent work! Your attention to accessibility and responsive design is outstanding. Perfect score!',
      isLate: false,
      daysLate: 0,
      attachments: ['index.html', 'styles.css', 'accessibility-report.pdf']
    }
  ];

  const mockRubrics: Rubric[] = [
    {
      id: '1',
      name: 'Programming Assignment Rubric',
      criteria: [
        { id: '1', name: 'Code Quality', description: 'Clean, readable, and well-structured code', maxPoints: 30, weight: 0.3 },
        { id: '2', name: 'Functionality', description: 'Code works as expected and meets requirements', maxPoints: 40, weight: 0.4 },
        { id: '3', name: 'Documentation', description: 'Clear comments and documentation', maxPoints: 20, weight: 0.2 },
        { id: '4', name: 'Best Practices', description: 'Follows programming best practices', maxPoints: 10, weight: 0.1 }
      ]
    },
    {
      id: '2',
      name: 'HTML/CSS Assignment Rubric',
      criteria: [
        { id: '1', name: 'Structure', description: 'Proper HTML semantic structure', maxPoints: 25, weight: 0.5 },
        { id: '2', name: 'Styling', description: 'CSS styling and layout', maxPoints: 15, weight: 0.3 },
        { id: '3', name: 'Accessibility', description: 'Accessibility features and best practices', maxPoints: 10, weight: 0.2 }
      ]
    }
  ];

  const filteredSubmissions = mockSubmissions.filter(submission => {
    const matchesSearch = submission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.assignmentTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    const matchesCourse = courseFilter === 'all' || submission.courseTitle === courseFilter;
    return matchesSearch && matchesStatus && matchesCourse;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'graded': return 'bg-green-100 text-green-800';
      case 'late': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <Clock className="w-4 h-4" />;
      case 'graded': return <CheckCircle className="w-4 h-4" />;
      case 'late': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getGradeColor = (grade: number, maxPoints: number) => {
    const percentage = (grade / maxPoints) * 100;
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-8 h-8 text-[#2B2E4A]" />
              <h1 className="text-3xl font-bold text-gray-900">Grade Submissions</h1>
            </div>
            <p className="text-gray-600">Review and grade student assignments with detailed feedback</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Grades</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockSubmissions.filter(s => s.status === 'submitted').length}</div>
                <p className="text-xs text-muted-foreground">Need grading</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockSubmissions.filter(s => s.status === 'graded').length}</div>
                <p className="text-xs text-muted-foreground">Graded today</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Late Submissions</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockSubmissions.filter(s => s.isLate).length}</div>
                <p className="text-xs text-muted-foreground">Submitted late</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Grade</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(mockSubmissions.filter(s => s.status === 'graded').reduce((acc, s) => acc + (s.grade || 0), 0) / 
                   mockSubmissions.filter(s => s.status === 'graded').length)}%
                </div>
                <p className="text-xs text-muted-foreground">Student average</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by student or assignment..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as 'all' | 'submitted' | 'graded' | 'late')}
                    className="border rounded-md px-3 py-2 text-sm flex-1"
                  >
                    <option value="all">All Status</option>
                    <option value="submitted">Submitted</option>
                    <option value="graded">Graded</option>
                    <option value="late">Late</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={courseFilter}
                    onChange={(e) => setCourseFilter(e.target.value)}
                    className="border rounded-md px-3 py-2 text-sm flex-1"
                  >
                    <option value="all">All Courses</option>
                    <option value="Introduction to Computer Science">CS101</option>
                    <option value="Web Development Fundamentals">WD101</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submissions List */}
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <Card key={submission.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getStatusColor(submission.status)}>
                          {getStatusIcon(submission.status)}
                          <span className="ml-1 capitalize">{submission.status}</span>
                        </Badge>
                        {submission.isLate && (
                          <Badge variant="destructive">
                            <Clock className="w-4 h-4 mr-1" />
                            {submission.daysLate} day{submission.daysLate !== 1 ? 's' : ''} late
                          </Badge>
                        )}
                        <Badge variant="outline">{submission.courseTitle}</Badge>
                      </div>
                      <CardTitle className="text-lg mb-1">{submission.assignmentTitle}</CardTitle>
                      <CardDescription className="text-sm font-medium text-gray-600">
                        Student: {submission.studentName}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      {submission.status === 'graded' && (
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getGradeColor(submission.grade || 0, submission.maxPoints)}`}>
                            {submission.grade}/{submission.maxPoints}
                          </div>
                          <div className="text-sm text-gray-500">
                            {Math.round(((submission.grade || 0) / submission.maxPoints) * 100)}%
                          </div>
                        </div>
                      )}
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Submission Content */}
                    <div className="lg:col-span-2">
                      <h4 className="font-medium text-gray-900 mb-2">Submission Content</h4>
                      <div className="bg-gray-50 p-3 rounded-md mb-3">
                        <p className="text-sm text-gray-700">{submission.content}</p>
                      </div>
                      
                      {submission.attachments && submission.attachments.length > 0 && (
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Attachments</h5>
                          <div className="flex flex-wrap gap-2">
                            {submission.attachments.map((attachment, index) => (
                              <Badge key={index} variant="outline" className="cursor-pointer hover:bg-gray-100">
                                <Download className="w-3 h-3 mr-1" />
                                {attachment}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Grading Section */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Grading</h4>
                      
                      {submission.status === 'submitted' ? (
                        <div className="space-y-4">
                          {/* Rubric Selection */}
                          <div>
                            <Label className="text-sm font-medium">Select Rubric</Label>
                            <Select>
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Choose rubric" />
                              </SelectTrigger>
                              <SelectContent>
                                {mockRubrics.map((rubric) => (
                                  <SelectItem key={rubric.id} value={rubric.id}>
                                    {rubric.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Grade Input */}
                          <div>
                            <Label className="text-sm font-medium">Grade (0-{submission.maxPoints})</Label>
                            <Input
                              type="number"
                              min="0"
                              max={submission.maxPoints}
                              placeholder="Enter grade"
                              className="mt-1"
                            />
                          </div>

                          {/* Feedback */}
                          <div>
                            <Label className="text-sm font-medium">Feedback</Label>
                            <Textarea
                              placeholder="Provide detailed feedback to the student..."
                              rows={4}
                              className="mt-1"
                            />
                          </div>

                          {/* Action Buttons */}
                          <div className="space-y-2">
                            <Button className="w-full">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Submit Grade
                            </Button>
                            <Button variant="outline" className="w-full">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Request Revision
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {/* Grade Display */}
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className={`text-3xl font-bold ${getGradeColor(submission.grade || 0, submission.maxPoints)}`}>
                              {submission.grade}/{submission.maxPoints}
                            </div>
                            <div className="text-sm text-gray-500">
                              {Math.round(((submission.grade || 0) / submission.maxPoints) * 100)}%
                            </div>
                          </div>

                          {/* Feedback Display */}
                          {submission.feedback && (
                            <div>
                              <h5 className="font-medium text-gray-900 mb-2">Feedback</h5>
                              <div className="bg-blue-50 p-3 rounded-md">
                                <p className="text-sm text-gray-700">{submission.feedback}</p>
                              </div>
                            </div>
                          )}

                          {/* Edit Grade */}
                          <Button variant="outline" className="w-full">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Grade
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submission Details */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span>Submitted: {new Date(submission.submittedAt).toLocaleDateString()}</span>
                        <span>Max Points: {submission.maxPoints}</span>
                        {submission.isLate && (
                          <span className="text-red-600">
                            Late by {submission.daysLate} day{submission.daysLate !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message Student
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Award className="w-4 h-4 mr-1" />
                          View Rubric
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSubmissions.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== 'all' || courseFilter !== 'all'
                    ? 'Try adjusting your search or filters'
                    : 'All submissions have been graded! 🎉'
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
