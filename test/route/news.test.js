const sinon = require('sinon');
const supertest = require('supertest');
const { expect } = require('chai');
const {app} = require('../../index');  // Assuming your express app is exported from 'index.js'
const News = require('../../src/controllers/news');

describe('News API', () => {
  let createNewsForMatchStub;
  let createNewsForTourStub;
  let getNewsByMatchStub;
  let getNewsByTourStub;
  let getNewsBySportStub;

  beforeEach(() => {
    // Stub the controller functions
    createNewsForMatchStub = sinon.stub(News, 'createNewsForMatch');
    createNewsForTourStub = sinon.stub(News, 'createNewsForTour');
    getNewsByMatchStub = sinon.stub(News, 'getNewsByMatch');
    getNewsByTourStub = sinon.stub(News, 'getNewsByTour');
    getNewsBySportStub = sinon.stub(News, 'getNewsBySport');
  });

  afterEach(() => {
    // Restore the stubs after each test
    createNewsForMatchStub.restore();
    createNewsForTourStub.restore();
    getNewsByMatchStub.restore();
    getNewsByTourStub.restore();
    getNewsBySportStub.restore();
  });

  it('should create news for a match', async () => {
    // Set up the stub response
    createNewsForMatchStub.resolves({
      news: {
        id: 1,
        title: 'News for Match',
        matchId: 1,
        tourId: 1,
        description: 'This is a news for a match',
      },
      message: 'News created successfully',
    });

    // Your test code...
    const response = await supertest(app)
      .post('/news')
      .send({
        requestType: 'Match',
        id: '1',
        title: 'News for Match',
        description: 'This is a news for a match',
      });

    // Assertions
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('news');
    expect(response.body.news).to.have.property('title', 'News for Match');
    expect(response.body.message).to.equal('News created successfully');
  });

  it('should create news for a tour', async () => {
    // Set up the stub response
    createNewsForTourStub.resolves({
      news: {
        id: 2,
        title: 'News for Tour',
        tourId: 2,
        sportId: 1,
        description: 'This is a news for a tour',
      },
      message: 'News created successfully',
    });

    // Your test code...
    const response = await supertest(app)
      .post('/news')
      .send({
        requestType: 'Tour',
        id: '2',
        title: 'News for Tour',
        description: 'This is a news for a tour',
      });

    // Assertions
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('news');
    expect(response.body.news).to.have.property('title', 'News for Tour');
    expect(response.body.message).to.equal('News created successfully');
  });

  it('should get news by matchId', async () => {
    // Set up the stub response
    const matchId = '1';
    getNewsByMatchStub.withArgs(matchId).resolves([
      {
        id: 1,
        title: 'News for Match 1',
        matchId: 1,
        tourId: 1,
        description: 'This is a news for match 1',
      },
      {
        id: 2,
        title: 'News for Match 2',
        matchId: 1,
        tourId: 1,
        description: 'This is another news for match 1',
      },
    ]);

    // Your test code...
    const response = await supertest(app)
      .get(`/news/match/${matchId}`);

    // Assertions
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array').that.has.lengthOf(2);
    expect(response.body[0]).to.have.property('title', 'News for Match 1');
    expect(response.body[1]).to.have.property('title', 'News for Match 2');
  });

  it('should get news by tourId', async () => {
    // Set up the stub response
    const tourId = '1';
    getNewsByTourStub.withArgs(tourId).resolves([
      {
        id: 1,
        title: 'News for Tour 1',
        tourId: 1,
        sportId: 1,
        description: 'This is a news for tour 1',
      },
      {
        id: 2,
        title: 'News for Tour 2',
        tourId: 1,
        sportId: 1,
        description: 'This is another news for tour 1',
      },
    ]);

    // Your test code...
    const response = await supertest(app)
      .get(`/news/tour/${tourId}`);

    // Assertions
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array').that.has.lengthOf(2);
    expect(response.body[0]).to.have.property('title', 'News for Tour 1');
    expect(response.body[1]).to.have.property('title', 'News for Tour 2');
  });

  it('should get news by sportId', async () => {
    // Set up the stub response
    const sportId = '1';
    getNewsBySportStub.withArgs(sportId).resolves([
      {
        id: 1,
        title: 'News for Sport 1',
        matchId: 1,
        tourId: 1,
        sportId: 1,
        description: 'This is a news for sport 1',
      },
      {
        id: 2,
        title: 'News for Sport 2',
        matchId: 2,
        tourId: 2,
        sportId: 1,
        description: 'This is another news for sport 1',
      },
    ]);

    // Your test code...
    const response = await supertest(app)
      .get(`/news/sport/${sportId}`);

    // Assertions
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array').that.has.lengthOf(2);
    expect(response.body[0]).to.have.property('title', 'News for Sport 1');
    expect(response.body[1]).to.have.property('title', 'News for Sport 2');
  });

  // Add more test cases as needed...

});
