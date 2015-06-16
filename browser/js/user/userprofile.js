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





app.controller('UserController', function($scope, $state, AuthService, UserFactory ) {
    $scope.showHistory = false;
    $scope.showSettings = false;
    $scope.isAnAdmin = false;
    $scope.showUsers = false;
    AuthService.getLoggedInUser().then(function(user) {
        $scope.theUser = user;
        $scope.isAnAdmin = user.isAdmin;
        console.log($scope.theUser);
    });

    $scope.displaySettings = function(){
        if($scope.showSettings) $scope.showSettings = false;
        else $scope.showSettings = true;
        console.log($scope.theUser.email);
    };

    $scope.displayCart = function(){
        console.log("going to cart");
        $state.go("cart");
    };

    $scope.displayOrdHistory = function(){
        UserFactory.getOrderHistory($scope.theUser._id).then(function(data){
            console.log("data", data);
            $scope.orders = data;
        });
        if($scope.showHistory) $scope.showHistory = false;
        else $scope.showHistory = true;
    };

    $scope.submitUserEdit = function(){
        console.log($scope.theUser);
        UserFactory.sendEdit($scope.theUser);

    };

    $scope.displayUsers = function(){
        console.log("clicked");
        if($scope.isAnAdmin){
            UserFactory.getAllUsers().then(function(allUsers){
                $scope.allUsers = allUsers;
                if($scope.showUsers) $scope.showUsers = false;
                else $scope.showUsers = true;
            });
        }
    };

});