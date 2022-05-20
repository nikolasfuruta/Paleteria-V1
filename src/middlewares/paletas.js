const mongoose = require('mongoose')

const validId = (req, res, next) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('ID inválido')
  }
  next()
}

const validObjectBody = (req, res, next) => {
  const info = req.body
  if (!info || !info.sabor || !info.descricao || !info.foto || !info.preco) {
    throw new Error('Erro na informação passada')
  }
  next()
}

module.exports = { validId, validObjectBody }
