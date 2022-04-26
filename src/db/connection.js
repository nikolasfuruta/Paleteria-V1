const mongoose = require('mongoose')

require('dotenv').config()
const uri = process.env.URI

function conectarBancoDeDados() {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  mongoose.connection.on('connected', () => {
    console.log('Conectado ao bd')
  })
  mongoose.connection.on('disconnected', () => {
    console.log('Desconectado do bd')
  })
  mongoose.connection.on('error', (e) => {
    console.error(e)
    console.log('Erro ao conectar no bd')
  })
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Programa encerrado')
      process.exit(0)
    })
  })
}

module.exports = conectarBancoDeDados
