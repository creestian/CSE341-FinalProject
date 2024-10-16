const express = require('express');
const router = require('express').Router();

const authorsController = require('../controllers/authors');

// Add isAuthenticated to all routes after testing
// Add validation to all routes.
// Needs router.get('/:first, last name or both?)
router.get('/', authorsController.getAll);

router.get('/:id', authorsController.getSingle);

router.post('/',  authorsController.createAuthor);

router.put('/:id',  authorsController.updateAuthor);

router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;