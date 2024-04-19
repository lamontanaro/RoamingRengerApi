const app = require('../app.js');
const request = require('supertest');
const TouristAttraction = require('../models/TouristAttraction.js')

describe('Create Tourist Attraction', () => {
    it('should create a new tourist attraction and return status code 201', async () => {
        const mockAttractionSimulated = { name: 'prob', description: 'prob', location: 'prob', image: 'prob' }
        TouristAttraction.create = jest.fn().mockResolvedValue(mockAttractionSimulated);
        return await request(app).post('/touristAttractions').send(mockAttractionSimulated).expect(201)
    });

    it('returns status code 400 if name is missing', async () => {
        TouristAttraction.create = jest.fn().mockRejectedValue(new Error({ message: 'TouristAttraction validation failed: name: Path `name` is required.' }))
        return await request(app).post('/touristAttractions').send().expect(400).toJSON({ message: 'TouristAttraction validation failed: name: Path `name` is required.' })

    });
    it('returns status code 400 if description is missing', async () => {
        TouristAttraction.create = jest.fn().mockRejectedValue(new Error({ message: 'TouristAttraction validation failed: description: Path `description` is required.' }))
        return await request(app).post('/touristAttractions').send().expect(400).toJSON({ message: 'TouristAttraction validation failed: description: Path `description` is required.' })
    });
    it('returns status code 400 if location is missing', async () => {
        TouristAttraction.create = jest.fn().mockRejectedValue(new Error({ message: 'TouristAttraction validation failed: location: Path `location` is required.' }))
        return await request(app).post('/touristAttractions').send().expect(400).toJSON({ message: 'TouristAttraction validation failed: location: Path `location` is required.' })
    })

    it('returns status code 400 if image is missing', async () => {
        TouristAttraction.create = jest.fn().mockRejectedValue(new Error({ message: 'TouristAttraction validation failed: image: Path `image` is required.' }))
        return await request(app).post('/touristAttractions').send().expect(400).toJSON({ message: 'TouristAttraction validation failed: image: Path `image` is required.' })
    })
})

describe('Get all Tourist Attractions', () => {
    it('Should get all tourist attractions and return status code 200', async () => {
        const mockAttractionSimulated = [{ id: '1', name: 'prob', description: 'prob', location: 'prob', image: 'prob' },
        { id: '2', name: 'prob', description: 'prob', location: 'prob', image: 'prob' }]
        TouristAttraction.find = jest.fn().mockResolvedValue(mockAttractionSimulated)
        return await request(app).get('/touristAttractions').send(mockAttractionSimulated).expect(200)
    });
    it('if there are no tourist attractions return status code 500', async () => {
        TouristAttraction.find = jest.fn().mockRejectedValue(new Error({ message: 'Database connection failed' }));
        return await request(app).get('/touristAttractions').expect(500).toJSON({ message: 'Database connection failed' })
    })
})

describe('Get one tourist attraction', () => {
    it('Should get one tourist attraction and return status code 200', async () => {
        const mockAttractionSimulated = { id: '123' }
        TouristAttraction.findById = jest.fn().mockResolvedValue(mockAttractionSimulated);
        return await request(app).get('/touristAttractions/123').expect(200)
    })
    it(' if not find a Tourist attraction return status code 404 ', async () => {
        TouristAttraction.findById = jest.fn().mockRejectedValue(new Error({message:'error'}));
        return await request(app).get('/touristAttractions/123').expect(404).toJSON({message:'error'});
    })
})

describe('Update tourist attraction', () => {
    it('Should update a tourist attraction and return status code 200', async () => {
        const mockAttractionSimulated = {name: 'parque', description: 'muy muy lindo'}
        TouristAttraction.findByIdAndUpdate = jest.fn().mockResolvedValue(mockAttractionSimulated);
        return await request(app).put('/touristAttractions/1').send().expect(201)
    })
    it('if not find a Tourist attraction for update return status code 404', async () => {
        TouristAttraction.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error({ message: 'Attraction not found for update' }));
        return await request(app).put('/touristAttractions/1').expect(404).toJSON({ message: 'Attraction not found for update' })
    })
})

describe('Delete tourist attraction', () => {
    it('Should delete a tourist attraction and return status code 201', async () => {
        const mockAttractionSimulated = { id: '123' }
        TouristAttraction.findByIdAndDelete = jest.fn().mockResolvedValue(mockAttractionSimulated);
        return await request(app).delete('/touristAttractions/123').expect(201)
    })
    it('if not find a tourist attraction for delete return status code 500', async () => {
        TouristAttraction.findByIdAndDelete = jest.fn().mockRejectedValue(new Error({ message: 'Attraction not found for delete' }));
        return await request(app).delete('/touristAttractions/123').expect(500).toJSON({ message: 'Attraction not found for delete' })
    })
})