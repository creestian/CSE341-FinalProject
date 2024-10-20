const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Loans']
  try {
    const result = await mongodb.getDatabase().db().collection('loans').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve loans' });
  }
};

const getOne = async (req, res) => {
  //#swagger.tags=['Loans']
  try {
    const loanId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('loans').find({ _id: loanId });
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the loan' });
  }
};

const getByMemberID = async (req, res) => {
  //#swagger.tags=['Loans']
  try {
    const memberID = req.params.memberID;
    const result = await mongodb.getDatabase().db().collection('loans').find({ memberID: memberID });
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve loans by member ID' });
  }
};

const add = async (req, res) => {
  //#swagger.tags=['Loans']
  try {
    const loan = {
      memberID: req.body.memberID,
      bookID: req.body.bookID,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    };
    const response = await mongodb.getDatabase().db().collection('loans').insertOne(loan);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json('Some error occurred while creating the loan.');
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a new loan' });
  }
};

const update = async (req, res) => {
  //#swagger.tags=['Loans']
  try {
    const loanId = new ObjectId(req.params.id);
    const loan = {
      memberID: req.body.memberID,
      bookID: req.body.bookID,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('loans')
      .replaceOne({ _id: loanId }, loan);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json('Failed to update the loan.');
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the loan' });
  }
};

const remove = async (req, res) => {
  //#swagger.tags=['Loans']
  try {
    const loanId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('loans').deleteOne({ _id: loanId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json('Failed to delete the loan.');
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the loan' });
  }
};

module.exports = {
  getAll,
  getOne,
  getByMemberID,
  add,
  update,
  remove,
};
