// const tracer = require('dd-trace').init()
const http = require('http');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const models = require('./models');
const dotenv = require('dotenv');
const config = dotenv.config();
const constants = require('./constants');
const cors = require('cors');

const multer = require('multer');

const expressJwt = require('express-jwt');
const validateJwt = expressJwt({
  secret: 'exchange-secret'
});

const middleware = require('./lib/middleware');

// let mongoUrl = `mongodb://${encodeURIComponent(process.env.dbUserName)}:${encodeURIComponent(process.env.dbPassword)}@${process.env.dbHost}/${process.env.dbName}`;
let mongoUrl = `mongodb://localhost:27017/bookexchange`
const db_config = {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500,
    readPreference:'secondaryPreferred'
}

mongoose.connect(mongoUrl);
mongoose.Promise = global.Promise;
const app = express();
const routes = require('./router');

global.constants = constants;

const server = http.createServer(app)



app.use(cors());
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(bodyParser.json())

const DEFAULT_ENV = 'development';
if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = DEFAULT_ENV;
}

app.use('/as-api', routes);

app.get('/', function(req, res) {
    res.status(200).send();
});
// routes(app);

server.listen(3050, () => console.log(`Listening on port 3050`));