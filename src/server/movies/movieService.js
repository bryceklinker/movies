var Movie = require('./movie');
var Promise = require('bluebird');
var path = require('path');
var fs = require('fs');
var isNullOrUndefined = require('./../../shared/isNullOrUndefined');

var videosPath = 'C:\\Users\\Bryce\\Videos';
var MovieService = function() {};

MovieService.prototype.getAll = function() {
    var self = this;
    return new Promise(function(resolve, reject){
        fs.readdir(videosPath, function(error, files){
            if(!isNullOrUndefined(error)) {
                reject(error);
                return;
            }

            var movies = [];
            files.forEach(function(filePath){
                if(self.isMp4(filePath)){
                    movies.push(new Movie(filePath));
                }
            });
            resolve(movies);
        })
    });
};

MovieService.prototype.isMp4 = function(filePath){
    return path.extname(filePath) === '.mp4';
};

module.exports = MovieService;