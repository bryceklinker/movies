var rewire = require('rewire');
var path = require('path');
var streamUtility = require('./../utility/streamUtility');
var Movie = rewire('./../../../src/server/movies/movie');

describe('movie', function(){
    var movie;
    var fsMock;
    var readableData;
    var createReadStreamPath;
    var createReadStreamOptions;
    var readFileSyncPath;
    var readFileSyncBuffer;
    var existsSync;
    var existsSyncPath;

    beforeEach(function(){
        readableData = [];
        fsMock = {
            existsSync: function(path){
                existsSyncPath = path;
                return existsSync;
            },
            readFileSync: function(path){
                readFileSyncPath = path;
                return readFileSyncBuffer;
            },
            createReadStream: function(path, options){
                createReadStreamOptions = options;
                createReadStreamPath = path;
                return streamUtility.createStringReadStream(readableData);
            }
        };

        Movie.__set__('fs', fsMock);
        movie = new Movie('this.mp4');
    });

    it('should pipe stream', function(done){
        readableData.push('one');
        readableData.push('two');
        readableData.push('three');

        var writtenData = [];
        var writableStream = streamUtility.createStringWriteStream(writtenData);
        movie.play(writableStream);

        writableStream.on('finish', function(){
            expect(writtenData).toEqual(readableData);
            done();
        });
    });

    it('should create stream using path', function(){
        var path = 'C:\\Users\\Bryce\\Videos\\other.mp4';
        movie = new Movie(path);
        movie.play(streamUtility.createStringWriteStream([]));
        expect(createReadStreamPath).toBe(path);
    });

    it('should create stream using no options', function(){
        movie.play(streamUtility.createStringWriteStream([]));
        expect(createReadStreamOptions).toBeUndefined();
    });

    it('should get thumbnail as base64 image', function(){
        readFileSyncBuffer = new Buffer('asdfasgasdsf', 'binary');
        existsSync = true;
        var thumbnail = movie.getThumbnail();
        expect(thumbnail).toBe(readFileSyncBuffer.toString('base64'));
    });

    it('should get thumbnail from correct path', function(){
        readFileSyncBuffer = new Buffer('asdfasdf', 'binary');
        var moviePath = 'C:\\Users\\Bryce\\Videos\\this.mp4';
        existsSync = true;
        movie = new Movie(moviePath);
        movie.getThumbnail();
        expect(readFileSyncPath).toBe(moviePath.replace('.mp4', '.png'));
    });

    it('should not get a thumbnail', function(){
        existsSync = false;
        var thumbnailPath = movie.getPath().replace('.mp4', '.png');

        var thumbnail = movie.getThumbnail();
        expect(thumbnail).toBeUndefined();
        expect(existsSyncPath).toBe(thumbnailPath);
    });

    it('should get title', function(){
        var expected = path.basename(movie.getPath());
        var title = movie.getTitle();
        expect(title).toBe(expected);
    });
});