const mongoose = require('mongoose')

const url = process.env.MONGODB_URI


mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB!', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 20,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        maxLength: 10,
        validate: {
            validator: function(v){
                return /\d{2,3}-\d{4,7}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'Number is required']
    }
})
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Persons', personSchema)