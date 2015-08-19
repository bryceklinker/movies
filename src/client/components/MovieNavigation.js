var React = require('react');

var MovieNavigation = React.createClass({
    render: function(){
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Movies</a>
                    </div>
                </div>
            </nav>
        );
    }
});

module.exports = MovieNavigation;