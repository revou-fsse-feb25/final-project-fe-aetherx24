"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Plus,
  Trash2,
  Save,
  Eye,
  Upload,
  FileText,
  Video,
  CheckCircle
} from "lucide-react";
import { Navbar } from "@/components/Navbar";

interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'document' | 'quiz' | 'text';
  duration: number;
  content: string;
  order: number;
}

export default function CreateCoursePage() {
  const [courseData, setCourseData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: '',
    level: '',
    duration: '',
    maxStudents: '',
    price: '',
    status: 'draft'
  });

  const [modules, setModules] = useState<Module[]>([
    {
      id: '1',
      title: 'Introduction to the Course',
      description: 'Get started with the fundamentals',
      order: 1,
      lessons: [
        {
          id: '1',
          title: 'Welcome and Course Overview',
          type: 'video',
          duration: 15,
          content: 'Introduction video explaining course structure and objectives',
          order: 1
        },
        {
          id: '2',
          title: 'Course Syllabus',
          type: 'document',
          duration: 10,
          content: 'Detailed breakdown of all course modules and lessons',
          order: 2
        }
      ]
    }
  ]);

  const [activeTab, setActiveTab] = useState<'details' | 'curriculum' | 'preview'>('details');

  const addModule = () => {
    const newModule: Module = {
      id: Date.now().toString(),
      title: `Module ${modules.length + 1}`,
      description: 'Module description',
      order: modules.length + 1,
      lessons: []
    };
    setModules([...modules, newModule]);
  };

  const addLesson = (moduleId: string) => {
    const foundModule = modules.find(m => m.id === moduleId);
    if (foundModule) {
      const newLesson: Lesson = {
        id: Date.now().toString(),
        title: `Lesson ${foundModule.lessons.length + 1}`,
        type: 'text',
        duration: 30,
        content: 'Lesson content description',
        order: foundModule.lessons.length + 1
      };
      
      setModules(modules.map(m => 
        m.id === moduleId 
          ? { ...m, lessons: [...m.lessons, newLesson] }
          : m
      ));
    }
  };

  const removeModule = (moduleId: string) => {
    setModules(modules.filter(m => m.id !== moduleId));
  };

  const removeLesson = (moduleId: string, lessonId: string) => {
    setModules(modules.map(m => 
      m.id === moduleId 
        ? { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) }
        : m
    ));
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      case 'quiz': return <CheckCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <BookOpen className="w-8 h-8 text-[#2B2E4A]" />
              <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
            </div>
            <p className="text-gray-600">Build and structure your course content for students</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-white p-1 rounded-lg border">
            <button
              onClick={() => setActiveTab('details')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'details'
                  ? 'bg-[#2B2E4A] text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Course Details
            </button>
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'curriculum'
                  ? 'bg-[#2B2E4A] text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Curriculum Builder
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'preview'
                  ? 'bg-[#2B2E4A] text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Preview & Publish
            </button>
          </div>

          {/* Course Details Tab */}
          {activeTab === 'details' && (
            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
                <CardDescription>
                  Set the basic details and metadata for your course
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="title">Course Title *</Label>
                    <Input
                      id="title"
                      value={courseData.title}
                      onChange={(e) => setCourseData({...courseData, title: e.target.value})}
                      placeholder="Enter course title"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subtitle">Course Subtitle</Label>
                    <Input
                      id="subtitle"
                      value={courseData.subtitle}
                      onChange={(e) => setCourseData({...courseData, subtitle: e.target.value})}
                      placeholder="Enter course subtitle"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Course Description *</Label>
                  <Textarea
                    id="description"
                    value={courseData.description}
                    onChange={(e) => setCourseData({...courseData, description: e.target.value})}
                    placeholder="Describe what students will learn in this course"
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={courseData.category} onValueChange={(value) => setCourseData({...courseData, category: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="programming">Programming</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="data-science">Data Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="level">Difficulty Level</Label>
                    <Select value={courseData.level} onValueChange={(value) => setCourseData({...courseData, level: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={courseData.status} onValueChange={(value) => setCourseData({...courseData, status: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="duration">Duration (weeks)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={courseData.duration}
                      onChange={(e) => setCourseData({...courseData, duration: e.target.value})}
                      placeholder="12"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxStudents">Max Students</Label>
                    <Input
                      id="maxStudents"
                      type="number"
                      value={courseData.maxStudents}
                      onChange={(e) => setCourseData({...courseData, maxStudents: e.target.value})}
                      placeholder="50"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={courseData.price}
                      onChange={(e) => setCourseData({...courseData, price: e.target.value})}
                      placeholder="99.99"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline">Save as Draft</Button>
                  <Button onClick={() => setActiveTab('curriculum')}>
                    Next: Build Curriculum
                    <Plus className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Curriculum Builder Tab */}
          {activeTab === 'curriculum' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Course Curriculum</h2>
                <Button onClick={addModule}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Module
                </Button>
              </div>

              {modules.map((module, moduleIndex) => (
                <Card key={module.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge variant="secondary">Module {module.order}</Badge>
                        <Input
                          value={module.title}
                          onChange={(e) => {
                            const updatedModules = [...modules];
                            updatedModules[moduleIndex].title = e.target.value;
                            setModules(updatedModules);
                          }}
                          className="w-64 font-medium"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addLesson(module.id)}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Lesson
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeModule(module.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      value={module.description}
                      onChange={(e) => {
                        const updatedModules = [...modules];
                        updatedModules[moduleIndex].description = e.target.value;
                        setModules(updatedModules);
                      }}
                      placeholder="Module description"
                      className="mt-2"
                    />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div key={lesson.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3 flex-1">
                            <Badge variant="outline">{lesson.order}</Badge>
                            <div className="flex items-center space-x-2">
                              {getLessonIcon(lesson.type)}
                              <Input
                                value={lesson.title}
                                onChange={(e) => {
                                  const updatedModules = [...modules];
                                  updatedModules[moduleIndex].lessons[lessonIndex].title = e.target.value;
                                  setModules(updatedModules);
                                }}
                                className="w-64"
                              />
                            </div>
                            <Select
                              value={lesson.type}
                              onValueChange={(value) => {
                                const updatedModules = [...modules];
                                updatedModules[moduleIndex].lessons[lessonIndex].type = value as 'video' | 'document' | 'quiz' | 'text';
                                setModules(updatedModules);
                              }}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="video">Video</SelectItem>
                                <SelectItem value="document">Document</SelectItem>
                                <SelectItem value="quiz">Quiz</SelectItem>
                                <SelectItem value="text">Text</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              type="number"
                              value={lesson.duration}
                              onChange={(e) => {
                                const updatedModules = [...modules];
                                updatedModules[moduleIndex].lessons[lessonIndex].duration = parseInt(e.target.value);
                                setModules(updatedModules);
                              }}
                              placeholder="30"
                              className="w-20"
                            />
                            <span className="text-sm text-gray-500">min</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeLesson(module.id, lesson.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      {module.lessons.length === 0 && (
                        <div className="text-center py-6 text-gray-500">
                          No lessons added yet. Click &ldquo;Add Lesson&rdquo; to get started.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setActiveTab('details')}>
                  Back to Details
                </Button>
                <Button onClick={() => setActiveTab('preview')}>
                  Next: Preview & Publish
                  <Eye className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Preview & Publish Tab */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Preview</CardTitle>
                  <CardDescription>
                    Review your course before publishing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Course Info */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Course Information</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium">Title:</span> {courseData.title || 'Untitled Course'}
                        </div>
                        <div>
                          <span className="font-medium">Subtitle:</span> {courseData.subtitle || 'No subtitle'}
                        </div>
                        <div>
                          <span className="font-medium">Category:</span> {courseData.category || 'Not specified'}
                        </div>
                        <div>
                          <span className="font-medium">Level:</span> {courseData.level || 'Not specified'}
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span> {courseData.duration || '0'} weeks
                        </div>
                        <div>
                          <span className="font-medium">Max Students:</span> {courseData.maxStudents || 'Unlimited'}
                        </div>
                        <div>
                          <span className="font-medium">Price:</span> ${courseData.price || '0'}
                        </div>
                      </div>
                    </div>

                    {/* Curriculum Summary */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Curriculum Summary</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium">Total Modules:</span> {modules.length}
                        </div>
                        <div>
                          <span className="font-medium">Total Lessons:</span> {modules.reduce((acc, m) => acc + m.lessons.length, 0)}
                        </div>
                        <div>
                          <span className="font-medium">Estimated Duration:</span> {modules.reduce((acc, m) => acc + m.lessons.reduce((sum, l) => sum + l.duration, 0), 0)} minutes
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Course Structure</h3>
                    <div className="space-y-3">
                      {modules.map((module) => (
                        <div key={module.id} className="border rounded-lg p-3">
                          <div className="font-medium text-[#2B2E4A] mb-2">
                            {module.title}
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            {module.description}
                          </div>
                          <div className="space-y-1">
                            {module.lessons.map((lesson) => (
                              <div key={lesson.id} className="flex items-center space-x-2 text-sm">
                                <span className="text-gray-400">•</span>
                                <span>{getLessonIcon(lesson.type)}</span>
                                <span>{lesson.title}</span>
                                <span className="text-gray-500">({lesson.duration} min)</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setActiveTab('curriculum')}>
                  Back to Curriculum
                </Button>
                <div className="space-x-3">
                  <Button variant="outline">
                    <Save className="w-4 h-4 mr-2" />
                    Save as Draft
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Publish Course
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
