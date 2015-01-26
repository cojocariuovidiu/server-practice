// Services function as glue between FE and BE. Way to contact API, get data, and pass to Angular controllers. Controllers then pass into the view aka MVC model.
// Factory = function made of object with properties and returns object

angular.module('userService', [])

.factory('User', function($http){
  var userFactory = {};

  userFactory.get = function(id){
    return $http.get('/api/users/' + id);
  };

  userFactory.all = function(){
    return $http.get('/api/users/');
  };

  userFactory.create = function(userData){
    return $http.post('/api/users/', userData);
  };

  userFactory.update = function(id, userData){
    return $http.put('/api/users/' + id, userData);
  };

  userFactory.delete = function(id){
    return $http.delete('/api/users/' + id);
  };

  return userFactory;
});