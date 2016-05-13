angular.module('test', [
  'ui.router',
  'pascalprecht.translate',
  'kng',

  'envConfig',
  'appConfig',
  'home',

  // TODO: insert your modules here
]);


angular.module('test').config(['$urlRouterProvider', '$locationProvider',
  function($urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    
    // fixes https://github.com/angular-ui/ui-router/issues/600
    $urlRouterProvider.otherwise(function($injector, $location) {
      var $state = $injector.get('$state');
      $state.go('home');
    });
  }
]);


angular.module('test').controller('ApplicationController',['$scope', function($scope) {
}]);
