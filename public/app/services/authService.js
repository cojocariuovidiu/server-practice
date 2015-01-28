angular.module('authService', [])

// main auth functions; handles login, logout, getting current user, checking if user is logged in
// $http works with api while $q returns promised objects
.factory('Auth', function($http, $q, AuthToken){
  var authFactory = {};

  // make request to node api, if true will return successful callback
  authFactory.login = function(username, password){
    return $http.post('/api/authenticate', {
      username: username,
      password: password
    })
    .success(function(data){
      AuthToken.setToken(data.token);
      return data;
    });
  };

  authFactory.logout = function(){
    AuthToken.setToken();
  };

  authFactory.isLoggedIn = function(){
    if (AuthToken.getToken())
      return true;
    else
      return false;
  };

  authFactory.getUser = function(){
    if (AuthToken.getToken())
      return $http.get('/api/me');
    else
      return $q.reject({ message: 'User has no token.' });
  };

  return authFactory;
})

// token auth functions; handles getting and saving the token
// $window stores token client-side. can find local storage via resources in dev tools
.factory('AuthToken', function($window){
  var authTokenFactory = {};

  authTokenFactory.getToken = function(){
    return $window.localStorage.getItem('token');
  };

  authTokenFactory.setToken = function(token){
    if (token)
      $window.localStorage.setItem('token', token);
    else
      $window.localStorage.removeItem('token');
  };

  return authTokenFactory;
})

// auth interceptor; handles attaching token to HTTP requests, redirects if not logged in
.factory('AuthInterceptor', function($q, $location, AuthToken){
  var interceptorFactory = {};

  interceptorFactory.request = function(config){
    var token = AuthToken.getToken();
    if (token)
      config.headers['x-access-token'] = token;
    return config;
  };

  interceptorFactory.responseError = function(response){
    if (response.status == 403)
      $location.path('/login');
    return $q.reject(response);
  };

  return interceptorFactory;
});