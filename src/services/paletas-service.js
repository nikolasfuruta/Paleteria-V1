const mongoose = require('mongoose')

const findAll = async () => {
  const res = await mongoose.findAll()
  return res
}

const findOne = async (id) => {
  const res = await mongoose.findOne(id)
  return res
}

const create = async (info) => {
  const res = await mongoose.create(info)
  return res
}

const update = async (id, info) => {
  const res = await mongoose.update(id, info)
  return res
}

const remove = async (id) => {
  const res = await mongoose.remove(id)
  return res
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
}
