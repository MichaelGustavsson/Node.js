import request from 'supertest';
import { app } from '../src/app.mjs';
import { describe } from 'vitest';

const url = '/api/v1/customers';

describe('Working with customers', () => {
  describe('List all customers', () => {
    it('should list all customers', async () => {
      await request(app).get(url).expect(200);
    });
  });

  describe('Finding customers', () => {
    it('should find a customer by its email', async () => {
      await request(app).get(`${url}/email/oskar@gmail.com`).expect(200);
    });
  });

  describe('Adding customers', () => {
    it('should add a new customer', async () => {
      const customer = await request(app)
        .post(url)
        .send({
          firstName: 'Olle',
          lastName: 'Oskarsson',
          phone: '070-6987412',
          email: 'oskar@gmail.com',
        })
        .expect(201);

      console.log(customer.body.data);
    });
  });
});
