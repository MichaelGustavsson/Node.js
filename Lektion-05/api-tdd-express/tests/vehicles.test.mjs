import request from 'supertest';
import { app } from '../src/app.mjs';

const url = '/api/v1/vehicles';
let vehicle;

describe('Working with finding vehicles', () => {
  it('should list all vehicles and return status 200', async () => {
    await request(app).get(url).expect(200);
  });

  it('should find a vehicle by its id and return status 200', async () => {
    await request(app).get(url + '/3f48d012ee344596bfd2ee906a91c330');
  });
});

describe('Adding vehicles', () => {
  it('should add a new vehicle and return status 201', async () => {
    vehicle = await request(app)
      .post(url)
      .send({
        manufacturer: 'Volvo',
        model: 'XC90',
        modelYear: 2015,
      })
      .expect(201);

    console.log(vehicle.body.data);
  });

  it('should not return null', () => {
    expect(vehicle).not.toBeNull();
  });

  it('should match object structure of added vehicle', () => {
    expect(vehicle.body.data).toMatchObject({
      manufacturer: 'Volvo',
      model: 'XC90',
      modelYear: 2015,
    });
  });
});
