const express = require('express');
const app =express();
const bodyparser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors= require('cors');
const authJwt= require('./helpers/jwt');

app.use(cors());
app.options('*',cors());

require('dotenv/config');
const api = process.env.API_URL;

//Routes
const productsRouter= require('./routers/products');
const ordersrouter = require('./routers/orders');
const categoryRouter = require('./routers/category');
const userRouter = require('./routers/user');

//middleware
app.use(bodyparser.json());
app.use(morgan('tiny'));
app.use(authJwt);

//Routers
app.use(`${api}/products`,productsRouter);
app.use(`${api}/orders`,ordersrouter);
app.use(`${api}/user`,userRouter);
app.use(`${api}/category`,categoryRouter);



mongoose.connect(process.env.Connection_string,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'E_shopDB'
})
.then(()=>{
    console.log('database connection is ready...')
})
.catch((err)=>{
    console.log(err);
})

app.listen(3000,()=>{
    
    console.log('server running on http://localhost:3000');
})