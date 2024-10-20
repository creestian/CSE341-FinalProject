const express = require('express');
const router = express.Router();
const controller = require('../controllers/members');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Add isAuthenticated to all routes after testing

//Get all members
router.get('/', isAuthenticated, controller.getAllMembers);

//Get member by ID
router.get('/:id', isAuthenticated, validation.checkID, controller.getMember);

// Add new member
router.post(
	'/',
	isAuthenticated,
	validation.memberDataValidation,
	controller.addMember
);

// Update member by ID
router.put(
	'/:id',
	isAuthenticated,
	validation.checkID,
	validation.memberDataValidation,
	controller.updateMemberByID
);

// Add loan or to be read book
router.post(
	'/add',
	isAuthenticated,
	validation.validateAddRemove,
	validation.checkAddRemoveIDs,
	controller.addBookArray
);

// Remove loan or to be read book
router.post(
	'/remove',
	isAuthenticated,
	validation.validateAddRemove,
	validation.checkAddRemoveIDs,
	controller.removeBookFromArray
);

// Remove member by ID
router.delete(
	'/:id',
	isAuthenticated,
	validation.checkID,
	controller.deleteMember
);

module.exports = router;
