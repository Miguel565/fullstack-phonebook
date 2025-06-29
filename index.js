const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const PORT = process.env.PORT || 3001

let contacts = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456'
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523'
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345'
    },
    {
        id: 4,
        name: 'Mary Poppendieck',
        number: '39-23-6423122'
    }
]

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
    res.json(contacts)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const contact = contacts.find(contact => contact.id === id)
    if(contact){
        res.json(contact)
    } else {
        res.status(404).end()
    }
})

const generateId =() => {
    const countId = contacts.length
    return countId > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 0
}

app.post('/api/persons', (req, res) => {
    const body = req.body
    if(!body.name || !body.number){
        return res.status(400).json({ error: 'name or number missing' })
    }
    const contact = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    if(contacts.some(c => c.name === contact.name)){
        return res.status(400).json({ error: 'The name already exists in the phonebook' })
    }
    contacts = contacts.concat(contact)
    res.json(contact)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    contacts = contacts.filter(contact => contact.id !== id)

    res.status(204).end()
})

app.get('/info', (req, res) => {
    const date = new Date()
    const count = contacts.length
    res.send(`<p>Phonebook has info for ${count} people</p><br /><p>${date}</p>`)
})

const unknowEndPoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknowEndPoint)

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})
