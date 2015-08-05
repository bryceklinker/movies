var rewire = require('rewire');
var MovieService = rewire('./../../../src/server/movies/movieService');

describe('movieService', function(){
    var movieService;
    var files;
    var fsMock;

    beforeEach(function(){
        files = [];
        fsMock = {
            readdir: function(path, callback){
                fsMock.readdirPath = path;
                if(fsMock.error !== undefined){
                    callback(fsMock.error, undefined);
                }
                else {
                    callback(undefined, files);
                }
            }
        };
        MovieService.__set__('fs', fsMock);
        movieService = new MovieService();
    });

    it('should get files from videos directory', function(done){
        movieService.getAll().then(function(){
            expect(fsMock.readdirPath).toBe('C:\\Users\\Bryce\\Videos');
            done();
        });
    });

    it('should get files from videos', function(done){
        files.push('other.mp4');
        files.push('something.mp4');
        files.push('something.png');
        files.push('now.mp4');
        files.push('now.doc');

        movieService.getAll().then(function(movies){
            expect(movies.length).toBe(3);
            expect(movies[0].getPath()).toBe('other.mp4');
            expect(movies[1].getPath()).toBe('something.mp4');
            expect(movies[2].getPath()).toBe('now.mp4');
            done();
        });
    });

    it('should throw error', function(done){
        fsMock.error = 'this is my error';
        movieService.getAll().then(function(){}).catch(function(error){
            expect(error).toBe('this is my error');
            done();
        })
    });
});