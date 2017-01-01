(function () {
  appControllers.controller('friendsCtrl', function ($scope, $rootScope, $state, $stateParams, $timeout, $firebaseArray, ConfigurationService, MessagesService, UserService, EntityService, $ionicPlatform, $cordovaContacts, $cordovaSms,toastr) {
    $scope.friends = [];
    $scope.contactObject = {};
    $scope.pop = function(){
      toastr.success('Hello world!', 'Toastr fun!');
    };
    // $ionicPlatform.ready(function() {
    //   // Enable to debug issues.
    //   // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
    //
    //
    //   // Sync hashed email if you have a login system or collect it.
    //   //   Will be used to reach the user at the most optimal time of day.
    //   // window.plugins.OneSignal.syncHashedEmail(userEmail);
    // })
    if (window.cordova && typeof window.plugins.OneSignal != 'undefined' && !ConfigurationService.Notification_token()) {
      $timeout(function () {
        window.plugins.OneSignal.getIds(function (ids) {
          UserService.RegisterNotification(ids.userId)
            .then(function (userToken) {
              ConfigurationService.SetNotification_token(userToken);
            }, function (err) {
            });
        });
      }, 10);
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
      UserService.Invite({
        users: [{
          phone_number: friend.phone_number,
          nickname: friend.nickname
        }]
      }).then(function () {
        $scope.pop();
        UserService.GetFriends().then(function (friends) {
            $scope.friends = friends;
          },
          function (err) {
          }
        )
      }, function (err) {
      })
    }
  });

})();

