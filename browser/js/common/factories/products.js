app.factory('productsFactory', function($http){
	return {
		singleProduct: {
            name: "Dire Wolf",
            description: "An unusually large and intelligent species of wolf. Great gift for children of all ages.",
            price: 250000,
            inventoryQuantity: 12,
            categories: ['Animal', 'Dire Wolf'],
            imgPath: "https://kaylahoailinh.files.wordpress.com/2014/10/wallpaper-hd-dire-wolf-hd-cool-7-hd-wallpapers.jpeg?w=726&h=203"
        },

		getAllProducts : function() {
			console.log("Hit get from factory")
			return $http.get('/api/GETproducts/allproducts').
		  success(function(data, status, headers, config) {
		    console.log("data", data);
		  }).
		  error(function(data, status, headers, config) {
		  	console.log(data);
		  });
		}
	}
})