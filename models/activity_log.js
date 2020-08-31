var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activityLogSchema = new Schema({
  title: { type: String, required: true},
  body: String,
  status: String,
  created_at : Date,
  update_at : Date
},
{
    timestamps: true
});

var ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

module.exports = ActivityLog;