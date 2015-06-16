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





app.controller('UserController', function($scope, $state, AuthService, UserFactory) {
    $scope.showHistory = false;
    $scope.showSettings = false;
    AuthService.getLoggedInUser().then(function(user) {
        $scope.theUser = user;
        
    });

    $scope.displaySettings = function(){
        if($scope.showSettings) $scope.showSettings = false;
        else $scope.showSettings = true;
        
    };

    $scope.displayCart = function(){
        
        $state.go("cart");
    };

    $scope.displayOrdHistory = function(){
        UserFactory.getOrderHistory($scope.theUser._id).then(function(data){
            
            $scope.orders = data;
        });
        if($scope.showHistory) $scope.showHistory = false;
        else $scope.showHistory = true;
    };

    $scope.submitUserEdit = function(){
        
        UserFactory.sendEdit($scope.theUser);

    };

});