import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Skapa en server...
const app = express();

// Middleware...
app.use(express.static(path.join(__dirname, 'static')));

const PORT = 5001;
app.listen(PORT, () => console.log(`Servern kör nu på port: ${PORT}`));
