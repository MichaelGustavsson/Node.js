import { app } from './app.mjs';

const PORT = process.env.PORT || 5002;

app.listen(PORT, () =>
  console.log(
    `Server is up and running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`
  )
);
