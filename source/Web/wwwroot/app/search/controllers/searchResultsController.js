(function(angular) {
    angular.module('movies').controller('searchResultsController', ['$scope', '$http', 'config', 'events', 'eventBus', function($scope, $http, config, events, eventBus) {
        function handleSearch(args) {
            eventBus.publish(events.searchStarted);
            var url = config.apiUrl + '/search?title=' + args.title;
            $http.get(url)
                .success(searchFinished)
                .error(searchFailed);
        }

        function searchFailed(error) {
            eventBus.publish(events.searchFinished, false);
        }

        function searchFinished(data) {
            $scope.movies = data.movies;
            eventBus.publish(events.searchFinished, true);
        }

        $scope.play = function(movie) {
            eventBus.publish(events.playMovie, movie);
        };

        eventBus.subscribe(events.search, handleSearch);
    }]);
})(angular = window.angular || {});