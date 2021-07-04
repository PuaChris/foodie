const path = require('path')

module.exports = {
    future: {
    webpack5: true,
  },
  webpack: function (config, options) {
    config.experiments = {};
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles/')],
  },
}
