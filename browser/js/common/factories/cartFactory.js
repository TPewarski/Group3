function localGetCart () {
    return JSON.parse(window.localStorage.getItem('cart'));
}


function localSetCart (cart) {
    window.localStorage.setItem('cart',JSON.stringify(cart));
}

app.factory('cartFactory', function($http, $q){
	return {
			// maybe do it in this format?? {product: {}, quantity: num}
		items: [{id: "111111111111111111111111", quant: 5},{id: "222222222222222222222222", quant:5}], 
        itemIDindex : ['111111111111111111111111','222222222222222222222222'],

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
            var doesItAlreadyExists = self.itemIDindex.indexOf(newItemID.id);
            console.log(self.itemIDindex);
            
            if (doesItAlreadyExists === -1){
                self.items.push(newItemID);
                self.itemIDindex.push(newItemID.id);
                localSetCart(self.items);
            } else {
                self.items[doesItAlreadyExists].quant += 1;
                localSetCart(self.items);
            }
        },
        del: function(itemID){
            var indexToDelete = itemIDindex.indexOf(itemID);
            this.items.splice(indexToDelete,1);
            this.itemIDindex.splice(indexToDelete,1);
            localSetCart(this.items);
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