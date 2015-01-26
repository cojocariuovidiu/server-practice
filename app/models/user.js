var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');

// user schema made of name, username, and pw. index/unique set to true to create unique path and ensure no username duplicates. select false will prevent password from appearing when query list of users or single user, only if specified.
var UserSchema = new Schema({
  name: String,
  username: { type: String, required: true, index: { unique: true }},
  password: { type: String, required: true, select: false }
});

// changes password into hash
UserSchema.pre('save', function(next){
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, null, null, function(err, hash){
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function(password){
  var user = this;
  return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);