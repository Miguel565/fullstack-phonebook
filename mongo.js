const mongoose = require('mongoose');
//const normalize = require('normalize-mongoose');

if(process.argv.length < 3){
    console.log('Give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://miguelguerrerog6:${password}@cluster0.xu6axbw.mongodb.net/`
const dbName = 'phonebook-app'

mongoose.set('strictQuery', false)
mongoose.connect(`${url}${dbName}`)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})
/*
personSchema.plugin(normalize).set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})*/

const Persons = mongoose.model('Persons', personSchema)

const person = new Persons({
    name: process.argv[3],
    number: process.argv[4],
})

Persons.find({}).then(result => {
    result.forEach(person => {
        console.log(`${person.name}: ${person.number}`)
    })
    mongoose.connection.close()
})

person.save().then(result => {
    console.log('Contact saved!')
    mongoose.connection.close()
}).catch(error => {
    console.log('Error saving contact:', error.message)
})