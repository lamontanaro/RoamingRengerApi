const app = require('../app.js');
const request = require('supertest');

describe('Create Tourist Attraction', () => {
    it('should create a new tourist attraction', async () => {
        const body = {name: 'prob', description: 'prob', location: 'prob', image: 'prob'}
        const response = await request(app).post('/touristAttractions').send(body)
        expect(response.statusCode).toEqual(201)
    });

    it('returns status code 400 if name is missing', async() => {
        const res = await request(app).post('/touristAttractions').send({description: 'Amazing places to unwind', location : 'Lima, Peru', image: 'url'})
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({message: 'TouristAttraction validation failed: name: Path `name` is required.'})
    });
    it('returns status code 400 if description is missing', async() =>{
        const res = await request(app).post('/touristAttractions').send({name : 'obelisco', location:'Lima, Peru', image: 'url'})
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({message: 'TouristAttraction validation failed: description: Path `description` is required.'})
    });
    it('returns status code 400 if location is missing', async() => {
        const res = await request(app).post('/touristAttractions').send({name :'obelisco', description: 'descripcion', image: 'url'})
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({message: 'TouristAttraction validation failed: location: Path `location` is required.'})
    })

    it('returns status code 400 if image is missing', async () => {
        const res = await request(app).post('/touristAttractions').send({name: 'obelisco', description: 'descripcion', location: 'Lima, Peru'})
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({message : 'TouristAttraction validation failed: image: Path `image` is required.'});
    })
})

describe('Get all Tourist Attractions', () => {
    it('Should get all tourist attractions', async () => {
        const response = await request(app).get('/touristAttractions')
        expect(response.statusCode).toEqual(200)
    }); 

})