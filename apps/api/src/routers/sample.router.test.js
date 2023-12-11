import request from 'supertest';
// const { MockModel, MockDataTypes } = require('sequelize-mock');
import { Model } from 'sequelize-mock';
import Sample from '../models/sample.model';
import { initializeApp, teardownApp } from '../test.utils';

describe('sample.router.js', () => {
  let app;
  let mockSample;

  beforeAll(() => {
    app = initializeApp();
    mockSample = new Model({}, Sample);

    jest
      .spyOn(Sample, 'findAll')
      .mockImplementation(() => mockSample.findAll());
  });

  afterAll(() => {
    jest.spyOn(Sample, 'findAll').mockRestore();
    teardownApp();
  });

  it('should return status code 200 for GET /api/sample', async () => {
    mockSample.$queueResult([
      mockSample.build({ id: 1, name: 'Test 1' }),
      mockSample.build({ id: 2, name: 'Test 2' }),
    ]);

    const response = await request(app).get('/api/sample');
    expect(response.status).toBe(200);
  });

  it('should return status array of sample data for GET /api/sample', async () => {
    mockSample.$queueResult([
      mockSample.build({ id: 1, name: 'Test 1' }),
      mockSample.build({ id: 2, name: 'Test 2' }),
    ]);

    const response = await request(app).get('/api/sample');
    expect(response.body).toMatchObject([
      { id: 1, name: 'Test 1' },
      { id: 2, name: 'Test 2' },
    ]);
  });
});
