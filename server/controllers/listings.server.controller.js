
/* Dependencies */
var mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model.js'),
    coordinates = require('./coordinates.server.controller.js');
    

/* Create a listing */
exports.create = function(req, res) {

  /* Instantiate a Listing */
  var listing = new Listing(req.body);
  //var Coordinates = new coordinates(req.results);


  /* save the coordinates (located in req.results if there is an address property) */
  if(req.results) {
    listing.coordinates = {
      latitude: req.results.lat, 
      longitude: req.results.lng
    };
  }

  /* Then save the listing */
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  var listing = req.listing;
  res.json(listing);
  
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res, next) {
  /* Add your code */
  Listing.find(function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.json(listing);
      next();
    }
  });
  
};


/* Update a listing - note the order in which this function is called by the router*/
exports.update = function(req, res) {

  var listing = req.listing;
  listing.code = req.body.code
  listing.name = req.body.name
  listing.address = req.body.address  



  if(req.results) {
    listing.coordinates = {
      latitude: req.results.lat, 
      longitude: req.results.lng
    };
  }


  listing.save(function(err) 
  {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });

  /* Replace the listings's properties with the new properties found in req.body */
 
  /*save the coordinates (located in req.results if there is an address property) */
 
  /* Save the listing */

};

/* Delete a listing */
exports.delete = function(req, res, next, id) {
  var listing = req.listing;

  Listing.findOneAndRemove(id).exec(function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });

  /* Add your code to remove the listings */

};

/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  HINT: Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  Listing.findById(id).exec(function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};