# 🚀 Quick Railway Deployment Steps

## 1. Set Up MongoDB Atlas (5 minutes)
1. Create account at https://www.mongodb.com/cloud/atlas/register
2. Create free M0 cluster
3. Add database user (save username & password)
4. Allow access from anywhere (0.0.0.0/0)
5. Get connection string and add `/healthcare` before `?`:
   ```
   mongodb+srv://user:pass@cluster.mongodb.net/healthcare?retryWrites=true&w=majority
   ```

## 2. Commit Your Code
```powershell
cd "c:\Mugi\Projects\Chinna akka\health-care-backend"
git add .
git commit -m "Prepare for Railway deployment"
```

## 3. Deploy to Railway
1. Go to https://railway.app/dashboard
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository (or create one first)
4. Railway will auto-deploy

## 4. Add Environment Variables
In Railway dashboard → Variables tab, add:
- `PORT` = `8080`
- `NODE_ENV` = `production`
- `MONGODB_URI` = (your MongoDB Atlas connection string)
- `JWT_SECRET` = (any random secure string)
- `JWT_EXPIRE` = `7d`

## 5. Get Your URL
Settings → Domains → Generate Domain

Your API will be at: `https://your-app.railway.app`

## Test
Visit: `https://your-app.railway.app/api/health`

---

📖 **Full Guide:** See [RAILWAY_DEPLOYMENT.md](file:///c:/Mugi/Projects/Chinna%20akka/health-care-backend/RAILWAY_DEPLOYMENT.md) for detailed instructions
