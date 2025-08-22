#!/usr/bin/env node

// Test script for your LMS backend
// Run with: node test-backend.js

const API_BASE = 'https://shanghairevolmsapi.up.railway.app/';

async function testEndpoint(endpoint, description) {
  try {
    console.log(`\n🧪 Testing: ${description}`);
    console.log(`   URL: ${API_BASE}${endpoint}`);
    
    const response = await fetch(`${API_BASE}${endpoint}`);
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
  
  // Test basic endpoint
  await testEndpoint('health', 'Basic Health Check');
  
  // Test required API endpoints
  await testEndpoint('api/v1/dashboard', 'Dashboard Data');
  await testEndpoint('api/v1/user/profile', 'User Profile');
  await testEndpoint('api/v1/enrollments/my-enrollments', 'My Enrollments');
  await testEndpoint('api/v1/todos', 'Todos List');
  await testEndpoint('api/v1/feedback/recent', 'Recent Feedback');
  
  // Test authentication endpoints
  await testEndpoint('api/v1/auth/login', 'Login Endpoint');
  await testEndpoint('api/v1/auth/register', 'Register Endpoint');
  
  console.log('\n✨ Test suite completed!');
  console.log('\n📋 Expected Results:');
  console.log('   ✅ / - Should return "LMS Backend is running!"');
  console.log('   ❌ /dashboard, /user/profile, etc. - Should return 404 until implemented');
  console.log('\n🔧 Next Steps:');
  console.log('   1. Implement the missing API endpoints in your backend');
  console.log('   2. Run this test again to verify they work');
  console.log('   3. Your frontend will automatically use the real API');
}

// Run tests
runTests().catch(console.error);
