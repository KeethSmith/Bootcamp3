//You can replace this entire file with your Bootcamp Assignment #2 - ListingSchema.js File
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var listingSchema = new Schema({

    code: {
      type: String, 
      required: true
    },
    name: {
      type: String, 
      required: true
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    address: String
});

listingSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.update_at = currentDate;
  if(!this.created_at) this.created_at = currentDate;
  next();
});

var Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;