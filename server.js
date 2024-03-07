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
        if(quoteList.length > 0){
            res.send(quoteList)
        } else {
            res.status(404).send()
        }
    }
})

quoteRouter.get('/random', (req, res, next) => {
    const quote = getRandomElement(quotes)
    res.send(quote);
})

quoteRouter.post('/', (req, res, next) => {
    const {quote, person, id} = req.query
    if(quote && person && id){
        if(quotes.filter(quote => {
            return quote.id === id
        }).length < 1){
            quotes.push(req.query)
            res.status(201).send()
        } else {
            res.status(400).send()
        }
    } else {
        res.status(400).send()
    }
})

quoteRouter.put('/:id', (req, res, next) => {
    const index = req.params.id
    const {name, quote} = req.query
    let quoteToUpdate = quotes.filter(quote => {
        return quote.id === index
    })
    if(!quoteToUpdate.length > 0 || !(name && quote)){
        res.status(400).send()
    }
    if(name) {
        quotes[quoteToUpdate[0].id].person = name
    }
    if(quote) {
        quotes[quoteToUpdate[0].id].quote = quote
    }
    res.status(202).send(quotes);
})

quoteRouter.delete('/:id', (req, res, next) => {
    const idToDelete = req.params.id;
    const indexToDelete = quotes.findIndex(quote => quote.id === idToDelete);

    if(indexToDelete !== -1){
        quotes.splice(indexToDelete, 1);
        res.status(202).send(quotes);
    } else {
        res.status(404).send();
    }
});