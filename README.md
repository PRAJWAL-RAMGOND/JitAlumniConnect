# 🎓 JITConnect - College Social Network

A private, college-exclusive social networking platform for Jyothy Institute of Technology (JIT) members.

## 🌟 Features

### Core Features
- 🏠 **Home Feed** - Share achievements, posts, and updates
- 🔍 **Explore** - Discover students, faculty, and alumni
- 💬 **Messages** - Direct messaging system
- 👤 **Profile** - Personal profile management
- 🤝 **Connections** - Network with peers and alumni

### Alumni Matcher Chatbot 🤖
- **Floating Widget** - Quick access on every page
- **Smart Matching** - AI-powered alumni recommendations
- **Interest-Based** - Career, Internship, Skills, Company insights
- **Full Page Mode** - Detailed matching and profiles
- **Student-Only** - Secure, authenticated access

## 🚀 Live Demo

**URL:** [Your Netlify URL will appear here after deployment]

### Test Accounts
- **Student**: Any email/password (auto-creates student account)
- **Role**: Student (for chatbot access)

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3 (Ferrari-style design system)
- Vanilla JavaScript
- Responsive Design

### Features
- Role-based authentication
- LocalStorage for session management
- Floating chatbot widget
- Real-time UI updates
- Mobile-responsive

## 📦 Installation

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd jitconnect
   ```

2. **Start local server**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # OR using Node.js
   npm install
   npm start
   ```

3. **Open in browser**
   ```
   http://localhost:8000/login.html
   ```

## 🌐 Deployment

### Deploy to Netlify (Recommended)

**Option 1: Drag & Drop**
1. Go to https://app.netlify.com/drop
2. Drag your project folder
3. Done! Get instant live URL

**Option 2: GitHub Integration**
1. Push code to GitHub
2. Connect repository to Netlify
3. Auto-deploy on every push

**Option 3: Netlify CLI**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to GitHub Pages
1. Push to GitHub
2. Go to Settings → Pages
3. Select branch and deploy

## 📱 Pages

- **login.html** - Authentication page
- **dashboard.html** - Home feed with posts
- **explore.html** - Discover people
- **messages.html** - Direct messaging
- **profile.html** - User profile
- **connections.html** - Network management
- **chatbot.html** - Full alumni matcher page

## 🤖 Chatbot Features

### Floating Widget
- Appears on all pages (except login)
- Student-only access
- Quick conversations
- Expandable to fullscreen

### Full Page Chatbot
- Detailed alumni matching
- Match scoring algorithm
- Profile browsing
- Connection requests

### Matching Algorithm
- Interest alignment (3 points)
- Same branch (2 points)
- Company match (4 points)
- Skill overlap (3 points)

## 🎨 Design System

### Colors
- **Primary**: Gradient Purple (#667eea → #764ba2)
- **Accent**: Ferrari Red (#DC0000)
- **Background**: White / Light Gray
- **Text**: Dark Gray (#1A1A1A)

### Typography
- **Font**: Montserrat
- **Weights**: 300, 400, 500, 600, 700, 800, 900

### Components
- Glassmorphism cards
- Smooth animations
- Gradient buttons
- Floating action buttons

## 📚 Documentation

- **INTEGRATION-GUIDE.md** - Complete integration guide
- **CHATBOT-README.md** - Chatbot feature documentation
- **CHATBOT-WIDGET-README.md** - Widget documentation
- **HOSTING-GUIDE.md** - Deployment instructions

## 🔐 Security

- Role-based access control
- Session management
- Student-only chatbot access
- Input validation
- Secure headers (Netlify)

## 🧪 Testing

### Test Chatbot Integration
```
http://localhost:8000/test-chatbot.html
```

### Test Scenarios
1. Student login → See chatbot widget
2. Faculty login → No chatbot widget
3. No login → Redirect to login
4. Mobile responsive → All features work

## 📊 Project Structure

```
jitconnect/
├── assets/
│   └── jit-images/          # College images and logos
├── login.html               # Authentication page
├── dashboard.html           # Home feed
├── explore.html            # Discover page
├── messages.html           # Messaging
├── profile.html            # User profile
├── connections.html        # Network
├── chatbot.html            # Full chatbot page
├── chatbot-widget.js       # Floating widget
├── chatbot-widget.css      # Widget styles
├── ferrari-styles.css      # Main styles
├── netlify.toml           # Netlify config
└── README.md              # This file
```

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Basic social features
- ✅ Alumni matcher chatbot
- ✅ Floating widget
- ✅ Authentication

### Phase 2 (Planned)
- [ ] Backend API (Node.js + MongoDB)
- [ ] Real alumni database
- [ ] JWT authentication
- [ ] Real-time messaging
- [ ] Notifications

### Phase 3 (Future)
- [ ] AI-powered matching
- [ ] Mobile app
- [ ] Analytics dashboard
- [ ] Event management
- [ ] Resume upload

## 🤝 Contributing

This is a college project for Jyothy Institute of Technology.

## 📄 License

MIT License - Feel free to use for educational purposes

## 👨‍💻 Developer

Built with ❤️ for JIT students

## 🆘 Support

For issues or questions:
- Check documentation files
- Review HOSTING-GUIDE.md
- Test using test-chatbot.html

## 🎉 Acknowledgments

- Jyothy Institute of Technology
- All JIT students, faculty, and alumni
- Design inspiration: LinkedIn + Instagram

---

**Status:** ✅ Ready for deployment
**Version:** 1.0.0
**Last Updated:** March 2026

---

*Connecting JIT students with alumni through intelligent matching* 🚀
