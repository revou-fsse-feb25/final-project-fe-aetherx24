#!/usr/bin/env node

// Simple API test script for your LMS backend
// Run with: node test-api.js

const API_BASE = 'https://final-project-be-aetherx24-production.up.railway.app';

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
  await testEndpoint('/', 'Basic Health Check');
  
  // Test required API endpoints
  await testEndpoint('/api/dashboard', 'Dashboard Data');
  await testEndpoint('/api/courses', 'Courses List');
  await testEndpoint('/api/user/profile', 'User Profile');
  await testEndpoint('/api/todos', 'Todos List');
  await testEndpoint('/api/feedback/recent', 'Recent Feedback');
  
  console.log('\n✨ Test suite completed!');
  console.log('\n📋 Expected Results:');
  console.log('   ✅ / - Should return "LMS Backend is running!"');
  console.log('   ❌ /api/* - Should return 404 until implemented');
  console.log('\n🔧 Next Steps:');
  console.log('   1. Implement the missing API endpoints in your backend');
  console.log('   2. Run this test again to verify they work');
  console.log('   3. Update your frontend to use the real API');
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests().catch(console.error);
}

export { runTests };


