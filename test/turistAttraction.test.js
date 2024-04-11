const app = require('../app');
const request = require('supertest');
const TouristAttraction = require('../models/TouristAttraction');

describe('Create new attraction', ()=>{
    afterEach(async () => {
        await TouristAttraction.deleteMany({name: 'Parque 9 de Julio', description:'muy lindo', location:'av soldati', image: 'url'});
    });

    it('returns status code 201 if valid params are passed', async() => {
        const params = {name: 'Parque 9 de Julio', description:'muy lindo', location:'av soldati', image: 'url' }
        const res = await request(app).post('/touristAttractions').send(params);

        expect(res.statusCode).toEqual(201);
    });

    it('returns status code 400 if name is missing', async() => {
        const res = await request(app).post('/touristAttractions').send({description : 'muy lindoo', location:'av soldati', image: 'url' });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({"message": "TouristAttraction validation failed: name: Path `name` is required."});
    });

    it('returns status code 400 if description is missing', async() => {
        const res = await request(app).post('/touristAttractions').send({name : 'Parque 9 de julio', location:'av soldati', image: 'url' });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({ "message" : "TouristAttraction validation failed: description: Path `description` is required." });
    });

    it('returns status code 400 if location is missing', async() => {
        const res = await request(app).post('/touristAttractions').send({name :'Parque 9 de julio', description: 'muy lindo', image: 'url'})
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({message: 'TouristAttraction validation failed: location: Path `location` is required.'})
    })

    it('returns status code 400 if image is missing', async () => {
        const res = await request(app).post('/touristAttractions').send({name: 'Parque 9 de julio', description: 'muy lindo', location: 'Micuman'})
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({message : 'TouristAttraction validation failed: image: Path `image` is required.'});
    })
});

describe('Get all touristAttractions', ()=>{

    it('returns status code 200 if all attractions are returned', async ()=>{
        const res = await request(app).get('/touristAttractions');

        expect(res.statusCode).toEqual(200);
    });

    it('return status code 500 if there are not tourist attractions', async() => {
        TouristAttraction.find = jest.fn().mockRejectedValue(new Error('Database connection failed'));
        const response = await request(app).get('/touristAttractions')
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({message: 'Database connection failed'});
    })

});



describe('Update Attractions', ()=>{

    it('returns status code 201 if the attraction could be updated correctly ', async ()=>{
        const body = {name: "Monumento al Bicentenario"}
        const res = await request(app).put('/touristAttractions/6618497e3b20d4d1fef649e0').send(body);

        expect(res.statusCode).toEqual(201);
    });


    it('returns status code 400 if the attraction data is invalid ', async ()=>{
        const body = {name: ""}
        const res = await request(app).put('/touristAttractions/6618497e3b20d4d1fef649e0').send(body);

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toContain("Validation failed: name: Path `name` is required.");
    });

});


describe('Delete Attractions', ()=>{

    it('returns status code 201 if the attraction could be deleted correctly ', async ()=>{
        const res = await request(app).delete('/touristAttractions/6618497e3b20d4d1fef649e0');

        expect(res.statusCode).toEqual(201);
    });


    it('return status code 500 if there are not tourist attractions', async() => {
        TouristAttraction.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Database connection failed'));
        const response = await request(app).delete('/touristAttractions/6618497e3b20d4d1fef649e0')
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({message: 'Database connection failed'});
    })

});
