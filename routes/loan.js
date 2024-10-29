const express = require('express');
const router = express.Router();
const { getAll, getOne, getByMemberID, add, update, remove } = require('../controllers/loan');
const {isAuthenticated} = require('../middleware/authenticate');
const { validateLoan } = require('../middleware/validate')

router.get('/', getAll);
router.get('/:id', getOne);
router.get('/member/:memberID', isAuthenticated, getByMemberID);
router.post('/add',isAuthenticated, validateLoan, add);
router.put('/update/:id', isAuthenticated, validateLoan, update);
router.delete('/remove/:id', isAuthenticated, remove);

module.exports = router;
