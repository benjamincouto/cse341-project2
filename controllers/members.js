const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Members']
  const result = await mongodb.getDatabase().db().collection("members").find();
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Members']
  const contactID = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("members")
    .find({ _id: contactID });
  result.toArray().then((members) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(members[0]);
  });
};


module.exports = {
    getAll,
    getSingle
}