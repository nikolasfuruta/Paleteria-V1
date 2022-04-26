const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
//app.use('/paletas', route)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Serever running at port ${port}`)
})
