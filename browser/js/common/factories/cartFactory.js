function localGetCart () {
    return JSON.parse(window.localStorage.getItem('cart'));
}


function localSetCart (cart) {
    window.localStorage.setItem('cart',JSON.stringify(cart));
}

app.factory('cartFactory', function($http, $q, $rootScope, AuthService, Session){
		var items = [];
        var itemsIdIndex = [];

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
            self = this;
            
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
            console.log(AuthService.isAuthenticated())
            
            //Synchronize things in this factory with local storage
            items = localGetCart();
            if(items){
                popItemIDIndex();
            } else { items = [] };
            //If user is logged
            if(AuthService.isAuthenticated){
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
                        }
                    }
                })

            }
        }
        var del = function(itemID){
            var self = this;
            self.update();
            
            var indexToDelete = itemsIdIndex.indexOf(itemID);
            items.splice(indexToDelete,1);
            itemsIdIndex.splice(indexToDelete,1);
            localSetCart(items);
            $rootScope.$broadcast('CartChanged');
        }
        var get = function(){
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
        var getAllCartItems = function(){
            if(!items) items = [];

            return $q.all(items.map(function(itemIDandQuantity){
                return $http.get('/api/products/'+itemIDandQuantity.id);
            }))
            .then(function(results){
                return results.map(function(result, index){
                    var newObject = {};
                    newObject.product = result.data;
                    newObject.quantity = items[index].quantity;
                    return newObject;
                })
            });
        }
   
    return {
          totalPrice: totalPrice,
          add: add,
          get: get,
          del: del,
          update: update,
          updateOneQuantity: updateOneQuantity,
          getAllCartItems: getAllCartItems,
          cartCount: cartCount
	}
});