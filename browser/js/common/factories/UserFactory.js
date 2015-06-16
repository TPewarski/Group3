app.factory('UserFactory', function ($http) {

    return {
        displayCart: function() {
            console.log("going to cart");
        },
        getOrderHistory: function(userID){
            return $http.get('api/orders', {
                params: {user: userID}
            }).then(function(response){
                return response.data;
            });
        },
        sendEdit: function(userEdit){
            return $http.put('api/users', userEdit).
            success(function(data, status, headers, config) {
                console.log(data, status, headers, config);
            }).
            error(function(data, status, headers, config) {
                console.log(data, status, headers, config);
            });
        }
    };

});
