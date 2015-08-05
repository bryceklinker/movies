var express = require('express');
var path = require('path');

var Server = function(port){
    this._port = port;
};

Server.prototype.start = function(){
    var app = express();
    this.addRoutes(app);
    this._server = app.listen(this._port);
};

Server.prototype.close = function() {
    this._server.close();
};

Server.prototype.addRoutes = function(app){
    app.get('/', function(req, res){
        var indexPath = path.join(__dirname, './../client/index.html');
        res.sendFile(indexPath);
    });

    app.use(express.static(__dirname + './../client'));
};

module.exports = Server;