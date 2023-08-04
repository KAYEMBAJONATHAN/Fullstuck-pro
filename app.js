const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

//routers
const productsRouter = require('./routers/products');
const cartsRoute = require('./routers/carts');
const ordersRoute = require('./routers/orders');
const usersRoute = require('./routers/users');

const api = process.env.API_URL;

app.use(`${api}/products`, productsRouter);
app.use(`${api}/carts`, cartsRoute);
app.use(`${api}/orders`, ordersRoute);
app.use(`${api}/users`, usersRoute);

//Database
mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
  console.log('Database connection is ready')
})
.catch((err) => {
  console.log(err)
})

//sever
app.listen(3000, () => {
 console.log('server is running at http://localhost:3000')
})
