# ⚡ Quick Start - Deploy to Render in 5 Minutes

## 🎯 What You Need

1. MongoDB Atlas connection string
2. GitHub account
3. Render account (free)

---

## 📋 Quick Steps

### 1️⃣ Setup MongoDB Atlas (2 minutes)
```
1. Go to mongodb.com/cloud/atlas
2. Create free cluster
3. Add database user (save username/password)
4. Allow access from anywhere (0.0.0.0/0)
5. Get connection string
```

Your connection string looks like:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/jitconnect?retryWrites=true&w=majority
```

---

### 2️⃣ Push to GitHub (1 minute)
```bash
cd server
git init
git add .
git commit -m "Deploy to Render"
git remote add origin https://github.com/YOUR_USERNAME/jitconnect-backend.git
git push -u origin main
```

---

### 3️⃣ Deploy on Render (2 minutes)
```
1. Go to render.com
2. Click "New +" → "Web Service"
3. Connect GitHub repo
4. Configure:
   - Name: jitconnect-backend
   - Build: npm install
   - Start: npm start
5. Add Environment Variables:
   - NODE_ENV = production
   - PORT = 10000
   - MONGODB_URI = (your MongoDB connection string)
   - JWT_SECRET = (random 32+ character string)
6. Click "Create Web Service"
```

---

## ✅ Done!

Your backend will be live at:
```
https://jitconnect-backend.onrender.com
```

Test it:
```bash
curl https://jitconnect-backend.onrender.com
```

---

## 🔧 Update Frontend

In your frontend code, change API URL:
```javascript
const API_BASE_URL = 'https://jitconnect-backend.onrender.com/api';
```

---

## 📚 Need More Details?

See `RENDER-DEPLOYMENT.md` for complete guide with screenshots and troubleshooting.

---

**That's it! Your backend is deployed! 🎉**
