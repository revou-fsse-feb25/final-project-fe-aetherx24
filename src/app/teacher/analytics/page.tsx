"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  Award,
  Target,
  Activity,
  Eye,
  Download,
  Filter,
  Star,
  CheckCircle,
  AlertCircle,
  XCircle,
  Users,
  Clock
} from "lucide-react";
import { Navbar } from "@/components/Navbar";

interface Student {
  id: string;
  name: string;
  email: string;
  courseId: string;
  courseTitle: string;
  enrollmentDate: string;
  lastActivity: string;
  progress: number;
  averageGrade: number;
  assignmentsCompleted: number;
  totalAssignments: number;
  attendance: number;
  status: 'active' | 'at-risk' | 'excellent' | 'needs-help';
}

interface CourseAnalytics {
  id: string;
  title: string;
  studentCount: number;
  averageGrade: number;
  completionRate: number;
  averageTimeToComplete: number;
  topPerformers: number;
  atRiskStudents: number;
}

export default function AnalyticsPage() {
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [timeRange, setTimeRange] = useState('30days');

  const mockStudents: Student[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      courseId: 'cs101',
      courseTitle: 'Introduction to Computer Science',
      enrollmentDate: '2024-01-01',
      lastActivity: '2024-01-20',
      progress: 85,
      averageGrade: 88,
      assignmentsCompleted: 8,
      totalAssignments: 10,
      attendance: 95,
      status: 'excellent'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      courseId: 'cs101',
      courseTitle: 'Introduction to Computer Science',
      enrollmentDate: '2024-01-02',
      lastActivity: '2024-01-19',
      progress: 72,
      averageGrade: 75,
      assignmentsCompleted: 7,
      totalAssignments: 10,
      attendance: 88,
      status: 'active'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      courseId: 'cs101',
      courseTitle: 'Introduction to Computer Science',
      enrollmentDate: '2024-01-03',
      lastActivity: '2024-01-18',
      progress: 45,
      averageGrade: 62,
      assignmentsCompleted: 4,
      totalAssignments: 10,
      attendance: 65,
      status: 'at-risk'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      courseId: 'wd101',
      courseTitle: 'Web Development Fundamentals',
      enrollmentDate: '2024-01-01',
      lastActivity: '2024-01-20',
      progress: 92,
      averageGrade: 94,
      assignmentsCompleted: 9,
      totalAssignments: 10,
      attendance: 98,
      status: 'excellent'
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david.brown@email.com',
      courseId: 'wd101',
      courseTitle: 'Web Development Fundamentals',
      enrollmentDate: '2024-01-05',
      lastActivity: '2024-01-17',
      progress: 68,
      averageGrade: 71,
      assignmentsCompleted: 6,
      totalAssignments: 10,
      attendance: 82,
      status: 'needs-help'
    }
  ];

  const mockCourseAnalytics: CourseAnalytics[] = [
    {
      id: 'cs101',
      title: 'Introduction to Computer Science',
      studentCount: 45,
      averageGrade: 78,
      completionRate: 82,
      averageTimeToComplete: 11.5,
      topPerformers: 12,
      atRiskStudents: 8
    },
    {
      id: 'wd101',
      title: 'Web Development Fundamentals',
      studentCount: 32,
      averageGrade: 81,
      completionRate: 88,
      averageTimeToComplete: 9.2,
      topPerformers: 8,
      atRiskStudents: 3
    }
  ];

  const filteredStudents = selectedCourse === 'all' 
    ? mockStudents 
    : mockStudents.filter(s => s.courseId === selectedCourse);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'needs-help': return 'bg-yellow-100 text-yellow-800';
      case 'at-risk': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <Star className="w-4 h-4" />;
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'needs-help': return <AlertCircle className="w-4 h-4" />;
      case 'at-risk': return <XCircle className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'text-green-600';
    if (progress >= 80) return 'text-blue-600';
    if (progress >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <BarChart3 className="w-8 h-8 text-[#2B2E4A]" />
                  <h1 className="text-3xl font-bold text-gray-900">Student Analytics</h1>
                </div>
                <p className="text-gray-600">Track student performance and course effectiveness</p>
              </div>
              <div className="flex items-center space-x-3">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 90 days</SelectItem>
                    <SelectItem value="semester">This semester</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </div>

          {/* Course Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStudents.length}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Grade</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(mockStudents.reduce((acc, s) => acc + s.averageGrade, 0) / mockStudents.length)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+5%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(mockStudents.reduce((acc, s) => acc + s.progress, 0) / mockStudents.length)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">At Risk</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockStudents.filter(s => s.status === 'at-risk').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-600">-2</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Course Performance Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Course Performance Overview</CardTitle>
                <CardDescription>Key metrics across all courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCourseAnalytics.map((course) => (
                    <div key={course.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{course.title}</h4>
                        <Badge variant="outline">{course.studentCount} students</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Avg Grade:</span>
                          <span className="ml-2 font-medium">{course.averageGrade}%</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Completion:</span>
                          <span className="ml-2 font-medium">{course.completionRate}%</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Top Performers:</span>
                          <span className="ml-2 font-medium">{course.topPerformers}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">At Risk:</span>
                          <span className="ml-2 font-medium text-red-600">{course.atRiskStudents}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Distribution</CardTitle>
                <CardDescription>Student performance breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Excellent (90%+)</span>
                    </div>
                    <span className="font-medium">
                      {mockStudents.filter(s => s.averageGrade >= 90).length} students
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Good (80-89%)</span>
                    </div>
                    <span className="font-medium">
                      {mockStudents.filter(s => s.averageGrade >= 80 && s.averageGrade < 90).length} students
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Average (70-79%)</span>
                    </div>
                    <span className="font-medium">
                      {mockStudents.filter(s => s.averageGrade >= 70 && s.averageGrade < 80).length} students
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Below Average (&lt;70%)</span>
                    </div>
                    <span className="font-medium">
                      {mockStudents.filter(s => s.averageGrade < 70).length} students
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium">Course:</span>
                </div>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="cs101">Introduction to Computer Science</SelectItem>
                    <SelectItem value="wd101">Web Development Fundamentals</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Student Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Student Performance Details</CardTitle>
              <CardDescription>
                Individual student progress and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Student</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Course</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Progress</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Grade</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Assignments</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Attendance</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Last Activity</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm text-gray-900">{student.courseTitle}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${getProgressColor(student.progress)}`}
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className={`text-sm font-medium ${getProgressColor(student.progress)}`}>
                              {student.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`font-medium ${getGradeColor(student.averageGrade)}`}>
                            {student.averageGrade}%
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            {student.assignmentsCompleted}/{student.totalAssignments}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-sm font-medium ${
                            student.attendance >= 90 ? 'text-green-600' :
                            student.attendance >= 80 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {student.attendance}%
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(student.status)}>
                            {getStatusIcon(student.status)}
                            <span className="ml-1 capitalize">{student.status}</span>
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm text-gray-500">
                            {new Date(student.lastActivity).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Activity className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Insights and Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>Automated analysis and observations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Performance Improvement</h4>
                      <p className="text-sm text-gray-600">
                        Overall class average has improved by 5% this month. Students are showing better engagement with assignments.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">At-Risk Students</h4>
                      <p className="text-sm text-gray-600">
                        3 students in Web Development are falling behind. Consider sending personalized support messages.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Engagement Patterns</h4>
                      <p className="text-sm text-gray-600">
                        Most student activity occurs between 2-6 PM. Consider scheduling office hours during these times.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>Suggested actions to improve outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-gray-900">Send Encouragement</h4>
                    <p className="text-sm text-gray-600">
                      Message the 8 students with excellent performance to maintain momentum.
                    </p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-medium text-gray-900">Schedule Check-ins</h4>
                    <p className="text-sm text-gray-600">
                      Reach out to 3 at-risk students for one-on-one support sessions.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium text-gray-900">Course Optimization</h4>
                    <p className="text-sm text-gray-600">
                      Consider adding more interactive elements to improve engagement in Computer Science course.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
