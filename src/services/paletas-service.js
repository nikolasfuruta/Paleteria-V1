const paletas = require('../db/schema')

const findAll = async () => {
  try {
    const res = await paletas.find()
    return res
  } catch (e) {
    return { message: 'Paletas não encontradas' }
  }
}

const findOne = async (id) => {
  try {
    const res = await paletas.findById(id)
    return res
  } catch (e) {
    return { message: 'Paleta não encontrada' }
  }
}

const create = async (info) => {
  try {
    await paletas.create(info)
    return info
  } catch (e) {
    throw new Error({ message: 'Paleta não criado' })
  }
}

const update = async (id, info) => {
  try {
    const res = await paletas.updateOne(id, info)
    return res
  } catch (e) {
    return { message: 'Paleta não alterada' }
  }
}

const remove = async (id) => {
  try {
    const res = await paletas.deleteOne({ _id: id })
    if (res) {
      return { message: 'Paleta deletado' }
    }
  } catch (e) {
    console.error(e)
    return { message: 'Paleta não deletada' }
  }
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
}
