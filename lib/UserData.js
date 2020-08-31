const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  id: { type: String, required: true },
  username : {type: String, require : true},
  accountnumber : {type: Number, require : true},
  emailaddress : {type : String, require : true },
  identitynumber : {type : String, require : true},
  completed: Boolean
});

module.exports = mongoose.model('UserData', schema);
