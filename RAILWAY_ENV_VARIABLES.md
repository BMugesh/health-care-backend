# 🔑 Railway Environment Variables

Copy and paste these **exact values** into your Railway dashboard.

## How to Add in Railway

1. Go to https://railway.app/dashboard
2. Click on your **health-care-backend** project
3. Click on the **Variables** tab
4. Click **"New Variable"** for each one below
5. Copy the **Variable Name** and **Value** exactly as shown

---

## Environment Variables to Add

### 1. PORT
```
Variable Name: PORT
Value: 8080
```

### 2. NODE_ENV
```
Variable Name: NODE_ENV
Value: production
```

### 3. MONGODB_URI
```
Variable Name: MONGODB_URI
Value: mongodb+srv://kruthikas2023eee_db_user:Ldu7HidMTR0qT9Xy@cluster0.hpe0bzi.mongodb.net/healthcare?retryWrites=true&w=majority&appName=Cluster0
```

> [!IMPORTANT]
> Notice I added `/healthcare` before the `?` - this specifies the database name!

### 4. JWT_SECRET
```
Variable Name: JWT_SECRET
Value: your-super-secret-jwt-key-change-this-in-production-healthcare-2026
```

### 5. JWT_EXPIRE
```
Variable Name: JWT_EXPIRE
Value: 7d
```

---

## After Adding Variables

1. Railway will **automatically redeploy** your app
2. Wait 1-2 minutes for deployment to complete
3. Check the **Deployments** tab → Click latest deployment → View logs
4. You should see:
   ```
   ✅ MongoDB Connected: cluster0-shard-00-00.hpe0bzi.mongodb.net
   🚀 Server running on port 8080 in production mode
   ```

---

## Test Your Deployment

Once deployed, visit:
```
https://your-app-name.railway.app/api/health
```

You should see:
```json
{
  "success": true,
  "message": "HealthPulse API is running",
  "timestamp": "2026-01-30T13:16:46.000Z"
}
```

---

## ✅ Checklist

- [ ] Added `PORT` variable in Railway
- [ ] Added `NODE_ENV` variable in Railway
- [ ] Added `MONGODB_URI` variable in Railway (with `/healthcare` in the URL)
- [ ] Added `JWT_SECRET` variable in Railway
- [ ] Added `JWT_EXPIRE` variable in Railway
- [ ] Railway redeployed automatically
- [ ] Checked logs - shows "MongoDB Connected"
- [ ] Tested `/api/health` endpoint - returns success

---

**Your MongoDB Atlas connection string is now configured! 🎉**
