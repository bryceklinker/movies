var expect = require('chai').expect;

describe('movieRepository', function(){
    var fsMock;
    var config;
    var MovieRepository;

    beforeEach(function(){
        fsMock = {};
        config = {};

        MovieRepository = require('../../../src/server/movies/movieRepository');
        movieRepository = new MovieRepository(config, fsMock);
    });

    it('should get files from directory', function(done){
        var files = ['frozen.mp4', 'stuff.mp4', 'other.mp4'];
        fsMock.readdir = function(path, callback){
            fsMock.readdirPath = path;
            callback(undefined, files);
        };

        movieRepository.getAll().then(function(movies){
            expect(files[0]).to.equal(movies[0].getPath());
            expect(files[1]).to.equal(movies[1].getPath());
            expect(files[2]).to.equal(movies[2].getPath());
            done();
        });
    });

    it('should get use videos path to get files', function(done){
        config.videosPath = 'this should be a path';
        fsMock.readdir = function(path, callback){
            fsMock.readdirPath = path;
            callback(undefined, []);
        };

        movieRepository.getAll().then(function(){
            expect(fsMock.readdirPath).to.equal(config.videosPath);
            done();
        });
    });

    it('should give error when it gets an error', function(done){
        var fsMockError = 'this is my new error';
        fsMock.readdir = function(path, callback){
            callback(fsMockError, undefined);
        };

        movieRepository.getAll().catch(function(error){
            expect(error).to.equal(fsMockError);
            done();
        });
    });

    it('should only get videos', function(done){
        var files = ['some.png', 'else.txt', 'other', 'one.mp4', 'times.jpeg'];
        fsMock.readdir = function(path, callback){
            callback(undefined, files);
        };

        movieRepository.getAll().then(function(movies){
            expect(movies.length).to.equal(1);
            expect(movies[0].getPath()).to.equal(files[3]);
            done();
        });
    });

    it('should get video with title', function(done){
        var files = ['some.mp4', 'else.mp4', 'now.mp4'];
        fsMock.readdir = function(path, callback){
            callback(undefined, files);
        };

        movieRepository.getByTitle('else').then(function(movie){
            expect(movie.getTitle()).to.equal('else');
            done();
        });
    });

    it('should get undefined video', function(done){
        var files = ['some.mp4', 'else.mp4', 'now.mp4'];
        fsMock.readdir = function(path, callback){
            callback(undefined, files);
        };

        movieRepository.getByTitle('nothing').then(function(movie){
            expect(movie).to.equal(undefined);
            done();
        });
    });

    it('should reject error', function(done){
        var fsMockError = 'this is my new error';
        fsMock.readdir = function(path, callback){
            callback(fsMockError, undefined);
        };

        movieRepository.getByTitle('something').catch(function(error){
            expect(error).to.equal(fsMockError);
            done();
        });
    });
});