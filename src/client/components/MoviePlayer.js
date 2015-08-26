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

        var title = this.state.movie != undefined
            ? this.state.movie.title
            : '';
        return (
            <div className={className}>
                <div className="col-lg-8 col-md-6 col-sm-6 col-xs-12">
                    <h4>Now Playing: {title}</h4>
                    <div className="embed-responsive embed-responsive-16by9">
                        <video className="embed-responsive-item" autoPlay controls src={videoSource} />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = MoviePlayer;