const express = require('express');
const {
  requireAuth,
  requireAdmin,
} = require('../../middlewares/requireAuth.middleware');
const {
  getMember,
  getMembers,
  deleteMember,
  updateMember,
} = require('./member.controller');
const router = express.Router();

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getMembers);
router.get('/:id', getMember);
router.put('/:id', updateMember, deleteMember);

// router.put('/:id',  requireAuth, updateMember)
router.delete('/:id', requireAuth, requireAdmin, deleteMember);

module.exports = router;
