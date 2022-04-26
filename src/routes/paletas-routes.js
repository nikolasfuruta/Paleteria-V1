const router = require('express').Router()
const { validId, validObjectBody } = require('../middlewares/paletas')
const PaletasController = require('../controllers/paletas-controller')

router
  .route('/paletas')
  .get(PaletasController.findAll)
  .post(validObjectBody, PaletasController.create)

router
  .route('/paletas/:id')
  .get(validId, PaletasController.findOne)
  .patch(validId, validObjectBody, PaletasController.update)
  .delete(validId, PaletasController.remove)

module.exports = router
