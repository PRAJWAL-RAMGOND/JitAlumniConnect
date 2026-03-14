# 📁 JITConnect Project Structure

Complete directory structure of the JITConnect project.

---

## 📂 Root Directory

```
JitAlumniConnect/
│
├── 📄 Configuration Files
│   ├── .env.example                    # Environment variables template
│   ├── .gitignore                      # Git ignore rules
│   ├── .nojekyll                       # GitHub Pages config
│   ├── .vercelignore                   # Vercel ignore rules
│   ├── vercel.json                     # Vercel deployment config
│   ├── netlify.toml                    # Netlify deployment config
│   ├── package.json                    # Frontend dependencies
│   ├── package-lock.json               # Lock file
│   └── manifest.json                   # PWA manifest
│
├── 🌐 Frontend HTML Pages
│   ├── index.html                      # Landing/redirect page
│   ├── login.html                      # Login & registration
│   ├── dashboard.html                  # Main dashboard
│   ├── profile.html                    # User profile
│   ├── explore.html                    # Explore users
│   ├── connections.html                # Connections page
│   ├── messages.html                   # Direct messages
│   ├── jobs.html                       # Jobs board
│   ├── chatbot.html                    # AI chatbot
│   ├── admin.html                      # Admin panel (old)
│   ├── admin-new.html                  # Admin panel (new)
│   └── test-*.html                     # Test pages
│
├── 🎨 Frontend CSS Styles
│   ├── ferrari-styles.css              # Main styles
│   ├── admin-styles.css                # Admin panel styles (old)
│   ├── admin-new-styles.css            # Admin panel styles (new)
│   ├── jobs-styles.css                 # Jobs board styles
│   ├── chatbot-styles.css              # Chatbot styles
│   ├── chatbot-widget.css              # Chatbot widget styles
│   └── achievements-banner.css         # Achievements banner
│
├── ⚡ Frontend JavaScript
│   ├── login-script.js                 # Login/registration logic
│   ├── login-script-backup.js          # Backup
│   ├── dashboard-script.js             # Dashboard logic
│   ├── profile-script.js               # Profile logic
│   ├── edit-profile.js                 # Profile editing
│   ├── explore-script.js               # Explore logic
│   ├── connections-script.js           # Connections logic
│   ├── messages-script.js              # Messages logic
│   ├── jobs-script.js                  # Jobs board logic
│   ├── chatbot-script.js               # Chatbot logic
│   ├── chatbot-widget.js               # Chatbot widget
│   ├── admin-script.js                 # Admin panel logic (old)
│   ├── admin-new-script.js             # Admin panel logic (new)
│   └── performance-monitor.js          # Performance monitoring
│
├── 📚 Documentation
│   ├── README.md                       # Main project README
│   ├── DEPLOYMENT-GUIDE.md             # Complete deployment guide
│   ├── QUICK-START-GUIDE.md            # Quick start guide
│   ├── QUICKSTART.md                   # Quick reference
│   ├── TESTING-GUIDE.md                # Testing instructions
│   ├── COMPLETE-SETUP-GUIDE.md         # Setup guide
│   ├── COMPLETE-SUMMARY.md             # Project summary
│   ├── PROJECT-STATUS.md               # Current status
│   ├── CHANGELOG.md                    # Change history
│   ├── TechStack.md                    # Technology stack
│   ├── Design.md                       # Design documentation
│   └── MRD.md                          # Market requirements
│
├── 📖 Feature Documentation
│   ├── ADMIN-PANEL-README.md           # Admin panel guide
│   ├── ADMIN-PANEL-ENHANCED.md         # Enhanced features
│   ├── ADMIN-PANEL-TEST.md             # Testing guide
│   ├── ADMIN-CREDENTIALS.md            # Login credentials
│   ├── ADMIN-LOGIN-GUIDE.md            # Login instructions
│   ├── ADMIN-LOGIN-TROUBLESHOOTING.md  # Troubleshooting
│   ├── NEW-ADMIN-PANEL-GUIDE.md        # New panel guide
│   ├── ALL-COMMENTS-ADMIN.md           # Comments feature
│   ├── JOBS-FEATURE-README.md          # Jobs board guide
│   ├── CHATBOT-README.md               # Chatbot guide
│   ├── CHATBOT-INTEGRATION-SUMMARY.md  # Integration details
│   ├── CHATBOT-WIDGET-README.md        # Widget guide
│   ├── WIDGET-INTEGRATION-COMPLETE.md  # Widget integration
│   ├── ANNOUNCEMENTS-FEATURE.md        # Announcements
│   ├── LIKE-COMMENT-FEATURE.md         # Like/comment feature
│   └── NEW-FEATURES-ADDED.md           # New features list
│
├── 🚀 Deployment Documentation
│   ├── DEPLOYMENT.md                   # Deployment overview
│   ├── DEPLOYMENT-INSTRUCTIONS.md      # Detailed instructions
│   ├── DEPLOYMENT-CHECKLIST.md         # Pre-deployment checklist
│   ├── DEPLOYMENT-SUCCESS.md           # Success guide
│   ├── DEPLOY-NOW.md                   # Quick deploy
│   ├── DEPLOY-VERCEL-QUICK.md          # Vercel quick guide
│   ├── VERCEL-DEPLOYMENT-GUIDE.md      # Vercel detailed guide
│   ├── VERCEL-CHECKLIST.md             # Vercel checklist
│   ├── VERCEL-TROUBLESHOOTING.md       # Vercel troubleshooting
│   ├── GITHUB-PAGES-FIX.md             # GitHub Pages guide
│   ├── GITHUB-PUSH-SUCCESS.md          # Git push guide
│   ├── HOSTING-GUIDE.md                # Hosting options
│   ├── HOSTING-COMPLETE-GUIDE.md       # Complete hosting guide
│   ├── MONGODB-SETUP.md                # MongoDB setup
│   ├── PRODUCTION-READY.md             # Production checklist
│   ├── FINAL-PRODUCTION-CHECKLIST.md   # Final checks
│   ├── deploy-to-vercel.bat            # Windows deploy script
│   ├── deploy-to-vercel.sh             # Unix deploy script
│   └── DEPLOY-FINAL.bat                # Final deploy script
│
├── 🔧 Setup & Configuration
│   ├── SETUP-INSTRUCTIONS.md           # Setup guide
│   ├── RUN-PROJECT.md                  # How to run
│   ├── LOCAL-SERVER-FIX.md             # Local server issues
│   ├── INTEGRATION-GUIDE.md            # Integration guide
│   ├── IMAGE-SETUP-GUIDE.md            # Image setup
│   ├── IMAGE-UPLOAD-GUIDE.md           # Image upload
│   ├── PROFILE-FIX-GUIDE.md            # Profile fixes
│   ├── PROFILE-FIX-COMPLETE.md         # Profile fix details
│   ├── PROFILE-BACKEND-FIX.md          # Backend profile fix
│   ├── QUICK-REFERENCE.md              # Quick reference
│   ├── READY-TO-USE.md                 # Ready to use guide
│   └── REFINEMENT-SUMMARY.md           # Refinements applied
│
├── 📝 Test & Debug Files
│   ├── TEST-SIGNUP.md                  # Signup testing
│   ├── TEST-POST-BUTTON.md             # Post button testing
│   ├── QUICK-FIX-SUMMARY.txt           # Quick fixes
│   ├── REFINEMENTS-APPLIED.txt         # Applied refinements
│   └── WEBSITE-REFINEMENTS.md          # Website refinements
│
├── 🖼️ Assets
│   └── assets/
│       ├── jit-building.jpg            # Building image
│       └── jit-images/
│           ├── JIT-LOGO.png            # College logo
│           ├── NBA-LOGO-JIT.png        # NBA logo
│           ├── campus-main.jpg         # Campus images
│           ├── campus-main2.jpeg
│           ├── campus-main3.jpg
│           ├── campus-main4.jpg
│           ├── nirf-raking.png         # NIRF ranking
│           └── Sringeri.jpg            # Location image
│
├── 🔄 GitHub Configuration
│   └── .github/
│       └── workflows/
│           └── static.yml              # GitHub Actions workflow
│
├── ⚙️ VS Code Configuration
│   └── .vscode/
│       └── settings.json               # Editor settings
│
└── 📦 Dependencies
    └── node_modules/                   # Frontend dependencies (excluded from git)
```

