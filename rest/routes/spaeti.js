var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var spaetiSchema = new Schema({
    name : String,
    markedByOwner : Boolean,
    businessHours : {
        closed : [Number],
        opened : [Number],
        holidays : {
            opens : Number,
            closes : Number,
            day : Date,
            recurring : Boolean,
            comment : String
        }
    },
    assortment : [String],
    location : {
        city : String,
        geo : String,
        postalCode : String,
        street : String
    },
    ratings : [
        {
            comment : String,
            date : Date,
            userId : Number,
            rating : Number
        }
    ]
});

var Spaeti = mongoose.model('Spaeti', spaetiSchema);

exports.getAll = function (req, res) {
    Spaeti.find(function (err, data) {
        if(err) {
            res.send("error finding");
        } else {
            res.send(data);
        }
    });
};

exports.delete = function (req, res) {
    Spaeti.remove({"_id" : req.params.id}, function (err) {
        if(err) {
            res.send(err);
        } else {
            res.send({status : 1})
        }
    });
};

exports.findById = function (req, res) {
    return Spaeti.findById(req.params.id, function (err, product) {
        if(!err) {
            res.send(product);
        } else {
            res.send(err);
        }
    });
};

exports.add = function (req, res) {
    var entry = new Spaeti({
        name : req.body.name,
        markedByOwner : false,
        location : {
            city : req.body.city,
            geo : req.body.geo,
            postalCode : req.body.postalCode,
            street : req.body.street
        }
    });
    entry.save(function (err) {
        if(err) {
            res.send("Error saving Spaeti");
        } else {
            res.send("Success!");
        }
    });
};

exports.update = function (req, res) {

};