const express = require('express')
const app = express()
const PORT = 3001

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

app.use(express.json())

app.get('/', (req, res) =>{
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

app.get('/info', (req, res) => {
    const date = new Date()
    const count = contacts.length
    res.send(`<p>Phonebook has info for ${count} people</p><br /><p>${date}</p>`)
})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})