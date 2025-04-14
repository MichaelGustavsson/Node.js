import http from 'http';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
  const { headers, method, url } = req;
  // console.log('HEADERS FROM BROWSER', headers);
  // console.log('METHOD FROM BROWSER', method);
  // console.log('URL FROM BROWSER', url);
  // res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.writeHead(200, { 'Content-Type': 'text/text' });
  // res.end('<h2>Hi from node web server...</h2>');
  // res.end('Hi from node web server...');

  // Skapa sökvägen till filen som ska skickas tillbaka...
  let filePath = path.join(
    __dirname,
    'static',
    req.url === '/' ? 'index.html' : req.url
  );

  console.log(filePath);

  // Hämta ut filändelsen som förväntas...
  let extension = path.extname(filePath);
  console.log(extension);
  // Standisera att det är content-type html...
  let contentType = 'text/html';

  // Kontrollera filändelsen och sätt rätt 'Content-Type'
  switch (extension) {
    case '.css':
      contentType = 'text/css';
      break;
  }

  // Kontrollera om contentType är specificerat
  // och om ingen filändelse är medskickat
  // t ex http://localhost:5001/index
  // I så fall sätt ändelsen till html
  if (contentType === 'text/html' && extension === '') filePath += '.html';

  let content;

  // Med fördel lägger vi hämtning av icke html filer först...
  if (req.url.includes('.css')) {
    content = await fs.readFile(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content, 'utf-8');
  }
  // Om förfrågan saknar resursnamn
  // t ex http://localhost:5001
  if (req.url === '/') {
    content = await fs.readFile(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content, 'utf-8');
  }

  // Om förfrågan innehåller resurnamnet index
  // t ex http://localhost:5001/index
  if (req.url === '/index') {
    content = await fs.readFile(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content, 'utf-8');
  }

  // Om förfrågan innehåller resurnamnet vehicles
  // t ex http://localhost:5001/vehicles
  if (req.url === '/vehicles') {
    content = await fs.readFile(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content, 'utf-8');
  }
});

const PORT = 5001;

// Starta servern och lyssna på anrop på port 5001...
server.listen(PORT, () =>
  console.log(`Server är upp och kör på url http://localhost:${PORT}`)
);
