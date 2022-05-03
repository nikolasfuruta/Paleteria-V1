const mongoose = require('mongoose')

require('dotenv').config()
const uri = process.env.URI

function conectarBancoDeDados() {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

module.exports = conectarBancoDeDados
