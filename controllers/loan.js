const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {

  const result = await mongodb.getDb().db().collection('loans').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getOne = async (req, res) => {
  const loanId = new ObjectId(req.params.id)
  const result = await mongodb.getDb().db().collection('loans').find({ _id: loanId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};
//Get loans by memberID
const getByMemberID = async (req, res) => {
  const memberID = req.params.memberID; // Get memberID from the request parameters
  const result = await mongodb.getDb().db().collection('loans').find({ memberID: memberID });
  
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  }).catch((error) => {
    res.status(500).json({ error: 'Failed to retrieve records' });
  });
};


const add = async (req, res) => {
  const loan = {
    memberID: req.body.memberID,
    bookID: req.body.bookID,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };
  const response = await mongodb.getDb().db().collection('loans').insertOne(loan);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating a loan.');
  }
};

const update = async (req, res) => {
  const loanId = new ObjectId(req.params.id);

  const loan = {
    memberID: req.body.memberID,
    bookID: req.body.bookID,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };

  const response = await mongodb
    .getDb()
    .db()
    .collection('loans')
    .replaceOne({ _id: loanId }, loan);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Errors while updating the loan.');
  }
};

const remove = async (req, res) => {
  const loanId = new ObjectId(req.params.id);
  console.log(loanId);
  const response = await mongodb.getDb().db().collection('loans').deleteOne({ _id: loanId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Errors wheh deleting log.');
  }
};

module.exports = {
  getAll, getOne, getByMemberID, add, update, remove
}