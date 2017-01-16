// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'tea.routers', 'tea.controllers', 'ngCordova'])

.constant('baseUrl', 'http://202.120.40.175:')

.constant('port', '17000')

.config(function($ionicConfigProvider){
	//$ionicConfigProvider.views.maxCache(0);
	//$ionicConfigProvider.backButton.icon("ion-chevron-left");
	$ionicConfigProvider.tabs.position("bottom");
	$ionicConfigProvider.tabs.style("standard");
})

.run(function($ionicPlatform, $ionicHistory) {
	$ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

			// Don't remove this line unless you know what you are doing. It stops the viewport
			// from snapping when text inputs are focused. Ionic handles this internally for
			// a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
	    if(window.StatusBar) {
		    StatusBar.styleDefault();
	    }
	});
	//$ionicPlatform.registerBackButtonAction(function(e) {
	//	e.preventDefault();
	//	//console.log("registerBackButtonAction");
	//	//console.log($ionicHistory.backView());
	//	if($ionicHistory.backView()) {
	//		$ionicHistory.goBack();
	//	}
	//	return false;
	//}, 999);
});
