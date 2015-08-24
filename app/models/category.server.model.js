var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CategorySchema = new Schema({
  _challengeId: {
    type: Number, 
    ref: 'Challenge'
  },
  name: {
    type: String,
    default: ''
  }
});

mongoose.model('Category', CategorySchema);