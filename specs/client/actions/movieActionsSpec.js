var expect = require('chai').expect;

describe('movieActions', function(){
    var jQueryMock;
    var dispatcherMock;
    var configMock;
    var MovieActions;
    var MovieConstants;

    beforeEach(function(){
        jQueryMock = {};
        dispatcherMock = {};
        configMock = {};
        MovieConstants = require('../../../src/client/constants/movieConstants');
        MovieActions = require('../../../src/client/actions/movieActions');
        MovieActions.init(jQueryMock, dispatcherMock, configMock);
    });

    it('should dispatch movies', function(done) {
        var movies = [{}, {}, {}];
        jQueryMock.getJSON = function(url, successCallback){
            successCallback(movies);
        };

        dispatcherMock.dispatch = function(payload){
            expect(payload.actionType).to.equal(MovieConstants.MOVIES_LOADED);
            expect(payload.movies).to.equal(movies);
            done();
        };
        MovieActions.loadMovies();
    });

    it('should get movies from api', function(done){
        configMock.apiUrl = 'http://something.com';
        dispatcherMock.dispatch = function(){};
        jQueryMock.getJSON = function(url, successCallback){
            expect(url).to.equal(configMock.apiUrl + '/movies');
            successCallback([]);
            done();
        };
        MovieActions.loadMovies();
    });

    it('should dispatch play move action', function(done){
        var movie = { title: 'stuff' };
        dispatcherMock.dispatch = function(payload){
            expect(payload.actionType).to.equal(MovieConstants.PLAY_MOVIE);
            expect(payload.movie).to.equal(movie);
            done();
        };
        MovieActions.playMovie(movie);
    });

    it('should dispatch search movies action', function(done){
        dispatcherMock.dispatch = function(payload){
            expect(payload.actionType).to.equal(MovieConstants.SEARCH_MOVIES);
            expect(payload.title).to.equal('stuff');
            done();
        };
        MovieActions.searchMovies('stuff');
    });
});