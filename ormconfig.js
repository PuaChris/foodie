

module.exports = [{
  "name": process.env.CONFIG_PROD,
  "type": process.env.DB_TYPE,
  "url": process.env.DB_URL,
  "synchronize": false,
  "logging": true,
  "extra": {
    "ssl": true,
    "rejectUnauthorized": process.env.NODE_ENV !== "production" ? false : true,
  },
  "entities": [
    __dirname + "**/entities/**/*.entity{.ts,.js}",
  ],
},
{
  "name": process.env.CONFIG_DEV,
  "type": process.env.DB_TYPE,
  "host": process.env.DB_HOST_DEV,
  "username": process.env.DB_USERNAME_DEV,
  "password": process.env.DB_PASSWORD_DEV,
  "database": process.env.DB_NAME_DEV,
  "synchronize": true,
  "logging": true,
  "entities": [
    __dirname + "/**/entities/**/*.entity{.ts,.js}",
  ],
}]
