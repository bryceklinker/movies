(function (angular) {
    angular.module('movies').controller('playerController', ['$scope', 'config', 'events', 'eventBus', function($scope, config, events, eventBus) {
        function handlePlayMovie(args) {
            $scope.videoSource = config.apiUrl + '/play/' + args.title;
        }

        eventBus.subscribe(events.playMovie, handlePlayMovie);
    }]);
})(angular = window.angular || {});