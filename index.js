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

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})