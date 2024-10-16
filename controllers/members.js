const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllMembers = async (req, res) => {
	//#swagger.tags=['Members']
	try {
		const result = await mongodb
			.getDatabase()
			.db()
			.collection('members')
			.find();
		result.toArray().then((lists) => {
			res.setHeader('Content-Type', 'application/json');
			res.status(200).json(lists);
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getMember = async (req, res) => {
	//#swagger.tags=['Members']
	try {
		const ID = new ObjectId(req.params.id);
		const result = await mongodb
			.getDatabase()
			.db()
			.collection('members')
			.find({ _id: ID });
		result.toArray().then((lists) => {
			res.setHeader('Content-Type', 'application/json');
			res.status(200).json(lists);
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Add a new member
async function addMember(req, res) {
	//#swagger.tags=['Members']
	try {
		const newMember = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			dob: req.body.dob,
			accountType: req.body.accountType,
			loans: req.body.loans,
			toBeRead: req.body.toBeRead,
		};
		const result = await mongodb
			.getDatabase()
			.db()
			.collection('members')
			.insertOne(newMember);
		res
			.status(200)
			.json({ message: 'New member added', memberID: result.insertedId });
	} catch (error) {
		console.error('Error adding new member:', error);
		res.status(500).json({ message: 'Failed to add new member' });
	}
}

// Update a single read book by ID
async function updateMemberByID(req, res) {
	//#swagger.tags=['Members']
	try {
		const ID = new ObjectId(req.params.id);
		const updatedInfo = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			dob: req.body.dob,
			accountType: req.body.accountType,
			loans: req.body.loans,
			toBeRead: req.body.toBeRead,
		};
		const result = await mongodb
			.getDatabase()
			.db()
			.collection('members')
			.updateOne({ _id: bookID }, { $set: newBook });
		res.status(200).json('Member Updated');
	} catch (error) {
		console.error('Error updating member:', error);
		res.status(500).json({ message: 'Failed to update member.' });
	}
}

// Delete a single member by ID
const deleteMember = async (req, res) => {
	//#swagger.tags=['Members']
	const ID = new ObjectId(req.params.id);
	const result = await mongodb
		.getDatabase()
		.db()
		.collection('members')
		.deleteOne({ _id: ID });
	res.status(200).json('Member Removed');
}

module.exports = { getAllMembers, getMember, addMember, updateMemberByID, deleteMember }