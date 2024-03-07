const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT)

const quoteRouter = express.Router()
app.use('/api/quotes', quoteRouter)

quoteRouter.get('/random', (req, res, next) => {
    const quote = getRandomElement(quotes)
    res.send(quote);
})