---

## 🖥️ Backend Server Directory

```
server/
│
├── 📄 Configuration Files
│   ├── .env                            # Environment variables (not in git)
│   ├── .env.example                    # Environment template
│   ├── .gitignore                      # Git ignore rules
│   ├── .node-version                   # Node.js version
│   ├── package.json                    # Backend dependencies
│   ├── package-lock.json               # Lock file
│   ├── render.yaml                     # Render deployment config
│   └── server.js                       # Main server file
│
├── 📚 Documentation
│   ├── README.md                       # Backend README
│   ├── RENDER-DEPLOYMENT.md            # Detailed Render guide
│   └── QUICK-START.md                  # Quick deployment guide
│
├── 🔧 Setup Scripts
│   ├── seedData.js                     # Seed database with data
│   ├── seedPosts.js                    # Seed posts
│   └── setupAdmin.js                   # Setup admin user
│
├── ⚙️ Configuration
│   └── config/
│       └── db.js                       # Database connection
│
├── 🔐 Middleware
│   └── middleware/
│       ├── auth.js                     # Authentication middleware
│       ├── admin.js                    # Admin authorization
│       └── errorHandler.js             # Error handling
│
├── 📊 Models (MongoDB Schemas)
│   └── models/
│       ├── User.js                     # User model
│       ├── Post.js                     # Post model
│       ├── Job.js                      # Job model
│       ├── Message.js                  # Message model
│       ├── Notification.js             # Notification model
│       ├── Announcement.js             # Announcement model
│       ├── Event.js                    # Event model
│       ├── Research.js                 # Research model
│       └── Report.js                   # Report model
│
├── 🛣️ Routes (API Endpoints)
│   └── routes/
│       ├── authRoutes.js               # /api/auth
│       ├── userRoutes.js               # /api/users
│       ├── postRoutes.js               # /api/posts
│       ├── jobRoutes.js                # /api/jobs
│       ├── messageRoutes.js            # /api/messages
│       ├── notificationRoutes.js       # /api/notifications
│       ├── adminRoutes.js              # /api/admin
│       ├── moderationRoutes.js         # /api/moderation
│       ├── announcementRoutes.js       # /api/announcements
│       ├── eventRoutes.js              # /api/events
│       └── researchRoutes.js           # /api/research
│
├── 🔨 Utilities
│   └── utils/
│       ├── validators.js               # Input validation
│       ├── helpers.js                  # Helper functions
│       └── constants.js                # Constants
│
└── 📦 Dependencies
    └── node_modules/                   # Backend dependencies (excluded from git)
```

