var express = require('express');
var path = require('path');

function addIndexRoute(app){
    app.get('/', function(req, res){
        var indexPath = path.join(__dirname, '..', 'public', 'index.html');
        res.sendFile(indexPath);
    });
}

function addPublicRoute(app){
    var publicPath = path.join(__dirname, '..', 'public');
    app.use(express.static(publicPath));
}

function addMoviesRoute(app){
    var movieRouter = require('./movies/movieRouter');
    app.use(movieRouter);
};

module.exports = {
    addRoutes: function(app){
        addIndexRoute(app);
        addPublicRoute(app);
        addMoviesRoute(app);
    }
};