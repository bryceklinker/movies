var React = require('react');
var MovieStore = require('../stores/movieStore');
var config = require('../../config');

var MoviePlayer = React.createClass({
    getInitialState: function(){
        return {
            movie: undefined
        }
    },
    componentDidMount: function(){
        MovieStore.addChangeListener(this._onChange);
    },
    _onChange: function(){
        this.setState({
            movie: MovieStore.getPlayedMovie()
        })
    },
    render: function() {
        var videoSource = this.state.movie !== undefined
            ? '/' + encodeURIComponent(this.state.movie.title)
            : '';

        var className = this.state.movie !== undefined
            ? 'row'
            : 'hidden';
        return (
            <div className={className}>
                <div className="col-sm-12">
                    <video autoPlay controls src={videoSource} />
                </div>
            </div>
        );
    }
});

module.exports = MoviePlayer;