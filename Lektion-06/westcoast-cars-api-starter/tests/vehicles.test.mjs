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

  it('should return a 404 message if no vehicle was found', async () => {
    await request(app)
      .get(url + '/979616370b704d02b290f953e23fe0d')
      .expect('Content-Type', /json/)
      .expect(404);
  });
});

describe('Adding vehicles', () => {
  it.skip('should add a new vehicle and return status 201', async () => {
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

  it.skip('should not return null', () => {
    expect(vehicle).not.toBeNull();
  });

  it.skip('should match object structure of added vehicle', () => {
    expect(vehicle.body.data).toMatchObject({
      manufacturer: 'Volvo',
      model: 'XC90',
      modelYear: 2015,
    });
  });
});

describe('Removing vehicle', () => {
  it.skip('should delete a vehicle and return 204', async () => {
    await request(app)
      .delete(url + '/428d78ffaca940adb8988ddbc4869082')
      .expect(204);
  });
});

// Add a test for update vehicle...
describe('Updating vehicle', () => {
  it('should update a vehicle and return 204', async () => {
    await request(app)
      .put(url + '/169aaa1355434030ae1acbcfac44cfde')
      .send({
        manufacturer: 'Volvo',
        model: 'XC90',
        modelYear: 2015,
      })
      .expect(204);
  });
});
