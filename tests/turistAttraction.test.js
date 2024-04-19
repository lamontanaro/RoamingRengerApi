const app = require('../app');
const jwt = require('jsonwebtoken');
const request = require('supertest');
const TouristAttraction = require('../models/TouristAttraction')

const jwtSecret = process.env.JWT_SECRET;
const token = "Bearer "+jwt.sign({ username: "userExample" }, jwtSecret);

describe('Create new attraction', () => {
  it('returns status code 401 Unauthorized if jwt token is missing', async () => {
    const params = { name: 'zoo', description: 'amazing place to unwind' }

    const res = await request(app).post('/touristAttractions').send(params);

    expect(res.statusCode).toEqual(401);
  });

  it('returns status code 201 if valid params are passed', async () => {
    const params = { name: 'zoo', description: 'amazing place to unwind' }

    const res = await request(app).post('/touristAttractions').send(params).set({ Authorization: token });

    expect(res.statusCode).toEqual(201);
  });

  it('returns status code 400 if name is missing', async () => {
    const res = await request(app).post('/touristAttractions').send({ description: 'amazing place to unwind' }).set({ Authorization: token });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ "message": "TouristAttraction validation failed: name: Path `name` is required." })
  });

  it('returns status code 400 if description is missing', async () => {
    const res = await request(app).post('/touristAttractions').send({ name: 'obelisco' }).set({ Authorization: token });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ "message": "TouristAttraction validation failed: description: Path `description` is required." })
  });
});

describe('Create new attraction - using mock', () => {
  it('returns status code 201 if valid params are passed', async () => {
    const params = { name: 'zoo', description: 'amazing place to unwind' }
    TouristAttraction.create = jest.fn().mockResolvedValue(params); 

    const res = await request(app).post('/touristAttractions').send(params).set({ Authorization: token });


    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual("zoo");
  });

  it('test Update returns status code 201 if valid params are passed', async () => {
    const params = { name: 'zoo', description: 'amazing place to unwind' }
    TouristAttraction.findByIdAndUpdate = jest.fn().mockResolvedValue(params); 

    const res = await request(app).put('/touristAttractions/31234242342342').send(params).set({ Authorization: token });

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual("zoo");
  });

  it('returns status code 400 if name is missing', async () => {
    TouristAttraction.create = jest.fn().mockRejectedValue(new Error('TouristAttraction validation failed: name: Path `name` is required.'));

    const res = await request(app).post('/touristAttractions').send({ description: 'amazing place to unwind' }).set({ Authorization: token });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ "message": "TouristAttraction validation failed: name: Path `name` is required." })
  });

  it('returns status code 400 if description is missing', async () => {
    TouristAttraction.create = jest.fn().mockRejectedValue(new Error('TouristAttraction validation failed: description: Path `description` is required.'));

    const res = await request(app).post('/touristAttractions').send({ name: 'obelisco' }).set({ Authorization: token });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ "message": "TouristAttraction validation failed: description: Path `description` is required." })
  });
});