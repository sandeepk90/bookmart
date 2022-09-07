const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')
const morgan = require('morgan');
const createError = require('http-errors');
const connectDatabase = require('./config/db')

// config 
dotenv.config({path:'./config/config.env'})

// database connection 
connectDatabase();

// importing route 
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const bookRoute = require('./routes/book');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/books', bookRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);


app.use(async (req, res, next)=>{
    next(createError.NotFound());
})

app.use((err, req, res, next)=> {
    res.status(err.status || 500);
    res.send({
        error:{
            status: err.status || 500,
            message: err.message
        }
    })
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, (req, res)=> {
    console.log(`server is running on http://localhost:${PORT}`);
})