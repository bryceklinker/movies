var React = require('react');
var MovieStore = require('../stores/movieStore');
var config = require('../../config');

var MoviePlayer = React.createClass({
    getInitialState: function(){
        return {
            movie: undefined
        }
    },
    _videoUrl: function(){
        var url = config.apiUrl + '/' + this.props.movie.title;
        return encodeURIComponent(url);
    },
    render: function() {
        var videoSource = this.props.movie !== undefined
            ? this._videoUrl()
            : '';

        var className = this.props.movie !== undefined
            ? 'row'
            : 'hidden'
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