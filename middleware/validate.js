const validator = require('../helpers/validate');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


//update loan validator by Berny Fred
const isValidDate = (dateString) => {
	const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/; // Matches MM/DD/YYYY format
	if (!regex.test(dateString)) {
		return false;
	}
	const date = new Date(dateString);
	return date instanceof Date && !isNaN(date);
};

const validateLoan = async (req, res, next) => {
	const validationRule = {
		memberID: 'required|string',
		bookID: 'required|string',
		startDate: 'required|string',
		endDate: 'required|string',
	};

	validator.validator(req.body, validationRule, {}, async (err, status) => {
		if (!status) {
			return res.status(412).send({
				success: false,
				message: 'Validation failed',
				data: err,
			});
		}

		// Check if startDate and endDate are valid dates in MM/DD/YYYY format
		if (!isValidDate(req.body.startDate) || !isValidDate(req.body.endDate)) {
			return res.status(400).send({
				success: false,
				message: 'Invalid date format for startDate or endDate. Expected format: MM/DD/YYYY.',
			});
		}

		try {
			// Check if member exists
			const member = await mongodb
				.getDatabase()
				.db()
				.collection('members')
				.findOne({ _id: new ObjectId(req.body.memberID) });

			if (!member) {
				return res.status(404).send({
					success: false,
					message: 'No User is Available.',
				});
			}

			// Check if book exists and has available copies
			const book = await mongodb
				.getDatabase()
				.db()
				.collection('books')
				.findOne({ _id: new ObjectId(req.body.bookID) });

			if (!book) {
				return res.status(404).send({
					success: false,
					message: 'Book is not available.',
				});
			}

			if (book.availableCopies <= 0) {
				return res.status(400).send({
					success: false,
					message: 'Book is not available.',
				});
			}

			next(); // All validations passed
		} catch (dbError) {
			return res.status(500).send({
				success: false,
				message: 'Error validating loan data.',
				data: dbError.message,
			});
		}
	});
};


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
	validateLoan,
};
