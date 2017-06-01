const mongoose = require('../libs/mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

let UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;

module.exports.getUserById = function(_id) {
  return new Promise((resolve, reject) => {
    UserModel.findById(_id)
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
};
// module.exports.getUserById = function(id, callback) {
//     UserModel.findById(id, callback);
// };

module.exports.getUserByUsername = function(username) {
  query = {username: username};
  return new Promise((resolve, reject) => {
    UserModel.findOne(query)
      .then((user) => resolve(user))
      .catch((error) => reject(error));
  });
};

// module.exports.getUserByUsername = function(username, callback) {
//   query = {username: username};
//   UserModel.findOne(query, callback);
// };

module.exports.comparePassword = function(candidatePassword, hash) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(candidatePassword, hash)
      .then((isMatch) => resolve(isMatch))
      .catch((error) => reject(error));
  });
};
// module.exports.comparePassword = function(candidatePassword, hash, callback) {
//   bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
//     if (err) throw err;
//     callback(null, isMatch);
//   });
// };

module.exports.addUser = function(newUser) {
  return new Promise(function(resolve, reject) {
    bcrypt.hash(newUser.password, 10)
      .then((hash) => {
          newUser.password = hash;
          newUser.save()
            .then(() => resolve({success: true, msg: 'User registered'}))
            .catch(() => reject({success: false, msg: 'Failed to register user'}));
        })
      .catch((error) => {throw error;});
  });
};


