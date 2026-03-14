# 🚀 JITConnect Deployment Guide

Complete guide for deploying JITConnect frontend and backend.

---

## 📦 Project Structure

```
JitAlumniConnect/
├── server/                    # Backend API
│   ├── QUICK-START.md        # 5-minute Render deployment
│   ├── RENDER-DEPLOYMENT.md  # Detailed Render guide
│   └── server.js             # Main server file
├── *.html                     # Frontend files
├── *.css                      # Styles
├── *.js                       # Frontend scripts
└── vercel.json               # Vercel configuration
```

---

## 🎯 Deployment Overview

### Backend → Render
- **Platform:** Render.com
- **Type:** Web Service
- **Database:** MongoDB Atlas
- **Guide:** See `server/QUICK-START.md`

### Frontend → Vercel
- **Platform:** Vercel.com
- **Type:** Static Site
- **Guide:** See below

---

## 1️⃣ Deploy Backend (Render)

### Quick Steps
```bash
cd server
```

Follow the guide in `server/QUICK-START.md`:
1. Setup MongoDB Atlas (2 min)
2. Push to GitHub (1 min)
3. Deploy on Render (2 min)

**Result:** Backend live at `https://jitconnect-backend.onrender.com`

📚 **Detailed Guide:** `server/RENDER-DEPLOYMENT.md`

---

## 2️⃣ Deploy Frontend (Vercel)

### Prerequisites
- Vercel account (free)
- GitHub account
- Backend deployed and URL ready

### Step 1: Update API URLs in Frontend

Find and update all API base URLs in your frontend JavaScript files:

**Files to update:**
- `admin-script.js`
- `admin-new-script.js`
- `dashboard-script.js`
- `jobs-script.js`
- Any other files making API calls

**Change from:**
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

**Change to:**
```javascript
const API_BASE_URL = 'https://jitconnect-backend.onrender.com/api';
```

### Step 2: Push to GitHub

```bash
# From project root
git add .
git commit -m "Update API URLs for production"
git push origin main
```

### Step 3: Deploy on Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: jitconnect
# - Directory: ./
# - Override settings? No

# Deploy to production
vercel --prod
```

#### Option B: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Other
   - **Root Directory:** ./
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)
5. Click **Deploy**

### Step 4: Configure Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

---

## 3️⃣ Update CORS Settings

After deploying frontend, update backend CORS:

**File:** `server/server.js`

```javascript
app.use(cors({
  origin: [
    'http://localhost:8000',
    'https://jitconnect.vercel.app',  // Your Vercel URL
    'https://your-custom-domain.com'   // If using custom domain
  ],
  credentials: true
}));
```

Commit and push changes - Render will auto-deploy.

---

## ✅ Verification Checklist

### Backend (Render)
- [ ] Service shows "Live" status
- [ ] Health check returns JSON: `{"message": "JITConnect API is running..."}`
- [ ] MongoDB connection successful (check logs)
- [ ] Environment variables set correctly

**Test:**
```bash
curl https://jitconnect-backend.onrender.com
```

### Frontend (Vercel)
- [ ] Site loads without errors
- [ ] Login page accessible
- [ ] Can login with credentials
- [ ] API calls work (check browser console)
- [ ] No CORS errors

**Test:**
```
https://jitconnect.vercel.app/login.html
```

### Integration
- [ ] Frontend can communicate with backend
- [ ] Login works end-to-end
- [ ] Posts load correctly
- [ ] Jobs board works
- [ ] Admin panel accessible

---

## 🔧 Configuration Files

### Backend (Render)
- `server/render.yaml` - Render configuration
- `server/.node-version` - Node.js version
- `server/.env` - Environment variables (not committed)

### Frontend (Vercel)
- `vercel.json` - Vercel configuration (cache control)

---

## 🌐 Production URLs

After deployment:

### Backend API
```
https://jitconnect-backend.onrender.com
```

### Frontend
```
https://jitconnect.vercel.app
```

### API Endpoints
```
https://jitconnect-backend.onrender.com/api/auth
https://jitconnect-backend.onrender.com/api/posts
https://jitconnect-backend.onrender.com/api/users
https://jitconnect-backend.onrender.com/api/jobs
https://jitconnect-backend.onrender.com/api/admin
```

---

## 🔒 Security Checklist

### Before Going Live
- [ ] Change default admin password
- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Enable MongoDB authentication
- [ ] Restrict MongoDB network access
- [ ] Set up HTTPS only
- [ ] Add rate limiting
- [ ] Enable security headers
- [ ] Set up monitoring/alerts
- [ ] Configure backup strategy
- [ ] Review CORS settings

---

## 📊 Monitoring

### Render Dashboard
- View logs in real-time
- Monitor service health
- Check resource usage
- View deployment history

### Vercel Dashboard
- View deployment logs
- Monitor bandwidth usage
- Check function invocations
- View analytics

---

## 🐛 Common Issues

### Issue: CORS Error
**Solution:** Update CORS settings in `server/server.js` to include your Vercel URL

### Issue: API Not Responding
**Solution:** Check Render logs, verify environment variables, restart service

### Issue: Database Connection Failed
**Solution:** Verify MongoDB URI, check network access, test connection locally

### Issue: Frontend Shows Old Content
**Solution:** Clear browser cache, check vercel.json cache settings

---

## 💰 Cost Breakdown

### Free Tier (Recommended for Testing)
- **Render:** Free (750 hours/month, spins down after 15 min)
- **Vercel:** Free (100 GB bandwidth, unlimited deployments)
- **MongoDB Atlas:** Free (512 MB storage, shared cluster)
- **Total:** $0/month

### Production Tier (Recommended for Live)
- **Render:** $7/month (always on, no spin down)
- **Vercel:** Free or $20/month (Pro features)
- **MongoDB Atlas:** Free or $9/month (dedicated cluster)
- **Total:** $7-36/month

---

## 📚 Additional Resources

### Documentation
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)

### Guides
- `server/QUICK-START.md` - Fast backend deployment
- `server/RENDER-DEPLOYMENT.md` - Detailed backend guide
- `server/README.md` - Backend documentation

---

## 🎉 Next Steps

1. ✅ Deploy backend on Render
2. ✅ Deploy frontend on Vercel
3. ✅ Test complete application
4. ✅ Update CORS settings
5. ✅ Change default passwords
6. ✅ Set up monitoring
7. ✅ Configure custom domain (optional)
8. ✅ Share with users!

---

## 📞 Support

Need help? Check:
1. `server/QUICK-START.md` for quick deployment
2. `server/RENDER-DEPLOYMENT.md` for detailed guide
3. Render/Vercel documentation
4. GitHub issues

---

**Your JITConnect platform is ready to deploy! 🚀**

Start with backend deployment, then frontend, and you'll be live in under 10 minutes!
