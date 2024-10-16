const Validator = require('validatorjs');
const mongodb = require('../data/database');

const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

// This will check if the ID returns a valid object
async function getOneByID(ID) {
	const validMember = await mongodb
		.getDatabase()
		.db()
		.collection('members')
		.find({ _id: ID })
		.toArray();

	if (validMember.length > 0) {
		return validMember;
	}

	const validBook = await mongodb
		.getDatabase()
		.db()
		.collection('books')
		.find({ _id: ID })
		.toArray();

  if (validBook.length > 0) {
	  return validBook;
  }

  const validAuthor = await mongodb
		.getDatabase()
		.db()
		.collection('authors')
		.find({ _id: ID })
		.toArray();

	if (validAuthor.length > 0) {
		return validAuthor;
	}
  
  const validLoan = await mongodb
		.getDatabase()
		.db()
		.collection('loans')
		.find({ _id: ID })
		.toArray();

	if (validLoan.length > 0) {
		return validLoan;
	}
}

module.exports = { validator, getOneByID };