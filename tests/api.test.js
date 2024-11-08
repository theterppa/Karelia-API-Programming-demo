import request from 'supertest';
import app from '../apicalls.js';

beforeEach(() => {

});

afterEach(() => {
    
});

describe('Test GET with the path /data', () => {
    test('Response to the GET', async () => {
        const response = await request(app)
            .get('/data');
        expect(response.status).toEqual(200);    
        expect(response.headers['content-type']).toMatch(/json/);
    });
});

describe('Test GET with the path /data1', () => {
    test('Response to the GET', async () => {
        const expected = {"id": "1", "Firstname": "Tero", "Surname": "Halonen"};
        
        const response = await request(app)
            .get('/data/1');
        expect(response.status).toEqual(200);    
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toEqual(expected);
    });
});

describe('Test POST with the path /data', () => {
    test('Response to the POST', async () => {
        const newUser = {"id": "3", "Firstname": "Joku", "Surname": "Mies"};
        const response = await request(app)
            .post('/data')
            .send(newUser)
            .set('content-type', 'application/json');    
        expect(response.status).toEqual(200);    
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toEqual(newUser);
    });
});

describe('Test POST with the path /data', () => {
    test('Response to the POST with not acceptable data', async () => {
        const newUser = {"id": "2", "Firstname": "Jaska", "Surname": "Ukko"};
        const response = await request(app)
            .post('/data')
            .send(newUser)
            .set('content-type', 'application/json');    
        expect(response.status).toEqual(409);    
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toEqual({"error": "record already exists"});
    });
});
