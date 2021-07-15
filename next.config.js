const path = require('path')

module.exports = {
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
