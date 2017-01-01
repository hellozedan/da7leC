(function () {
  appControllers.controller('friendsCtrl', function ($scope, $rootScope, $state, $stateParams, $timeout, $firebaseArray, ConfigurationService, MessagesService, UserService, EntityService, $cordovaContacts, $cordovaSms) {
    $scope.friends = [];
    $scope.contactObject = {};
    if (window.cordova && typeof window.plugins.OneSignal != 'undefined' && !ConfigurationService.Notification_token()) {
      console.log('in 1')
      $timeout(function () {
        console.log('in 2')
        console.log( window.plugins.OneSignal)
        console.log( window.plugins.OneSignal.getIds)
// window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

        var notificationOpenedCallback = function(jsonData) {
          console.log('in 3')
          console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        };
$timeout(function () {
  window.plugins.OneSignal
    .startInit("722ff6c3-d7b7-4a8e-8222-ba130b1eae7b")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
},0);


        // window.plugins.OneSignal.getIds(function (ids) {
        //   console.log('in 3')
        //   UserService.RegisterNotification(ids.userId)
        //     .then(function (userToken) {
        //       console.log('in 4')
        //       ConfigurationService.SetNotification_token(userToken);
        //     }, function (err) {
        //       console.log('in 5')
        //     });
        // },function (err) {
        //   console.log('in 6')
        //   console.err(err)
        // });
      }, 0)
    }
    UserService.GetFriends().then(function (friends) {
        ConfigurationService.getContactObject().then(function (contactObject) {
          $scope.contactObject = contactObject;
        }, function () {

        });
        $scope.friends = friends;
      },
      function (err) {
      }
    )
    $scope.invite = function () {
      $state.go('invite');
    }
    $scope.sendDahle = function (friend) {
      console.log('dahle!');
    }
  });

})();

