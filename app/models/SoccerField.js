/*----------  grab packages we need for field model  ----------*/
var mongoose         = require('mongoose'),
    Schema           = mongoose.Schema

/*----------  field schema  ----------*/
var SoccerFieldSchema = new Schema({
    name: { type: String, default: "Give Me A Field Name Please" },
    description:  { type: String, default: "Give Me A Description Please" },
    date_created: {type: Date, default: Date.now},
    longitude: Number,
    latitude: Number,
    coords: [Number, Number] 
});

/*----------  return the model  ----------*/
module.exports = mongoose.model('SoccerField', SoccerFieldSchema);
