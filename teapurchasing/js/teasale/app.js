angular.module('teasale', [
    'ui.bootstrap',
    'ui.router',
    'restangular',
    'angular-table',
    'nsPopover',
    'ui.tree',
    'ngFileUpload',
    //'colorpicker.module',
    //'wysiwyg.module',
    'summernote'
]).config(function ($stateProvider, $urlRouterProvider, RestangularProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/main/home');
    $stateProvider.state('main', {
        url: '/main',
        controller: 'MainCtrl',
        templateUrl: 'partials/main.html',
    }).state('main.home', {
        url: '/home',
        controller: 'HomeCtrl',
        templateUrl: 'partials/home.html',
    }).state('main.detail', {
        url: '/detail/:tea',
        controller: 'DetailCtrl',
        templateUrl: 'partials/detail.html',
    }).state('main.list', {
        url: '/list/:data',
        controller: 'ListCtrl',
        templateUrl: 'partials/list.html',
        params: {'data': null, producttype:-1},
    }).state('main.cart', {
        url: '/cart',
        controller: 'CartCtrl',
        templateUrl: 'partials/cart.html',
    }).state('main.purchase', {
        url: '/purchase',
        controller: 'PurchaseCtrl',
        templateUrl: 'partials/purchase.html',
    }).state('main.immebuy', {
        url: '/immebuy',
        controller: 'ImmeBuyCtrl',
        templateUrl: 'partials/immebuy.html',
    }).state('login', {
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl: 'partials/login.html',
    }).state('register', {
        url: '/register',
        controller: 'RegisterCtrl',
        templateUrl: 'partials/register.html',
    }).state('findpass', {
        url: '/findpass',
        controller: 'PassFindCtrl',
        templateUrl: 'partials/findpass.html',
    }).state('user', {
        url: '/user',
        controller: 'UserCtrl',
        templateUrl: 'partials/user/user.html',
    }).state('user.userinfo', {
        url: '/userinfo',
        controller: 'UserInfoCtrl',
        templateUrl: 'partials/user/userinfo.html',
    }).state('user.userfund', {
        url: '/userfund/:data',
        controller: 'UserFundCtrl',
        templateUrl: 'partials/user/userfund.html',
        params: {'data': null},
    }).state('user.usersource', {
        url: '/usersource/:data',
        controller: 'UserSourceCtrl',
        templateUrl: 'partials/user/usersource.html',
        params: {'data': null},
    }).state('user.order', {
        url: '/order/:data',
        controller: 'OrderCtrl',
        templateUrl: 'partials/user/order.html',
        params: {'data': null},
    }).state('addsource', {
        url: '/addsource',
        controller: 'SourceAddCtrl',
        templateUrl: 'partials/crowdsource/addsource.html',
    }).state('modifysource', {
        url: '/modifysource/:data',
        controller: 'SourceModifyCtrl',
        templateUrl: 'partials/crowdsource/modifysource.html',
        params: {'data': null},
    }).state('sourcelist', {
        url: '/sourcelist/:data',
        controller: 'SourceListCtrl',
        templateUrl: 'partials/crowdsource/sourcelist.html',
    }).state('fund', {
        url: '/fund',
        controller: 'FundCtrl',
        templateUrl: 'partials/crowdfund/fund.html',
    }).state('fund.enroll', {
        url: '/enroll',
        controller: 'FundEnrollCtrl',
        templateUrl: 'partials/crowdfund/fundenroll.html',
    }).state('fund.list', {
        url: '/list/:data',
        controller: 'FundListCtrl',
        templateUrl: 'partials/crowdfund/fundlist.html',
        params: {'data': null, producttype:-1},
    }).state('fund.detail', {
        url: '/detail/:tea',
        controller: 'FundDetailCtrl',
        templateUrl: 'partials/crowdfund/funddetail.html',
    });

    $locationProvider.html5Mode(true);
}).run(function (coverAuth, $http, $rootScope) {

    $rootScope.$on('$stateChangeSuccess', function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
});
