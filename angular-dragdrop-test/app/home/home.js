angular.module('home', ['services.search']);


angular.module('home').config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'app/home/home.html',
    controller: 'HomeController'
  });
}]);


angular.module('home').controller('HomeController', ['$scope', 'Search', function($scope, Search) {
  $scope.searchResult = [];

  Search.query('test').then(function(result) {
    $scope.searchResult = result;
  });

  $scope.images = ['images/umut_tas.jpg'];

  var index = 0;
  var dropArray = [];
  $scope.items = [1,2,3];

  $scope.onDrop = function(id, target){
      dropArray.push(id);
  }

}]);
