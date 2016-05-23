angular.module('MetronicApp').controller('DashboardController', function($rootScope, $scope, $http, $timeout) {
  $scope.$on('$viewContentLoaded', function() {
    // initialize core components
    App.initAjax();
 $scope.test= 0;

 $scope.getData = function(){
                $http.get('http://188.166.27.114:3000/measurements?token=U1S3Nm0J06JnZhD65p6gadDDmA116q&last=1') //188.166.27.114:3000/measurements/56f475f198f51afb04d718f6?token=U1S3Nm0J06JnZhD65p6gadDDmA116q&live=1
                .success(function(response){
                    console.log(response)

                    $scope.bms = response.message[0].bms;

                    var mppt = response.message[0].mppt

                    $scope.mpptvolt = mppt[0].volt + mppt[1].volt + mppt[2].volt + mppt[3].volt;
                    $scope.mppt1 = mppt[0];
                    $scope.mppt2 = mppt[1];
                    $scope.mppt3 = mppt[2];
                    $scope.mppt4 = mppt[3];

                    $scope.gps = response.message[0].gps;

                }).catch(function (err) {
                        alert('Error - ' + err)
                })

          }

          $scope.intervalFunction = function(){
            $timeout(function() {
              $scope.getData();
              $scope.intervalFunction();
            }, 1000)
          };

          // Kick off the interval
          $scope.intervalFunction();

  });

  // set sidebar closed and body solid layout mode
  $rootScope.settings.layout.pageContentWhite = true;
  $rootScope.settings.layout.pageBodySolid = false;
  $rootScope.settings.layout.pageSidebarClosed = false;
});
