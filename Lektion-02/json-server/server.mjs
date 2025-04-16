import http from 'http';
import { v4 as uuidv4 } from 'uuid';
import JsonHandler from './JsonHandler.mjs';

const server = http.createServer(async (req, res) => {
  const { url, method, headers } = req;
  let vehicles;

  // Läs in innehållet i vår fejkade databas.(vehicles.json)...
  const jsonHandler = new JsonHandler('data', 'vehicles.json');
  vehicles = await jsonHandler.readFromFile();

  req
    .on('data', (chunk) => {
      console.log(chunk);
    })
    .on('end', async () => {
      const requestUrl = new URL(`${headers.host}${url}`);
      const id = requestUrl.searchParams.get('id');
      console.log(id);
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
  console.log(`Servern är upp och lyssnar på url http://localhost:${PORT}`)
);
