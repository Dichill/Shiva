const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const middlewares = require('./middlewares/index').middleware;
const api = require('./api')

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({
        isSuccess: 'false',
        message: 'You are in the main directory of Shiva'  
    });
});

app.use('/api/v1/', api);

app.use(middlewares);

module.exports = app;