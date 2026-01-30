require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
console.log('Attempting to connect to MongoDB Atlas...');
console.log(`URI: ${uri.replace(/:([^:@]+)@/, ':****@')}`); // Hide password in logs

mongoose.connect(uri)
    .then(() => {
        console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('❌ FAILED: Could not connect to MongoDB Atlas.');
        console.error('Error name:', err.name);
        console.error('Error message:', err.message);

        if (err.message.includes('whitelisted')) {
            console.log('\n⚠️  DIAGNOSIS: IP Address Blocked');
            console.log('You must add "0.0.0.0/0" to your MongoDB Atlas Network Access whitelist.');
            console.log('Go to: https://cloud.mongodb.com/ > Security > Network Access');
        }
        process.exit(1);
    });
