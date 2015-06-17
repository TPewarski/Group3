app.controller('CarouselDemoCtrl', function ($scope, productsFactory) {
  $scope.myInterval = 5000;

  var slides = $scope.slides = [];

    productsFactory.getAllProducts().then(function(data){
      data.forEach(function(item){
        slides.push({
          image: item.imgPath,
          text: item.description,
          name: item.name
        })
      })
    })





//   $scope.addSlide = function() {
//     var newWidth = 600 + slides.length + 1;







//     slides.push({
//       image: 'http://placekitten.com/' + newWidth + '/300',
//       text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
//         ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
//     });
//   };



//   for (var i=0; i<4; i++) {
//     $scope.addSlide();
//   }
});