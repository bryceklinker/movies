(function(angular) {
    angular.module('movies').controller('searchFormController', ['$scope', 'events', 'eventBus', function($scope, events, eventBus) {
        $scope.search = function() {
            var searchArgs = { title: $scope.title };
            eventBus.publish(events.search, searchArgs);
        };

        function handleSearchStarted() {
            $scope.isSearching = true;
        }

        function handleSearchFinished() {
            $scope.isSearching = false;
        }

        eventBus.subscribe(events.searchStarted, handleSearchStarted);
        eventBus.subscribe(events.searchFinished, handleSearchFinished);
    }]);
})(angular = window.angular || {});