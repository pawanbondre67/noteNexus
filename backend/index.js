const express = require('express');
const bodyParser = require('body-parser');

var cors = require('cors');
const db = require('./database/db');

const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const articleRoute = require('./routes/article');



const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', userRoute);
app.use('/category', categoryRoute);
app.use('/article', articleRoute);
app.use(bodyParser.json());

 




module.exports = app;