const { response } = require('express');
const express = require('express');
const productRoutes = require('./routes/product');
const app = express();
const { dbConn } = require('./config/db');

const port = 1000;
app.use(express.json());
app.use(productRoutes);
dbConn();
app.listen(port,()=>{
    console.log(`Server started at port ${port}`);
})