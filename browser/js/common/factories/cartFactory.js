function localGetCart () {
    return JSON.parse(window.localStorage.getItem('cart'));
}


function localSetCart (cart) {
    window.localStorage.setItem('cart',JSON.stringify(cart));
}

app.factory('cartFactory', function($http, $q, $rootScope, AuthService, Session){
		var items = [];
        var itemsIdIndex = [];
        var itemsArrayForOrders = []; //Refactor this later. Look below in getcartitems for what this is 

        var totalPrice = function(arr){ 
            var cost = 0
            var self = this;
            arr.forEach(function(item, index){
                cost += item.product.price * item.quantity;
            })
            return cost;
        }

        var cartCount = function(){
            return items.length;
        }

        var add = function(newItemID) { 

            var self = this;
            
            var itemIndex = itemsIdIndex.indexOf(newItemID.id);
            
            if (itemIndex === -1){
                items.push(newItemID);
                itemsIdIndex.push(newItemID.id);
                localSetCart(items);
            } else {
                items[itemIndex].quantity += 1;
                localSetCart(items);
            }
            $rootScope.$broadcast('CartChanged');
        }
        var updateOneQuantity = function(id, newQuant) {
            var self = this;
            
            var itemIndex = itemsIdIndex.indexOf(id);
            if(itemIndex !== -1){
                if(newQuant !== 0) { items[itemIndex].quantity = newQuant; }
                else { self.del(id); }
            }
            localSetCart(items);
            $rootScope.$broadcast('CartChanged');
        }

        var popItemIDIndex = function(){
            if(items && items.length > 0){
                itemsIdIndex = items.map(function(item){
                    return item.id;
                })
            } else { itemsIdIndex = []};            
        }

        //Use this function to link local storage cart to items
        var update = function(){
            console.log("Cart Items:", items);
            console.log("itemsArrayForOrders:", itemsArrayForOrders);
            //Synchronize things in this factory with local storage
            if(items.length){ //If at least one thing exists.
                popItemIDIndex();
                localSetCart(items);
            } else { 
                items = localGetCart() || new Array();
            };
            angular.element(document).ready(function () {
                getAllCartItems();
            });

            $rootScope.$broadcast('CartChanged');

        }


        var syncDB = function() {
            if(AuthService.isAuthenticated()){
                AuthService.getLoggedInUser().then(function(user){
                    if(items.length > 0){
                        user.cart = items.map(function(item){
                            item.product = item.id;
                            return item;
                            //Match up the front end keys with back end keys. 
                            //Probaby better to do this from the start but it's too late now. Lavos is here. Gabe you will never see this. BWHAHAHAHHA
                        });
                    }
                    else{
                        if(user.cart.length > 0){ 
                            //We have deduced that the local cart is empty but the remote cart is full. 
                            //The backend will now override the front end. 
                            items = user.cart.map(function(item){
                                item.id = item.product;
                                return item;
                            })
                            popItemIDIndex();
                        }
                    }

                    $http.put('/api/users', {_id: user._id, cart: items}).then(function(){
                        update();
                    });
                })
            }
        }

        $rootScope.$on('auth-login-success', function(){
            syncDB();
        })

        var del = function(itemID){
            var self = this;
            self.update();
            
            var indexToDelete = itemsIdIndex.indexOf(itemID);
            items.splice(indexToDelete,1);
            itemsIdIndex.splice(indexToDelete,1);
            localSetCart(items);
            $rootScope.$broadcast('CartChanged');
        }
        function get(){
            items = localGetCart();
            if(items){
                itemsIdIndex = items.map(function(item){
                    return item.id;
                })
                return items;
            } else {
                localSetCart([]);
                return new Array();
            }
        }
        function getAllCartItems(){
            if(!items) items = [];

            return $q.all(items.map(function(itemIDandQuantity){
                return $http.get('/api/products/'+itemIDandQuantity.id);
            }))
            .then(function(results){

                itemsArrayForOrders = results.map(function(resp){
                    return resp.data;
                });
                ///////
                //Assign item array for orders here to be added
                //Make it match the backend exactly?? Figure this out  
                //later.
                ///////
                return results.map(function(result, index){
                    var newObject = {};
                    newObject.product = result.data;
                    newObject.quantity = items[index].quantity;
                    return newObject;
                })
            });
        }

        function clearCart(){
            items = [];
            itemsIdIndex = [];
            update();
            syncDB();
        }

        //This function below is a risky gamble.
        //It's a huge techn debt with a big ass interest rate
        //but I don't think we'll need to pay it back before the
        //project is finished.
        function checkout (userId){

            var cartToSend = itemsArrayForOrders.map(function(product, index){
                var newItem = {};
                newItem.name = product.name;
                newItem.price = product.price;
                newItem.quantity = items[index].quantity;
                return newItem;
            })

            var newOrder = {
                user: userId,
                cart: cartToSend
            }

            return $http.post('/api/orders', newOrder)
            .success(function(data){
                console.log("ORDER SUCCESS!!!", data);
                clearCart();

            });
        }

        update();
   
    return {
          totalPrice: totalPrice,
          add: add,
          get: get,
          del: del,
          update: update,
          updateOneQuantity: updateOneQuantity,
          getAllCartItems: getAllCartItems, //This returns an array of product ID's and all the juciy information
          cartCount: cartCount,
          syncDB: syncDB,
          clearCart: clearCart,
          checkout: checkout
	};
});