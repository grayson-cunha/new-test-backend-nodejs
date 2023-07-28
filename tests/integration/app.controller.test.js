import supertest from 'supertest';
import app from '../../src/app';

describe('app controller', () => {
  it('should return status code 200 and hello world on body', async () => {
    await supertest(app)
      .get('/')
      .expect(200)
      .then((res) => {
        const { message } = res.body;

        expect(message).toBe('Hello World');
      });
  });
});
