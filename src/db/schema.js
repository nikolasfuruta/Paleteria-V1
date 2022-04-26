const mongoose = require(mongoose)

const PaletasSchema = new mongoose.Schema({
  sabor: { type: String, required: true },
  descricao: { type: String, required: true },
  foto: { type: String, required: true },
  preco: { type: Number, required: true },
})

module.exports = mongoose.model('Paletas', PaletasSchema)
