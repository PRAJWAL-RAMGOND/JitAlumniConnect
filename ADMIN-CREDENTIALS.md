# 🔐 JITConnect - Admin Login Credentials

## Admin Account

### Login Credentials

**Email:** `admin@jit.ac.in`  
**Password:** `admin123`

---

## How to Login as Admin

### Step 1: Go to Login Page
```
http://localhost:8000/login.html
```

### Step 2: Enter Admin Credentials
- **Email:** admin@jit.ac.in
- **Password:** admin123

### Step 3: Access Admin Panel
After login, you'll be automatically redirected to:
```
http://localhost:8000/admin-new.html
```

---

## Access Control

### Admin Role Features
✅ **Full Access** to Admin Panel  
✅ **User Management** - Approve, edit, delete users  
✅ **Content Moderation** - Review and delete posts  
✅ **Job Management** - Post and manage jobs  
✅ **Reports Handling** - Review and resolve reports  
✅ **Analytics Dashboard** - View platform metrics  
✅ **Settings Control** - Configure platform features  

### Student Role Features
❌ **No Access** to Admin Panel  
✅ Access to Dashboard, Jobs, Chatbot, etc.  
✅ Can create posts and apply for jobs  
✅ Can use Alumni Matcher chatbot  

---

## Test Accounts

### Admin Account
```
Email: admin@jit.ac.in
Password: admin123
Role: admin
Access: Admin Panel + All Features
```

### Student Account (Any other email)
```
Email: student@jit.ac.in (or any email)
Password: anything
Role: student
Access: Dashboard, Jobs, Chatbot, etc.
```

---

## Login Flow

### Admin Login
```
1. Enter: admin@jit.ac.in / admin123
2. System checks credentials
3. Creates admin user session
4. Redirects to admin-new.html
5. Admin panel loads
```

### Student Login
```
1. Enter: any email / any password
2. System creates student session
3. Redirects to dashboard.html
4. Student features available
```

---

## Security Features

### Current Implementation
- ✅ Role-based access control
- ✅ Admin panel restricted to admin role
- ✅ Automatic redirect for non-admin users
- ✅ Session management via localStorage
- ✅ Clear error messages

### Production Recommendations
```javascript
// Add these security features:
1. Password hashing (bcrypt)
2. JWT tokens
3. Session timeout
4. Two-factor authentication
5. Audit logging
6. IP whitelisting
7. Rate limiting
8. HTTPS only
```

---

## Changing Admin Password

### Current Method (Development)
Edit `login-script.js`:
```javascript
if (email === 'admin@jit.ac.in' && password === 'YOUR_NEW_PASSWORD') {
    // Admin login
}
```

### Production Method
```javascript
// Use backend API with hashed passwords
POST /api/admin/change-password
Body: {
    currentPassword: "admin123",
    newPassword: "newSecurePassword123!",
    confirmPassword: "newSecurePassword123!"
}
```

---

## Adding More Admins

### Method 1: Update Login Script
```javascript
// In login-script.js
const adminAccounts = [
    { email: 'admin@jit.ac.in', password: 'admin123' },
    { email: 'admin2@jit.ac.in', password: 'admin456' },
    { email: 'superadmin@jit.ac.in', password: 'super123' }
];

const adminAccount = adminAccounts.find(
    acc => acc.email === email && acc.password === password
);

if (adminAccount) {
    // Create admin session
}
```

### Method 2: Database (Production)
```sql
-- Add admin users to database
INSERT INTO users (email, password, role, name)
VALUES 
    ('admin@jit.ac.in', 'hashed_password', 'admin', 'Admin User'),
    ('admin2@jit.ac.in', 'hashed_password', 'admin', 'Admin 2');
```

---

## Admin Roles (Future Enhancement)

### Super Admin
- Full access to everything
- Can create/delete other admins
- System configuration access

### Content Moderator
- Can moderate posts
- Can handle reports
- Cannot manage users

### User Manager
- Can manage users
- Can approve registrations
- Cannot access analytics

### Job Manager
- Can post jobs
- Can manage job listings
- Cannot access user data

---

## Testing Admin Access

### Test 1: Admin Login
```
1. Go to login page
2. Enter: admin@jit.ac.in / admin123
3. ✅ Should redirect to admin-new.html
4. ✅ Admin panel should load
```

### Test 2: Student Trying Admin Access
```
1. Login as student (any email)
2. Try accessing: http://localhost:8000/admin-new.html
3. ✅ Should show "Access Denied" alert
4. ✅ Should redirect to dashboard.html
```

### Test 3: No Login Admin Access
```
1. Clear localStorage
2. Try accessing: http://localhost:8000/admin-new.html
3. ✅ Should show "Please login" alert
4. ✅ Should redirect to login.html
```

---

## Quick Access Links

### For Admin
- **Login:** http://localhost:8000/login.html
- **Admin Panel:** http://localhost:8000/admin-new.html
- **Dashboard:** http://localhost:8000/dashboard.html (also accessible)

### For Students
- **Login:** http://localhost:8000/login.html
- **Dashboard:** http://localhost:8000/dashboard.html
- **Jobs:** http://localhost:8000/jobs.html
- **Chatbot:** http://localhost:8000/chatbot.html

---

## Troubleshooting

### Issue: Can't login as admin
**Solution:**
1. Check email: `admin@jit.ac.in` (exact match)
2. Check password: `admin123` (case-sensitive)
3. Clear browser cache
4. Try incognito mode

### Issue: Redirected to dashboard instead of admin panel
**Solution:**
1. Verify credentials are correct
2. Check browser console for errors
3. Clear localStorage: `localStorage.clear()`
4. Try logging in again

### Issue: "Access Denied" message
**Solution:**
1. You're logged in as student, not admin
2. Logout and login with admin credentials
3. Check localStorage: `localStorage.getItem('userData')`
4. Verify role is 'admin'

---

## Important Notes

⚠️ **Development Only**
- These credentials are for development/testing
- Change password before production
- Implement proper authentication system

🔒 **Security Warning**
- Never commit credentials to Git
- Use environment variables in production
- Implement password hashing
- Add two-factor authentication

📝 **Remember**
- Admin credentials: admin@jit.ac.in / admin123
- Student login: any email / any password
- Admin has full access to admin panel
- Students cannot access admin panel

---

## Summary

### Admin Login
```
Email: admin@jit.ac.in
Password: admin123
Access: Full Admin Panel
```

### What You Can Do
- Manage all users
- Moderate all posts
- Handle job postings
- Review reports
- View analytics
- Configure settings

### Quick Start
1. Go to http://localhost:8000/login.html
2. Enter admin@jit.ac.in / admin123
3. Access admin panel
4. Start managing platform!

---

**Your admin account is ready to use!** 🚀

*Keep these credentials secure and change them before going to production.*
