const app = require('../app');
const jwt = require('jsonwebtoken');
const request = require('supertest');
const User = require('../models/User');
const bcrypt = require('bcrypt');

describe('Register User', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpiar todos los mocks antes de cada prueba
    });

    it('returns status code 400 Bad Request if user already exist', async () => {
        const params = { username: 'testUser', password: 'passUser' }

        User.findOne = jest.fn().mockResolvedValue(params);

        const res = await request(app).post('/register/').send(params);

        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({ message: 'Username already exists' });
    });

    it('returns status code 201 if is a new user', async () => {
        const params = { username: 'testUser', password: 'passUser' }

        User.findOne = jest.fn().mockResolvedValue(null);
        User.create = jest.fn().mockResolvedValue(params);

        const res = await request(app).post('/register/').send(params);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({ message: "User registered successfully" });
    });

    it('returns status code 400 if is a new user', async () => {
        const params = { username: 'testUser', password: 'passUser' }

        User.findOne = jest.fn().mockResolvedValue(null);
        User.create = jest.fn().mockRejectedValue(new Error('ddb error'));

        const res = await request(app).post('/register/').send(params);

        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({ message: "ddb error" });
    });

});

describe('Login User', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpiar todos los mocks antes de cada prueba
    });

    it('should return a token when login is successful', async () => {
        const user = {
            username: 'testuser',
            password: await bcrypt.hash('testpassword', 10) // return encripted pass from ddb
        };

        User.findOne = jest.fn().mockResolvedValue(user);

        const response = await request(app)
            .post('/login')
            .send({ username: 'testuser', password: 'testpassword' });

        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
    });

    it('should return an error message if username is invalid', async () => {
        User.findOne = jest.fn().mockResolvedValue(null);
        const response = await request(app)
            .post('/login')
            .send({ username: 'nonexistentuser', password: 'testpassword' });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Invalid username or password');
    });

    it('should return an error message if password is invalid', async () => {
        const user = {
            username: 'testuser',
            password: await bcrypt.hash('testpassword', 10) // Hash de la contraseña
        };

        User.findOne = jest.fn().mockResolvedValue(user); // Simular la búsqueda exitosa del usuario
        bcrypt.compare = jest.fn().mockResolvedValue(false); // Simular que la contraseña es incorrecta

        const response = await request(app)
            .post('/login')
            .send({ username: 'testuser', password: 'wrongpassword' });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Invalid username or password');
    });

    it('should return an error message if an error occurs during login', async () => {
        User.findOne = jest.fn().mockRejectedValue(new Error('Database error')); // Simular un error en la base de datos

        const response = await request(app)
            .post('/login')
            .send({ username: 'testuser', password: 'testpassword' });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Database error');
    });
});