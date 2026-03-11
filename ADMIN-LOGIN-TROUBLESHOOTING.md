# 🔧 Admin Login Troubleshooting Guide

## Issue: Login page not redirecting to admin panel

### Quick Fix Steps

#### Step 1: Clear Browser Cache
1. Press `Ctrl + Shift + Delete` (Windows) or `Cmd + Shift + Delete` (Mac)
2. Select "Cached images and files"
3. Click "Clear data"
4. Close and reopen browser

#### Step 2: Hard Refresh
1. Go to http://localhost:8000/login.html
2. Press `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)
3. This forces browser to reload all files

#### Step 3: Use Test Page
1. Go to http://localhost:8000/test-admin-login.html
2. Credentials are pre-filled
3. Click "Test Login"
4. Check console for debug messages
5. Should redirect to admin panel

#### Step 4: Check Browser Console
1. Press `F12` to open Developer Tools
2. Go to "Console" tab
3. Try logging in
4. Look for these messages:
   - "Login attempt: admin@jit.ac.in"
   - "Admin credentials matched!"
   - "Redirecting to admin-new.html"

#### Step 5: Verify Credentials (Copy-Paste)
```
Email: admin@jit.ac.in
Password: admin123
```
**Important:** Copy and paste these exact credentials (no extra spaces)

#### Step 6: Check localStorage
1. Open Developer Tools (F12)
2. Go to "Application" or "Storage" tab
3. Click "Local Storage" → "http://localhost:8000"
4. Look for "userData" key
5. After login, it should show:
```json
{
  "email": "admin@jit.ac.in",
  "name": "Admin User",
  "role": "admin",
  "isLoggedIn": true
}
```

#### Step 7: Clear localStorage and Try Again
1. In Developer Tools → Console, run:
```javascript
localStorage.clear()
```
2. Refresh page
3. Try logging in again

#### Step 8: Try Incognito/Private Mode
1. Open browser in incognito/private mode
2. Go to http://localhost:8000/login.html
3. Enter admin credentials
4. This eliminates cache/extension issues

---

## Common Issues & Solutions

### Issue 1: Typo in Credentials
**Symptoms:** Login doesn't work, no redirect
**Solution:** 
- Email must be exactly: `admin@jit.ac.in` (lowercase, no spaces)
- Password must be exactly: `admin123` (no spaces)
- Copy-paste from this document to avoid typos

### Issue 2: Browser Cache
**Symptoms:** Old version of login-script.js is loaded
**Solution:**
- Hard refresh: `Ctrl + F5`
- Clear browser cache
- Use incognito mode

### Issue 3: JavaScript Not Loading
**Symptoms:** Form submits but nothing happens
**Solution:**
- Check browser console for errors
- Verify login-script.js is loaded (Network tab in DevTools)
- Check if JavaScript is enabled in browser

### Issue 4: Server Not Running
**Symptoms:** Page doesn't load at all
**Solution:**
- Check if server is running on port 8000
- Restart server: `python -m http.server 8000`
- Try accessing: http://localhost:8000

### Issue 5: Wrong File Path
**Symptoms:** 404 error after login
**Solution:**
- Verify admin-new.html exists in root directory
- Check file name is exactly "admin-new.html" (not admin.html)

---

## Debug Checklist

Use this checklist to diagnose the issue:

- [ ] Server is running on port 8000
- [ ] Can access http://localhost:8000/login.html
- [ ] Browser console shows no errors
- [ ] login-script.js is loaded (check Network tab)
- [ ] Credentials are exactly: admin@jit.ac.in / admin123
- [ ] No extra spaces in email or password
- [ ] Browser cache is cleared
- [ ] localStorage is cleared
- [ ] JavaScript is enabled
- [ ] admin-new.html file exists
- [ ] Test page works: http://localhost:8000/test-admin-login.html

---

## Testing Methods

### Method 1: Use Test Page (Recommended)
```
1. Go to: http://localhost:8000/test-admin-login.html
2. Credentials are pre-filled
3. Click "Test Login"
4. Watch console for debug messages
5. Should redirect to admin panel
```

### Method 2: Manual Console Test
```javascript
// Open browser console (F12) and run:

// Test 1: Check if function exists
console.log(typeof handleLogin);
// Should output: "function"

