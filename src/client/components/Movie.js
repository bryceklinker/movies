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
            <div className="col-sm-12 col-md-3 col-lg-1">
                <div className="row">
                    <div className="col-sm-6">
                        <img className={imageClassName}
                             src={imageUrl} />
                    </div>
                    <div className="col-sm-6">
                        <div className="row">
                            <div className="col-sm-12">
                                <h4>{this.props.movie.title}</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
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