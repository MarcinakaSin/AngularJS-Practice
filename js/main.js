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
	// The view automatically updates to reflect changes in the controller.
	var updateClock = function() {
		$scope.clock = new Date();
	};
	var timer = setInterval(function() {
		$scope.$apply(updateClock);
	}, 1000);
	updateClock();
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


app.controller('DemoController', function($scope) {
	$scope.counter = 0;
	$scope.add = function(amount) {
		$scope.counter += amount;
	};
	$scope.subtract = function(amount) {
		$scope.counter -= amount;
	};
});



/*
Out of the box, AngularJS supports AJAX (or asynchronous JavaScript and XML).
AngularJS supports AJAX through a service called the $http service.

$http({
  method: 'JSONP',
  url: 'https://api.github.com/events?callback=JSON_CALLBACK'
}).success(function(data, status, headers, config) {
  // data contains the response
  // status is the HTTP status
  // headers is the header getter function
  // config is the object that was used to create the HTTP request
}).error(function(data, status, headers, config) {
});

The $http service is a core AngularJS service that helps faciliate communication with remote HTTP servers via the XMLHttpRequest object or through JSONP.

    Note that AngularJS will take care of handling a JSONP request if you append the EXACT string: callback=JSON_CALLBACK as just above. 
    AngularJS will replace JSON_CALLBACK with the proper callback it constructs for you.

The $http service is a function that takes a configuration object, which defines how the HTTP request is constructed. 
It will return a promise that has two methods 'success' and 'error'. 

NPR API Key: MDIwOTMxNDQxMDE0NDU0MDMxNTJlNDRmOA000
*/

var apiKey = 'MDIwOTMxNDQxMDE0NDU0MDMxNTJlNDRmOA000',
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

app.controller('HTTPPlayerController', function($scope, $http) {
  // Hidden our previous section's content
  // construct our http request
  $http({

    method: 'JSONP',
    url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'

  }).success(function(data, status) {
    // Now we have a list of the stories (data.list.story)
    // in the data object that the NPR API 
    // returns in JSON that looks like:
    // data: { "list": {
    //   "title": ...
    //   "story": [
    //     { "id": ...
    //       "title": ...

	// Store the list of stories on the scope
	// from the NPR API response object (described above)
	$scope.programs = data.list.story;

  }).error(function(data, status) {
    // Some error occurred
  });
});


/* root controller PlayerController */
app.controller('PlayerController', ['$scope', function($scope) {
	$scope.playing = false;
	$scope.audio = document.createElement('audio');
	$scope.audio.src = 'http://pd.npr.org/npr-mp4/npr/sf/2013/07/20130726_sf_05.mp4?orgId=1&topicId=1032&ft=3&f=61';
	$scope.play = function() {
		$scope.audio.play();
		$scope.playing = true;
	};
	$scope.stop = function() {
		$scope.audio.pause();
		$scope.playing = false;
	};
	$scope.audio.addEventListener('ended', function() {
		$scope.$apply(function() {
			$scope.stop()
		});
	});
}]);

/* 
RelatedController will be responsible for keeping track of our audio element 
and will handle fetching our listing of NPR programs.
*/
app.controller('RelatedController', ['$scope', function($scope){

}]);