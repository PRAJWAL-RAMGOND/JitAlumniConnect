# 🔐 Alumni Matcher Chatbot - Integration Guide

## Overview

The Alumni Matcher chatbot has been fully integrated into JITConnect with authentication and role-based access control. Only logged-in students can access the chatbot feature.

---

## 🎯 Key Features

### Authentication & Access Control

✅ **Login Required**: Users must be logged in to access the chatbot
✅ **Student-Only Access**: Only users with role='student' can use the chatbot
✅ **Automatic Redirect**: Non-authenticated users are redirected to login page
✅ **Role Validation**: Faculty, alumni, and departments are redirected to dashboard

### Personalization

✅ **User-Specific Welcome**: Chatbot greets students by name
✅ **Branch-Based Matching**: Prioritizes alumni from the same branch
✅ **Profile Integration**: Uses student's profile data for better matching

---

## 📁 Updated Files

### New Files Created
1. `chatbot.html` - Main chatbot interface
2. `chatbot-styles.css` - Chatbot styling
3. `chatbot-script.js` - Chatbot logic with authentication
4. `CHATBOT-README.md` - Feature documentation
5. `INTEGRATION-GUIDE.md` - This file

### Modified Files
1. `dashboard.html` - Added chatbot navigation link
2. `explore.html` - Added chatbot navigation link
3. `messages.html` - Added chatbot navigation link
4. `profile.html` - Added chatbot navigation link
5. `connections.html` - Added chatbot navigation link
6. `login-script.js` - Updated to include branch info for students

---

## 🔒 Authentication Flow

```
User clicks "Alumni Matcher" → 
  ↓
Check localStorage for 'userData' →
  ↓
  ├─ No userData? → Redirect to login.html
  ↓
  ├─ Role != 'student'? → Redirect to dashboard.html
  ↓
  └─ Role == 'student' → Load chatbot with personalized data
```

### Code Implementation

```javascript
// In chatbot-script.js
function checkAuth() {
    const userData = localStorage.getItem('userData');
    if (!userData) {
        alert('Please login to access Alumni Matcher');
        window.location.href = 'login.html';
        return null;
    }
    const user = JSON.parse(userData);
    
    // Only students can access chatbot
    if (user.role !== 'student') {
        alert('Alumni Matcher is only available for students');
        window.location.href = 'dashboard.html';
        return null;
    }
    
    return user;
}
```

---

## 🎨 Navigation Integration

The chatbot link has been added to all pages:

```html
<li class="nav-item">
    <a href="chatbot.html" class="nav-link">
        <span>🤖</span> ALUMNI MATCHER
    </a>
</li>
```

### Navigation Order
1. 🏠 HOME
2. 🔍 EXPLORE
3. 💬 MESSAGES
4. 🤖 ALUMNI MATCHER ← New!
5. 👤 PROFILE
6. 🤝 CONNECTIONS
7. 🚪 LOGOUT

---

## 👤 User Data Structure

### Student Login Data
```javascript
{
    email: "student@jit.ac.in",
    name: "Demo Student",
    role: "student",
    branch: "CSE",
    year: "3rd Year",
    isLoggedIn: true
}
```

### How Chatbot Uses This Data
- `name` → Personalized welcome message
- `branch` → Prioritizes alumni from same branch (+2 match score)
- `role` → Access control (only 'student' allowed)

---

## 🧪 Testing the Integration

### Test Case 1: Student Access (Should Work)
1. Go to `http://localhost:8000/login.html`
2. Login with any credentials
3. Click "ALUMNI MATCHER" in sidebar
4. ✅ Should load chatbot with personalized greeting

### Test Case 2: Direct Access Without Login (Should Redirect)
1. Clear localStorage: `localStorage.clear()`
2. Navigate directly to `http://localhost:8000/chatbot.html`
3. ✅ Should show alert and redirect to login page

### Test Case 3: Non-Student Access (Should Block)
1. Modify userData role to 'faculty' or 'alumni'
2. Try accessing chatbot
3. ✅ Should show alert and redirect to dashboard

### Test Case 4: Navigation Consistency
1. Login as student
2. Navigate through all pages
3. ✅ "ALUMNI MATCHER" link should appear on all pages
4. ✅ Active state should highlight on chatbot.html

---

## 🔧 Customization Options

### Change Access Control

To allow other roles (e.g., alumni) to access chatbot:

```javascript
// In chatbot-script.js, modify checkAuth()
if (user.role !== 'student' && user.role !== 'alumni') {
    alert('Alumni Matcher is only available for students and alumni');
    window.location.href = 'dashboard.html';
    return null;
}
```

### Customize Welcome Message

