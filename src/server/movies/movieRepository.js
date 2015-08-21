var Promise = require('bluebird');
var Movie = require('./movie.js');

function isMp4(path){
    var mp4Length = '.mp4'.length;
    return path.indexOf('.mp4', path.length - mp4Length) !== -1;
}

var MovieRepository = function(config, fs){
    this._config = config || require('../../config');
    this._fs = fs || require('fs');
};

MovieRepository.prototype.getAll = function(){
    var self = this;
    return new Promise(function(resolve, reject){
        self._fs.readdir(self._config.videosPath, function(error, files){
            if (error){
                reject(error);
                return;
            }
            var movies = [];
            for (var i = 0; i < files.length; i++){
                if(isMp4(files[i])) {
                    console.log('INFO: Movie Path: ' + files[i]);
                    movies.push(new Movie(files[i]));
                }
            }
            resolve(movies);
        });
    });
};

MovieRepository.prototype.getByTitle = function(title){
    var self = this;
    return new Promise(function(resolve, reject){
        self.getAll()
            .then(function(movies){
                var count = movies.length;
                for(var i = 0; i < count; i++){
                    if(movies[i].getTitle() === title) {
                        resolve(movies[i]);
                        return;
                    }
                }

                resolve(undefined);
            })
            .catch(function(error){
                reject(error);
            });
    });
};

module.exports = MovieRepository;