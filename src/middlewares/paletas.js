const mongoose = require('mongoose')

const validId = (req, res, next) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'ID inválido' })
  }
  next()
}

const validObjectBody = (req, res, next) => {
  const info = req.body
  if (!info || !info.sabor || !info.descricao || !info.foto || !info.preco) {
    return res.status(400).send({ message: 'Erro na informação passada' })
  }
}

module.exports = { validId, validObjectBody }
