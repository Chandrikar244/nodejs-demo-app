const http = require('http');

const options = {
  hostname: '127.0.0.1',
  port: process.env.PORT || 3000,
  path: '/health',
  method: 'GET',
  timeout: 3000
};

const req = http.request(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      if (json.status === 'ok') {
        console.log("TEST PASSED");
        process.exit(0);
      } else {
        console.error("TEST FAILED: invalid response");
        process.exit(1);
      }
    } catch (e) {
      console.error("TEST FAILED: bad JSON");
      process.exit(1);
    }
  });
});

req.on('error', (e) => {
  console.error("TEST FAILED: request error", e.message);
  process.exit(1);
});

req.end();
