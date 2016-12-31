(function () {
  appControllers.controller('friendsCtrl', function ($scope, $rootScope, $state, $stateParams, $timeout, $firebaseArray, ConfigurationService, MessagesService, UserService, EntityService, $cordovaContacts, $cordovaSms) {
    $scope.friends = [];
    UserService.GetFriends().then(function (friends) {
        $scope.friends = friends;
      },
      function (err) {
      }
    )
  });
})();

