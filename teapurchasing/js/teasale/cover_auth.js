angular.module('teasale').factory('coverAuth', function ($http, $q, $modal,
                                                       $rootScope) {

  var currentUserChangedCallbacks = [];

  var coverAuth = {
    currentUser: null,
    setCurrentUser: setCurrentUser,
    onCurrentUserChange: onCurrentUserChange,
    autoLogin: autoLogin,
    login: login,
    logout: logout,
  };
  return coverAuth;

  ////

  function setCurrentUser(currentUser) {
    coverAuth.currentUser = currentUser;
    currentUserChangedCallbacks.forEach(function (callback) {
      callback(currentUser);
    });
  }
  function onCurrentUserChange(callback) {
    currentUserChangedCallbacks.push(callback);
  }

  var loginPromise;

  function autoLogin() {
    var currentUser = localStorage['user'];
    if(currentUser){
      coverAuth.currentUser = JSON.parse(currentUser);
      //console.log(currentUser);
      return coverAuth.setCurrentUser(coverAuth.currentUser);
    }
  }

  function login(user) {
    if (coverAuth.currentUser)
      return $q.when(coverAuth.currentUser);
    if (!loginPromise) {
      if (user) {
        loginPromise = $q.when(user);
      } 
      loginPromise = loginPromise.then(function (user) {
        return $http.post('/api/account/login', user).catch(function (res) {
          if (res.status === 403 || res.status === 404) {
            alert('用户名或密码错误！')
          }
          return $q.reject(res);
        });
      }).then(function (res) {
        if(res.code==200){
          coverAuth.currentUser = res.data;
          localStorage['user'] = JSON.stringify(coverAuth.currentUser);
          coverAuth.setCurrentUser(coverAuth.currentUser);
          return window.location.href="main.home"; 
        }
        else{
          alert('用户名或密码错误！');
          return $q.reject(res);
        }
      });
      loginPromise.catch(function (e) {
        loginPromise = null;
      });
    }
    return loginPromise || $q.reject();
  }


  function logout() {
      delete localStorage['user'];
      coverAuth.setCurrentUser(null);
      loginPromise = null;
  }
});
