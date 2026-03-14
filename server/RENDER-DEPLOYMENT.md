# 🚀 Render Deployment Guide for JITConnect Backend

## Prerequisites

1. **GitHub Account** - Your code should be pushed to GitHub
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **MongoDB Atlas Account** - For database hosting (free tier available)

---

## Step 1: Prepare MongoDB Atlas

### 1.1 Create MongoDB Atlas Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new cluster (Free M0 tier is sufficient)
4. Wait for cluster to be created (2-3 minutes)

### 1.2 Configure Database Access
1. Go to **Database Access** in left sidebar
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Create username and password (save these!)
5. Set user privileges to **Read and write to any database**
6. Click **Add User**

### 1.3 Configure Network Access
1. Go to **Network Access** in left sidebar
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (0.0.0.0/0)
4. Click **Confirm**

### 1.4 Get Connection String
1. Go to **Database** in left sidebar
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `jitconnect`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/jitconnect?retryWrites=true&w=majority
```

---

## Step 2: Push Code to GitHub

### 2.1 Initialize Git (if not already done)
```bash
cd server
git init
git add .
git commit -m "Initial commit for Render deployment"
```

### 2.2 Create GitHub Repository
1. Go to [GitHub](https://github.com)
2. Click **New Repository**
3. Name it `jitconnect-backend`
4. Don't initialize with README
5. Click **Create Repository**

### 2.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/jitconnect-backend.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy on Render

### 3.1 Create New Web Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** button
3. Select **Web Service**
4. Connect your GitHub account if not already connected
5. Select your `jitconnect-backend` repository

### 3.2 Configure Web Service

**Basic Settings:**
- **Name:** `jitconnect-backend`
- **Region:** Choose closest to you (e.g., Oregon)
- **Branch:** `main`
- **Root Directory:** Leave empty (or `server` if repo includes frontend)
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- Select **Free** (or paid plan for better performance)

### 3.3 Add Environment Variables

Click **Advanced** and add these environment variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Generate a random secure string (e.g., use [randomkeygen.com](https://randomkeygen.com)) |

**Important:** 
- For `MONGODB_URI`, paste your complete MongoDB Atlas connection string
- For `JWT_SECRET`, use a long random string (at least 32 characters)

### 3.4 Deploy
1. Click **Create Web Service**
2. Render will start building and deploying
3. Wait 3-5 minutes for deployment to complete
4. You'll see logs in real-time

---

## Step 4: Verify Deployment

### 4.1 Check Service Status
1. Once deployed, you'll see **Live** status
2. Your backend URL will be: `https://jitconnect-backend.onrender.com`

### 4.2 Test API
Open your browser or use curl:
```bash
curl https://jitconnect-backend.onrender.com
```

You should see:
```json
{
  "message": "JITConnect API is running..."
}
```

### 4.3 Test API Endpoints
```bash
# Health check
curl https://jitconnect-backend.onrender.com/

# Test auth endpoint
curl https://jitconnect-backend.onrender.com/api/auth/test
```

---

## Step 5: Update Frontend Configuration

### 5.1 Update API Base URL
In your frontend code, update the API base URL to point to Render:

**Before (local):**
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

**After (production):**
```javascript
const API_BASE_URL = 'https://jitconnect-backend.onrender.com/api';
```

### 5.2 Update CORS Settings (if needed)
In `server/server.js`, update CORS to allow your frontend domain:

```javascript
app.use(cors({
  origin: [
    'http://localhost:8000',
    'https://your-frontend-domain.vercel.app'
  ],
  credentials: true
}));
```

---

## Step 6: Seed Database (Optional)

### 6.1 Run Seed Scripts
If you have seed data, you can run it locally pointing to production DB:

```bash
# Update .env with production MONGODB_URI
node seedData.js
node seedPosts.js
node setupAdmin.js
```

Or create a one-time job on Render to run seed scripts.

---

## Important Notes

### Free Tier Limitations
- ⚠️ **Spin Down:** Free tier services spin down after 15 minutes of inactivity
- ⚠️ **Cold Start:** First request after spin down takes 30-60 seconds
- ⚠️ **750 Hours/Month:** Free tier includes 750 hours per month

### Recommendations
- Use paid tier ($7/month) for production to avoid spin down
- Set up health check pings to keep service alive
- Monitor logs regularly

### Security Best Practices
- ✅ Never commit `.env` file
- ✅ Use strong JWT_SECRET
- ✅ Restrict MongoDB network access in production
- ✅ Enable MongoDB authentication
- ✅ Use HTTPS only
- ✅ Implement rate limiting

---

## Troubleshooting

### Build Failed
**Check:**
- Node version compatibility (use .node-version file)
- All dependencies in package.json
- Build logs for specific errors

**Solution:**
```bash
# Test build locally
npm install
npm start
```

### Database Connection Failed
**Check:**
- MongoDB Atlas connection string is correct
- Password doesn't contain special characters (URL encode if needed)
- Network access allows 0.0.0.0/0
- Database user has correct permissions

**Solution:**
- Test connection string locally first
- Check MongoDB Atlas logs

### Service Not Responding
**Check:**
- Service status in Render dashboard
- Logs for errors
- Environment variables are set correctly

**Solution:**
- Restart service from Render dashboard
- Check logs for specific errors

### CORS Errors
**Check:**
- CORS configuration in server.js
- Frontend is using correct API URL

**Solution:**
```javascript
app.use(cors({
  origin: '*', // For testing only
  credentials: true
}));
```

---

## Monitoring & Maintenance

### View Logs
1. Go to Render Dashboard
2. Click on your service
3. Click **Logs** tab
4. View real-time logs

### Restart Service
1. Go to Render Dashboard
2. Click on your service
3. Click **Manual Deploy** > **Clear build cache & deploy**

### Update Environment Variables
1. Go to Render Dashboard
2. Click on your service
3. Click **Environment** tab
4. Update variables
5. Service will automatically redeploy

---

## Your Backend URLs

After deployment, your API will be available at:

- **Base URL:** `https://jitconnect-backend.onrender.com`
- **Auth API:** `https://jitconnect-backend.onrender.com/api/auth`
- **Posts API:** `https://jitconnect-backend.onrender.com/api/posts`
- **Users API:** `https://jitconnect-backend.onrender.com/api/users`
- **Jobs API:** `https://jitconnect-backend.onrender.com/api/jobs`
- **Admin API:** `https://jitconnect-backend.onrender.com/api/admin`

---

## Next Steps

1. ✅ Deploy backend on Render
2. ✅ Test all API endpoints
3. ✅ Update frontend to use production API URL
4. ✅ Deploy frontend on Vercel
5. ✅ Test complete application
6. ✅ Set up monitoring and alerts

---

## Support

- **Render Docs:** https://render.com/docs
- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com
- **Node.js Docs:** https://nodejs.org/docs

---

**Your backend is ready to deploy! 🚀**

Follow the steps above and your JITConnect backend will be live on Render.
