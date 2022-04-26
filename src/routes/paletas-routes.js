const router = require('express').Router()

router.route('/paletas').get().post()

router.route('/paletas/:id').get().patch().delete()

module.exports = router
