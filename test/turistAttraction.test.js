const app = require('../app');
const request = require('supertest');
const TouristAttraction = require('../models/TouristAttraction');


describe('Create new Attraction - using mock', () =>{
    it('returns status code 201 if valid params are passed', async()=>{
        const params = {name: 'Parque 9 de Julio', description:'parque muy grande', location:'av soldati', image: 'url' }
        TouristAttraction.create = jest.fn().mockResolvedValue(params)
    
        const res = await request(app).post('/touristAttractions').send(params);

        expect(res.statusCode).toEqual(201);
    });

    it('returns status code 400 if name is missing', async()=>{
        const params = {description:'parque muy grande', location:'av soldati', image: 'url' }
        TouristAttraction.create = jest.fn().mockRejectedValue(new Error('TouristAttraction validation failed: name: Path `name` is required.'))
    
        const res = await request(app).post('/touristAttractions').send(params);

        expect(res.statusCode).toEqual(400);
    });

    it('returns status code 400 if description is missing', async()=>{
        const params = {name: 'Parque 9 de Julio', location:'av soldati', image: 'url' }
        TouristAttraction.create = jest.fn().mockRejectedValue(new Error('TouristAttraction validation failed: name: Path `description` is required.'))
    
        const res = await request(app).post('/touristAttractions').send(params);

        expect(res.statusCode).toEqual(400);
    });

    it('returns status code 400 if location is missing', async()=>{
        const params = {name: 'Parque 9 de Julio', description:'parque muy grande', image: 'url' }
        TouristAttraction.create = jest.fn().mockRejectedValue(new Error('TouristAttraction validation failed: name: Path `location` is required.'))
    
        const res = await request(app).post('/touristAttractions').send(params);

        expect(res.statusCode).toEqual(400);
    });


    it('returns status code 400 if image is missing', async()=>{
        const params = {name: 'Parque 9 de Julio', description:'parque muy grande', location:'av soldati'}

        TouristAttraction.create = jest.fn().mockRejectedValue(new Error('TouristAttraction validation failed: name: Path `image` is required.'))
    
        const res = await request(app).post('/touristAttractions').send(params);

        expect(res.statusCode).toEqual(400);
    });


});


describe('Get all trouristAttractions - using mock', ()=>{
    it('returns status code 200 if all attractions are returned', async()=>{
        const attractions = [{name: "attraction 1 ", description:"des attraction 1", location:"location 1", image:"imagen 1"},
        {name: "attraction 2", description:"des attraction 2", location:"location 2", image:"imagen 2"}]
        TouristAttraction.find = jest.fn().mockResolvedValue(attractions);
        const res = await request(app).get('/touristAttractions');

        expect(res.statusCode).toEqual(200);
    });

    it('return status code 500 if there are not tourist attractions', async() => {
        TouristAttraction.find = jest.fn().mockRejectedValue(new Error('Database connection failed'));
        const res = await request(app).get('/touristAttractions')
        expect(res.statusCode).toBe(500);
    })


});



describe('Get one touristAttraction - using mock', ()=>{
    
    it('returns status code 201 if an attraction is returned', async() => {
        TouristAttraction.findById = jest.fn().mockResolvedValue();
        const res = await request(app).get('/touristAttractions/661847a7ec920c615264a242')
        expect(res.statusCode).toBe(201);
    })


    it('return status code 404 if tourist attraction not found', async() => {
        TouristAttraction.findById = jest.fn().mockRejectedValue(new Error('Attraction not found'));
        const res = await request(app).get('/touristAttractions/661847a7ec920c615264a242')
        expect(res.statusCode).toBe(404);
    })

    describe('Update Attractions - using mock', ()=>{
    
        it('returns status code 201 if the attraction could be updated correctly ', async ()=>{
            const body = {name: "Monumento al Bicentenario"}
            TouristAttraction.findByIdAndUpdate = jest.fn().mockResolvedValue();
            const res = await request(app).put('/touristAttractions/6618497e3b20d4d1fef649e0').send(body);
    
            expect(res.statusCode).toEqual(201);
        });
    
    
        it('returns status code 400 if the attraction data is invalid ', async ()=>{
            TouristAttraction.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error ("Validation failed: name: Path `name` is required."))
            const res = await request(app).put('/touristAttractions/6618497e3b20d4d1fef649e0');
    
            expect(res.statusCode).toEqual(400);
        });
    
    });
});


describe('Delete Attractions - using mock', ()=>{

    it('returns status code 201 if the attraction could be deleted correctly ', async ()=>{
        TouristAttraction.findByIdAndDelete = jest.fn().mockResolvedValue();
        const res = await request(app).delete('/touristAttractions/6618497e3b20d4d1fef649e0');

        expect(res.statusCode).toEqual(201);
    });


    it('return status code 500 if there are not tourist attractions', async() => {
        TouristAttraction.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Database connection failed'));
        const res = await request(app).delete('/touristAttractions/6618497e3b20d4d1fef649e0')
        expect(res.statusCode).toBe(500);
    })

});


