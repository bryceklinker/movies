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

        var movieSize = movie.getSize();
        var range = req.headers.range;
        var positions = range.replace(/bytes=/, '').split('-');
        var start = parseInt(positions[0], 10);
        var end = positions[1] ? parseInt(positions[1], 10) : movieSize - 1;
        var chunkSize = (end - start) + 1;
        res.writeHead(206, {
            'Content-Range': 'bytes ' + start + '-' + end + '/' + movieSize,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4'
        });
        movie.playChunk(res, start, end + 1);
    }).catch(function(error){
        console.log(error);
    });
});

module.exports = router;