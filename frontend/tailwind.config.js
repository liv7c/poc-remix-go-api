const path = require('path');

const fromRoot = (p) => path.join(__dirname, p);

module.exports = {
  content: [fromRoot('./app/**/*.+(js|ts|tsx)')],
  theme: {
    extend: {},
  },
  plugins: [],
};
