var React = require('react');
var MovieActions = require('../actions/movieActions');

var Movie = React.createClass({
    playMovie: function(){
        MovieActions.playMovie(this.props.movie);
    },
    render: function(){
        return (
            <div className="col-sm-3">
                <div className="row">
                    <div className="col-sm-6">
                        <img className="img-rounded"
                             src="data:image/png;base64,{this.props.movie.thumbnail}" />
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