import next from 'next';
import 'reflect-metadata';
import { createServer } from 'http';

import { connectDB } from './database';

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(async () => {
    await connectDB();

    const port = Number(process.env.PORT) || 3000;

    createServer((req, res) => {
      handle(req, res);
    }).listen(port, () => {
      console.log(`>> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
