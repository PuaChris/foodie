# foodie
A web app that you can save restaurants and the items you've ordered as well as their prices, how you felt about the restaurant/item and if you would recommend it to others. Built using:
- `React` with the `Next.js` framework,
- `Vercel` to ship and deploy the app and,
- `PostgreSQL` for the database (hosted on Heroku).

Link to production -> https://foodie-puachris.vercel.app/
# How to Install
Go into the main directory (one level up from `src`) and run either `npm install` or `yarn install` to set up the project. All the required code is within this single repository thanks to Vercel's serverless setup. To set up a production database, install Postgres on Heroku using this [**guide**.](https://dev.to/prisma/how-to-setup-a-free-postgresql-database-on-heroku-1dc1). You can also use a local set-up.

A `.env` file will also be required for filling in the following information:
- `DB_PORT` -> Default for Postgres is 5432
- `DB_HOST_PROD` -> Host for production database
- `DB_USERNAME_PROD` -> Username for production database
- `DB_PASSWORD_PROD` -> Password for production database
- `DB_NAME_PROD` -> Name of production database

- `DB_HOST_DEV` -> Host for local database (typically "localhost")
- `DB_USERNAME_DEV` -> Username for local database
- `DB_PASSWORD_DEV` -> Password for local database
- `DB_NAME_DEV` -> Name of local database


How to make a project with Next and Express: 
https://blog.logrocket.com/how-to-build-a-server-rendered-react-app-with-next-express-d5a389e7ab2f/