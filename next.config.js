const path = require('path')

module.exports = {
  env: {
    DB_TYPE: 'postgres',
    TYPEORM_HOST: 'localhost',
    TYPEORM_PORT: 5432,
    TYPEORM_USERNAME: 'my_user',
    TYPEORM_PASSWORD: 'psql',
    TYPEORM_DATABASE: 'foodie_db',
  },

  future: {
    webpack5: true,
  },
  webpack: (config) => {
    config.experiments = {};
    config.plugins = config.plugins || []

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles/')],
  },

}
