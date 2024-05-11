const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// const getAll = async (req, res) => {
//   //#swagger.tags=['Members']
//   const result = await mongodb.getDatabase().db().collection("members").find();
//   result.toArray().then((contacts) => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(200).json(contacts);
//   });
// };

const getAll = async (req, res) => {
  //#swagger.tags=['Members']
  try {
    const result = await mongodb.getDatabase().db().collection("members").find();
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  });
} catch (error) {
  res.status(400).json({ message: error.message });
}
};



const getSingle = async (req, res) => {
  //#swagger.tags=['Members']
  try {
    const memberID = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("members")
    .find({ _id: memberID });
  result.toArray().then((members) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(members[0]);
  });
} catch (error) {
  res.status(400).json({ message: error.message });
}
};

const createMember = async (req, res) => {
  //#swagger.tags=['Members']
  const member = {
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    birthdate: req.body.birthdate,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    baptismdate: req.body.baptismdate
    
  };
  const response = await mongodb.getDatabase().db().collection('members').insertOne(member);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the member.')
  }
}

const updateMember = async (req, res) => {
  //#swagger.tags=['Members']
  const memberId = new ObjectId(req.params.id);
  const member = {
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    birthdate: req.body.birthdate,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    baptismdate: req.body.baptismdate
  }
  const response = await mongodb.getDatabase().db().collection('members').replaceOne({ _id: memberId }, member);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).jason(response.error || 'Some error occurred while updating the member.')
  }
}

const deleteMember = async (req, res) => {
  //#swagger.tags=['Members']
  const memberId = new ObjectId(req.params.id);
  const member = {
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    birthdate: req.body.birthdate,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    baptismdate: req.body.baptismdate
  }
  const response = await mongodb.getDatabase().db().collection('members').deleteOne({ _id: memberId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).jason(response.error || 'Some error occurred while deleting the member.')
  }
}
module.exports = {
    getAll,
    getSingle,
    createMember,
    updateMember,
    deleteMember
}