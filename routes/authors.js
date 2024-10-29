const express = require('express');
const router = require('express').Router();
const authorsController = require('../controllers/authors');
const validation = require('../middleware/validate');
const {isAuthenticated} = require('../middleware/authenticate');



router.get('/', authorsController.getAll);

router.get('/:id', authorsController.getSingle);

router.post('/', isAuthenticated, validation.authorValidation, authorsController.createAuthor);

router.put('/:id', isAuthenticated, validation.authorValidation, authorsController.updateAuthor);

router.delete('/:id', isAuthenticated, validation.checkID, authorsController.deleteAuthor);

module.exports = router;