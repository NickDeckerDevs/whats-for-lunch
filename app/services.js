angular.module('lunch.services', [])
	.factory('yelpAPIservice', function($http) { //options to be brought in or some how override default
		'use strict';
		var apiRequest = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}

		var yelpAPI = {};
		yelpAPI.getVenues = function($scope) {
			console.log('yelpAPI get venues')
			console.log($scope)
			var filters = {
				term: 'restaurants',
				sort_by: $scope.sortFilter,
				limit: $scope.limitFilter
			};
			console.log('lat filter: ' + $scope.latitudeFilter);
			if($scope.latitudeFilter != '') {
				filters.latitude = $scope.latitudeFilter;
				filters.longitude = $scope.longitudeFilter;
			} else {
				filters.location = $scope.locationFilter;
			}
			console.log(filters);
			return $http.post('/api/yelp', filters, apiRequest.headers);
		}
		return yelpAPI;
	})
	.factory('geolocationservice', ['$q', '$window', function($q, $window) {
		'use strict';
		var userLocation = {};
		userLocation.loading = 'Getting Location';
		var defer = $q.defer();
		userLocation.getCurrentPosition = function() {
			if(!$window.navigator.geolocation) {
				defer.reject('Geolocation not supported');
			} else {
				$window.navigator.geolocation.getCurrentPosition(
					function(position) {
						defer.resolve(position.coords);
					},
					function(err) {
						defer.reject(err);
					});
			}
			return defer.promise;
		}
		return userLocation;
	}]);
