const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: Number,
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  });

  userSchema.virtual('attractions', {
    ref: 'TouristAttraction',
    localField: '_id',
    foreignField: 'createdBy'
  });
  
const User = mongoose.model('User', userSchema);

module.exports = User;
