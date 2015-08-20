var expect = require('chai').expect;

describe('movie', function(){
    var Movie;
    var fsMock;

    beforeEach(function(){
        fsMock = {};

        Movie = require('../../../src/server/movies/movie');
    });

    it('should get movie path', function(){
        var moviePath = 'this should be a path';
        var movie = new Movie(moviePath);
        expect(movie.getPath()).to.equal(moviePath);
    });

    it('should get thumbnail for movie', function(){
        fsMock.existsSync = function(path){
            fsMock.existsSyncPath = path;
            return true;
        };
        var thumbnailBuffer = new Buffer('asldfhasldfj', 'binary');
        fsMock.readFileSync = function(path, options){
            fsMock.readFileSyncPath = path;
            return thumbnailBuffer;
        };

        var moviePath = 'something.mp4';
        var movie = new Movie(moviePath, fsMock);
        expect(movie.getThumbnail()).to.equal(thumbnailBuffer.toString('base64'));
        expect(fsMock.existsSyncPath).to.equal(moviePath.replace('.mp4', '.png'));
        expect(fsMock.readFileSyncPath).to.equal(moviePath.replace('.mp4', '.png'));
    });

    it('should not get thumbnail if no thumbnail exists', function(){
        fsMock.existsSync = function(path) {
            return false;
        };

        var movie = new Movie('asdfasjdl', fsMock);
        expect(movie.getThumbnail()).to.equal(undefined);
    });

    it('should get title from file path', function(){
        var movie = new Movie('hellow.mp4', fsMock);
        expect(movie.getTitle()).to.equal('hellow');
    });

    it('should play move to stream', function(){
        var readStream = {
            pipe: function(target){
                readStream.target = target;
            }
        };

        fsMock.createReadStream = function(path){
            fsMock.createReadStreamPath = path;
            return readStream;
        };

        var targetStream = { one: 'this should be a stream.' };
        var movie = new Movie('sadkfjalsdk', fsMock);
        movie.play(targetStream);

        expect(readStream.target).to.equal(targetStream);
        expect(fsMock.createReadStreamPath).to.equal(movie.getPath());
    });

    it('should create a simple model', function(){
        var path = require('path');

        var thumbnailBuffer = new Buffer('sdkfa;lsdkja', 'binary');
        fsMock.existsSync = function() { return true; };
        fsMock.readFileSync = function(){
            return thumbnailBuffer;
        };

        var movie = new Movie('sdflaksjdfals.mp4', fsMock);
        var model = movie.getModel();
        expect(model.thumbnail).to.equal(thumbnailBuffer.toString('base64'));
        expect(model.title).to.equal('sdflaksjdfals');
    });

    it('should get file size', function(){
        var videoPath = 'this is a file.mp4';

        var stats = {
            size: 30000
        };
        fsMock.statSync = function(filePath){
            fsMock.statSyncPath = filePath;
            return stats;
        };

        var movie = new Movie(videoPath, fsMock);
        expect(movie.getSize()).to.equal(stats.size);
        expect(fsMock.statSyncPath).to.equal(videoPath);
    });
});