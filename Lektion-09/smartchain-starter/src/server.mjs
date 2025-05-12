import { app } from './app.mjs';

const PORT = process.env.PORT || 3010;

app.listen(PORT, () =>
  console.log(
    `Servern är startad på adress http://localhost:${PORT} och kör i läget ${process.env.NODE_ENV}`
  )
);