---

## ⚛️ React Version (Optional)

```
jitconnect-react/
│
├── 📄 Configuration
│   ├── .gitignore                      # Git ignore
│   ├── package.json                    # Dependencies
│   ├── package-lock.json               # Lock file
│   ├── vite.config.js                  # Vite config
│   ├── eslint.config.js                # ESLint config
│   ├── index.html                      # HTML template
│   └── README.md                       # React README
│
├── 🌐 Public Assets
│   └── public/
│       ├── vite.svg                    # Vite logo
│       └── assets/                     # Images (same as main)
│
└── 📦 Source Code
    └── src/
        ├── main.jsx                    # Entry point
        ├── App.jsx                     # Main app component
        ├── App.css                     # App styles
        ├── index.css                   # Global styles
        ├── ferrari-styles.css          # Main styles
        ├── achievements-banner.css     # Banner styles
        │
        ├── assets/                     # React assets
        │   └── react.svg
        │
        ├── components/                 # Reusable components
        │   ├── Sidebar.jsx
        │   ├── Notifications.jsx
        │   └── PasswordStrength.jsx
        │
        ├── pages/                      # Page components
        │   ├── Login.jsx
        │   ├── Dashboard.jsx
        │   ├── Profile.jsx
        │   ├── Explore.jsx
        │   ├── Connections.jsx
        │   ├── Messages.jsx
        │   ├── Jobs.jsx
        │   ├── Admin.jsx
        │   └── Moderation.jsx
        │
        └── services/                   # API services
            └── api.js
```

