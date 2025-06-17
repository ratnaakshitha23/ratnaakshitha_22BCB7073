

const mongoose = require('mongoose');
const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  date: String,
  present: Boolean
});
module.exports = mongoose.model('Attendance', attendanceSchema);