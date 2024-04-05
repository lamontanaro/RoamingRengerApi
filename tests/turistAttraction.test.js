const app = require('../app');
const request = require('supertest');

describe('Create new attraction', () => {
  it('returns status code 201 if valid params are passed', async () => {
    const res = await request(app).post('/touristAttractions').send({ name: 'zoo', description: 'amazing place to unwind' });

    expect(res.statusCode).toEqual(201);

  });

  it('returns status code 400 if name is missing', async () => {
    const res = await request(app).post('/touristAttractions').send({ description: 'amazing place to unwind' });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ "message": "TouristAttraction validation failed: name: Path `name` is required." })
  });
});