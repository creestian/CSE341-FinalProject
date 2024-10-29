const request = require('supertest');
const app = require('../server');
const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

beforeAll((done) => {
	mongodb.initDb((err) => {
		if (err) {
			console.error('Failed to connect to the database.');
			done(err);
		} else {
			done();
		}
	});
});

afterAll(async () => {
	// Close the database connection after tests
	await mongodb.closeDb(); // Use closeDb to ensure connection closes properly
});

describe('GET /members', () => {
	it('should return 200 and a list of members', async () => {
		const response = await request(app).get('/members');
		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe('Members retrieved successfully!');
		expect(Array.isArray(response.body.data)).toBe(true);
	});
});

describe('GET /books', () => {
	it('should return 200 and a list of books', async () => {
		const response = await request(app).get('/books');
		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe('Books retrieved successfully!');
		expect(Array.isArray(response.body.data)).toBe(true);
	});
});

describe('GET /authors', () => {
	it('should return 200 and a list of authors', async () => {
		const response = await request(app).get('/authors');
		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe('Authors retrieved successfully!');
		expect(Array.isArray(response.body.data)).toBe(true);
	});
});

describe('GET /loans', () => {
	it('should return 200 and a list of loans', async () => {
		const response = await request(app).get('/loans');
		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe('Loans retrieved successfully!');
		expect(Array.isArray(response.body.data)).toBe(true);
	});
});


