(function () {
  appControllers.controller('inviteCtrl', function ($scope, $rootScope, $state, $stateParams, $timeout, $firebaseArray, ConfigurationService, MessagesService, UserService, EntityService, $cordovaContacts, $cordovaSms) {
    ConfigurationService.getContactList().then(function (contacts) {
      $scope.contacts = contacts;

    }, function (err) {

    })

var contactsObject={}
    $scope.selectContact=function (contact) {
      if(contactsObject[contact.phoneNumber])
      {
        delete contactsObject[contact.phoneNumber];
      }
      else {
        contactsObject[contact.phoneNumber]=contact;
      }
    }
    $scope.sms = {};

    var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: 'INTENT'  // send SMS with the default SMS app
        //intent: ''        // send SMS without open any other app
      }
    }
    $scope.sendSms = function ( ) {


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

    $scope.selectThisPerson = function (contact) {
      contact.isSelected=!(contact.isSelected);
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
      }
    }
    $scope.sendBtn = function () {

      var numbersArray=[]
      var usersArray=[]
      for (var property in contactsObject) {

          numbersArray.push(property);
          usersArray.push({phone_number:contactsObject[property].phoneNumber,nickname:contactsObject[property].name})

          // do stuff
      }
      UserService.Invite({users:usersArray}).then(function () {
        $scope.sms.number = numbersArray;
        $scope.sms.message = "da7le !!";
        if(window.cordova)
        {
          $scope.sendSms();
        }
        $state.go("friends");
      }, function (err) {
      })

    }
  });
})();

