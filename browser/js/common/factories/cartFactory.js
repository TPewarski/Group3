app.factory('cartFactory', function($http){
	return {
			// maybe do it in this format?? {product: {}, quantity: num}
		items: [
        {product: {
            name: "Dire Wolf",
            description: "An unusually large and intelligent species of wolf. Great gift for children of all ages.",
            price: 250000,
            inventoryQuantity: 12,
            categories: ['Animal', 'Dire Wolf'],
            imgPath: "https://kaylahoailinh.files.wordpress.com/2014/10/wallpaper-hd-dire-wolf-hd-cool-7-hd-wallpapers.jpeg?w=726&h=203"
        },
        quantity: 1}
        ],

        totalPrice: function(arr){
            console.log("hit total price")
            var cost = 0
            arr.forEach(function(item){
                cost += item.product.price * item.quantity
            })
            return cost
        }
		//userId or session ID
	}
})