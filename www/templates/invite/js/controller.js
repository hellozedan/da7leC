(function () {
  appControllers.controller('friendsCtrl', function ($scope, $rootScope, $state, $stateParams, $timeout, $firebaseArray, ConfigurationService, MessagesService, UserService, EntityService, $cordovaContacts, $cordovaSms) {
    $scope.friendList = [{phoneNumber: '0544282120'}, {phoneNumber: '0544282120'}, {phoneNumber: '0544282120'}, {phoneNumber: '0544282120'}];
    $scope.getAllContacts = function () {
      console.log('getAllContacts')
      $cordovaContacts.find({}).then(function (allContacts) { //omitting parameter to .find() causes all contacts to be returned
        console.log(allContacts.length)
        console.log(angular.toJson(allContacts[0]),angular.toJson(allContacts[1]))
        $scope.contacts=[]
        allContacts.forEach(function(element) {
         if(element.displayName&&element.displayName!==""&&element.phoneNumbers&&element.phoneNumbers.length>0)
         {
           $scope.contacts.push({phoneNumber:element.phoneNumbers[0].value,name:element.displayName})
         }
        });

        // $scope.contacts = allContacts;
      });

    };
    if (window.cordova) {
      $scope.getAllContacts();
    }
    $scope.sms = {};

    var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: 'INTENT'  // send SMS with the default SMS app
        //intent: ''        // send SMS without open any other app
      }
    }
    $scope.sendSms = function () {
      $scope.sms.number = [0528865996,0545482551];
      $scope.sms.message = "da7le !!";

      $cordovaSms
        .send($scope.sms.number, $scope.sms.message, options)
        .then(function () {
          // Success! SMS was sent
          console.log('Success');
        }, function (error) {
          // An error occurred
          console.log(error);
        });//then
    }
    $scope.selectPerson = function () {
      if (window.cordova) {
        $cordovaContacts.pickContact().then(function (contact) {
          $scope.selectedPerson = contact;

        });
      } else {
        // if (person == 'mainPerson') {
        var contact = {
          displayName: "obaida abo elhija",
          name: {
            familyName: "abo elhija",
            givenName: "obaida"
          },
          phoneNumbers: [
            {
              id: "1234",
              value: "052-886-9555"
            }
          ]
        };
        $scope.selectedPerson = contact;

        // } else {
        //   var contact = {
        //     displayName: "ahmed zedany",
        //     name: {
        //       familyName: "abo zedany",
        //       givenName: "ahmed"
        //     },
        //     phoneNumbers: [
        //       {
        //         id: "1234",
        //         value: "052-111-1111"
        //       }
        //     ]
        //   }
        // }
        //if (!$scope.$$phase) $scope.$apply()
      }

    }
    // $scope.$on('sendMessagesEvent', function(event, mass) {
    //   $scope.messages = MessagesService.getMessages();
    //   if(!$scope.$$phase) {
    //     $scope.$apply();
    //   }
    // });
    // MessagesService.setMessages();
    // $scope.goToChat = function (message) {
    //   var messageDetails = {
    //     conversationId: message.conversationId,
    //     fbPhotoUrl: message.fbPhotoUrl,
    //     userName: message.userName,
    //     subjectName: message.subjectName,
    //     desc:message.desc
    //   }
    //   EntityService.setMessageDetails(messageDetails);
    //   $state.go('chat', {conversationId: message.conversationId})
    // }
    //
    // $scope.goToUserProfile = function (message) {
    //   UserService.SetUserProfile(message);
    //   $state.go('userProfile')
    //
    // }
  });
})();

