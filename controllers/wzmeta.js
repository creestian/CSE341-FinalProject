const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;



//-------------------------------------
//  GET ALL WZ META COLLECTION
//-------------------------------------
const getAll = async (req, res) => {
    try{
      const result = await mongodb
        .getDatabase()
        .db()
        .collection('wzmeta')
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
  // GET SINGLE WZ META
  //------------------------------------
  
  const getSingle = async (req, res) => {
    try{
      const wzmetaId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDatabase()
        .db()
        .collection('wzmeta')
        .find({ _id: wzmetaId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
    }catch(err) {
      res.status(500).json(err);
  }
  };

  //------------------------------------
  // CREATE WZ META
  //------------------------------------
  
  const createMeta = async (req, res) => {
    try{
      const wzmetaBody = {
        name: req.body.name,
        muzzle: req.body.muzzle,
        barrel: req.body.barrel,
        optic: req.body.optic,
        stock: req.body.stock,
        magazine: req.body.magazine,
        underbarrel: req.body.underbarrel,
        ammunition: req.body.ammunition,
        rearGrip: req.body.rearGrip
      };
      const result = await mongodb
        .getDatabase()
        .db()
        .collection('wzmeta')
        .insertOne(wzmetaBody);
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
  // UPDATE WZ META
  //------------------------------------

  const updateMeta = async (req, res) => {
    //swagger.tags=['User']
   const wzmetaId = new ObjectId(req.params.id);
   const wzmetaBody = {
    name: req.body.name,
    muzzle: req.body.muzzle,
    barrel: req.body.barrel,
    optic: req.body.optic,
    stock: req.body.stock,
    magazine: req.body.magazine,
    underbarrel: req.body.underbarrel,
    ammunition: req.body.ammunition,
    rearGrip: req.body.rearGrip
   };
  
   const result = await mongodb
    .getDatabase()
    .db()
    .collection('wzmeta')
    .replaceOne({_id: wzmetaId}, wzmetaBody);
    console.log(result);
   if(result.modifiedCount > 0) {
    res.status(204).send();
   } else {
    res.status(500).json(result.error || "Error while updating meta")
   }
  }


  //------------------------------------
  // DELETE USER
  //------------------------------------
  
  const deleteMeta = async(req, res) => {
    try{
      const wzmetaId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDatabase()
        .db()
        .collection('wzmeta')
        .deleteOne({ _id: wzmetaId});
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
    createMeta,
    updateMeta,
    deleteMeta
  }