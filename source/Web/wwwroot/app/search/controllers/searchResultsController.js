(function(angular) {
    angular.module('movies').controller('searchResultsController', ['$scope', 'events', 'eventBus', function($scope, events, eventBus) {
        function handleSearchFinished(args) {
            $scope.movies = args.movies;
        }

        $scope.play = function(movie) {
            eventBus.publish(events.playMovie, movie);
        };

        eventBus.subscribe(events.searchFinished, handleSearchFinished);
    }]);
})(angular = window.angular || {});