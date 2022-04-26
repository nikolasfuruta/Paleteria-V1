const express = require('express')
const cors = require('cors')
const route = require('./src/routes/paletas-routes')
const conectarBancoDeDados = require('./src/db/connection')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/v1', route)

const port = process.env.PORT || 3000

conectarBancoDeDados()

app.listen(port, () => {
  console.log(`Serever running at port ${port}`)
})
