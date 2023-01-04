const express = require('express');
const router = express.Router();
const updateController= require('../controllers/update-controller');

router.get('/edit/:id',updateController.editData);
router.post('/edit/:id',updateController.updateData);

module.exports = router;