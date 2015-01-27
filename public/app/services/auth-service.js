angular.module('authService', [])

// main auth functions; handles login, logout, getting current user, checking if user is logged in
// $http works with api while $q returns promised objects
.factory('Auth', function($http, $q, AuthToken){
  var authFactory = {};

  return authFactory;
})

// token auth functions; handles getting and saving the token
// $window stores token client-side
.factory('AuthToken', function($window){
  var authTokenFactory = {};

  return authTokenFactory;
})

// auth interceptor; handles attaching token to HTTP requests, redirects if not logged in
.factory('AuthInterception', function($q, AuthToken){
  var interceptorFactory = {};

  return interceptorFactory;
});