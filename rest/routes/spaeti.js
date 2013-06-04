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
        lng : String,
        lat : String,
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
            res.send({status : "deleted"});
        }
    });
};

exports.findById = function (req, res) {
    return Spaeti.findById(req.params.id, function (err, spaeti) {
        if(!err) {
            res.send(spaeti);
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
            city : req.body.location.city,
            lng : req.body.location.lng,
            lat : req.body.location.lat,
            postalCode : req.body.location.postalCode,
            street : req.body.location.street
        },
        businessHours : {
            closed : req.body.businessHours.closed,
            opened : req.body.businessHours.opened
        }
    });
    entry.save(function (err) {
        if(err) {
            res.send({"status" : "error"});
        } else {
            res.send({ "status" : "created", "_id" : entry._id, "url" : "/spaeti/" + entry._id, "name" : req.body.name});
        }
    });
};

exports.update = function (req, res) {
    Spaeti.findById(req.params.id, function (err, spaeti) {
        spaeti.name = req.body.name || spaeti.name;
        spaeti.location.city = req.body.location.city || spaeti.location.city;
        spaeti.location.lng = req.body.location.lng || spaeti.location.lng;
        spaeti.location.lat = req.body.location.lat || spaeti.location.lat;
        spaeti.location.postalCode = req.body.location.postalCode || spaeti.location.postalCode;
        spaeti.location.street = req.body.location.street || spaeti.location.street;

        spaeti.save(function (err) {
            if(err) {
                res.send({"status" : "error"});
            } else {
                res.send({ "status" : "updated", "_id" : spaeti._id, "url" : "/spaeti/" + spaeti._id });
            }
        });
    });
};