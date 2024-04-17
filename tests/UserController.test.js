const app = require('../app');
const request = require('supertest');
const User = require('../models/User');
const { Error } = require('mongoose');

describe('Create User', () => {
    it('Should create a new user and return 201', async () => {
        const bodyUser = { id: '12', username: 'user', password: 'password' }
        return await request(app).post('/register').send(bodyUser).expect(201).toJSON({ message: 'User registered successfully' })
    })
    it('Should failed if username already exists and return 400', async () => {
        const mockUserSimulated = { id: '12', username: 'user', password: 'password' }
        User.create = jest.fn().mockResolvedValue(mockUserSimulated);
        const res = await request(app).post('/register').send({ id: '12', username: 'user', password: 'password' })
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({ message: 'Username already exists' });
    })
    it('Should failed if username is missing and return 400', async () => {
        User.find = jest.fn().mockRejectedValue(new Error('Username is missing'))
        return await request(app).post('/register').send(User).expect(400).toJSON({ message: 'Username is missing' })
    }
)
})