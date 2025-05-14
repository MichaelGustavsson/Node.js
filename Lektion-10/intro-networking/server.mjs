import express from 'express';
import demoRouter from './routes/routes.mjs';

console.log('ARGV[0]', process.argv[0]);
console.log('ARGV[1]', process.argv[1]);
console.log('ARGV[2]', process.argv[2]);
console.log('ARGV[3]', process.argv[3]);

const PORT = process.argv[2] || 5001;

const app = express();

app.use('/api/demo', demoRouter);

app.listen(PORT, () =>
  console.log(`Servern kör på porten: ${PORT} via adressen ${process.argv[3]}`)
);
