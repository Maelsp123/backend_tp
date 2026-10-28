const express = require('express');
const router = express.Router();
const { getContacts, getContactById } = require('../controllers/contactController');

router.get('/', getContacts);
router.get('/:id', getContactById);

module.exports = router;
