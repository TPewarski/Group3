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
    $scope.isAnAdmin = false;
    $scope.showUsers = false;
    $scope.adminOrders = false;
    AuthService.getLoggedInUser().then(function(user) {
        $scope.theUser = user;
        $scope.isAnAdmin = user.isAdmin;
        console.log($scope.theUser);    
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
            console.log("order history", $scope.orders);
        });
        if($scope.showHistory) $scope.showHistory = false;
        else $scope.showHistory = true;
    };

    $scope.adminOrdersDisplay = function(){
        console.log("clicked");
        if($scope.isAnAdmin){
            UserFactory.getAllOrders().then(function(allOrders){
                $scope.allOrders = allOrders;
                if($scope.adminOrders) $scope.adminOrders = false;
                else $scope.adminOrders = true;
            });
        }
    };

    $scope.submitUserEdit = function(){  
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