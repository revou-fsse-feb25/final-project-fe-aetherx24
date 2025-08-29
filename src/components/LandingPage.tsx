"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Award, CheckCircle, Facebook, Twitter, Instagram, Linkedin, Search, Sparkles, Star, BarChart3, Play } from "lucide-react";
import { LandingNavbar } from "@/components/LandingNavbar";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5F3E7] text-[#2B2E4A]">
      <LandingNavbar />

      {/* Hero Section - Two Column Layout */}
      <section className="px-6 py-20 bg-gradient-to-br from-[#F5F3E7] via-[#E8E4D4] to-[#C9C3D9] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-8 h-8 bg-gradient-to-r from-[#6EEBFF] to-[#C9C3D9] rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-gradient-to-r from-[#2B2E4A] to-[#6EEBFF] rounded-full opacity-40 animate-ping"></div>
        <div className="absolute bottom-20 left-1/4 w-4 h-4 bg-[#6EEBFF] rounded-full opacity-50"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Hero Content */}
            <div className="relative z-10">
              {/* Tagline */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-gradient-to-r from-[#6EEBFF] to-[#C9C3D9] rounded-full"></div>
                <span className="text-sm font-medium text-[#6EEBFF] bg-white px-3 py-1 rounded-full shadow-sm">
                  Grow Your Future With Us
                </span>
                <Sparkles className="w-4 h-4 text-[#6EEBFF]" />
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-[#2B2E4A]">Your Digital Portal to</span>{" "}
                <span className="relative">
                  <span className="text-[#2B2E4A]">Excellence</span>
                  <div className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-[#6EEBFF] to-[#C9C3D9] rounded-full"></div>
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg text-[#2B2E4A] mb-8 max-w-lg leading-relaxed">
                Luminark provides a specialized environment tailored to the needs of modern learners, 
                offering comprehensive digital and technology education.
              </p>

              {/* Search Bar */}
              <div className="relative mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for courses..."
                    className="w-full px-6 py-4 pr-16 bg-white rounded-xl border-2 border-[#C9C3D9] focus:border-[#6EEBFF] focus:outline-none shadow-lg text-[#2B2E4A] placeholder-[#C9C3D9]"
                  />
                  <Button className="absolute right-2 top-2 bg-gradient-to-r from-[#2B2E4A] to-[#6EEBFF] hover:from-[#1A1D2E] hover:to-[#5DD8E8] text-white p-3 rounded-lg">
                    <Search className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Platform Statistics */}
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#6EEBFF] to-[#C9C3D9] rounded-full"></div>
                  <span className="text-sm font-semibold text-[#2B2E4A]">14k+ Learners</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#C9C3D9] to-[#6EEBFF] rounded-full"></div>
                  <span className="text-sm font-semibold text-[#2B2E4A]">1,05k+ Courses</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#6EEBFF] to-[#C9C3D9] rounded-full"></div>
                  <span className="text-sm font-semibold text-[#2B2E4A]">59k+ Graduates</span>
                </div>
              </div>
            </div>

            {/* Right Column - Featured Course Card */}
            <div className="relative">
              {/* Award Badge */}
              <div className="absolute -top-4 -right-4 z-20">
                <div className="bg-white rounded-full p-3 shadow-lg border-2 border-[#C9C3D9]">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#2B2E4A] to-[#6EEBFF] rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white px-3 py-1 rounded-full text-xs font-medium text-[#2B2E4A] border border-[#C9C3D9] shadow-sm">
                  Best E-Learning Platform
                </div>
              </div>

              {/* Main Course Card */}
              <div className="relative">
                {/* Background Cards for Layered Effect */}
                <div className="absolute -top-2 -right-2 w-full h-full bg-gradient-to-br from-[#C9C3D9] to-[#6EEBFF] rounded-2xl transform rotate-3"></div>
                <div className="absolute -top-1 -right-1 w-full h-full bg-gradient-to-br from-[#E8E4D4] to-[#C9C3D9] rounded-2xl transform rotate-2"></div>
                
                {/* Main Card */}
                <Card className="relative bg-white border-2 border-[#C9C3D9] rounded-2xl shadow-2xl overflow-hidden transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  <CardContent className="p-0">
                    {/* Course Image */}
                    <div className="relative h-48 bg-gradient-to-br from-[#2B2E4A] to-[#6EEBFF] flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                        <Play className="w-10 h-10 text-white" />
                      </div>
                      {/* Decorative Elements */}
                      <div className="absolute top-4 left-4 w-3 h-3 bg-white/30 rounded-full"></div>
                      <div className="absolute bottom-4 right-4 w-2 h-2 bg-white/20 rounded-full"></div>
                    </div>

                    {/* Course Content */}
                    <div className="p-6">
                      {/* Category */}
                      <div className="inline-block bg-gradient-to-r from-[#6EEBFF] to-[#C9C3D9] text-[#2B2E4A] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                        Development
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-[#2B2E4A] mb-3 leading-tight">
                        JavaScript Masterclass Course
                      </h3>

                      {/* Metrics */}
                      <div className="flex items-center space-x-4 mb-4 text-sm text-[#2B2E4A]">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-[#6EEBFF]" />
                          <span>550+ Students</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-[#6EEBFF] fill-current" />
                          <span>4.8</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BarChart3 className="w-4 h-4 text-[#6EEBFF]" />
                          <span>Intermediate</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-[#2B2E4A] mb-4 leading-relaxed">
                        Master JavaScript fundamentals and advanced concepts with hands-on projects and real-world applications.
                      </p>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-[#2B2E4A]">$39</span>
                        <Button className="bg-gradient-to-r from-[#2B2E4A] to-[#6EEBFF] hover:from-[#1A1D2E] hover:to-[#5DD8E8] text-white px-4 py-2 rounded-lg">
                          Enroll Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#2B2E4A]">Key Features</h2>
          <p className="text-xl text-[#2B2E4A] mb-16 max-w-2xl mx-auto">
            Learning platform designed to provide the best learning experience.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-[#C9C3D9] shadow-lg hover:shadow-xl transition-shadow text-center p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-r from-[#2B2E4A] to-[#6EEBFF] rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#2B2E4A]">Structured Curriculum</h3>
                <p className="text-[#2B2E4A]">
                  Learning materials organized systematically and easy to understand
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#C9C3D9] shadow-lg hover:shadow-xl transition-shadow text-center p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-r from-[#2B2E4A] to-[#6EEBFF] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#2B2E4A]">Experienced Mentors</h3>
                <p className="text-[#2B2E4A]">
                  Learn directly from experienced industry practitioners
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#C9C3D9] shadow-lg hover:shadow-xl transition-shadow text-center p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-r from-[#2B2E4A] to-[#6EEBFF] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#2B2E4A]">Official Certificate</h3>
                <p className="text-[#2B2E4A]">
                  Get industry-recognized certificates after completing programs
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-20 bg-[#F5F3E7]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* About Text */}
            <div>
              <h2 className="text-4xl font-bold mb-6 text-[#2B2E4A]">About Luminark</h2>
              <p className="text-lg text-[#2B2E4A] mb-6">
                Luminark is an online learning platform specifically designed to develop digital and technology skills. 
                We provide comprehensive and up-to-date curriculum aligned with industry needs.
              </p>
              <p className="text-lg text-[#2B2E4A] mb-8">
                With interactive and practical learning methods, we help you master cutting-edge technology and prepare 
                for careers in the digital era.
              </p>
             
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#6EEBFF]" />
                  <span className="text-[#2B2E4A]">Flexible learning according to your schedule</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#6EEBFF]" />
                  <span className="text-[#2B2E4A]">Practical projects and real case studies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#6EEBFF]" />
                  <span className="text-[#2B2E4A]">Active learning community</span>
                </div>
              </div>
            </div>

            {/* About Visual */}
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-[#2B2E4A] to-[#6EEBFF] rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
                  <p className="text-sm opacity-90">Engage with dynamic content and real-world projects</p>
                </div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#C9C3D9] rounded-full opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#6EEBFF] rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 bg-[#2B2E4A] border-t border-[#C9C3D9]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#6EEBFF] to-[#C9C3D9] rounded-lg flex items-center justify-center">
                  <span className="text-[#2B2E4A] font-bold text-sm">L</span>
                </div>
                <span className="text-lg font-bold text-white">Luminark</span>
              </div>
              <p className="text-[#C9C3D9] mb-4">
                Digital learning platform for developing technology skills.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-[#C9C3D9] hover:text-[#6EEBFF] p-2">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-[#C9C3D9] hover:text-[#6EEBFF] p-2">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-[#C9C3D9] hover:text-[#6EEBFF] p-2">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-[#C9C3D9] hover:text-[#6EEBFF] p-2">
                  <Linkedin className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Courses */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Courses</h4>
              <ul className="space-y-2 text-[#C9C3D9]">
                <li><a href="#" className="hover:text-[#6EEBFF] transition-colors">Introduction to Computer Science</a></li>
                <li><a href="#" className="hover:text-[#6EEBFF] transition-colors">Web Development Fundamentals</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-[#C9C3D9]">
                <li><a href="#" className="hover:text-[#6EEBFF] transition-colors">Help Center</a></li>
                <li><a href="/contact" className="hover:text-[#6EEBFF] transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-[#6EEBFF] transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-[#6EEBFF] transition-colors">Community</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-[#C9C3D9]">
                <li><a href="#" className="hover:text-[#6EEBFF] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#6EEBFF] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[#6EEBFF] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#6EEBFF] transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 border-t border-[#C9C3D9]">
            <p className="text-[#C9C3D9]">© 2025 Luminark by Muhammad Iqbal Maulana. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
