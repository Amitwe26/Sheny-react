const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
  query,
  getById,
  getByMembername,
  remove,
  update,
  add,
};

async function query(filterBy = {}) {
  try {
    const collection = await dbService.getCollection('member');
    var members = await collection.find().toArray();
    members = members.map((member) => {
      delete member.password;
      return member;
    });
    return members;
  } catch (err) {
    logger.error('cannot find members', err);
    throw err;
  }
}

async function getById(memberId) {
  try {
    const collection = await dbService.getCollection('member');
    const member = await collection.findOne({ _id: ObjectId(memberId) });
    delete member.password;
    return member;
  } catch (err) {
    logger.error(`while finding member ${memberId}`, err);
    throw err;
  }
}

async function getByMembername(membername) {
  try {
    const collection = await dbService.getCollection('member');
    const member = await collection.findOne({ membername });
    return member;
  } catch (err) {
    logger.error(`while finding member ${membername}`, err);
    throw err;
  }
}

async function remove(memberId) {
  try {
    const collection = await dbService.getCollection('member');
    await collection.deleteOne({ _id: ObjectId(memberId) });
  } catch (err) {
    logger.error(`cannot remove member ${memberId}`, err);
    throw err;
  }
}

async function update(member) {
  try {
    // peek only updatable fields!
    const memberToSave = {
      ...member,
      _id: ObjectId(member._id),
    };
    const collection = await dbService.getCollection('member');
    await collection.updateOne(
      { _id: memberToSave._id },
      { $set: memberToSave }
    );
    return memberToSave;
  } catch (err) {
    logger.error(`cannot update member ${member._id}`, err);
    throw err;
  }
}

async function add(member) {
  try {
    // peek only updatable fields!
    const memberToAdd = {
      membername: member.membername,
      password: member.password,
      fullname: member.fullname,
      email: member.email,
      url: member.url,
      score: member.score || 0,
      phone: null,
      birthday: null,
      company: '',
      notifications: [],
      isAdmin: false,
      createdAt: Date.now(),
    };
    const collection = await dbService.getCollection('member');
    await collection.insertOne(memberToAdd);
    return memberToAdd;
  } catch (err) {
    logger.error('cannot insert member', err);
    throw err;
  }
}

function _buildCriteria(filterBy) {
  const criteria = {};
  if (filterBy.txt) {
    const txtCriteria = { $regex: filterBy.txt, $options: 'i' };
    criteria.$or = [
      {
        membername: txtCriteria,
      },
      {
        fullname: txtCriteria,
      },
    ];
  }
  if (filterBy.minBalance) {
    criteria.balance = { $gte: filterBy.minBalance };
  }
  return criteria;
}
