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

quoteRouter.delete('/:id', (req, res, next) => {
    const index = req.params.id
    const quoteToDelete = quotes.filter(quote => {
        return quote.id === index
    })
    if(quoteToDelete.length > 0){
        quotes.splice(quoteToDelete[0].id, 1)
        res.status(202).send(quotes)
    }
    res.status(404).send()
});

quoteRouter.get('/random', (req, res, next) => {
    const quote = getRandomElement(quotes)
    res.send(quote);
})