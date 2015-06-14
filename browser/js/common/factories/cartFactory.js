function localGetCart () {
    return JSON.parse(window.localStorage.getItem('cart'));
}


function localSetCart (cart) {
    window.localStorage.setItem('cart',JSON.stringify(cart));
}

app.factory('cartFactory', function($http, $q, $rootScope){
	return {
			// maybe do it in this format?? {product: {}, quantity: num}
		items: [], 
        itemIDindex : [],

        totalPrice: function(arr){
            var cost = 0
            var self = this;
            arr.forEach(function(item, index){
                cost += item.product.price * item.quant;
            })
            return cost;
        },
        //Don't push to items, use this method instead. 
        add: function(newItemID) { 

            var self = this;
            var itemIndex = self.itemIDindex.indexOf(newItemID.id);
            
            
            if (itemIndex === -1){
                self.items.push(newItemID);
                self.itemIDindex.push(newItemID.id);
                localSetCart(self.items);
            } else {
                self.items[itemIndex].quant += 1;
                localSetCart(self.items);
            }
            $rootScope.$broadcast('CartChanged');
        },
        updateQuantity: function(id, newQuant) {
            self = this;
            
            var itemIndex = self.itemIDindex.indexOf(id);
            if(itemIndex !== -1){
                if(newQuant !== 0) { self.items[itemIndex].quant = newQuant; }
                else { self.del(id); }
            }
            localSetCart(self.items);
            $rootScope.$broadcast('CartChanged');
        },
        //Use this function to link local storage cart to items
        update: function(){
            console.log("updateingsdasda")
            var self = this;
            self.items = localGetCart();
            if(true){
                self.itemIDindex = self.items.map(function(item){
                    return item.id;
                })
            }
        },
        del: function(itemID){
            var self = this;
            self.update();
            console.log(self.items, self.itemIndex);
            var indexToDelete = self.itemIDindex.indexOf(itemID);
            self.items.splice(indexToDelete,1);
            self.itemIDindex.splice(indexToDelete,1);
            localSetCart(self.items);
            $rootScope.$broadcast('CartChanged');
        },
        get: function(){
            this.items = localGetCart();
            if(this.items){
                this.itemIDindex = this.items.map(function(item){
                    return item.id;
                })
                return this.items;
            } else {
                localSetCart([]);
                return new Array();
            }
        },
        getAllCartItems: function(item){
            if(!item) return [];
            return $q.all(item.map(function(itemIDandQuantity){
                return $http.get('/api/products/'+itemIDandQuantity.id);
            }))
            .then(function(results){
                return results.map(function(result, index){
                    var newObject = {};
                    newObject.product = result.data;
                    newObject.quant = item[index].quant;
                    return newObject;
                });
            })

        }


		//userId or session ID
	}
});