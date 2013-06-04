/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    spaeti = require("./routes/spaeti"),
    http = require('http'),
    path = require('path'),
    config = require('./config.json'),
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
app.set('port', config.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(require('connect').bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get("/spaeti", spaeti.getAll);
app.post('/spaeti', spaeti.add);
app.get("/spaeti/all", spaeti.getAll);
app.get("/spaeti/:id", spaeti.findById);
app.delete("/spaeti/:id", spaeti.delete);
app.put("/spaeti/:id", spaeti.update);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
