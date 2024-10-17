const express = require('express');
const router = express.Router();
const { getAll, getOne, getByMemberID, add, update, remove } = require('../controllers/loan');
const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', getAll);
router.get('/:id', getOne);
router.get('/member/:memberID', isAuthenticated, getByMemberID);
router.post('/add', isAuthenticated, add);
router.put('/update/:id', isAuthenticated, update);
router.delete('/remove/:id', isAuthenticated, remove);''

module.exports = router;
