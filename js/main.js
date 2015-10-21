// AngularJS is most powerful on single page application.
var app = angular.module('myApp', []);

// Functions in the app.run function, will run prior to the rest of the app.
//app.run(function($rootScope)) {
/*
All AngularJS apps have a $rootScope. 
The $rootScope is the top-most scope that is created on the DOM element that contains the ng-app directive. 
*/
	// Allows use to access the {{ name }} attribute anywhere inside the view.
//	$rootScope.name = "Marcin Ufniarz";  
//});
/*
The ng-controller directive creates a new $scope object for the DOM element and nests it in the containing $scope. 
In this example, the parent $scope of the div with ng-controller is the $rootScope object.
*/
app.controller('MyController', function($scope) {
	$scope.person = {
		name: "Marcin Ufniarz"
	};
});
/*
With one exception, all scopes are created with prototypal inheritance, meaning that they have access to their parent scopes. 
By default, for any property that AngularJS cannot find on a local scope, 
AngularJS will crawl up to the containing (parent) scope and look for the property or method there. 
If AngularJS can’t find the property there, it will walk to that scope’s parent and so on and so forth until it reaches the $rootScope.

    The one exception: Some directives can optionally create an isolate scope and do not inherit from their parents.
*/
app.controller('ParentController', function($scope) {
  $scope.person = {greeted: false};
});

app.controller('ChildController', function($scope) {
  $scope.sayHello = function() {
    $scope.person.greeted = true;
  }
});