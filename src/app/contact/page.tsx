"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Navbar } from "@/components/Navbar";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (replace with actual API call)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.subject && formData.message;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#2B2E4A] to-[#6EEBFF] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
                        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Have questions about our LMS platform? We&apos;d love to hear from you. 
                Send us a message and we&apos;ll respond as soon as possible.
              </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <p className="text-gray-600 mb-8">
                  Ready to transform your learning experience? Reach out to our team for support, 
                  questions, or to learn more about how Luminark can benefit your institution.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#6EEBFF] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#2B2E4A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">support@luminark.com</p>
                    <p className="text-sm text-gray-500">We&apos;ll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#6EEBFF] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#2B2E4A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#6EEBFF] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#2B2E4A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Office</h3>
                    <p className="text-gray-600">123 Education Street</p>
                    <p className="text-gray-600">Learning City, LC 12345</p>
                    <p className="text-sm text-gray-500">United States</p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-[#F5F3E7] p-6 rounded-lg border border-[#6EEBFF]/20">
                <h3 className="font-semibold text-[#2B2E4A] mb-3">Why Choose Luminark?</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Modern, intuitive learning platform</li>
                  <li>• Comprehensive course management</li>
                  <li>• Advanced analytics and reporting</li>
                  <li>• 24/7 technical support</li>
                  <li>• Scalable for any institution size</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 rounded-2xl overflow-hidden">
                             <CardHeader className="bg-gradient-to-r from-[#2B2E4A] to-[#6EEBFF] text-white text-center rounded-t-2xl">
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription className="text-blue-100">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                {submitStatus === 'success' ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for reaching out. We&apos;ve received your message and will get back to you within 24 hours.
                    </p>
                    <Button 
                      onClick={() => setSubmitStatus('idle')}
                      className="bg-[#2B2E4A] hover:bg-[#1a1d2f]"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="mt-1 border-gray-300 focus:border-[#6EEBFF] focus:ring-[#6EEBFF]"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="mt-1 border-gray-300 focus:border-[#6EEBFF] focus:ring-[#6EEBFF]"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1 border-gray-300 focus:border-[#6EEBFF] focus:ring-[#6EEBFF]"
                        placeholder="Enter your email address"
                      />
                    </div>

                    {/* Subject Field */}
                    <div>
                      <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="mt-1 border-gray-300 focus:border-[#6EEBFF] focus:ring-[#6EEBFF]"
                        placeholder="What is this regarding?"
                      />
                    </div>

                    {/* Message Field */}
                    <div>
                      <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="mt-1 border-gray-300 focus:border-[#6EEBFF] focus:ring-[#6EEBFF]"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        className="w-full bg-gradient-to-r from-[#2B2E4A] to-[#6EEBFF] hover:from-[#1a1d2f] hover:to-[#5dd8e8] text-white py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Sending Message...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Send className="w-5 h-5" />
                            <span>Send Message</span>
                          </div>
                        )}
                      </Button>
                    </div>

                    {/* Error Message */}
                    {submitStatus === 'error' && (
                      <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                        <AlertCircle className="w-5 h-5" />
                        <span>Something went wrong. Please try again.</span>
                      </div>
                    )}

                    {/* Form Note */}
                    <p className="text-sm text-gray-500 text-center">
                      * Required fields. By submitting this form, you agree to our privacy policy.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
