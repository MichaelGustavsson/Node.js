import fs from 'fs/promises';
import path from 'path';

export default async (err, req, res, next) => {
  const filePath = path.join(__appdir, 'logs', 'error.log');

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Internal Server Error';
  err.success = false;
  res.status(err.statusCode).json({
    success: err.success,
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
  });

  const message = `Method: ${req.method} Url: ${
    req.originalUrl
  } Date: ${new Date().toLocaleDateString(
    'sv-SE'
  )} Time: ${new Date().toLocaleTimeString('sv-SE')} Success: ${
    err.success
  } - Message: ${err.message}\n`;

  await fs.appendFile(filePath, message);

  next();
};
