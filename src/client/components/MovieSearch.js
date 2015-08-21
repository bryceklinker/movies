var React = require('react');
var MovieActions = require('../actions/movieActions');
MovieActions.init();

var MovieSearch = React.createClass({
    handleSubmit: function(e){
        e.preventDefault();

        var title = React.findDOMNode(this.refs.title).value.trim();
        MovieActions.searchMovies(title);
    },
    render: function(){
        return (
            <div className="row">
                <form className="form-inline" onSubmit={this.handleSubmit} role="search">
                    <div className="input-group">
                        <input type="text" className="form-control" id="title" ref="title" placeholder="Title" />
                        <span className="input-group-btn">
                            <button type="submit" className="btn btn-default">
                                <span className="glyphicon glyphicon-search"></span>
                            </button>
                        </span>
                    </div>
                </form>
            </div>
        );
    }
});

module.exports = MovieSearch;