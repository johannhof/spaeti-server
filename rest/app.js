/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    spaeti = require("./routes/spaeti"),
    http = require('http'),
    path = require('path'),
    mongoose = require("mongoose");

var app = express();

var test = "not connected";

mongoose.connect("mongodb://spaeti_mongoadmin:ufVusperb8@localhost:20553/admin");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    test = "connected";
});

// all environments
app.set('port', 7224);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get("/mongotest", function (req, res) {
    res.send(test);
});

app.get("/json-testdata", function (req, res) {
    var test = {
        businessHours : {
            closes : 20,
            opens : 10
        },
        name : "Antons Biershop",
        id : 93478,
        location : {
            city : "berlin",
            postalCode : "13359",
            street : "Antonstrasse 1"
        },
        markedByOwner : false,
        products : {}
    };
    res.send(test);
});
app.get("/spaeti", spaeti.getAll);
app.post('/spaeti', spaeti.add);
app.get("/spaeti/all", spaeti.getAll);
app.get("/spaeti/:id", spaeti.findById);
app.delete("/spaeti/:id", spaeti.delete);
app.put("/spaeti/:id", spaeti.update);
app.post("/echo", function (req, res) {
    res.send("test");
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
