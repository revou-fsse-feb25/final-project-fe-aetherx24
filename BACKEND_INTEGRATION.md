# Backend Integration Guide

## Overview
This document outlines how to integrate your LMS Dashboard frontend with a backend API and prepare for deployment.

## Current Status
✅ **Frontend Ready for Backend Integration**
- Mock data removed
- Type-safe API client implemented
- Data fetching hooks created
- Loading and error states implemented
- Responsive UI components ready

## Backend API Requirements

### Base URL
- **Development**: `http://localhost:8000/api`
- **Production**: Set via `NEXT_PUBLIC_API_URL` environment variable

### Required Endpoints

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

## Environment Setup

### 1. Create `.env.local` file
```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Environment
NODE_ENV=development
```

### 2. Production Environment
```bash
# Set in your deployment platform
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
NODE_ENV=production
```

## Backend Implementation Tips

### 1. CORS Configuration
Ensure your backend allows requests from your frontend domain:
```typescript
// Example CORS config
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-domain.com'],
  credentials: true
}));
```

### 2. Authentication
The current implementation doesn't include authentication. Add JWT tokens or session-based auth:
```typescript
// Add to API client
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
}
```

### 3. Error Handling
Return consistent error responses:
```typescript
{
  error: true,
  message: "Error description",
  statusCode: 400
}
```

## Testing Backend Integration

### 1. Start Backend Server
```bash
# Your backend should be running on port 8000
# or update NEXT_PUBLIC_API_URL accordingly
```

### 2. Test API Endpoints
```bash
# Test dashboard endpoint
curl http://localhost:8000/api/dashboard

# Test courses endpoint
curl http://localhost:8000/api/courses
```

### 3. Check Frontend
- Navigate to `/dashboard`
- Check browser console for API calls
- Verify data is displayed correctly

## Deployment Checklist

### Frontend
- [ ] Environment variables configured
- [ ] API endpoints updated for production
- [ ] Build successful (`npm run build`)
- [ ] Static assets optimized

### Backend
- [ ] API endpoints implemented
- [ ] CORS configured for production domain
- [ ] Database connected and tested
- [ ] Environment variables set
- [ ] SSL certificate configured (HTTPS)

## Common Issues & Solutions

### 1. CORS Errors
- Ensure backend allows frontend domain
- Check credentials configuration

### 2. API Timeout
- Increase timeout in `src/config/env.ts`
- Check backend response times

### 3. Data Not Loading
- Verify API endpoints are working
- Check browser network tab
- Verify data structure matches types

### 4. Build Errors
- Check TypeScript compilation
- Verify all imports are correct
- Check for missing dependencies

## Next Steps

1. **Implement Backend API** with the required endpoints
2. **Test Integration** using the provided hooks
3. **Add Authentication** if required
4. **Deploy Backend** to your hosting platform
5. **Update Frontend Environment** with production API URL
6. **Deploy Frontend** to your hosting platform

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify API endpoints are accessible
3. Check network tab for failed requests
4. Verify data structure matches TypeScript types
