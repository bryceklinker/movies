var Server = function(port, router){
    this._port = port;
    this._router = router || require('./router');
};

Server.prototype.start = function(){
    var express = require('express');
    var cors = require('cors');
    var app = express();

    app.use(cors());
    this._router.addRoutes(app);
    this._instance = app.listen(this._port);
};

Server.prototype.stop = function(){
    this._instance.close();
};

module.exports = Server;