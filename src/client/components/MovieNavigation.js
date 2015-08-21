var React = require('react');
var MovieSearch = require('./MovieSearch');

var MovieNavigation = React.createClass({
    render: function(){
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Movies</a>
                    </div>
                    <div className="navbar-form navbar-right">
                        <MovieSearch />
                    </div>
                </div>
            </nav>
        );
    }
});

module.exports = MovieNavigation;