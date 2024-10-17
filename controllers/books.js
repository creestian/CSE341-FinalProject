const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;



//-------------------------------------
//  GET ALL BOOKS
//-------------------------------------
const getAll = async (req, res) => {
    try{
      const result = await mongodb
        .getDatabase()
        .db()
        .collection('books')
        .find();
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
    }catch (err) {
      res.status(500).json({message: err.message});
    }
  };
  
  //------------------------------------
  // GET SINGLE BOOK
  //------------------------------------
  
  const getSingle = async (req, res) => {
    try{
      const booksId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDatabase()
        .db()
        .collection('books')
        .find({ _id: booksId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
    }catch(err) {
      res.status(500).json(err);
  }
  };

  //------------------------------------
  // CREATE BOOK
  //------------------------------------
  
  const createBook = async (req, res) => {
    try{
      const booksBody = {
        bookId: req.body.bookId,
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        rating: req.body.rating,
/*         stock: req.body.stock,
        magazine: req.body.magazine,
        underbarrel: req.body.underbarrel,
        ammunition: req.body.ammunition,
        rearGrip: req.body.rearGrip */
      };
      const result = await mongodb
        .getDatabase()
        .db()
        .collection('books')
        .insertOne(booksBody);
        console.log(result);
        if (result.acknowledged) {
          res.status(201).send();
        } else {
          res.status(500).json(result.error || 'Error while deleting');
        }
    }catch(err) {
      res.status(500).json(err);
  }
  };

  //------------------------------------
  // UPDATE BOOK
  //------------------------------------

  const updateBook = async (req, res) => {
    //swagger.tags=['User']
   const booksId = new ObjectId(req.params.id);
   const booksBody = {
    bookId: req.body.bookId,
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    rating: req.body.rating,
/*         stock: req.body.stock,
    magazine: req.body.magazine,
    underbarrel: req.body.underbarrel,
    ammunition: req.body.ammunition,
    rearGrip: req.body.rearGrip */
   };
  
   const result = await mongodb
    .getDatabase()
    .db()
    .collection('books')
    .replaceOne({_id: booksId}, booksBody);
    console.log(result);
   if(result.modifiedCount > 0) {
    res.status(204).send();
   } else {
    res.status(500).json(result.error || "Error while updating meta")
   }
  }


  //------------------------------------
  // DELETE BOOK
  //------------------------------------
  
  const deleteBook = async(req, res) => {
    try{
      const booksId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDatabase()
        .db()
        .collection('books')
        .deleteOne({ _id: booksId});
        console.log(result);
        if (result.deletedCount > 0) {
          res.status(204).send();
        } else {
          res.status(500).json(result.error || 'Error while deleting');
        }
      }catch(err) {
        throw err;
    }
  };


  module.exports = {
    getAll,
    getSingle,
    createBook,
    updateBook,
    deleteBook
  }