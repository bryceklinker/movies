(function(angular) {
    angular.module('movies').controller('searchResultsController', ['$scope', 'events', 'eventBus', function($scope, events, eventBus) {
        function handleSearchFinished(args) {
            $scope.movies = args.movies;
        }

        eventBus.subscribe(events.searchFinished, handleSearchFinished);
    }]);
})(angular = window.angular || {});