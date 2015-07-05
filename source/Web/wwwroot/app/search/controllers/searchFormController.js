(function(angular) {
    angular.module('movies').controller('searchFormController', ['$scope', '$http', 'config', 'events', 'eventBus', function($scope, $http, config, events, eventBus) {
        function searchFinished(data) {
            eventBus.publish(events.searchFinished, data);
        }

        function searchFailed() {
            $scope.error = 'Your search failed!';
        }

        var search = function() {
            var url = config.apiUrl + '/search?title=' + $scope.title;
            $http.get(url)
                .success(searchFinished)
                .error(searchFailed);
        };

        $scope.search = search;
    }]);
})(angular = window.angular || {});