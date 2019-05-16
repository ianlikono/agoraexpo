const path = require('path');

const options = {
  root: path.join(__dirname, '/static'),
  headers: {
    'Content-Type': 'text/plain;charset=UTF-8',
  },
};

const robots = ({ server }) => {
  server.get('/robots.txt', ({}, res) => {
    res.status(200).sendFile('robots.txt', options);
  });
};

export { robots };
