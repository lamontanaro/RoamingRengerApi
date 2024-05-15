const app = require('../app');
const jwt = require('jsonwebtoken');
const request = require('supertest');
const User = require('../models/User');
const bcrypt = require('bcrypt');

describe('Register User', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks(); //limpia los mocks antes de cada prueba
    });

    it('returns status code 400 Bad request if user already exist', async()=>{
        const params = { username: 'testUser', password:'passUser' };

        User.findOne = jest.fn().mockResolvedValue(params);

        const res = await request(app).post('/register/').send(params);

        expect(res.statusCode).toEqual(400);
    })

    it('return status code 201 if is a new user', async()=>{
        const params = { username: 'testUser', password:'passUser' };

        User.findOne = jest.fn().mockResolvedValue(null);
        User.create = jest.fn().mockResolvedValue(params);

        const res = await request(app).post('/register/').send(params);

        expect(res.statusCode).toEqual(201);
    });

    it('return status code 400 if is a new user', async()=>{
        const params = { username: 'testUser', password:'passUser' };

        User.findOne = jest.fn().mockResolvedValue(null);
        User.create = jest.fn().mockRejectedValue(new Error('db error'));

        const res = await request(app).post('/register/').send(params);

        expect(res.statusCode).toEqual(400);
    })

});

describe('Login user', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    })

    it('should return a token when login is successful', async()=>{
        const user = { 
            username: 'testUser',
            password: await bcrypt.hash('passtest', 10) // return encripted pass 
        }

        User.findOne = jest.fn().mockResolvedValue(user);

        const res = await request(app).post('/login').send({ username:'testUser', password:'passtest' });

        expect(res.statusCode).toBe(200);
    });

    it('should return an error message if username is invalid', async()=>{

        User.findOne = jest.fn().mockResolvedValue(null);

        const res = await request(app).post('/login').send({ username:'nonexistent', password:'passtest' });

        expect(res.statusCode).toBe(400);
    });
});