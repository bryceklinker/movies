var React = require('react');
var jQuery = require('jquery');
global.jQuery = jQuery;
var bootstrap = require('bootstrap');
var MovieList = require('./MovieList');
var MoviePlayer = require('./MoviePlayer');
var MovieNavigation = require('./MovieNavigation');

var MovieApplication = React.createClass({
    render: function(){
        return (
            <div>
                <MovieNavigation />
                <div className="container-fluid">
                    <MoviePlayer />
                    <MovieList />
                </div>
            </div>
        );
    }
});

React.render(
    React.createElement(MovieApplication, null),
    document.getElementById('application'));
module.exports = MovieApplication;
