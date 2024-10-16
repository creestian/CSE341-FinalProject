const validator = require('../helpers/validate');
const ObjectId = require('mongodb').ObjectId;

const saveContact = (req, res, next) => {
	const validationRule = {
		name: 'required|string',
		muzzle: 'string',
		barrel: 'string',
		optic: 'string',
		stock: 'string',
		magazine: 'string',
		underbarrel: 'string',
		ammunition: 'string',
		rearGrip: 'string',
	};
	validator.validator(req.body, validationRule, {}, (err, status) => {
		if (!status) {
			res.status(412).send({
				success: false,
				message: 'Validation failed',
				data: err,
			});
		} else {
			next(); // goes to contactsController.updateContact en routes/contacts.
		}
	});
};

const memberDataValidation = (req, res, next) => {
	const validationRule = {
		firstName: 'required|string',
		lastName: 'required|string',
		email: 'required|email',
		dob: 'required|date',
		accountType: 'required|string|in:member,librarian',
		loans: 'array',
		'loans.*': 'string',
		toBeRead: 'array',
		'toBeRead.*': 'string',
	};
	validator.validator(req.body, validationRule, {}, (err, status) => {
		if (!status) {
			res.status(412).send({
				success: false,
				message: 'Validation failed',
				data: err,
			});
		} else {
			next();
		}
	});
};

async function checkID(req, res, next) {
	try {
		const ID = new ObjectId(req.params.id);
		const validDocument = await validator.getOneByID(ID);
		if (validDocument.length < 1) {
			res.status(412).send({
				success: false,
				message: 'Validation failed',
				data: 'Invalid ID - ID not found',
			});
		} else {
			next();
		}
	} catch {
		res.status(400).send({
			success: false,
			message: 'Validation failed',
			data: 'Invalid ID format',
		});
	}
}

async function validateAddRemove(req, res, next) {
	const validationRule = {
		memberID: 'required|string',
		listType: 'required|string|in:toBeRead,loans',
		itemID: 'required|string',
	};
	validator.validator(req.body, validationRule, {}, (err, status) => {
		if (!status) {
			res.status(412).send({
				success: false,
				message: 'Validation failed',
				data: err,
			});
		} else {
			next();
		}
	});
}

async function checkAddRemoveIDs(req, res, next) {
	try {
		const memberID = new ObjectId(req.body.memberID);
		const itemID = new ObjectId(req.body.itemID);
		const validItem = await validator.getOneByID(itemID);
		const validMember = await validator.getOneByID(memberID);
		if (validItem.length < 1 && validMember.length < 1) {
			res.status(412).send({
				success: false,
				message: 'Validation failed',
				data: 'Invalid IDs - IDs not found',
			});
		} else {
			next();
		}
	} catch {
		res.status(400).send({
			success: false,
			message: 'Validation failed',
			data: 'Invalid ID format',
		});
	}
}

module.exports = {
	saveContact,
	memberDataValidation,
	checkID,
	validateAddRemove,
	checkAddRemoveIDs,
};
