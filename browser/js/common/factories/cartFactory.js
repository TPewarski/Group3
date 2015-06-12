app.factory('cartFactory', function($http, $q){
	return {
			// maybe do it in this format?? {product: {}, quantity: num}
		items: [{id: "111111111111111111111111", quant: 5}, {id: "111111111111111111111111", quant: 5},{id: "222222222222222222222222", quant:5}], 

        totalPrice: function(arr){
            var cost = 0
            var self = this;
            arr.forEach(function(item, index){
                cost += item.product.price * item.quant;
            })
            return cost;
        },
        getAllCartItems: function(){
            var self = this;
            return $q.all(this.items.map(function(itemIDandQuantity){
                return $http.get('/api/products/'+itemIDandQuantity.id);

            }))
            .then(function(results){
                return results.map(function(result, index){


                    var newObject = {};
                    newObject.product = result.data;
                    newObject.quant = self.items[index].quant;
                    return newObject;
                });
            })

        }


		//userId or session ID
	}
});