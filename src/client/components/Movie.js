var React = require('react');
var MovieActions = require('../actions/movieActions');

var Movie = React.createClass({
    playMovie: function(){
        MovieActions.playMovie(this.props.movie);
    },
    render: function(){
        var imageUrl = this.props.movie.thumbnail !== undefined
            ? 'data:image/png;base64,' + this.props.movie.thumbnail
            : '';
        var imageClassName = this.props.movie.thumbnail !== undefined
            ? 'img-rounded img-responsive'
            : 'hidden';
        return (
            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <img className={imageClassName}
                             src={imageUrl} />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <div className="row">
                            <div className="col-lg-12">
                                <h4>{this.props.movie.title}</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <button type="button" className="btn btn-default" onClick={this.playMovie}>
                                    <span className="glyphicon glyphicon-play"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Movie;