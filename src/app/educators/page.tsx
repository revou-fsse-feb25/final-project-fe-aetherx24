"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Award, 
  DollarSign, 
  Globe, 
  Clock, 
  TrendingUp,
  Star,
  ArrowRight,
  GraduationCap
} from "lucide-react";
import { LandingNavbar } from "@/components/LandingNavbar";
import Link from "next/link";

export default function EducatorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LandingNavbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#2B2E4A] to-[#6EEBFF] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Teach on Luminark</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Share your expertise with thousands of learners worldwide. 
            Join our community of educators and inspire the next generation of tech professionals.
          </p>
          <div className="mt-8">
            <Button 
              size="lg" 
              className="bg-white text-[#2B2E4A] hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              asChild
            >
              <Link href="/contact">
                Get Started as an Educator
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Why Teach on Luminark */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B2E4A] mb-6">
              Why Choose Luminark for Your Teaching Journey?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to create, deliver, and monetize your courses 
              while reaching a global audience of motivated learners.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#6EEBFF] to-[#C9C3D9] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-[#2B2E4A]" />
                </div>
                <CardTitle className="text-xl text-[#2B2E4A]">Global Reach</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Access students from around the world who are eager to learn from industry experts like you.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#6EEBFF] to-[#C9C3D9] rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-[#2B2E4A]" />
                </div>
                <CardTitle className="text-xl text-[#2B2E4A]">Earn While Teaching</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Generate income by sharing your knowledge. Set your own pricing and keep up to 80% of course revenue.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#6EEBFF] to-[#C9C3D9] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-[#2B2E4A]" />
                </div>
                <CardTitle className="text-xl text-[#2B2E4A]">Flexible Schedule</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Teach on your own schedule. Create courses at your pace and engage with students when it works for you.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#6EEBFF] to-[#C9C3D9] rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-[#2B2E4A]" />
                </div>
                <CardTitle className="text-xl text-[#2B2E4A]">Professional Growth</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Build your personal brand, expand your network, and establish yourself as a thought leader in your field.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#6EEBFF] to-[#C9C3D9] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#2B2E4A]" />
                </div>
                <CardTitle className="text-xl text-[#2B2E4A]">Community Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Join our community of educators. Share best practices, collaborate, and learn from fellow instructors.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#6EEBFF] to-[#C9C3D9] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-[#2B2E4A]" />
                </div>
                <CardTitle className="text-xl text-[#2B2E4A]">Recognition & Credentials</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Earn certifications and recognition for your teaching excellence. Build a portfolio of achievements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[#F5F3E7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B2E4A] mb-6">
              How to Get Started
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Becoming an educator on Luminark is simple. Follow these steps to begin your teaching journey.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#2B2E4A] to-[#6EEBFF] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold text-[#2B2E4A] mb-3">Contact Our Team</h3>
              <p className="text-gray-600">
                Reach out to our staff through our contact page to express your interest in becoming an educator.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#2B2E4A] to-[#6EEBFF] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold text-[#2B2E4A] mb-3">Get Teacher Role</h3>
              <p className="text-gray-600">
                Our team will review your application and upgrade your account with teacher privileges.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#2B2E4A] to-[#6EEBFF] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold text-[#2B2E4A] mb-3">Create Your Course</h3>
              <p className="text-gray-600">
                Use our intuitive course builder to design engaging content with videos, assignments, and assessments.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#2B2E4A] to-[#6EEBFF] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                4
              </div>
              <h3 className="text-xl font-semibold text-[#2B2E4A] mb-3">Launch & Earn</h3>
              <p className="text-gray-600">
                Publish your course, start teaching students, and begin earning from your expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B2E4A] mb-6">
              Success Stories from Our Educators
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from educators who have transformed their careers by teaching on Luminark.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#6EEBFF] to-[#C9C3D9] rounded-full flex items-center justify-center mr-4">
                    <span className="text-[#2B2E4A] font-bold text-lg">S</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2B2E4A]">Sarah Chen</h4>
                    <p className="text-sm text-gray-500">Full-Stack Developer</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  &ldquo;Teaching on Luminark has been incredibly rewarding. I&apos;ve reached over 2,000 students and earned enough to work part-time while pursuing my passion for education.&rdquo;
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span>4.9/5 rating</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#6EEBFF] to-[#C9C3D9] rounded-full flex items-center justify-center mr-4">
                    <span className="text-[#2B2E4A] font-bold text-lg">M</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2B2E4A]">Marcus Rodriguez</h4>
                    <p className="text-sm text-gray-500">Data Scientist</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  &ldquo;The platform is so user-friendly. I created my first course in just two weeks and now have a steady income stream from my data science courses.&rdquo;
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span>4.8/5 rating</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#6EEBFF] to-[#C9C3D9] rounded-full flex items-center justify-center mr-4">
                    <span className="text-[#2B2E4A] font-bold text-lg">A</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2B2E4A]">Aisha Patel</h4>
                    <p className="text-sm text-gray-500">UX Designer</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  &ldquo;I love the community aspect. I&apos;ve connected with other educators and students from around the world. It&apos;s more than just teaching—it&apos;s building relationships.&rdquo;
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span>4.9/5 rating</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-[#2B2E4A] to-[#6EEBFF]">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Share Your Knowledge?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of educators who are already making a difference in students&apos; lives 
            while building their own successful teaching businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-[#2B2E4A] hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              asChild
            >
              <Link href="/contact">
                Contact Us to Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-[#2B2E4A] px-8 py-4 text-lg font-semibold"
              asChild
            >
              <Link href="/#features">
                Learn More About Luminark
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B2E4A] mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about becoming an educator on Luminark.
            </p>
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-[#2B2E4A]">
                  What qualifications do I need to become an educator?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We welcome educators with expertise in their field. While formal teaching credentials are helpful, 
                  what matters most is your knowledge, passion for teaching, and ability to create engaging content.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-[#2B2E4A]">
                  How much can I earn from my courses?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Educators typically earn between $500 to $5,000+ per month depending on course quality, 
                  marketing efforts, and student engagement. Top educators can earn significantly more.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-[#2B2E4A]">
                  What support do you provide to educators?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We provide comprehensive support including course creation tools, marketing assistance, 
                  community forums, and dedicated success managers to help you succeed.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-[#2B2E4A]">
                  How long does it take to create a course?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Course creation time varies based on complexity. A basic course might take 2-4 weeks, 
                  while comprehensive programs could take 2-3 months. We recommend starting small and expanding.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
