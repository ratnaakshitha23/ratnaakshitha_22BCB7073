const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

router.get('/', async (req, res) => {
  const attendance = await Attendance.find().populate('studentId');
  res.json(attendance);
});

router.post('/', async (req, res) => {
  const attendance = new Attendance(req.body);
  await attendance.save();
  res.json(attendance);
});

router.put('/:id', async (req, res) => {
  const att = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(att);
});

router.delete('/:id', async (req, res) => {
  await Attendance.findByIdAndDelete(req.params.id);
  res.send({ message: 'Deleted' });
});

router.get('/percentage/:studentId', async (req, res) => {
  const { studentId } = req.params;
  const total = await Attendance.countDocuments({ studentId });
  const present = await Attendance.countDocuments({ studentId, present: true });
  const percentage = total > 0 ? (present / total) * 100 : 0;
  res.json({ percentage: percentage.toFixed(2) });
});

module.exports = router;