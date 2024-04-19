require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./router');
const app = express();
const PORT = process.env.PORT || 3000;

const ddb_url = process.env.DDB_URL;

mongoose.connect(ddb_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error tring to connect MongoDB:'));
db.once('open', () => {
  console.log('MongoDB connections successed');
});

app.use(express.json());

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});

module.exports = app;
