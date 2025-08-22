#!/usr/bin/env node

// Test script for your LMS backend
// Run with: node test-backend.js

const API_BASE = 'https://shanghairevolmsapi.up.railway.app/api/v1';

async function testEndpoint(endpoint, description) {
  try {
    console.log(`\n🧪 Testing: ${description}`);
    console.log(`   URL: ${API_BASE}${endpoint}`);
    
    const response = await fetch(`${API_BASE}/${endpoint}`);
    const status = response.status;
    
    if (response.ok) {
      const data = await response.json();
      console.log(`   ✅ Status: ${status}`);
      console.log(`   📊 Response:`, JSON.stringify(data, null, 2));
    } else {
      console.log(`   ❌ Status: ${status}`);
      console.log(`   📝 Response: ${response.statusText}`);
    }
  } catch (error) {
    console.log(`   💥 Error: ${error.message}`);
  }
}

async function runTests() {
  console.log('🚀 LMS Backend API Test Suite');
  console.log('================================');
  
  // Test utility endpoints
  await testEndpoint('health', 'Basic Health Check');
  await testEndpoint('auth-status', 'Auth Status Check');
  
  // Test dashboard endpoints
  await testEndpoint('dashboard', 'Dashboard Data');
  await testEndpoint('todos', 'Dashboard Todos');
  await testEndpoint('feedback/recent', 'Recent Feedback');
  
  // Test user endpoints
  await testEndpoint('users/profile', 'User Profile');
  await testEndpoint('users', 'All Users (Admin)');
  
  // Test course management
  await testEndpoint('courses', 'All Courses');
  await testEndpoint('enrollments/my-enrollments', 'My Enrollments');
  
  // Test content management
  await testEndpoint('modules', 'All Modules');
  await testEndpoint('lessons', 'All Lessons');
  await testEndpoint('assignments', 'All Assignments');
  await testEndpoint('submissions', 'All Submissions');
  
  // Test authentication endpoints
  await testEndpoint('auth/login', 'Login Endpoint');
  await testEndpoint('auth/register', 'Register Endpoint');
  
  console.log('\n✨ Test suite completed!');
  console.log('\n📋 Expected Results:');
  console.log('   ✅ /health - Should return backend status');
  console.log('   ✅ /auth/login - Should accept POST requests');
  console.log('   ❌ Other endpoints - Should return 404 until implemented');
  console.log('\n🔧 Next Steps:');
  console.log('   1. Implement the missing API endpoints in your backend');
  console.log('   2. Run this test again to verify they work');
  console.log('   3. Your frontend will automatically use the real API');
  console.log('\n📚 Key Endpoints to Implement:');
  console.log('   • POST /auth/login - For user authentication');
  console.log('   • GET /dashboard - For dashboard data');
  console.log('   • GET /users/profile - For user profile');
  console.log('   • GET /enrollments/my-enrollments - For user courses');
  console.log('   • GET /todos - For dashboard todos');
  console.log('   • GET /feedback/recent - For recent feedback');
}

// Run tests
runTests().catch(console.error);
