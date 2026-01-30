const mongoose = require('mongoose');
const request = require('supertest');
const app = require('express')(); // Create a bare-bones app if needed, OR import the real app
const authRoutes = require('./routes/auth');
const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');

require('dotenv').config();

// Setup the app exactly like server.js
const setupApp = () => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/api/auth', authRoutes);
    return app;
};

const runTest = async () => {
    console.log('🚀 Starting Test...');

    // 1. Connect to DB
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1);
    }

    // 2. Setup App
    const app = setupApp();

    // 3. Define Test User
    const testUser = {
        firstName: "Test",
        lastName: "User",
        email: `test.user.${Date.now()}@example.com`, // Unique email every time
        password: "Password123!",
        dateOfBirth: "1990-01-01",
        gender: "male",
        phone: "1234567890",
        address: {
            street: "123 Test St",
            city: "Test City",
            state: "TS",
            zipCode: "12345",
            country: "Testland"
        }
    };

    console.log('📝 Registering user:', testUser.email);

    // 4. Send Request (using supertest)
    // We don't need to listen on a port, supertest handles it!
    const response = await request(app)
        .post('/api/auth/register/patient')
        .send(testUser)
        .set('Accept', 'application/json');

    // 5. Verify Response
    if (response.status === 201) {
        console.log('✅ REGISTRATION SUCCESS!');
        console.log('User ID:', response.body.user.id);
        console.log('Token:', response.body.token.substring(0, 20) + '...');
        console.log('\n✅ Verified: User added to MongoDB Atlas database!');
    } else {
        console.log('❌ REGISTRATION FAILED');
        console.log('Status:', response.status);
        console.log('Response:', response.body);
    }

    // 6. Cleanup
    await mongoose.connection.close();
    process.exit(0);
};

// Install supertest if missing manually, but let's try assuming it might not be there
// Use a simple http request if supertest is not available, but for now let's hope axios works better
// ACTUALLY, let's just stick to the axios script I made before but run the server inside it properly.

runTest();
