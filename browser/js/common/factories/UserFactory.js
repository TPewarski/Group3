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

        getAllOrders: function(){
            return $http.get('api/orders').then(function(allOrders){
                console.log("all orders", allOrders.data);
                return allOrders.data;
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
        },

        getAllUsers: function(){
            return $http.get('api/users').then(function(allUsers){
                console.log("all users", allUsers.data);
                return allUsers.data;
            });
        },

        setStatusShipped: function(id){

            return $http.put('api/orders', {_id: id, isShipped: true}).then(function(doc){
                console.log("success", doc)
            }, function(err){
                console.log("put error", err)
            })
        },

        setStatusClosed: function(id){
            return $http.put('api/orders', {_id: id, isClosed: true}).then(function(doc){
                console.log("success", doc)
            }, function(err){
                console.log("put error", err)
            })
        }
    };

});
