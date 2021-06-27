const memberService = require('./member.service');
const logger = require('../../services/logger.service');

async function getMember(req, res) {
  try {
    const member = await memberService.getById(req.params.id);
    res.send(member);
  } catch (err) {
    logger.error('Failed to get member', err);
    res.status(500).send({ err: 'Failed to get member' });
  }
}

async function getMembers(req, res) {
  try {
    // const filterBy = {}
    const members = await memberService.query();
    res.send(members);
  } catch (err) {
    logger.error('Failed to get members', err);
    res.status(500).send({ err: 'Failed to get members' });
  }
}

async function deleteMember(req, res) {
  try {
    await memberService.remove(req.params.id);
    res.send({ msg: 'Deleted successfully' });
  } catch (err) {
    logger.error('Failed to delete member', err);
    res.status(500).send({ err: 'Failed to delete member' });
  }
}

async function updateMember(req, res) {
  try {
    const member = req.body;
    const savedMember = await memberService.update(member);
    res.send(savedMember);
  } catch (err) {
    logger.error('Failed to update member', err);
    res.status(500).send({ err: 'Failed to update member' });
  }
}

module.exports = {
  getMember,
  getMembers,
  deleteMember,
  updateMember,
};