---

## 📊 File Count Summary

### Frontend (Root)
- HTML Files: 15+
- CSS Files: 8+
- JavaScript Files: 15+
- Documentation: 50+
- Configuration: 10+

### Backend (server/)
- Main Files: 3
- Routes: 10
- Models: 9
- Middleware: 3
- Config: 1
- Documentation: 3

### React Version (jitconnect-react/)
- Components: 3
- Pages: 9
- Services: 1
- Config: 5

---

## 🔑 Key Files

### Must-Have Files
1. `index.html` - Landing page
2. `login.html` - Authentication
3. `dashboard.html` - Main app
4. `admin-new.html` - Admin panel
5. `server/server.js` - Backend API
6. `vercel.json` - Deployment config
7. `server/render.yaml` - Backend deployment

### Configuration Files
1. `.env.example` - Environment template
2. `package.json` - Dependencies
3. `manifest.json` - PWA config
4. `server/.env.example` - Backend env template
5. `server/package.json` - Backend dependencies

### Documentation Files
1. `README.md` - Main documentation
2. `DEPLOYMENT-GUIDE.md` - Deployment instructions
3. `server/RENDER-DEPLOYMENT.md` - Backend deployment
4. `ADMIN-CREDENTIALS.md` - Login credentials
5. `QUICK-START-GUIDE.md` - Quick start

---

## 🚫 Excluded from Git

```
.gitignore includes:
- node_modules/
- .env
- .env.local
- *.log
- .DS_Store
- .vscode/ (some files)
- dist/
- build/
```

---

## 📦 Total Project Size

- **Frontend:** ~50 MB (with node_modules)
- **Backend:** ~100 MB (with node_modules)
- **React Version:** ~200 MB (with node_modules)
- **Without node_modules:** ~5 MB

---

## 🔗 Important Paths

### Frontend URLs (Local)
```
http://localhost:8000/
http://localhost:8000/login.html
http://localhost:8000/dashboard.html
http://localhost:8000/admin-new.html
http://localhost:8000/jobs.html
http://localhost:8000/chatbot.html
```

### Backend URLs (Local)
```
http://localhost:5000/
http://localhost:5000/api/auth
http://localhost:5000/api/posts
http://localhost:5000/api/users
http://localhost:5000/api/jobs
http://localhost:5000/api/admin
```

### Production URLs (After Deployment)
```
Frontend: https://jitconnect.vercel.app
Backend: https://jitconnect-backend.onrender.com
```

---

## 📝 Notes

1. **node_modules/** directories are excluded from git but required for running
2. **.env** files contain sensitive data and are not committed
3. **Test files** (test-*.html) are for development only
4. **Backup files** (*-backup.js) are kept for reference
5. **Documentation** is extensive for easy onboarding

---

## 🎯 Quick Navigation

- **Start Here:** `README.md`
- **Deploy Backend:** `server/QUICK-START.md`
- **Deploy Frontend:** `DEPLOYMENT-GUIDE.md`
- **Admin Login:** `ADMIN-CREDENTIALS.md`
- **Testing:** `TESTING-GUIDE.md`
- **Troubleshooting:** `VERCEL-TROUBLESHOOTING.md`

---

**Last Updated:** March 14, 2026

**Project:** JITConnect - College Social Network Platform
