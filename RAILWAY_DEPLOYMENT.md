# 🚀 Railway Deployment Guide

Complete guide to deploy your healthcare backend to Railway.

## Prerequisites

- ✅ Railway account ([Sign up here](https://railway.app/))
- ✅ MongoDB Atlas account ([Sign up here](https://www.mongodb.com/cloud/atlas/register))
- ✅ Git installed on your computer

---

## Step 1: Set Up MongoDB Atlas (Cloud Database)

Since Railway doesn't provide MongoDB, you'll use MongoDB Atlas (free tier available).

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Create a new project (e.g., "HealthCare Backend")

### 1.2 Create a Cluster
1. Click **"Build a Database"**
2. Choose **"M0 Free"** tier
3. Select a cloud provider and region (choose one close to your users)
4. Click **"Create Cluster"** (takes 3-5 minutes)

### 1.3 Configure Database Access
1. Go to **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Create a username and password (save these!)
4. Set privileges to **"Read and write to any database"**
5. Click **"Add User"**

### 1.4 Configure Network Access
1. Go to **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for Railway)
4. Click **"Confirm"**

### 1.5 Get Connection String
1. Go to **"Database"** in the left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<username>` and `<password>` with your actual credentials
6. Add `/healthcare` before the `?` to specify the database name:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/healthcare?retryWrites=true&w=majority
   ```

---

## Step 2: Prepare Your Code for Deployment

### 2.1 Initialize Git Repository (if not already done)

Open PowerShell in your project directory and run:

```powershell
cd "c:\Mugi\Projects\Chinna akka\health-care-backend"
git init
git add .
git commit -m "Initial commit - Healthcare backend"
```

### 2.2 Create GitHub Repository (Optional but Recommended)

1. Go to [GitHub](https://github.com/new)
2. Create a new repository (e.g., "health-care-backend")
3. **Don't** initialize with README
4. Copy the commands shown and run them:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/health-care-backend.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to Railway

### Option A: Deploy via GitHub (Recommended)

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub
5. Select your `health-care-backend` repository
6. Railway will automatically detect it's a Node.js app and start deploying

### Option B: Deploy via Railway CLI

1. Install Railway CLI:
   ```powershell
   npm install -g @railway/cli
   ```

2. Login to Railway:
   ```powershell
   railway login
   ```

3. Initialize and deploy:
   ```powershell
   cd "c:\Mugi\Projects\Chinna akka\health-care-backend"
   railway init
   railway up
   ```

---

## Step 4: Configure Environment Variables

1. In Railway dashboard, click on your project
2. Go to **"Variables"** tab
3. Add the following environment variables:

| Variable | Value | Example |
|----------|-------|---------|
| `PORT` | `8080` | `8080` |
| `NODE_ENV` | `production` | `production` |
| `MONGODB_URI` | Your MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/healthcare?retryWrites=true&w=majority` |
| `JWT_SECRET` | A random secure string | `your-super-secret-jwt-key-change-this-in-production-xyz123` |
| `JWT_EXPIRE` | `7d` | `7d` |

4. Click **"Add"** for each variable

---

## Step 5: Deploy and Get Your URL

1. Railway will automatically redeploy after adding environment variables
2. Go to **"Settings"** tab
3. Scroll to **"Domains"**
4. Click **"Generate Domain"**
5. Your app will be available at: `https://your-app-name.railway.app`

---

## Step 6: Test Your Deployment

### 6.1 Test Health Endpoint

Open your browser and visit:
```
https://your-app-name.railway.app/api/health
```

You should see:
```json
{
  "success": true,
  "message": "HealthPulse API is running",
  "timestamp": "2026-01-30T13:02:08.000Z"
}
```

### 6.2 Test Registration (Using Postman or curl)

**Using PowerShell:**
```powershell
$body = @{
    name = "Test Patient"
    email = "test@example.com"
    password = "password123"
    dateOfBirth = "1990-01-01"
    gender = "male"
    phone = "1234567890"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://your-app-name.railway.app/api/auth/register/patient" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

### 6.3 Check Logs

In Railway dashboard:
1. Click on your deployment
2. Go to **"Deployments"** tab
3. Click on the latest deployment
4. View logs to see:
   ```
   ✅ MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
   🚀 Server running on port 8080 in production mode
   ```

---

## Troubleshooting

### Issue: "Cannot connect to MongoDB"
- ✅ Verify MongoDB Atlas connection string is correct
- ✅ Check username and password in connection string
- ✅ Ensure IP whitelist includes "0.0.0.0/0" (allow from anywhere)

### Issue: "Application Error"
- ✅ Check Railway logs for error messages
- ✅ Verify all environment variables are set correctly
- ✅ Ensure `MONGODB_URI` doesn't have `<username>` or `<password>` placeholders

### Issue: "502 Bad Gateway"
- ✅ Check if app is listening on the PORT environment variable
- ✅ Verify the start command in `package.json` is correct

---

## Next Steps

1. **Update Frontend**: Update your frontend to use the Railway URL instead of `localhost:8080`
2. **Custom Domain**: Add a custom domain in Railway settings (optional)
3. **Monitoring**: Set up monitoring and alerts in Railway dashboard
4. **CI/CD**: Every push to your GitHub main branch will automatically deploy to Railway

---

## Important Files Created

- ✅ [railway.json](file:///c:/Mugi/Projects/Chinna%20akka/health-care-backend/railway.json) - Railway configuration
- ✅ [Procfile](file:///c:/Mugi/Projects/Chinna%20akka/health-care-backend/Procfile) - Process definition
- ✅ [.gitignore](file:///c:/Mugi/Projects/Chinna%20akka/health-care-backend/.gitignore) - Git ignore rules
- ✅ [.env.example](file:///c:/Mugi/Projects/Chinna%20akka/health-care-backend/.env.example) - Environment variables template

---

## Your Railway URL

After deployment, your API will be available at:
```
https://your-app-name.railway.app
```

**API Endpoints:**
- Health Check: `GET /api/health`
- Register Patient: `POST /api/auth/register/patient`
- Register Provider: `POST /api/auth/register/provider`
- Login: `POST /api/auth/login`
- Get Profile: `GET /api/auth/me` (requires authentication)
