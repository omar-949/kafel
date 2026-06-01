# Kafel Platform - API Integration Guide

## 🚀 Quick Start

Your Kafel platform is now integrated with the backend API for CVs/Candidates data!

## 📁 Files Created/Modified

### New Files:
1. **`.env.local`** - Local development environment variables
2. **`.env.production`** - Production environment variables
3. **`.env.example`** - Example environment file (for documentation)
4. **`src/services/api.js`** - API service layer with all API calls

### Modified Files:
1. **`src/components/CvsDirectory.jsx`** - Now fetches candidates from API
2. **`src/components/CandidateDetailsPage.jsx`** - Now fetches single candidate from API
3. **`.gitignore`** - Added environment files to ignore list

---

## ⚙️ Environment Configuration

### Local Development (`.env.local`)
```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
```

### Production (`.env.production`)
```env
VITE_API_BASE_URL=https://api.kafel.sa/api/v1
```

**Note**: Update the production URL when you have your live API endpoint.

---

## 🔧 How It Works

### 1. API Service (`src/services/api.js`)

The API service provides clean methods to interact with your backend:

```javascript
import { candidatesAPI } from '../services/api';

// Get all candidates with filters
const response = await candidatesAPI.getAll({
  page: 1,
  limit: 6,
  country: 'ET',
  search: 'ماريا'
});

// Get single candidate
const response = await candidatesAPI.getById(2547);

// Get countries list
const response = await candidatesAPI.getCountries();
```

### 2. CVs Directory Component

The `CvsDirectory` component now:
- ✅ Fetches candidates from API on mount
- ✅ Supports pagination from API
- ✅ Filters by country
- ✅ Search functionality
- ✅ Loading states
- ✅ Error handling
- ✅ Automatic refetch on filter changes

### 3. Candidate Details Page

The `CandidateDetailsPage` component now:
- ✅ Fetches single candidate from API
- ✅ Loading state with spinner
- ✅ Error handling
- ✅ 404 handling for non-existent candidates

---

## 🎯 API Response Format

Your API returns data in this format:

```json
{
  "success": true,
  "data": {
    "candidates": [
      {
        "id": 1,
        "name": "أميليا جونسون",
        "avatar": null,
        "country": "إثيوبيا",
        "country_code": "ET",
        "flag": "🇪🇹",
        "profession": "عاملة منزلية",
        "religion": "مسيحية",
        "experience_years": 5,
        "age_years": 28,
        "status": "متاحة",
        "skills": ["تنظيف", "طبخ"],
        "languages": null,
        "education": "ثانوية",
        "marital_status": "أعزب",
        "description": "عاملة منزلية محترفة",
        "created_at": "2026-06-01T12:14:01.000000Z",
        "updated_at": "2026-06-01T12:14:01.000000Z",
        "experience": "5 سنوات",
        "age": "28 سنة"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 1,
      "total_items": 1,
      "items_per_page": 6,
      "has_next": false,
      "has_prev": false
    },
    "filters_applied": []
  }
}
```

---

## 🧪 Testing the Integration

### 1. Start Your Backend API
```bash
# Make sure your Laravel/backend API is running on:
http://127.0.0.1:8000
```

### 2. Start the Frontend
```bash
npm run dev
```

### 3. Test the Features

**CVs List Page:**
- Navigate to the CVs section
- You should see candidates loaded from your API
- Try filtering by country
- Try pagination
- Try search (when implemented in backend)

**Candidate Details:**
- Click on any candidate card
- You should see the full details loaded from API
- Test the PDF download feature
- Test the "حجز المرشحة" button

---

## 🐛 Troubleshooting

### Issue: CORS Error
**Solution**: Add CORS headers to your Laravel API:

```php
// In your Laravel API (config/cors.php or middleware)
'allowed_origins' => ['http://localhost:5173', 'http://localhost:3000'],
'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
'allowed_headers' => ['*'],
```

### Issue: API Not Found (404)
**Solution**: Check that:
1. Your backend API is running
2. The URL in `.env.local` is correct
3. The API endpoints match the expected format

### Issue: Data Not Loading
**Solution**: 
1. Open browser DevTools (F12)
2. Check the Console tab for errors
3. Check the Network tab to see API requests
4. Verify the API response format matches expected structure

### Issue: Environment Variables Not Working
**Solution**:
1. Restart the Vite dev server after changing `.env` files
2. Make sure environment variables start with `VITE_`
3. Access them using `import.meta.env.VITE_VARIABLE_NAME`

---

## 📝 Adding More API Endpoints

To add more API functionality, update `src/services/api.js`:

```javascript
export const candidatesAPI = {
  // ... existing methods ...
  
  // Add new method
  create: async (candidateData) => {
    return apiRequest('/candidates', {
      method: 'POST',
      body: JSON.stringify(candidateData),
    });
  },
  
  update: async (id, candidateData) => {
    return apiRequest(`/candidates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(candidateData),
    });
  },
  
  delete: async (id) => {
    return apiRequest(`/candidates/${id}`, {
      method: 'DELETE',
    });
  },
};
```

---

## 🔐 Adding Authentication

To add JWT authentication, update the API service:

```javascript
// In src/services/api.js
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get token from localStorage
  const token = localStorage.getItem('auth_token');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Language': 'ar',
  };
  
  // Add Authorization header if token exists
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  // ... rest of the code
}
```

---

## 📊 Performance Optimization

### 1. Add Request Caching
```javascript
// Simple cache implementation
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function cachedRequest(key, fetchFn) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  const data = await fetchFn();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}
```

### 2. Add Request Debouncing for Search
```javascript
// In CvsDirectory.jsx
import { useEffect, useState } from 'react';

const [searchQuery, setSearchQuery] = useState('');
const [debouncedSearch, setDebouncedSearch] = useState('');

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchQuery);
  }, 500); // Wait 500ms after user stops typing

  return () => clearTimeout(timer);
}, [searchQuery]);

// Use debouncedSearch in API call instead of searchQuery
```

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Update `.env.production` with production API URL
- [ ] Test all API endpoints in production environment
- [ ] Verify CORS settings on production API
- [ ] Enable HTTPS for API calls
- [ ] Add error tracking (e.g., Sentry)
- [ ] Add analytics tracking
- [ ] Test on different devices and browsers
- [ ] Optimize images and assets
- [ ] Enable caching headers
- [ ] Add loading skeletons for better UX

---

## 📚 Next Steps

1. **Implement News API Integration** (similar to candidates)
2. **Add Admin Dashboard** for managing candidates
3. **Implement Authentication** for admin users
4. **Add Image Upload** functionality
5. **Implement Advanced Filters** (age range, experience range, etc.)
6. **Add Favorites/Bookmarks** feature
7. **Implement Contact Form** API integration

---

## 🆘 Need Help?

If you encounter any issues:

1. Check the browser console for errors
2. Check the Network tab in DevTools
3. Verify your backend API is running
4. Check the API response format
5. Review the `src/services/api.js` file

---

## 📞 Support

For questions or issues:
- **Email**: dev@kafel.sa
- **Documentation**: See `KAFEL-API-DOCS.md` for complete API specification

---

**Last Updated**: June 1, 2026  
**Version**: 1.0.0
