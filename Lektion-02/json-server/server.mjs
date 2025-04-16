import http from 'http';
import { v4 as uuidv4 } from 'uuid';
import JsonHandler from './JsonHandler.mjs';

const server = http.createServer(async (req, res) => {
  const { url, method, headers } = req;
  let vehicles;

  // Läs in innehållet i vår fejkade databas.(vehicles.json)...
  const jsonHandler = new JsonHandler('data', 'vehicles.json');
  vehicles = await jsonHandler.readFromFile();

  let body = [];
  req
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', async () => {
      body = Buffer.concat(body).toString();

      const requestUrl = new URL(`${headers.host}${url}`);
      const id = requestUrl.searchParams.get('id');

      // Skapa en variabel för statuskoder...
      let statusCode = 404;
      // Skapa ett objekt för retur data...
      const responseModel = {
        success: false,
        statusCode: 404,
        items: 0,
        data: null,
      };

      if (method === 'GET' && url === '/vehicles') {
        statusCode = 200;
        responseModel.success = true;
        responseModel.statusCode = 200;
        responseModel.items = vehicles.length;
        responseModel.data = vehicles;
      } else if (method === 'GET' && url.includes('/vehicles') && id !== null) {
        statusCode = 200;
        responseModel.success = true;
        responseModel.statusCode = 200;
        responseModel.items = 1;
        responseModel.data = vehicles.find((vehicle) => vehicle.id === id);
      } else if (method === 'POST' && url === '/vehicles') {
        const { manufacturer, model } = JSON.parse(body);
        if (!manufacturer || !model) {
          statusCode = 400;
          responseModel.error = 'Information som är vital saknas!';
        } else {
          vehicles.push({
            id: uuidv4().replaceAll('-', ''),
            manufacturer,
            model,
          });

          await jsonHandler.writeToFile(JSON.stringify(vehicles));
          statusCode = 201;
          responseModel.success = true;
          responseModel.statusCode = 201;
          responseModel.data = vehicles.at(-1);
        }
      } else if (method === 'DELETE' && url.includes('/vehicles')) {
        const list = vehicles.filter((vehicle) => vehicle.id !== id);
        await jsonHandler.writeToFile(JSON.stringify(list));
        statusCode = 204;
        responseModel.success = true;
        responseModel.statusCode = 204;
      } else if (method === 'PUT' && url.includes('/vehicles')) {
        const { manufacturer, model } = JSON.parse(body);
        if (!manufacturer || !model) {
          statusCode = 404;
          responseModel.error = 'Information saknas!';
        } else {
          const vehicle = vehicles.find((v) => v.id === id);
          vehicle.manufacturer = manufacturer;
          vehicle.model = model;
          const list = vehicles.filter((v) => v.id !== id);
          list.push(vehicle);
          await jsonHandler.writeToFile(JSON.stringify(list));
          statusCode = 204;
          responseModel.success = true;
        }
      }

      res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        authorization: 'dk4954kf9030osofg340505043938',
        'X-PoweredBy': 'Node.js',
      });

      res.end(JSON.stringify(responseModel));
    });
});

const PORT = 5001;
server.listen(PORT, () =>
  console.log(`Servern är uppe och lyssnar på url http://localhost:${PORT}`)
);
