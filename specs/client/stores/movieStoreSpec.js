var expect = require('chai').expect;
var MovieConstants = require('../../../src/client/constants/movieConstants');

describe('movieStore', function(){
    var MovieStore;
    var Dispatcher;

    beforeEach(function(){
        Dispatcher = require('../../../src/client/dispatcher/appDispatcher');
        MovieStore = require('../../../src/client/stores/movieStore');
    });

    it('should get empty movies', function(){
        var movies = MovieStore.loadMovies();
        expect(movies.length).to.equal(0);
    });

    it('should get movies from payload', function(){
        var movies = [{}, {}, {}];
        Dispatcher.dispatch({
            actionType: MovieConstants.MOVIES_UPDATED,
            movies: movies
        });

        var storeMovies = MovieStore.loadMovies();
        expect(storeMovies).to.equal(movies);
    });

    it('should signal change after movies updated', function(){
        var emittedChange = false;
        MovieStore.addChangeListener(function(){
            emittedChange = true;
        });

        Dispatcher.dispatch({
            actionType: MovieConstants.MOVIES_UPDATED
        });

        expect(emittedChange).to.equal(true);
    });

    it('should get played movie', function(){
        var movie = { title: 'asdlfkjasld' };
        Dispatcher.dispatch({
            actionType: MovieConstants.PLAY_MOVIE,
            movie: movie
        });

        var playedMovie = MovieStore.getPlayedMovie();
        expect(playedMovie).to.equal(movie);
    });

    it('should signal change after play move', function(){
        var emittedChange = false;
        MovieStore.addChangeListener(function(){
            emittedChange = true;
        });

        Dispatcher.dispatch({
            actionType: MovieConstants.PLAY_MOVIE
        });

        expect(emittedChange).to.equal(true);
    });
});