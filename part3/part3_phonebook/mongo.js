const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const name = process.argv[3]

const number = process.argv[4]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.gm92c.mongodb.net/part3_command-line?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const noteSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    name: String(name),
    number: String(number)
})

if (process.argv.length > 3) {
    note.save().then(result => {
        console.log('note saved!')
        console.log(note)
        mongoose.connection.close()
    })
}

if (process.argv.length === 3) {
    Note.find({}).then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
}