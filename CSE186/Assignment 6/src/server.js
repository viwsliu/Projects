const app = require('./app.js');

app.listen(3010, () => {
  console.log('CSE186 Assignment 6 Server Running');
  console.log('API Testing UI is at: http://localhost:3010/v0/api-docs/');
});
