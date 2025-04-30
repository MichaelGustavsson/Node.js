export const logger = (req, res, next) => {
  const message = `${req.method} ${
    req.originalUrl
  } - ${new Date().toLocaleDateString('sv-SE')} ${new Date().toLocaleTimeString(
    'sv-SE'
  )}`;

  console.log(message);

  // Skriv loggen till en fil i en katalog som ska heta logs.
  // Skapa en fil som heter logs.txt

  next();
};
