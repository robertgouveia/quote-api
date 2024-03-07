const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.listen(PORT)

const quoteRouter = express.Router()
app.use('/api/quotes', quoteRouter)

quoteRouter.get('/', (req, res, next) => {
    if(!req.query.name){
        res.send(quotes);
    } else {
        const quoteList = quotes.filter(object => {
            return object.person === req.query.name
        })
        res.send(quoteList)
    }
})

quoteRouter.post('/', (req, res, next) => {
    const {quote, person} = req.query
    if(quote && person){
        quotes.push(req.query)
        res.status(201).send()
    } else {
        res.status(400).send()
    }
})

quoteRouter.delete('/:id', (req, res, next) => {
    let quoteIndexToDelete = quotes.filter(quote => {
        return quote.id === req.params.id
    });
    quoteIndexToDelete = quoteIndexToDelete[0].id;
    if (quoteIndexToDelete !== null) {
        quotes.splice(quoteIndexToDelete, 1);
        res.status(202).send(quotes);
    } else {
        res.status(404).send();
    }
});

quoteRouter.get('/random', (req, res, next) => {
    const quote = getRandomElement(quotes)
    res.send(quote);
})