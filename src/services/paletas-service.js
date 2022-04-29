const paletas = require('../db/schema')

const findAll = async () => {
  try {
    const res = await paletas.find()
    if (!res) {
      throw new Error({ message: 'Paletas não encontradas' })
    } else {
      return res
    }
  } catch (e) {
    throw new Error({ message: 'Erro no bd' })
  }
}

const findOne = async (id) => {
  try {
    const res = await paletas.findById(id)
    if (!res) {
      throw new Error({ message: 'Paleta não encontrada' })
    } else {
      return res
    }
  } catch (e) {
    throw new Error({ message: 'Erro no bd' })
  }
}

const create = async (info) => {
  try {
    const res = await paletas.create(info)
    if (!res) {
      throw new Error({ message: 'Paleta não adicionada' })
    } else {
      return res
    }
  } catch (e) {
    throw new Error({ message: 'Erro no bd' })
  }
}

const update = async (id, info) => {
  try {
    const res = await paletas.update(id, info)
    if (!res) {
      throw new Error({ message: 'Paleta não alterada' })
    } else {
      return res
    }
  } catch (e) {
    throw new Error({ message: 'Erro no bd' })
  }
}

const remove = async (id) => {
  try {
    const res = await paletas.remove(id)
    return res
  } catch (e) {
    throw new Error({ message: 'Paleta não deletada' })
  }
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
}
