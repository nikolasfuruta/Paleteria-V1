const express = require('express')
const cors = require('cors')
const route = require('./src/routes/paletas-routes')
const conectarBancoDeDados = require('./src/db/connection')

const app = express()
app.use(express.json())
app.use(cors())
app.use('/v1', route)

const port = process.env.PORT || 3000

try {
  conectarBancoDeDados()
  console.log('Conectado ao bd')
  app.listen(port, () => {
    console.log(`Serever running at port ${port}`)
  })
} catch (e) {
  console.error(e)
  console.log('Não conectado ao bd')
  app.listen(port, () => {
    console.log(`Serever running at port ${port}`)
  })
}
