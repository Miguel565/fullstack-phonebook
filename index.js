require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const PORT = process.env.PORT

let persons = []

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

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    }).catch(error => {
        console.error('Error fetching persons: ', error.message)
        res.status(500).json({ error: 'Internal server error' })
    })
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then((person) => {
        if(person){
            res.json(person)
        } else {
            res.status(404).json({ error: 'Person not found' })
        }
    }).catch(error => {
        console.error('Error fetching person: ', error.message)
        res.status(500).json({ error: 'Internal server error' })
    })
})

app.post('/api/persons', (req, res) => {
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
            res.status(201).json(savedPerson)
        } else{
            res.status(400).json({ error: 'Failed to save person' })
        }
    }).catch(error => {
        console.log('Error saving person: ', error.message)
        res.status(500).json({ error: 'Internal server error' })
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
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

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})
