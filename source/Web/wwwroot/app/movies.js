(function(angular) {
    var module = angular.module('movies', []);

    module.constant('config', {
        apiUrl: 'http://localhost:8181'
    });

    module.constant('events', {
        searchFinished: 'SearchFinished',
        playMovie: 'PlayMovie'
    });

    module.config(['$sceProvider', function($sceProvider) {
        $sceProvider.enabled(false);
    }]);
})(angular = window.angular || {});