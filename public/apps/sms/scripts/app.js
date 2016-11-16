var baseServiceUrl = "/apps/sms/messages/";

var app = 
	angular.module('app', ['ngRoute'])
	.config(function($routeProvider) {
	  $routeProvider
		.when('/', {
		  controller:'mainController',
		  templateUrl:'views/list.html'
		})
        .when('/new-message', {
		  controller:'detailController',
		  templateUrl:'views/detail.html'
		})
		.otherwise({
		  redirectTo:'/'
		});
	})
	.factory('messageService', function($http){
		var messageService = {};
		messageService.getMessages = function(callback){
            $http.get(baseServiceUrl).success(callback);
        };	
		return messageService;
	})
	.controller('mainController', function($scope, $http, messageService) {
		messageService.getMessages(
            function(data){
                $scope.messages = data;
        });
        
        $scope.deleteMessage = function(id){
            console.info(id + "!!!!");
            $http.delete(baseServiceUrl + id).success( function(d){
                console.info(d);
            });
        };
	}).controller('detailController', function($scope, $http, $location, messageService) {
		$scope.message = {number:"", message:""};
        $scope.sendMessage = function(){
            $http.post(baseServiceUrl, $scope.message).success(function(d){
                console.info(d);
                $location.path("/");
            });
        };
	});
