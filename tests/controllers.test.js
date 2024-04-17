const app = require('../app.js');
const request = require('supertest');
const TouristAttraction = require('../models/TouristAttraction.js')

describe('Create Tourist Attraction', () => {
    it('should create a new tourist attraction and return status code 201', async () => {
        const body = {name: 'prob', description: 'prob', location: 'prob', image: 'prob'}
        return await request(app).post('/touristAttractions').send(body).expect(201)
    });

    it('returns status code 400 if name is missing', async() => {
        const res = await request(app).post('/touristAttractions').send({description: 'descripcion', location : 'Lima, Peru', image: 'url'})
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
    it('Should get all tourist attractions and return status code 200', async () => {
        return await request(app).get('/touristAttractions').expect(200)
    }); 
    it('if there are no tourist attractions return status code 500', async() => {
        TouristAttraction.find = jest.fn().mockRejectedValue(new Error('Database connection failed'));
        const response = await request(app).get('/touristAttractions')
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({message: 'Database connection failed'});
    })
})

describe('Get one tourist attraction', () => {
    it('Should get one tourist attraction and return status code 200', async () => {
        const mockAttractionSimulated = {id: '6610802a03f3bdde33e4bd15'}
        TouristAttraction.findById = jest.fn().mockResolvedValue(mockAttractionSimulated);
        return await request(app).get('/touristAttractions/6610802a03f3bdde33e4bd15').expect(200)
    })
    it(' if not find a Tourist attraction return status code 404 ', async() => {
        TouristAttraction.findById = jest.fn().mockRejectedValue(new Error('Error'));
        const response = await request(app).get('//touristAttractions/6610802a03f3bdde33e4bd15')
        expect (response.statusCode).toBe(404);
        expect(response.body).toEqual({});
    })
})

describe('Update tourist attraction', () => {
    it('Should update a tourist attraction and return status code 200', async () => {
        const body = {name: 'parque', description: 'muy muy lindo'}
        return await request(app).put('/touristAttractions/6610802a03f3bdde33e4bd15').send(body).expect(201)
    })
    it('if not find a Tourist attraction for update return status code 404', async () => {
        TouristAttraction.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Attraction not found for update'));
        const response = await request(app).put('/touristAttractions/6610802a03f3bdde33e4bd15')
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({message: 'Attraction not found for update'});
    })
})

describe('Delete tourist attraction', () => {
    it('Should delete a tourist attraction and return status code 201', async () => {
        const mockAttractionSimulated = {id: '6610802a03f3bdde33e4bd15'}
        TouristAttraction.findByIdAndDelete = jest.fn().mockResolvedValue(mockAttractionSimulated);
        return await request(app).delete('/touristAttractions/6610802a03f3bdde33e4bd15').expect(201)
        })
    it('if not find a tourist attraction for delete return status code 500', async () => {
        TouristAttraction.findByIdAndDelete = jest.fn().mockRejectedValue (new Error('Attraction not found for delete'));
        const response = await request(app).delete('/touristAttractions/6610802a03f3bdde33e4bd15')
        expect(response.statusCode).toBe(500)
        expect(response.body).toEqual({message: 'Attraction not found for delete'});
    })
})