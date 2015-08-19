var React = require('react');
var Movie = require('./movie');
var MovieStore = require('../stores/movieStore');

var MovieList = React.createClass({
    getInitialState: function(){
        return {
            movies: []
        };
    },
    componentDidMount : function(){
        MovieStore.addChangeListener(this._onChange);
    },
    _onChange: function(){
        this.setState({
            movies: MovieStore.getMovies()
        });
    },
    render: function(){
        var movies = this.state.movies.map(function(movie){
            return (
                <Movie movie={movie} />
            );
        });
        return (
            <div className="row">
                {movies}
            </div>
        );
    }
});

module.exports = MovieList;