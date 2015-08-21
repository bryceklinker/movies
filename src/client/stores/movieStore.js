var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../dispatcher/appDispatcher');
var MovieConstants = require('../constants/movieConstants');

var _movies = [];
var _searchTitle;
var _playedMovie;
var MovieStore = assign({}, EventEmitter.prototype, {
    getMovies: function(){
        if(_searchTitle)
            return _movies.filter(function(movie){
                if (!movie.title)
                    return false;
                var lowerCaseTitle = movie.title.toLowerCase();
                return lowerCaseTitle.indexOf(_searchTitle.toLowerCase()) > -1;
            });
        return _movies;
    },
    getPlayedMovie: function(){
        return _playedMovie;
    },
    addChangeListener: function(callback){
        this.on('change', callback);
    },
    emitChange: function(){
        this.emit('change');
    }
});

Dispatcher.register(function(payload){
    switch (payload.actionType) {
        case MovieConstants.MOVIES_LOADED:
            _movies = payload.movies;
            MovieStore.emitChange();
            break;
        case MovieConstants.PLAY_MOVIE:
            _playedMovie = payload.movie;
            MovieStore.emitChange();
            break;
        case MovieConstants.SEARCH_MOVIES:
            _searchTitle = payload.title;
            MovieStore.emitChange();
            break;
        default:
            break;
    }
});

module.exports = MovieStore;