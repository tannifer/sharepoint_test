// Code goes here

angular.module('myApp', ['ngMaterial', 'jkAngularCarousel'])

.controller('MyCtrl', function($scope, $http) {

		 $http.get("/sites/devtraining/rob/_api/web/lists/GetByTitle('Carousel')/items?$top=1000").
        	then(function(response) {
        
        	$scope.dataArray = []
        	
        	for(i = 0;i < response.data.value.length; i++)
        	{
        		console.log(response.data.value[i].ImageURL);
        		$scope.dataArray.push({'src' : response.data.value[i].ImageURL})
        		$scope.havedata = true
        	}

			
		})

    
});
