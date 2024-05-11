const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Temple Visits']
  const result = await mongodb.getDatabase().db().collection("temple-visits").find();
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Temple Visits']
  const visitID = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("temple-visits")
    .find({ _id: visitID });
  result.toArray().then((members) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(members[0]);
  });
};

const createTempleVisit = async (req, res) => {
    //#swagger.tags=['Temple Visits']
    const templeVisit = {
      date: req.body.date,
      starttime: req.body.starttime,
      organizer: req.body.organizer      
    };
    const response = await mongodb.getDatabase().db().collection('temple-visits').insertOne(templeVisit);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the temple visit.')
    }
  }
  
  const updateTempleVisit = async (req, res) => {
    //#swagger.tags=['Temple Visits']
    const templeVisitId = new ObjectId(req.params.id);
    const templeVisit = {
        date: req.body.date,
        starttime: req.body.starttime,
        organizer: req.body.organizer
    }
    const response = await mongodb.getDatabase().db().collection('temple-visits').replaceOne({ _id: templeVisitId }, templeVisit);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).jason(response.error || 'Some error occurred while updating the temple visit.')
    }
  }
  
  const deleteTempleVisit = async (req, res) => {
    //#swagger.tags=['Temple Visits']
    const templeVisitId = new ObjectId(req.params.id);
    const templeVisit = {
        date: req.body.date,
        starttime: req.body.starttime,
        organizer: req.body.organizer
    }
    const response = await mongodb.getDatabase().db().collection('temple-visits').deleteOne({ _id: templeVisitId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).jason(response.error || 'Some error occurred while deleting the temple visit.')
    }
  }
  module.exports = {
      getAll,
      getSingle,
      createTempleVisit,
      updateTempleVisit,
      deleteTempleVisit
  }