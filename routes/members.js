const express = require('express');
const router = express.Router();
const controller = require('../controllers/members');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Add isAuthenticated to all routes after testing

//Get all members
router.get('/', controller.getAllMembers);

//Get member by ID
router.get('/:id', validation.checkID, controller.getMember);

// Add new member
router.post('/', validation.memberDataValidation, controller.addMember);

// Update member by ID
router.put('/:id', validation.checkID, controller.updateMemberByID);

// Remove member by ID
router.delete('/:id', validation.checkID, controller.deleteMember);

module.exports = router;
