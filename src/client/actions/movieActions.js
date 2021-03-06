var MovieConstants = require('../constants/movieConstants');

var MovieActions = {
    loadMovies: function (){
        var self = this;
        var url = self._config.apiUrl + '/movies';
        self._jQuery.getJSON(url, function(data){
            self._dispatcher.dispatch({
                actionType: MovieConstants.MOVIES_LOADED,
                movies: data
            });
        });
    },
    playMovie: function(movie){
        this._dispatcher.dispatch({
            actionType: MovieConstants.PLAY_MOVIE,
            movie: movie
        })
    },
    searchMovies: function(title){
        this._dispatcher.dispatch({
            actionType: MovieConstants.SEARCH_MOVIES,
            title: title
        });
    },
    init: function(jQuery, dispatcher, config){
        this._jQuery = jQuery || require('jquery');
        this._dispatcher = dispatcher || require('../dispatcher/appDispatcher');
        this._config = config || require('../../config');
    }
};

module.exports = MovieActions;