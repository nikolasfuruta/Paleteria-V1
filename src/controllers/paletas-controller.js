const PaletasService = require('../services/paletas-service')

const findAll = async (req, res) => {
  try {
    const result = await PaletasService.findAll()
    res.status(200).send(result)
  } catch (err) {
    console.error(err)
    res.status(403).send({ message: 'Erro' })
  }
}

const findOne = async (req, res) => {
  const id = req.params.id
  try {
    const result = await PaletasService.findOne(id)
    res.status(200).send(result)
  } catch (err) {
    console.error(err)
    res.status(403).send({ message: 'Erro' })
  }
}

const create = async (req, res) => {
  const info = req.body
  try {
    const result = await PaletasService.create(info)
    res.status(200).send(result)
  } catch (err) {
    console.error(err)
    res.status(403).send({ message: 'Erro' })
  }
}

const update = async (req, res) => {
  const id = req.params.id
  const info = req.body
  try {
    const result = await PaletasService.update(id, info)
    res.status(200).send(result)
  } catch (err) {
    console.error(err)
    res.status(403).send({ message: 'Erro' })
  }
}

const remove = async (req, res) => {
  const id = req.params.id
  try {
    const result = await PaletasService.remove(id)
    res.status(200).send(result)
  } catch (err) {
    console.error(err)
    res.status(403).send({ message: 'Erro' })
  }
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
}
