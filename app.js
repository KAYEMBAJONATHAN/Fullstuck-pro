const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
//const authJwt = require('./helpers/jwt');
const ErrorHandler = require('./helpers/error-handle');

require('dotenv/config');

app.use(cors());
app.options('*',cors());

app.use(bodyParser.json());
app.use(morgan('tiny'));
//app.use(authJwt);
app.use(ErrorHandler)

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
