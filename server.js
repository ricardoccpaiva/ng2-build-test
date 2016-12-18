var express = require('express');
var app = express();

app.use('/*', express.static('dist'));

app.listen(process.env.PORT || 8002, function() {
  console.log('The server is now up and running.');
});
