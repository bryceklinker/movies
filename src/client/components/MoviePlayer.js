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
    getVideoUrl: function(){
        return config.apiUrl + '/movies/' + encodeURIComponent(this.state.movie.title);
    },
    render: function() {
        var videoSource = this.state.movie !== undefined
            ? this.getVideoUrl()
            : '';

        var className = this.state.movie !== undefined
            ? 'row'
            : 'hidden';
        return (
            <div className={className}>
                <div className="col-lg-12 text-center embed-responsive embed-responsive-16by9">
                    <video className="embed-responsive-item" autoPlay controls src={videoSource} />
                </div>
            </div>
        );
    }
});

module.exports = MoviePlayer;