app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, productsFactory, cartFactory, $window) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            cartFactory.update();

            scope.cartCount = cartFactory.cartCount();

            

            $rootScope.$on("CartChanged", function(event){
                scope.cartCount = cartFactory.cartCount();
            })

            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'Members Only', state: 'membersOnly', auth: true },
                { label: 'All Products', state: 'products',}
            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});