```javascript
// In chatbot-script.js, modify displayWelcomeMessage()
function displayWelcomeMessage() {
    const userName = currentUser.name || 'Student';
    const userBranch = currentUser.branch || 'your department';
    const userYear = currentUser.year || '';
    
    const firstMessage = document.querySelector('.bot-message .message-content p');
    if (firstMessage) {
        firstMessage.textContent = `Hi ${userName} (${userYear})! I'm your Alumni Matcher Assistant...`;
    }
}
```

### Add More User Data to Matching

```javascript
// In findMatchingAlumni(), add more criteria
if (conversationState.year && alumni.batch) {
    const yearDiff = Math.abs(parseInt(conversationState.year) - parseInt(alumni.batch));
    if (yearDiff <= 2) score += 1; // Recent alumni
}
```

---

## 🚀 Deployment Checklist

Before deploying to production:

### Security
- [ ] Implement proper backend authentication (JWT)
- [ ] Validate user sessions server-side
- [ ] Add CSRF protection
- [ ] Sanitize all user inputs
- [ ] Use HTTPS only

### Data
- [ ] Replace mock alumni data with real database
- [ ] Create API endpoints for alumni matching
- [ ] Store conversation history in database
- [ ] Implement connection request system

### Testing
- [ ] Test all authentication scenarios
- [ ] Verify role-based access control
- [ ] Test on multiple browsers
- [ ] Mobile responsiveness check
- [ ] Load testing with multiple users

### Performance
- [ ] Optimize alumni search algorithm
- [ ] Add pagination for large result sets
- [ ] Implement caching for frequent queries
- [ ] Lazy load chat messages

---

## 📊 Usage Analytics (Future Enhancement)

Track these metrics for insights:

```javascript
// Example analytics events
analytics.track('chatbot_opened', {
    userId: currentUser.id,
    branch: currentUser.branch,
    timestamp: Date.now()
});

analytics.track('alumni_matched', {
    userId: currentUser.id,
    matchCount: matches.length,
    interest: conversationState.interest
});

analytics.track('connection_requested', {
    studentId: currentUser.id,
    alumniId: alumniId,
    matchScore: matchScore
});
```

---

## 🐛 Troubleshooting

### Issue: Chatbot redirects to login even when logged in

**Solution**: Check localStorage
```javascript
// In browser console
console.log(localStorage.getItem('userData'));
// Should show user data, not null
```

### Issue: Navigation link not showing

**Solution**: Clear browser cache and hard reload (Ctrl+Shift+R)

### Issue: Welcome message shows "undefined"

**Solution**: Ensure login script sets all required fields
```javascript
// In login-script.js, verify userData includes:
{
    name: "...",
    branch: "...",
    role: "student"
}
```

### Issue: Alumni not matching correctly

**Solution**: Check conversationState
```javascript
// In browser console on chatbot page
console.log(conversationState);
// Verify interest, branch, skills are being set
```

---

## 🔄 Backend Integration (Next Steps)

### API Endpoints Needed

```javascript
// Authentication
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/verify

// Chatbot
GET  /api/chatbot/alumni/match
POST /api/chatbot/conversation/save
GET  /api/chatbot/conversation/:userId
POST /api/chatbot/connection/request

// Alumni
GET  /api/alumni/list
GET  /api/alumni/:id
GET  /api/alumni/filter
```

### Database Schema

```javascript
// Users Collection
{
    _id: ObjectId,
    name: String,
    email: String,
    role: String, // 'student', 'alumni', 'faculty', 'department'
    branch: String,
    year: String,
    // ... other fields
}

// Alumni Collection
{
    _id: ObjectId,
    userId: ObjectId,
    company: String,
    designation: String,
    batch: String,
    skills: [String],
    expertise: [String],
    interests: [String],
    availability: Boolean
}

// Chatbot Conversations
{
    _id: ObjectId,
    studentId: ObjectId,
    messages: [{
        sender: String,
        text: String,
        timestamp: Date
    }],
    state: Object,
    matches: [ObjectId],
    createdAt: Date
}

// Connection Requests
{
    _id: ObjectId,
    studentId: ObjectId,
    alumniId: ObjectId,
    message: String,
    status: String, // 'pending', 'accepted', 'rejected'
    createdAt: Date
}
```

---

## 📝 User Guide

### For Students

**How to Access:**
1. Login to JITConnect
2. Click "🤖 ALUMNI MATCHER" in the sidebar
3. Start chatting!

**How to Use:**
1. Select your primary interest (Career/Internship/Skills/Company)
2. Answer follow-up questions
3. Review matched alumni in the right panel
4. Click "Connect Now" to send connection request
5. Type custom questions for more help

**Tips:**
- Be specific about your interests
- Mention your career goals
- Ask about specific companies
- Inquire about skills to learn

---

## 🎓 For Developers

### Adding New Features

**Add New Interest Category:**
```javascript
// In chatbot-script.js
// 1. Add to initial options in HTML
<button class="quick-reply-btn" onclick="selectInterest('research')">Research Guidance</button>

// 2. Add case in selectInterest()
case 'research':
    response = "Looking for research opportunities?";
    followUp = ['AI/ML', 'IoT', 'Blockchain', 'Cybersecurity'];
    break;
```

**Add New Matching Criteria:**
```javascript
// In findMatchingAlumni()
// Match by location
if (conversationState.location && alumni.location === conversationState.location) {
    score += 2;
}
```

**Customize Alumni Cards:**
```javascript
// In displayMatchedAlumni()
card.innerHTML = `
    // Add more fields
    <div class="alumni-location">📍 ${person.location}</div>
    <div class="alumni-experience">💼 ${person.experience} years</div>
`;
```

---

## ✅ Integration Complete!

The Alumni Matcher chatbot is now fully integrated with:
- ✅ Authentication system
- ✅ Role-based access control
- ✅ Personalized user experience
- ✅ Consistent navigation across all pages
- ✅ Student-only access restriction

**Ready to use!** Students can now login and access the chatbot to find and connect with alumni based on their interests.

---

## 📞 Support

For issues or questions:
- Check browser console for errors
- Verify localStorage data
- Test authentication flow
- Review this integration guide

**Happy Connecting! 🎉**
