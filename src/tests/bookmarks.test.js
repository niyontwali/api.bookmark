const request = require('supertest');

// import app from server.js
const app = require('../server');

// import the bookmark model so that we infer our mocks to the model
const bookmark = require('../models/bookmark');

// mock the bookmark model to prevent actual interaction with the db
jest.mock('../models/bookmark.js');

// Testing statement
// I want to test the controller for creating a bookmark
describe('Add Bookmark - POST /bookmarks', () => {
  // Case1: Testing 400 status 
  test('should have a 400 status and a valid error response: Title is required', async () => {
    // send the post request
    const response = await request(app)
      .post('/bookmarks')
      .send({
        url: 'https://andela.com'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: 'Title is required'
    });
  });

  // Case 2: Creating a bookmark successfully
  test('should respond with 201 if title and url are provided', async () => {
    // mock the save method from the bookmark model
    bookmark.prototype.save.mockResolvedValueOnce();

    // sending a post request
    const response = await request(app)
      .post('/bookmarks')
      .send({
        title: 'Andela',
        url: 'https://andela.com'
      });

    // assertions
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      ok: true,
      message: "New bookmark created successfully"
    });
  });
})




