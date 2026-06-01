# Kafel Platform - API Specification Document

## 📋 Table of Contents
1. [Overview](#overview)
2. [Authentication](#authentication)
3. [CVs/Candidates API](#cvs-candidates-api)
4. [News API](#news-api)
5. [Database Schema](#database-schema)
6. [Error Handling](#error-handling)
7. [Rate Limiting](#rate-limiting)
8. [Implementation Notes](#implementation-notes)

---

## 🎯 Overview

This document provides complete API specifications for the Kafel HR Platform. The APIs handle:
- **CVs/Candidates Management**: CRUD operations for candidate profiles
- **News Management**: CRUD operations for news articles and announcements

### Base URL
```
Production: https://api.kafel.sa/v1
Development: http://localhost:3000/api/v1
```

### Technology Stack Recommendations
- **Backend**: Node.js (Express) or Python (FastAPI) or PHP (Laravel)
- **Database**: PostgreSQL or MySQL
- **File Storage**: AWS S3 or local storage with CDN
- **Authentication**: JWT tokens
- **API Documentation**: Swagger/OpenAPI

---

## 🔐 Authentication

### Headers Required
```http
Authorization: Bearer {jwt_token}
Content-Type: application/json
Accept-Language: ar (default) | en
```

### Authentication Endpoints

#### POST /auth/login
Admin login endpoint

**Request:**
```json
{
  "email": "admin@kafel.sa",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "Admin User",
      "email": "admin@kafel.sa",
      "role": "admin"
    }
  }
}
```

---

## 👥 CVs/Candidates API

### 1. GET /candidates
Retrieve list of candidates with filtering, pagination, and search

**Query Parameters:**
```
?page=1                    // Page number (default: 1)
&limit=6                   // Items per page (default: 6)
&country=ID                // Filter by country code (ET, ID, LK, PH, UG, KE, ER, BD, PK, BI)
&profession=عاملة منزلية   // Filter by profession
&religion=مسلمة            // Filter by religion
&experience_min=2          // Minimum years of experience
&experience_max=7          // Maximum years of experience
&age_min=24                // Minimum age
&age_max=35                // Maximum age
&status=متاحة             // Filter by status (متاحة, محجوزة)
&search=ماريا             // Search by name
&sort=id                   // Sort field (id, age, experience)
&order=desc                // Sort order (asc, desc)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "candidates": [
      {
        "id": 2547,
        "name": "أميليا جونسون",
        "avatar": "https://cdn.kafel.sa/candidates/2547.jpg",
        "country": "إثيوبيا",
        "country_code": "ET",
        "flag": "🇪🇹",
        "profession": "عاملة منزلية",
        "religion": "مسيحية",
        "experience": "5 سنوات",
        "experience_years": 5,
        "age": "28 سنة",
        "age_years": 28,
        "status": "متاحة",
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-20T14:45:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 10,
      "total_items": 60,
      "items_per_page": 6,
      "has_next": true,
      "has_prev": false
    },
    "filters_applied": {
      "country": "ET",
      "status": "متاحة"
    }
  }
}
```

### 2. GET /candidates/:id
Get single candidate details

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 2547,
    "name": "أميليا جونسون",
    "avatar": "https://cdn.kafel.sa/candidates/2547.jpg",
    "country": "إثيوبيا",
    "country_code": "ET",
    "flag": "🇪🇹",
    "profession": "عاملة منزلية",
    "religion": "مسيحية",
    "experience": "5 سنوات",
    "experience_years": 5,
    "age": "28 سنة",
    "age_years": 28,
    "status": "متاحة",
    "skills": ["تنظيف", "طبخ", "رعاية أطفال"],
    "languages": ["العربية", "الإنجليزية", "الأمهرية"],
    "education": "ثانوية عامة",
    "marital_status": "أعزب",
    "description": "عاملة منزلية محترفة مع خبرة 5 سنوات في العمل المنزلي",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-20T14:45:00Z"
  }
}
```

### 3. POST /candidates
Create new candidate (Admin only)

**Request:**
```json
{
  "name": "أميليا جونسون",
  "avatar": "base64_image_or_file_upload",
  "country": "إثيوبيا",
  "country_code": "ET",
  "profession": "عاملة منزلية",
  "religion": "مسيحية",
  "experience_years": 5,
  "age_years": 28,
  "status": "متاحة",
  "skills": ["تنظيف", "طبخ", "رعاية أطفال"],
  "languages": ["العربية", "الإنجليزية", "الأمهرية"],
  "education": "ثانوية عامة",
  "marital_status": "أعزب",
  "description": "عاملة منزلية محترفة"
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم إضافة السيرة الذاتية بنجاح",
  "data": {
    "id": 2553,
    "name": "أميليا جونسون",
    "created_at": "2024-06-01T10:30:00Z"
  }
}
```

### 4. PUT /candidates/:id
Update candidate (Admin only)

**Request:** Same as POST

**Response:**
```json
{
  "success": true,
  "message": "تم تحديث السيرة الذاتية بنجاح",
  "data": {
    "id": 2547,
    "updated_at": "2024-06-01T11:00:00Z"
  }
}
```

### 5. DELETE /candidates/:id
Delete candidate (Admin only)

**Response:**
```json
{
  "success": true,
  "message": "تم حذف السيرة الذاتية بنجاح"
}
```

### 6. GET /candidates/countries
Get list of available countries with candidate counts

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "code": "ALL",
      "name": "الكل",
      "flag": "🌍",
      "count": 60
    },
    {
      "code": "ID",
      "name": "إندونيسيا",
      "flag": "🇮🇩",
      "count": 12
    },
    {
      "code": "ET",
      "name": "إثيوبيا",
      "flag": "🇪🇹",
      "count": 8
    }
  ]
}
```

---

## 📰 News API

### 1. GET /news
Retrieve list of news articles with pagination

**Query Parameters:**
```
?page=1                    // Page number (default: 1)
&limit=3                   // Items per page (default: 3)
&category=أخبار            // Filter by category
&status=published          // Filter by status (published, draft)
&search=توظيف             // Search in title and content
&sort=created_at           // Sort field (created_at, views)
&order=desc                // Sort order (asc, desc)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "news": [
      {
        "id": 1,
        "title": "إطلاق خدمة جديدة",
        "excerpt": "نعلن عن إطلاق خدمات التوظيف الفوري في جميع المدن",
        "content": "نحن سعداء بالإعلان عن إطلاق خدمة التوظيف الفوري...",
        "image": "https://cdn.kafel.sa/news/1.jpg",
        "category": "أخبار",
        "author": {
          "id": 1,
          "name": "فريق كافل",
          "avatar": "https://cdn.kafel.sa/authors/1.jpg"
        },
        "status": "published",
        "views": 1250,
        "published_at": "2024-05-15T10:00:00Z",
        "created_at": "2024-05-14T15:30:00Z",
        "updated_at": "2024-05-15T10:00:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 5,
      "total_items": 15,
      "items_per_page": 3,
      "has_next": true,
      "has_prev": false
    }
  }
}
```

### 2. GET /news/:id
Get single news article

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "إطلاق خدمة جديدة",
    "excerpt": "نعلن عن إطلاق خدمات التوظيف الفوري في جميع المدن",
    "content": "<p>نحن سعداء بالإعلان عن إطلاق خدمة التوظيف الفوري...</p>",
    "image": "https://cdn.kafel.sa/news/1.jpg",
    "category": "أخبار",
    "tags": ["توظيف", "خدمات جديدة", "كافل"],
    "author": {
      "id": 1,
      "name": "فريق كافل",
      "avatar": "https://cdn.kafel.sa/authors/1.jpg",
      "bio": "فريق كافل للموارد البشرية"
    },
    "status": "published",
    "views": 1250,
    "published_at": "2024-05-15T10:00:00Z",
    "created_at": "2024-05-14T15:30:00Z",
    "updated_at": "2024-05-15T10:00:00Z",
    "related_news": [
      {
        "id": 2,
        "title": "تحسين تجربة العملاء",
        "excerpt": "تحديثات جديدة على المنصة",
        "image": "https://cdn.kafel.sa/news/2.jpg"
      }
    ]
  }
}
```

### 3. POST /news
Create new news article (Admin only)

**Request:**
```json
{
  "title": "إطلاق خدمة جديدة",
  "excerpt": "نعلن عن إطلاق خدمات التوظيف الفوري في جميع المدن",
  "content": "<p>نحن سعداء بالإعلان عن إطلاق خدمة التوظيف الفوري...</p>",
  "image": "base64_image_or_file_upload",
  "category": "أخبار",
  "tags": ["توظيف", "خدمات جديدة", "كافل"],
  "status": "published",
  "published_at": "2024-05-15T10:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم إضافة الخبر بنجاح",
  "data": {
    "id": 16,
    "title": "إطلاق خدمة جديدة",
    "created_at": "2024-06-01T10:30:00Z"
  }
}
```

### 4. PUT /news/:id
Update news article (Admin only)

**Request:** Same as POST

**Response:**
```json
{
  "success": true,
  "message": "تم تحديث الخبر بنجاح",
  "data": {
    "id": 1,
    "updated_at": "2024-06-01T11:00:00Z"
  }
}
```

### 5. DELETE /news/:id
Delete news article (Admin only)

**Response:**
```json
{
  "success": true,
  "message": "تم حذف الخبر بنجاح"
}
```

### 6. GET /news/categories
Get list of news categories

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "أخبار",
      "slug": "news",
      "count": 8
    },
    {
      "id": 2,
      "name": "شراكات",
      "slug": "partnerships",
      "count": 4
    },
    {
      "id": 3,
      "name": "تحديثات",
      "slug": "updates",
      "count": 3
    }
  ]
}
```

---

## 🗄️ Database Schema

### Candidates Table
```sql
CREATE TABLE candidates (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    avatar VARCHAR(500),
    country VARCHAR(100) NOT NULL,
    country_code VARCHAR(2) NOT NULL,
    flag VARCHAR(10),
    profession VARCHAR(255) NOT NULL,
    religion VARCHAR(100),
    experience_years INT NOT NULL,
    age_years INT NOT NULL,
    status ENUM('متاحة', 'محجوزة') DEFAULT 'متاحة',
    skills JSON,
    languages JSON,
    education VARCHAR(255),
    marital_status VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_country_code (country_code),
    INDEX idx_status (status),
    INDEX idx_profession (profession),
    INDEX idx_created_at (created_at)
);
```

### News Table
```sql
CREATE TABLE news (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(500) NOT NULL,
    excerpt TEXT NOT NULL,
    content LONGTEXT NOT NULL,
    image VARCHAR(500),
    category VARCHAR(100),
    tags JSON,
    author_id BIGINT,
    status ENUM('draft', 'published') DEFAULT 'draft',
    views INT DEFAULT 0,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id),
    INDEX idx_status (status),
    INDEX idx_category (category),
    INDEX idx_published_at (published_at),
    FULLTEXT INDEX idx_search (title, excerpt, content)
);
```

### Users Table (for authentication)
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(500),
    role ENUM('admin', 'editor', 'viewer') DEFAULT 'viewer',
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);
```

---

## ⚠️ Error Handling

### Standard Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "البيانات المدخلة غير صحيحة",
    "details": {
      "field": "email",
      "issue": "البريد الإلكتروني مطلوب"
    }
  }
}
```

### Error Codes
| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid input data |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource already exists |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

---

## 🚦 Rate Limiting

### Limits
- **Public endpoints**: 100 requests per 15 minutes per IP
- **Authenticated endpoints**: 1000 requests per hour per user
- **Admin endpoints**: 5000 requests per hour

### Rate Limit Headers
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1622547600
```

---

## 📝 Implementation Notes

### 1. File Upload Handling
- **Max file size**: 5MB for images
- **Allowed formats**: JPG, PNG, WebP
- **Image processing**: Resize to multiple sizes (thumbnail, medium, large)
- **Storage**: Use CDN for serving images

### 2. Search Implementation
- Use full-text search for Arabic content
- Implement fuzzy matching for names
- Add search suggestions/autocomplete

### 3. Caching Strategy
- Cache candidate lists for 5 minutes
- Cache news articles for 15 minutes
- Invalidate cache on updates

### 4. Security Considerations
- Sanitize all user inputs
- Use prepared statements for SQL queries
- Implement CORS properly
- Add request validation middleware
- Use HTTPS only in production

### 5. Pagination Best Practices
- Default page size: 6 for candidates, 3 for news
- Max page size: 50
- Include total count in response
- Use cursor-based pagination for large datasets

### 6. Arabic Language Support
- Store all text in UTF-8
- Support RTL text direction
- Validate Arabic characters properly
- Provide bilingual error messages

### 7. Performance Optimization
- Add database indexes on frequently queried fields
- Use connection pooling
- Implement query result caching
- Optimize image delivery with lazy loading

---

## 🧪 Testing Endpoints

### Sample cURL Commands

**Get Candidates:**
```bash
curl -X GET "https://api.kafel.sa/v1/candidates?page=1&limit=6&country=ET" \
  -H "Accept-Language: ar"
```

**Get Single Candidate:**
```bash
curl -X GET "https://api.kafel.sa/v1/candidates/2547" \
  -H "Accept-Language: ar"
```

**Create News (Admin):**
```bash
curl -X POST "https://api.kafel.sa/v1/news" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Accept-Language: ar" \
  -d '{
    "title": "إطلاق خدمة جديدة",
    "excerpt": "نعلن عن إطلاق خدمات التوظيف الفوري",
    "content": "<p>المحتوى الكامل...</p>",
    "category": "أخبار",
    "status": "published"
  }'
```

---

## 📚 Additional Resources

### Recommended Libraries

**Node.js/Express:**
- `express` - Web framework
- `jsonwebtoken` - JWT authentication
- `bcrypt` - Password hashing
- `multer` - File uploads
- `express-validator` - Input validation
- `mysql2` or `pg` - Database drivers
- `redis` - Caching

**Python/FastAPI:**
- `fastapi` - Web framework
- `sqlalchemy` - ORM
- `pydantic` - Data validation
- `python-jose` - JWT
- `passlib` - Password hashing
- `python-multipart` - File uploads

### API Documentation Tools
- Swagger UI
- Postman Collections
- Redoc

---

## 🎯 Next Steps

1. **Choose your backend technology** (Node.js, Python, or PHP)
2. **Set up database** with provided schema
3. **Implement authentication** system
4. **Build CRUD endpoints** for candidates and news
5. **Add file upload** functionality
6. **Implement filtering and search**
7. **Add pagination**
8. **Set up caching**
9. **Write API tests**
10. **Deploy to production**

---

## 📞 Support

For questions or clarifications about this API specification, please contact:
- **Email**: dev@kafel.sa
- **Documentation**: https://docs.kafel.sa

---

**Document Version**: 1.0.0  
**Last Updated**: June 1, 2026  
**Author**: Kafel Development Team
