app.config(function($stateProvider) {

    $stateProvider.state('membersOnly', {
        url: '/userprofile',
        templateUrl: 'js/user/userprofile.html',
        controller: 'UserController',
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        }
    });

});

app.factory('UserFactory', function ($http) {



});


app.controller('UserController', function($scope, $state, AuthService) {
    AuthService.getLoggedInUser().then(function(user) {
        $scope.theUser = user;
        console.log($scope.theUser);
    });

});