"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Award, CheckCircle, Sun, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function LandingPage() {
  return (
         <div className="min-h-screen bg-[#F5F3E7] text-[#2B2E4A]">
       {/* Header */}
       <header className="px-6 py-4 border-b border-[#C9C3D9] bg-white shadow-sm">
         <div className="max-w-7xl mx-auto flex items-center justify-between">
           {/* Logo */}
           <div className="flex items-center space-x-3">
             <div className="w-10 h-10 bg-gradient-to-r from-[#2B2E4A] to-[#6EEBFF] rounded-lg flex items-center justify-center">
               <span className="text-white font-bold text-xl">L</span>
             </div>
                          <span className="text-xl font-bold text-[#2B2E4A]">Luminark</span>
           </div>
 
           {/* Navigation */}
           <nav className="hidden md:flex items-center space-x-8">
             <a href="#features" className="hover:text-[#6EEBFF] transition-colors text-[#2B2E4A]">Features</a>
             <a href="#about" className="hover:text-[#6EEBFF] transition-colors text-[#2B2E4A]">About</a>
             <a href="#contact" className="hover:text-[#6EEBFF] transition-colors text-[#2B2E4A]">Contact</a>
           </nav>
 
           {/* Auth Buttons */}
           <div className="flex items-center space-x-4">
             <Button variant="outline" className="border-[#2B2E4A] text-[#2B2E4A] hover:bg-[#C9C3D9]" asChild>
               <a href="/login">Login</a>
             </Button>
             <Button className="bg-gradient-to-r from-[#2B2E4A] to-[#6EEBFF] hover:from-[#1A1D2E] hover:to-[#5DD8E8] text-white" asChild>
               <a href="/login">Sign Up</a>
             </Button>
             <Button variant="ghost" size="sm" className="text-[#2B2E4A] hover:text-[#6EEBFF]">
               <Sun className="w-4 h-4" />
             </Button>
           </div>
         </div>
       </header>

             {/* Hero Section */}
       <section className="px-6 py-20 text-center bg-gradient-to-br from-[#F5F3E7] to-[#C9C3D9]">
         <div className="max-w-4xl mx-auto">
           <h1 className="text-5xl md:text-6xl font-bold mb-6">
             <span className="text-[#2B2E4A]">Digital Learning</span>{" "}
             <span className="bg-gradient-to-r from-[#2B2E4A] to-[#6EEBFF] bg-clip-text text-transparent">
               Platform
             </span>
           </h1>
           <p className="text-xl text-[#2B2E4A] mb-8 max-w-2xl mx-auto">
             Develop your digital and technology skills with our comprehensive and interactive online learning platform.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button size="lg" className="bg-gradient-to-r from-[#2B2E4A] to-[#6EEBFF] hover:from-[#1A1D2E] hover:to-[#5DD8E8] text-white text-lg px-8 py-3" asChild>
               <a href="/login">Start Learning</a>
             </Button>
             <Button size="lg" variant="outline" className="border-[#2B2E4A] text-[#2B2E4A] hover:bg-[#C9C3D9] text-lg px-8 py-3">
               Learn More
             </Button>
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
 
             {/* Statistics Card */}
             <Card className="bg-white border-[#C9C3D9] shadow-lg p-8">
               <CardContent className="p-0">
                 <h3 className="text-2xl font-bold mb-8 text-center text-[#2B2E4A]">Platform Statistics</h3>
                 <div className="space-y-6">
                   <div className="flex justify-between items-center">
                     <span className="text-[#2B2E4A]">Total Students</span>
                     <span className="text-[#6EEBFF] font-bold text-xl">10,000+</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-[#2B2E4A]">Available Courses</span>
                     <span className="text-[#6EEBFF] font-bold text-xl">50+</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-[#2B2E4A]">Expert Mentors</span>
                     <span className="text-[#6EEBFF] font-bold text-xl">25+</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-[#2B2E4A]">Satisfaction Rate</span>
                     <span className="text-[#6EEBFF] font-bold text-xl">98%</span>
                   </div>
                 </div>
               </CardContent>
             </Card>
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
                 <li><a href="#" className="hover:text-[#6EEBFF] transition-colors">Software Engineering</a></li>
                 <li><a href="#" className="hover:text-[#6EEBFF] transition-colors">Full Stack Development</a></li>
                 <li><a href="#" className="hover:text-[#6EEBFF] transition-colors">Digital Marketing</a></li>
                 <li><a href="#" className="hover:text-[#6EEBFF] transition-colors">Data Analytics</a></li>
               </ul>
             </div>
 
             {/* Support */}
             <div>
               <h4 className="font-semibold mb-4 text-white">Support</h4>
               <ul className="space-y-2 text-[#C9C3D9]">
                 <li><a href="#" className="hover:text-[#6EEBFF] transition-colors">Help Center</a></li>
                 <li><a href="#" className="hover:text-[#6EEBFF] transition-colors">Contact Us</a></li>
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
