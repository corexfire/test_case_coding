const request = require('supertest');
const app = require('../server');

describe('Authentication API', () => {
    let token; // Will store the token for authenticated requests

    beforeAll(async () => {
        // Login before running tests
        const loginRes = await request(app)
            .post('/auth/login')
            .send({ email: 'test@example.com', password: 'password' });

        token = loginRes.body.token;
    });

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/auth/register')
            .field('email', 'test@example.com')
            .field('password', 'password')
            .field('confirm_password', 'password')
            .field('mobile_number', '123456')
            .attach('foto', 'C:/Users/Zubair/Pictures/b.jpg');

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'User created successfully');
    });

    it('should login an existing user', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ email: 'test@example.com', password: 'password' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token; // Update token for subsequent requests
    });

    it('should get user list', async () => {
        const res = await request(app)
            .get('/auth/users')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should get user detail', async () => {
        const res = await request(app)
            .get('/auth/users/17') // Assuming the user ID is 1
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('email', 'test@example.com');
    });

    it('should delete a user', async () => {
        const res = await request(app)
            .delete('/auth/users/17') // Assuming the user ID is 1
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'User deleted successfully');
    });
});
