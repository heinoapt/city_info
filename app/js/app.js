angular.module('cityInfo.providers', []);
angular.module('cityInfo.factories', ['cityInfo.providers']);
angular.module('cityInfo.controllers', ['cityInfo.factories']);

var pw = angular.module('cityInfo', ['ngMaterial', 'cityInfo.factories', 'cityInfo.controllers']);
pw.config(function($mdThemingProvider, LoadGoogleMapsApiProvider) {
  $mdThemingProvider.theme('default').dark();
  LoadGoogleMapsApiProvider.setConfig({
    apiKey: 'AIzaSyDqNsDFc1Jz7XgdsoKWYnGyNBpZRL6PRh4',
    libraries: ['places']
  });

});

pw.run(['$rootScope', function($rootScope){

  $rootScope.fullscreen = false;
  $rootScope.initialized = false;

  llb_app.addListener('window_state', function(data){
    if(data.fullscreen)
    {
      $rootScope.$apply(function(){
        $rootScope.fullscreen = true;
      })
    }
    else
    {
      $rootScope.$apply(function(){
        $rootScope.fullscreen = false;
      })
    }
  });

  llb_app.request('window_dimensions');
  llb_app.addListener('window_dimensions', function(data){
    $rootScope.$apply(function(){
      $rootScope.window_dimensions = data
      $rootScope.fullscreen_app_dimensions = {
        "width": data.fullscreen_width + "px",
        //TODO Find a way around this magic number,
        //it's not even accurate on all screen sizes
        "height": data.fullscreen_height - 64 + "px"
      };

      $rootScope.initialized = true;
    });
  });
}]);
