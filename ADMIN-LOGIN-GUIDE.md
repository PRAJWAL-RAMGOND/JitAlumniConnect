# 🔐 Admin Login Guide - Quick Reference

## Admin Credentials

```
📧 Email:    admin@jit.ac.in
🔑 Password: admin123
```

---

## How to Login

### Step 1: Open Login Page
Navigate to: **http://localhost:8000/login.html**

### Step 2: Enter Credentials
- **Email:** `admin@jit.ac.in`
- **Password:** `admin123`

### Step 3: Click Login
You'll be automatically redirected to the Admin Panel

---

## What Happens After Login

### Admin Login Flow
```
Login Page
    ↓
Enter admin@jit.ac.in / admin123
    ↓
System validates credentials
    ↓
Creates admin session
    ↓
Redirects to admin.html
    ↓
Admin Panel loads with full access
```

### Student Login Flow (Any other email)
```
Login Page
    ↓
Enter any email / any password
    ↓
Creates student session
    ↓
Redirects to dashboard.html
    ↓
Student features available
```

---

## Admin Panel Access

### Direct URL
After logging in as admin, you can access:
```
http://localhost:8000/admin.html
```

### Features Available
- 📊 Dashboard with statistics
- 👥 User management
- 📝 Post moderation
- 💼 Job management
- ⚠️ Reports handling
- 📈 Analytics
- ⚙️ Settings

---

## Access Control

### ✅ Admin Can Access
- Admin Panel (admin.html)
- Dashboard (dashboard.html)
- All student features
- All management tools

### ❌ Students Cannot Access
- Admin Panel (admin.html)
- Will see "Access Denied" message
- Automatically redirected to dashboard

---

## Testing

### Test Admin Access
1. Login with: `admin@jit.ac.in` / `admin123`
2. Should redirect to admin panel
3. All admin features should work

### Test Student Access
1. Login with any other email
2. Should redirect to dashboard
3. Try accessing admin.html
4. Should see "Access Denied"

---

## Quick Commands

### View Current User
Open browser console (F12) and type:
```javascript
console.log(JSON.parse(localStorage.getItem('userData')));
```

### Logout
```javascript
localStorage.removeItem('userData');
window.location.href = 'login.html';
```

### Switch to Admin
```javascript
localStorage.setItem('userData', JSON.stringify({
    email: 'admin@jit.ac.in',
    name: 'Admin User',
    role: 'admin',
    isLoggedIn: true
}));
window.location.href = 'admin.html';
```

---

## Important Notes

⚠️ **For Development Only**
- These are test credentials
- Change before production
- Implement proper authentication

🔒 **Security**
- Password is not hashed (development only)
- Use bcrypt in production
- Add JWT tokens
- Implement 2FA

📝 **Remember**
- Admin email: admin@jit.ac.in
- Admin password: admin123
- Case-sensitive credentials
- Exact match required

---

## Troubleshooting

### Can't Login?
1. Check spelling: `admin@jit.ac.in`
2. Check password: `admin123`
3. Clear cache and try again
4. Use incognito mode

### Redirected to Dashboard?
1. You entered wrong credentials
2. System created student account
3. Logout and try again with admin credentials

### Access Denied?
1. You're logged in as student
2. Logout and login as admin
3. Check your role in localStorage

---

## Summary

**Admin Credentials:**
- Email: `admin@jit.ac.in`
- Password: `admin123`

**Access:** Full admin panel with all management features

**URL:** http://localhost:8000/login.html

---

**Ready to manage your platform!** 🚀
