app.factory("GoogleLoginFactory", function($window){
	return {
		authenticate: function(){
			$window.location.href = "/auth/google";
		}
	}
})