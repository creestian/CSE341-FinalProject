const express = require('express');
const router = express.Router();
const controller = require('../controllers/books');
const validation = require('../middleware/validate');
const {isAuthenticated} = require('../middleware/authenticate');

//--ROUTES
//Get all the collection.
router.get('/', controller.getAll);
//Get ony document.
router.get('/:id', controller.getSingle);
//Get all the collection.
router.post('/',isAuthenticated, controller.createMeta);
//Get ony document.
router.put('/:id',isAuthenticated, controller.updateMeta);
//Get ony document.
router.delete('/:id',isAuthenticated, controller.deleteMeta);

module.exports = router;