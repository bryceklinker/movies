var express = require('express');
var router = express.Router();
var MovieRepository = require('./movieRepository');

router.get('/', function(req, res){
    var repository = new MovieRepository();
    repository.getAll().then(function(movies){
        var models = movies.map(function(movie) {
            return movie.getModel();
        });

        res.json(models);
        res.end();
    });
});

router.get('/:title', function(req, res){
    var repository = new MovieRepository();
    repository.getByTitle(req.title).then(function(movie){
        movie.play(res);
    });
});

module.exports = router;