import { NextApiRequest, NextApiResponse } from 'next';
import { getConnection } from '../database';

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
const initMiddleware = (middleware: any) => {
  // Vercel is serverless, so it doesn't maintain the active connections unless first initiated. The app setup init connection doesn't persist. So we need to double check a connection is active.
  return (req: NextApiRequest, res: NextApiResponse) => getConnection()
    .finally(() => {
      return () => new Promise((resolve, reject) => {
        middleware(req, res, (result: any) => {
          if (result instanceof Error) {
            return reject(result);
          }
          return resolve(result);
        });
      });
    });
};

export default initMiddleware;
