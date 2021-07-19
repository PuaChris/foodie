import next from 'next';
import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import { connectDB } from './database';
import router from './routes/router';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

connectDB();

app.prepare()
  .then(() => {
    const port = Number(process.env.PORT) || 3000;

    // Routes
    // https://github.com/vercel/next.js/issues/8544
    const server = express();
    server.use(cors());
    server.use(express.urlencoded({
      extended: true,
    }));
    server.use(express.json());
    server.use(router);

    // Lets Next.js handle the rest of the endpoints (assuming these are front-end routes)
    // Next requires getRequestHandler()
    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, () => {
      console.log(`>> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
