const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Router = require('./routers/products')

require('dotenv/config');

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

//routers
const productsRouter = require('./routers/products')
const cartsRoute = require

const api = process.env.API_URL;

app.use(`${api}/products`, productsRouter);
app.use(`${api}/carts`, cartsRoute);


mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
  console.log('Database connection is ready')
})
.catch((err) => {
  console.log(err)
})

app.listen(3000, () => {
 console.log('server is running at http://localhost:3000')
})