const axios = require('axios');

const API_URL = 'http://localhost:8080/api';

const testPatient = {
    firstName: "Test",
    lastName: "User",
    email: `test.user.${Date.now()}@example.com`,
    password: "Password123!",
    dateOfBirth: "1990-01-01",
    gender: "male",
    phone: "1234567890",
    address: {
        street: "123 St",
        city: "City",
        state: "ST",
        zipCode: "12345",
        country: "USA"
    }
};

(async () => {
    try {
        console.log('⏳ Registering user...');
        const res = await axios.post(`${API_URL}/auth/register/patient`, testPatient);
        console.log('\n✅ SUCCESS! User added to MongoDB Atlas.');
        console.log('User ID:', res.data.user.id);
        console.log('Name:', res.data.user.firstName, res.data.user.lastName);
    } catch (err) {
        console.error('\n❌ ERROR:', err.message);
        if (err.response) {
            console.error('Data:', err.response.data);
        }
    }
})();
