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
        var movies = MovieStore.getMovies();
        expect(movies.length).to.equal(0);
    });

    it('should get movies from payload', function(){
        var movies = [{}, {}, {}];
        Dispatcher.dispatch({
            actionType: MovieConstants.MOVIES_LOADED,
            movies: movies
        });

        var storeMovies = MovieStore.getMovies();
        expect(storeMovies).to.equal(movies);
    });

    it('should signal change after movies updated', function(){
        var emittedChange = false;
        MovieStore.addChangeListener(function(){
            emittedChange = true;
        });

        Dispatcher.dispatch({
            actionType: MovieConstants.MOVIES_LOADED
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

    it('should filter movies by title', function(){
        var movies = [
            { title: 'stuffstuff' },
            { title: 'one stuff' },
            { title: 'one other' },
            { title: 'now stuff' },
            { title: 'no no no' }
        ];
        Dispatcher.dispatch({
            actionType: MovieConstants.MOVIES_LOADED,
            movies: movies
        });
        Dispatcher.dispatch({
            actionType: MovieConstants.SEARCH_MOVIES,
            title: 'stuff'
        });

        var storedMovies = MovieStore.getMovies();
        expect(storedMovies[0].title).to.equal(movies[0].title);
        expect(storedMovies[1].title).to.equal(movies[1].title);
        expect(storedMovies[2].title).to.equal(movies[3].title);
    });

    it('should emit change on search movies', function(){
        var emittedChange = false;
        MovieStore.addChangeListener(function(){
            emittedChange = true;
        });
        Dispatcher.dispatch({
            actionType: MovieConstants.SEARCH_MOVIES,
            title: 'stu'
        });

        expect(emittedChange).to.equal(true);
    });
});