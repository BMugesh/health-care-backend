# 🔧 Railway MongoDB Connection Error - SOLUTION

## ❌ The Problem

Your Railway deployment is showing:
```
❌ Error connecting to MongoDB: connect ECONNREFUSED ::1:27017, connect ECONNREFUSED 127.0.0.1:27017
```

This means Railway is trying to connect to `localhost:27017`, which doesn't exist on Railway servers.

## ✅ The Solution

You need to use **MongoDB Atlas** (cloud database) instead of localhost.

---

## Step-by-Step Fix

### 1. Create MongoDB Atlas Database (5 minutes)

#### A. Sign Up & Create Cluster
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a **free account**
3. Click **"Build a Database"**
4. Choose **"M0 Free"** tier (completely free)
5. Select a cloud provider and region
6. Click **"Create Cluster"** (wait 3-5 minutes)

#### B. Create Database User
1. Click **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter username (e.g., `healthcareuser`)
5. Enter a strong password (SAVE THIS!)
6. Set privileges to **"Read and write to any database"**
7. Click **"Add User"**

#### C. Allow Network Access
1. Click **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

> [!IMPORTANT]
> You MUST allow access from anywhere (0.0.0.0/0) for Railway to connect!

#### D. Get Connection String
1. Click **"Database"** in left sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** and version **"5.5 or later"**
5. Copy the connection string (looks like this):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

6. **IMPORTANT:** Modify the connection string:
   - Replace `<username>` with your actual username
   - Replace `<password>` with your actual password
   - Add `/healthcare` before the `?` to specify database name

**Final connection string should look like:**
```
mongodb+srv://healthcareuser:YourPassword123@cluster0.xxxxx.mongodb.net/healthcare?retryWrites=true&w=majority
```

---

### 2. Update Railway Environment Variable

1. Go to your Railway dashboard: https://railway.app/dashboard
2. Click on your **health-care-backend** project
3. Click on the **service/deployment**
4. Go to **"Variables"** tab
5. Find `MONGODB_URI` variable
6. Click **"Edit"** or **"Add Variable"** if it doesn't exist
7. Paste your MongoDB Atlas connection string
8. Click **"Save"** or **"Add"**

**Example:**
```
Variable Name: MONGODB_URI
Value: mongodb+srv://healthcareuser:YourPassword123@cluster0.xxxxx.mongodb.net/healthcare?retryWrites=true&w=majority
```

---

### 3. Verify Deployment

Railway will **automatically redeploy** after you update the environment variable.

#### Check Logs
1. In Railway, go to **"Deployments"** tab
2. Click on the latest deployment
3. Check logs - you should see:
   ```
   ✅ MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
   🚀 Server running on port 8080 in production mode
   ```

#### Test API
Visit your Railway URL:
```
https://your-app.railway.app/api/health
```

You should see:
```json
{
  "success": true,
  "message": "HealthPulse API is running",
  "timestamp": "2026-01-30T13:09:34.000Z"
}
```

---

## All Environment Variables Needed

Make sure these are ALL set in Railway:

| Variable | Value |
|----------|-------|
| `PORT` | `8080` |
| `NODE_ENV` | `production` |
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/healthcare?retryWrites=true&w=majority` |
| `JWT_SECRET` | `your-super-secret-jwt-key-change-this-in-production` |
| `JWT_EXPIRE` | `7d` |

---

## Common Mistakes

❌ **Mistake 1:** Leaving `<username>` and `<password>` as placeholders
```
❌ mongodb+srv://<username>:<password>@cluster.mongodb.net/healthcare
✅ mongodb+srv://healthcareuser:MyPass123@cluster.mongodb.net/healthcare
```

❌ **Mistake 2:** Forgetting to add `/healthcare` database name
```
❌ mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true
✅ mongodb+srv://user:pass@cluster.mongodb.net/healthcare?retryWrites=true
```

❌ **Mistake 3:** Not allowing Railway's IP in MongoDB Atlas
```
✅ Network Access → Add IP → Allow Access from Anywhere (0.0.0.0/0)
```

---

## Still Having Issues?

### Check Railway Logs
```
Railway Dashboard → Your Project → Deployments → Latest → View Logs
```

Look for:
- ✅ `MongoDB Connected:` - Good!
- ❌ `Error connecting to MongoDB:` - Check connection string
- ❌ `Authentication failed` - Check username/password
- ❌ `ECONNREFUSED` - Still using localhost

### Test MongoDB Connection String Locally

Update your local `.env` file temporarily to test:
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/healthcare?retryWrites=true&w=majority
```

Run locally:
```powershell
npm start
```

If it works locally, it will work on Railway!

---

## Quick Checklist

- [ ] MongoDB Atlas account created
- [ ] Free M0 cluster created
- [ ] Database user created (username & password saved)
- [ ] Network access set to 0.0.0.0/0 (allow from anywhere)
- [ ] Connection string copied and modified
- [ ] `MONGODB_URI` updated in Railway Variables tab
- [ ] Railway automatically redeployed
- [ ] Logs show "✅ MongoDB Connected"
- [ ] API health endpoint returns success

---

**Need more help?** Check the full deployment guide: [RAILWAY_DEPLOYMENT.md](file:///c:/Mugi/Projects/Chinna%20akka/health-care-backend/RAILWAY_DEPLOYMENT.md)
