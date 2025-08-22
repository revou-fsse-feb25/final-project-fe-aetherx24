# Backend Integration Guide

## Current Status
✅ **Frontend Ready for Backend Integration**
✅ **Backend Server Running** at https://final-project-be-aetherx24-production.up.railway.app/
❌ **API Endpoints Not Implemented Yet**
✅ **Mock API Enabled** for development

## Backend API Requirements

### Base URL
- **Production**: `https://final-project-be-aetherx24-production.up.railway.app/api`
- **Development**: Set via `NEXT_PUBLIC_API_URL` environment variable

### Required Endpoints (NOT IMPLEMENTED YET)

#### 1. Dashboard Data
```
GET /api/dashboard
Response: DashboardData
```

#### 2. Courses
```
GET /api/courses
Response: Course[]

GET /api/courses/:id
Response: Course
```

#### 3. User Profile
```
GET /api/user/profile
Response: User
```

#### 4. Todos
```
GET /api/todos
Response: TodoItem[]

POST /api/todos
Body: { title, description?, dueDate?, courseId? }

PATCH /api/todos/:id
Body: Partial<TodoItem>

DELETE /api/todos/:id
```

#### 5. Feedback
```
GET /api/feedback/recent
Response: Feedback[]
```

## Immediate Action Required

### 1. Implement Backend Endpoints
Your backend needs to implement the above endpoints. Here's a quick example structure:

```javascript
// Example Express.js routes
app.get('/api/dashboard', (req, res) => {
  // Return dashboard data
  res.json({
    user: { /* user data */ },
    courses: [ /* courses array */ ],
    todos: [ /* todos array */ ],
    recentFeedback: [ /* feedback array */ ],
    stats: { /* stats object */ }
  });
});

app.get('/api/courses', (req, res) => {
  // Return courses array
});

app.get('/api/user/profile', (req, res) => {
  // Return user profile
});
```

### 2. Test Endpoints
Once implemented, test with:
```bash
curl https://final-project-be-aetherx24-production.up.railway.app/api/dashboard
curl https://final-project-be-aetherx24-production.up.railway.app/api/courses
```

### 3. Switch to Real API
When endpoints are working, update frontend:
```typescript
// In src/lib/api.ts, change this line:
const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true' || false; // Disable mock API
```

## Data Models

### Course
```typescript
{
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  instructor?: string;
  startDate?: string;
  endDate?: string;
  status: 'active' | 'completed' | 'upcoming';
  progress?: number;
  imageUrl?: string;
}
```

### User
```typescript
{
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
}
```

### TodoItem
```typescript
{
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  courseId?: string;
}
```

### Feedback
```typescript
{
  id: string;
  courseId: string;
  courseTitle: string;
  message: string;
  rating: number;
  createdAt: string;
}
```

## Current Frontend Status

- **Mock API**: ✅ Enabled (dashboard works with sample data)
- **Real API**: ❌ Not connected (endpoints missing)
- **Fallback**: ✅ Automatic fallback to mock data when real API fails

## Next Steps Priority

1. **HIGH**: Implement `/api/dashboard` endpoint
2. **HIGH**: Implement `/api/courses` endpoint  
3. **MEDIUM**: Implement `/api/user/profile` endpoint
4. **MEDIUM**: Implement `/api/todos` endpoints
5. **LOW**: Implement `/api/feedback/recent` endpoint

## Testing Your Backend

### 1. Test Basic Response
```bash
curl https://final-project-be-aetherx24-production.up.railway.app/
# Should return: "LMS Backend is running!"
```

### 2. Test API Endpoints (after implementation)
```bash
curl https://final-project-be-aetherx24-production.up.railway.app/api/dashboard
curl https://final-project-be-aetherx24-production.up.railway.app/api/courses
```

### 3. Test Frontend Integration
- Navigate to `/dashboard` in your frontend
- Check browser console for API calls
- Verify data loads from real backend instead of mock

## Common Issues & Solutions

### 1. CORS Errors
Ensure your backend allows requests from your frontend domain:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-domain.com'],
  credentials: true
}));
```

### 2. 404 Errors
- Verify endpoint paths match exactly (`/api/dashboard`, not `/dashboard`)
- Check your route definitions in the backend

### 3. Data Structure Mismatch
- Ensure backend returns data matching the TypeScript interfaces
- Check field names and types

## Support

If you encounter issues:
1. Check backend logs for errors
2. Verify endpoint URLs are correct
3. Test endpoints with curl/Postman
4. Check frontend console for API errors
5. Verify data structure matches TypeScript types

## Quick Start for Backend

1. **Add routes** to your backend server
2. **Return sample data** matching the interfaces above
3. **Test endpoints** with curl
4. **Update frontend** to use real API
5. **Deploy and test** the full integration
