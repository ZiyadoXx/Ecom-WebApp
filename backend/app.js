const express = require('express');
const app =express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors= require('cors');

app.use(cors());
app.options('*',cors());
app.set('view engine', 'ejs');
app.set('static', 'public');

require('dotenv/config');
const api = process.env.API_URL;

//Routes
const productsRouter= require('./routers/products');
const ordersrouter = require('./routers/orders');
const categoryRouter = require('./routers/category');
const userRouter = require('./routers/user');

//middleware
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(morgan('tiny'));

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

app.listen(4000,()=>{
    
    console.log('server running on http://localhost:4000');
})