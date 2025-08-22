"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Award, CheckCircle, Sun, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#1A1D29] text-white">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-xl font-bold">Revou LMS</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
            <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
            <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800" asChild>
              <a href="/login">Login</a>
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-yellow-500 hover:from-purple-600 hover:to-yellow-600" asChild>
              <a href="/login">Sign Up</a>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Sun className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Digital Learning</span>{" "}
            <span className="bg-gradient-to-r from-purple-500 to-yellow-500 bg-clip-text text-transparent">
              Platform
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Develop your digital and technology skills with our comprehensive and interactive online learning platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-yellow-500 hover:from-purple-600 hover:to-yellow-600 text-lg px-8 py-3" asChild>
              <a href="/login">Start Learning</a>
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 text-lg px-8 py-3">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="px-6 py-20 bg-gray-900/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Key Features</h2>
          <p className="text-xl text-gray-300 mb-16 max-w-2xl mx-auto">
            Learning platform designed to provide the best learning experience.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-800/50 border-gray-700 text-center p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Structured Curriculum</h3>
                <p className="text-gray-300">
                  Learning materials organized systematically and easy to understand
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 text-center p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Experienced Mentors</h3>
                <p className="text-gray-300">
                  Learn directly from experienced industry practitioners
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 text-center p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Official Certificate</h3>
                <p className="text-gray-300">
                  Get industry-recognized certificates after completing programs
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* About Text */}
            <div>
              <h2 className="text-4xl font-bold mb-6">About Revou LMS</h2>
              <p className="text-lg text-gray-300 mb-6">
                Revou LMS is an online learning platform specifically designed to develop digital and technology skills. 
                We provide comprehensive and up-to-date curriculum aligned with industry needs.
              </p>
              <p className="text-lg text-gray-300 mb-8">
                With interactive and practical learning methods, we help you master cutting-edge technology and prepare 
                for careers in the digital era.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Flexible learning according to your schedule</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Practical projects and real case studies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Active learning community</span>
                </div>
              </div>
            </div>

            {/* Statistics Card */}
            <Card className="bg-gray-800/50 border-gray-700 p-8">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-8 text-center">Platform Statistics</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Students</span>
                    <span className="text-yellow-400 font-bold text-xl">10,000+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Available Courses</span>
                    <span className="text-yellow-400 font-bold text-xl">50+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Expert Mentors</span>
                    <span className="text-yellow-400 font-bold text-xl">25+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Satisfaction Rate</span>
                    <span className="text-yellow-400 font-bold text-xl">98%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 bg-gray-900/50 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="text-lg font-bold">Revou LMS</span>
              </div>
              <p className="text-gray-300 mb-4">
                Digital learning platform for developing technology skills.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Linkedin className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Courses */}
            <div>
              <h4 className="font-semibold mb-4">Courses</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Software Engineering</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Full Stack Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Digital Marketing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Data Analytics</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-gray-400">© 2024 Revou LMS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
