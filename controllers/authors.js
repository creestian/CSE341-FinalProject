const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try{ 
            //#swagger.tags=[ 'Authors' ]
        const result = await mongodb.getDatabase().db().collection('authors').find();
        result.toArray().then((authors) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(authors);
        });
    }catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getSingle = async (req, res) => {
    try{
        //#swagger.tags=[ 'Authors' ]
        const authorId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('authors').find({ _id: authorId });
        result.toArray().then((authors) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(authors[0]);
        });
    }catch(err) {
        res.status(500).json(err);
    }
};

const createAuthor = async (req, res) => {
    //#swagger.tags=[ 'Authors' ]
    //Verify how to connect books- [Book ID]
    const author = {
        firsname: req.body.firstname,
        lastname: req.body.lastname,
        bookid: req.body.bookid
    };
    const response = await mongodb.getDatabase().db().collection('authors').insertOne(author);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while creating the author.');
    }
};

const updateAuthor = async (req, res) => {
    //#swagger.tags=[ 'Authors' ]
    const authorId = new ObjectId(req.params.id);
    const author = {
        firsname: req.body.firstname,
        lastname: req.body.lastname,
        bookid: req.body.bookid
    };
    const response = await mongodb.getDatabase().db().collection('authors').replaceOne({ _id: authorId }, author);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the author.');
    }
};

const deleteAuthor = async (req, res) => {
    try{
        //#swagger.tags=[ 'Authors' ]
        const authorId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('authors').deleteOne({ _id: authorId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error ocurred while deleting the author.');
        }
    }catch(err) {
        throw err;
    }
};

module.exports = {
    getAll,
    getSingle,
    createAuthor,
    updateAuthor,
    deleteAuthor
};