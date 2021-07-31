import next from 'next';
import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import { connectDB } from './database';
import RestaurantRouter from './routes/restaurantRouter';
import ItemRouter from './routes/itemRouter';

const dev = process.env.NODE_ENV !== 'production';
if (dev) {
  console.log('>> Rejecting Node TLS');
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    connectDB();

    const port = Number(process.env.PORT) || 3000;

    // Routes
    // https://github.com/vercel/next.js/issues/8544
    const server = express();
    server.use(cors());
    server.use(express.urlencoded({
      extended: true,
    }));
    server.use(express.json());
    server.use(RestaurantRouter);
    server.use(ItemRouter);

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
