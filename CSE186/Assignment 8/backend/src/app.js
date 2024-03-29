const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const apiSpec = path.join(__dirname, '../api/openapi.yaml');
const apidoc = yaml.load(fs.readFileSync(apiSpec, 'utf8'));

app.use(
  '/v0/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(apidoc),
);

app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpec,
    validateRequests: true,
    validateResponses: true,
  }),
);

const dummy = require('./dummy');
const loginfile = require('./login');
const mainfile = require('./root');

app.get('/v0/dummy', dummy.get);
// Your routes go here
app.post('/v0/login', loginfile.post);
app.get('/v0/mailbox', loginfile.check, mainfile.getAll);
app.get('/v0/mail/:id', loginfile.check, mainfile.getById);
app.post('/v0/mail', loginfile.check, mainfile.post);
app.put('/v0/mail/:id', loginfile.check, mainfile.putfunct);

app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

module.exports = app;
