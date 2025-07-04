require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const PORT = process.env.PORT

let persons = []

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
morgan.token('data', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/', (req, res) => {
    res.send('<h1>The phonebook</h1>')
})

app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(persons => {
        res.json(persons)
    }).catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then((person) => {
        if(person){
            res.json(person)
        } else {
            res.status(404).end()
        }
    }).catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body
    if(!body.name || !body.number){
        return res.status(400).json({ error: 'name or number missing' })
    }
    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(savedPerson => {
        if(savedPerson){
            res.status(201).end()
        } else{
            res.status(400).end()
        }
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end()
        }).catch(error => next(error))
})

app.get('/info', (req, res) => {
    const date = new Date()
    const count = persons.length
    res.send(`<p>Phonebook has info for ${count} people</p><br /><p>${date}</p>`)
})

const unknowEndPoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknowEndPoint)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})
