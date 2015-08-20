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
    repository.getByTitle(req.params.title).then(function(movie){
        if (movie === undefined){
            res.end();
        }

        var size = movie.getSize();
        res.writeHead(200, {
            'Content-Length': size,
            'Connection': 'keep-alive',
            'Content-Transfer-Encoding': 'binary'
        });
        movie.play(res);
    }).catch(function(error){
        console.log(error);
    });
});

module.exports = router;