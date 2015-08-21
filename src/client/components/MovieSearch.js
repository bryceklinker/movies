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
                    <div className="form-group">
                        <label className="sr-only" for="title">Title</label>
                        <input type="text" className="form-control" id="title" ref="title" placeholder="Title" />
                    </div>
                    <button type="submit" className="btn btn-default">
                        <span className="glyphicon glyphicon-search"></span>
                    </button>
                </form>
            </div>
        );
    }
});

module.exports = MovieSearch;