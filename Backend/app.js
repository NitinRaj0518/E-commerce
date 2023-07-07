const { response } = require('express');
const express = require('express');
const courseRoutes = require('./routes/course');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const app = express();
const { dbConn } = require('./config/db');
const cors = require('cors');


const port = 3001;
app.use(express.json())
app.use(cors());
app.use('/course',courseRoutes);
app.use('/user',userRoutes);
app.use('/product',productRoutes);
dbConn();
app.listen(port,()=>{
    console.log(`Server started at port ${port}`);
})