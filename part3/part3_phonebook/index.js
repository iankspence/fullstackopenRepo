require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')


const app = express()
const PersonData = require('./models/persondata')

app.use(express.static('build'))

app.use(cors())

app.use(express.json())



morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));



app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons/:id', (request, response, next) => {

    //if undefined will evaluate to false (truthy, falsy)
    PersonData.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            next(error)
        })

})


app.get('/api/persons', (request, response) => {

    PersonData.find({}).then(persons => {
        response.json(persons)
        console.log(persons)
    })
})



app.delete('/api/persons/:id', (request, response) => {

    PersonData.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
    console.log('post-check')
        // console.log()

    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({ error: 'name missing' })
    }
    if (body.number === undefined) {
        return response.status(400).json({ error: 'number missing' })
    }
    const person = new PersonData({
        name: body.name,
        number: body.number
    })
    person.save().then(savedPerson => {
            response.json(savedPerson.toJSON())
        })
        .catch(error => next(error))
})



app.put('/api/persons/:id', (request, response) => {

    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    PersonData.findByIdAndUpdate(request.params.id, person)
        .then(updatedPerson => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})



const errorHandler = (error, request, response, next) => {
    console.error(error.message)


    if (error.name === 'Cast Error') { //invalid object id in MONGO
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
app.use(errorHandler)



const PORT = process.env.PORT
app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
    // console.log(`Server running on port ${PORT}`)