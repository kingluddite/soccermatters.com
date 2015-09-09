/*----------  grab packages we need for field model  ----------*/
var mongoose = require('mongoose'),
  Schema = mongoose.Schema

/*----------  field schema  ----------*/
var SeasonFieldSchema = new Schema({
  fullSeason: Schema.Types.Mixed,
  date_created: {
    type: Date,
    default: Date.now
  }
});

/*----------  return the model  ----------*/
module.exports = mongoose.model('Season', SeasonFieldSchema);
