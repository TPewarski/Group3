app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, AuthService, $state, GoogleLoginFactory) {

    $scope.login = {};
    $scope.error = null;

    $scope.signUp = function (signupInfo) {

        $scope.error = null;

        AuthService.signup(signupInfo).then(function () {
            $state.go('login');
        }).catch(function () {
            $scope.error = 'Please Choose Another Email.';
        });

    };

    $scope.signUpGoogle = GoogleLoginFactory.authenticate;
});