// Test 2: Simulate login
const testEmail = 'admin@jit.ac.in';
const testPassword = 'admin123';
console.log('Email match:', testEmail === 'admin@jit.ac.in');
console.log('Password match:', testPassword === 'admin123');
// Both should output: true

// Test 3: Check localStorage
localStorage.setItem('userData', JSON.stringify({
    email: 'admin@jit.ac.in',
    name: 'Admin User',
    role: 'admin',
    isLoggedIn: true
}));
console.log('User data set');

// Test 4: Try redirect
window.location.href = 'admin-new.html';
```

### Method 3: Direct Access
```
1. Set localStorage manually (see Test 3 above)
2. Go directly to: http://localhost:8000/admin-new.html
3. Should load admin panel
4. If it loads, login redirect is the issue
5. If it doesn't load, admin-new.html has an issue
```

---

## Expected Behavior

### Correct Login Flow:
```
1. User enters: admin@jit.ac.in / admin123
2. Form submits (handleLogin function called)
3. Credentials match check passes
4. userData saved to localStorage
5. Console shows: "Admin credentials matched!"
6. Console shows: "Redirecting to admin-new.html"
7. Page redirects to admin-new.html
8. Admin panel loads
9. Admin panel checks localStorage
10. Admin panel displays dashboard
```

### What You Should See:
```
Login Page → Enter Credentials → Click Login
    ↓
Console: "Login attempt: admin@jit.ac.in"
Console: "Admin credentials matched!"
Console: "Redirecting to admin-new.html"
    ↓
Admin Panel Loads
    ↓
Dashboard with stats, user management, etc.
```

---

## Browser Console Commands

### Check if login script is loaded:
```javascript
console.log(typeof handleLogin);
// Should output: "function"
```

### Check credentials manually:
```javascript
const email = 'admin@jit.ac.in';
const password = 'admin123';
console.log('Match:', email === 'admin@jit.ac.in' && password === 'admin123');
// Should output: true
```

### Check localStorage:
```javascript
console.log(localStorage.getItem('userData'));
// After login, should show user data
```

### Clear localStorage:
```javascript
localStorage.clear();
console.log('localStorage cleared');
```

### Force redirect:
```javascript
window.location.href = 'admin-new.html';
```

---

## Files to Check

### 1. login.html
- Should have: `<script src="login-script.js"></script>`
- Form should have: `onsubmit="handleLogin(event)"`

### 2. login-script.js
- Should have handleLogin function
- Should check: `email === 'admin@jit.ac.in' && password === 'admin123'`
- Should redirect to: `admin-new.html`

### 3. admin-new.html
- Should exist in root directory
- Should have authentication check at top

---

## Still Not Working?

### Try This:
1. Stop the server (Ctrl+C)
2. Clear browser cache completely
3. Close all browser windows
4. Restart server: `python -m http.server 8000`
5. Open browser in incognito mode
6. Go to: http://localhost:8000/test-admin-login.html
7. Click "Test Login"

### If Test Page Works:
- Issue is with main login page
- Check if login.html is loading login-script.js
- Check browser console for errors

### If Test Page Doesn't Work:
- Issue is with admin-new.html or server
- Check if admin-new.html exists
- Check server is running
- Check file permissions

---

## Contact Information

If none of these solutions work:

1. Check browser console for specific error messages
2. Check server terminal for errors
3. Verify all files exist in correct locations
4. Try different browser
5. Check if antivirus/firewall is blocking

---

## Quick Reference

**Test Page:** http://localhost:8000/test-admin-login.html  
**Login Page:** http://localhost:8000/login.html  
**Admin Panel:** http://localhost:8000/admin-new.html  

**Credentials:**
- Email: `admin@jit.ac.in`
- Password: `admin123`

**Debug Commands:**
```javascript
// Check function
console.log(typeof handleLogin);

// Clear storage
localStorage.clear();

// Force redirect
window.location.href = 'admin-new.html';
```

---

## Success Indicators

You'll know it's working when:
- ✅ Console shows "Admin credentials matched!"
- ✅ Console shows "Redirecting to admin-new.html"
- ✅ Page redirects automatically
- ✅ Admin panel loads with dashboard
- ✅ You see user management, announcements, etc.

---

**Most Common Fix:** Clear browser cache and hard refresh (Ctrl+F5)

**Fastest Test:** Use http://localhost:8000/test-admin-login.html
