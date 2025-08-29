"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Plus,
  Edit,
  Eye,
  Users,
  Clock,
  TrendingUp,
  BarChart3,
  Search,
  Filter,
  MoreHorizontal,
  Play,
  Pause,
  Archive
} from "lucide-react";
import { Navbar } from "@/components/Navbar";

interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: 'draft' | 'published' | 'archived';
  studentCount: number;
  maxStudents: number;
  duration: string;
  category: string;
  level: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  completionRate: number;
  averageGrade: number;
}

export default function ManageCoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all');

  const mockCourses: Course[] = [
    {
      id: '1',
      title: 'Introduction to Computer Science',
      subtitle: 'CS101',
      description: 'Learn the fundamentals of computer science and programming',
      status: 'published',
      studentCount: 45,
      maxStudents: 50,
      duration: '12 weeks',
      category: 'Programming',
      level: 'Beginner',
      price: 99.99,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      completionRate: 78,
      averageGrade: 85
    },
    {
      id: '2',
      title: 'Web Development Fundamentals',
      subtitle: 'WD101',
      description: 'Master HTML, CSS, and JavaScript basics',
      status: 'published',
      studentCount: 32,
      maxStudents: 40,
      duration: '10 weeks',
      category: 'Programming',
      level: 'Beginner',
      price: 79.99,
      createdAt: '2024-01-05',
      updatedAt: '2024-01-18',
      completionRate: 82,
      averageGrade: 88
    },
    {
      id: '3',
      title: 'Advanced JavaScript Concepts',
      subtitle: 'JS201',
      description: 'Deep dive into modern JavaScript and ES6+ features',
      status: 'draft',
      studentCount: 0,
      maxStudents: 30,
      duration: '8 weeks',
      category: 'Programming',
      level: 'Intermediate',
      price: 129.99,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-20',
      completionRate: 0,
      averageGrade: 0
    },
    {
      id: '4',
      title: 'Data Structures and Algorithms',
      subtitle: 'DSA301',
      description: 'Master fundamental data structures and algorithmic thinking',
      status: 'archived',
      studentCount: 28,
      maxStudents: 35,
      duration: '14 weeks',
      category: 'Programming',
      level: 'Advanced',
      price: 149.99,
      createdAt: '2023-09-01',
      updatedAt: '2023-12-15',
      completionRate: 65,
      averageGrade: 79
    }
  ];

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <Play className="w-4 h-4" />;
      case 'draft': return <Pause className="w-4 h-4" />;
      case 'archived': return <Archive className="w-4 h-4" />;
      default: return <Pause className="w-4 h-4" />;
    }
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
                  <BookOpen className="w-8 h-8 text-[#2B2E4A]" />
                  <h1 className="text-3xl font-bold text-gray-900">Manage Courses</h1>
                </div>
                <p className="text-gray-600">View, edit, and manage your course offerings</p>
              </div>
              <Button className="bg-[#2B2E4A] hover:bg-[#1a1d2f]">
                <Plus className="w-4 h-4 mr-2" />
                Create New Course
              </Button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockCourses.length}</div>
                <p className="text-xs text-muted-foreground">All courses</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Published</CardTitle>
                <Play className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockCourses.filter(c => c.status === 'published').length}</div>
                <p className="text-xs text-muted-foreground">Active courses</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockCourses.reduce((acc, c) => acc + c.studentCount, 0)}</div>
                <p className="text-xs text-muted-foreground">Enrolled students</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(mockCourses.filter(c => c.status === 'published').reduce((acc, c) => acc + c.completionRate, 0) / 
                   mockCourses.filter(c => c.status === 'published').length)}%
                </div>
                <p className="text-xs text-muted-foreground">Course completion rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search courses by title or subtitle..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as 'all' | 'draft' | 'published' | 'archived')}
                    className="border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getStatusColor(course.status)}>
                          {getStatusIcon(course.status)}
                          <span className="ml-1 capitalize">{course.status}</span>
                        </Badge>
                        <Badge variant="outline">{course.category}</Badge>
                        <Badge variant="outline">{course.level}</Badge>
                      </div>
                      <CardTitle className="text-lg mb-1">{course.title}</CardTitle>
                      <CardDescription className="text-sm font-medium text-gray-600">
                        {course.subtitle}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{course.studentCount}/{course.maxStudents} students</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-gray-400" />
                      <span>{course.completionRate}% completion</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <BarChart3 className="w-4 h-4 text-gray-400" />
                      <span>{course.averageGrade}% avg grade</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-[#2B2E4A]">
                      ${course.price}
                    </div>
                    <div className="flex space-x-2">
                      {course.status === 'draft' && (
                        <Button size="sm" variant="outline">
                          <Play className="w-4 h-4 mr-1" />
                          Publish
                        </Button>
                      )}
                      {course.status === 'published' && (
                        <Button size="sm" variant="outline">
                          <Pause className="w-4 h-4 mr-1" />
                          Pause
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Analytics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filters'
                    : 'Get started by creating your first course'
                  }
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Course
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
