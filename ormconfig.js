module.exports = {
  "name": process.env.CONFIG_NAME,
  "type": process.env.DB_TYPE,
  "url": process.env.DB_URL,
  "synchronize": false,
  "logging": true,
  "extra": {
    "ssl": true,
    "rejectUnauthorized": process.env.NODE_ENV !== "production" ? false : true,
  },
  "entities": [
    "src/entities/**/*.ts",
    "dist/entities/**/*.js"
  ],
  "migrations": [
    "src/migrations/**/*.ts"
  ]
}