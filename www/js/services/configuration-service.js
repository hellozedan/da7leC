(function () {
  appServices.factory('ConfigurationService', function ($ionicPopup, $q, $cordovaContacts) {
    var contactsList = {data: ''};
    var contactObject = {data: ''};
    return {
      ServerUrl: function () {
        return "https://da7le.herokuapp.com";
        // return "http://localhost:3000";
        // return "http://192.168.1.21:3000";
      },
      FireBaseUrl: function () {
        return "https://mustknow.firebaseIO.com";
      },
      UserDetails: function () {
        if (!this.userDetails) {
          if (window.localStorage['user']) {
            this.userDetails = angular.fromJson(window.localStorage['user']);
          }
        }
        return this.userDetails;
      },
      RefreshUserDetails: function () {
        if (window.localStorage['user']) {
          this.userDetails = angular.fromJson(window.localStorage['user']);
        }
        return this.userDetails;
      },

      Notification_token: function () {
        if (!this.notification_token) {
          if (window.localStorage['notification_token']) {
            this.notification_token = window.localStorage['notification_token']
          }
        }
        return this.notification_token;
      },
      MyFilter: function () {
        if (!this.myFilter) {
          if (window.localStorage['myFilter']) {
            this.myFilter = angular.fromJson(window.localStorage['myFilter'])
          }
        }
        var temp = {};
        angular.copy(this.myFilter, temp);
        return temp;
      },
      SetMyFilter: function (myFilter) {
        if (myFilter) {
          window.localStorage['myFilter'] = angular.toJson(myFilter);
          this.myFilter = myFilter;
        }
      },
      SetNotification_token: function (notification_token) {
        if (notification_token) {
          window.localStorage['notification_token'] = angular.toJson(notification_token);
          this.notification_token = notification_token;
        }
      },
      showAlert: function () {
        var alertPopup = $ionicPopup.alert({
          title: 'info',
          template: 'wiat for the other user to answer you'
        });
        alertPopup.then(function (res) {
          console.log('Thank you for not eating my delicious ice cream cone');
        });
      },
      LogOut: function () {
        delete this.notification_token;
        delete this.myFilter;
        delete this.userDetails;
      }
      ,
      getContacts: function () {
        var deferred = $q.defer();
        if (!window.cordova) {
          var contacts = [{ phoneNumbers:[{value:"0528865996"}],displayName:'love'}
            ,{ phoneNumbers:[{value:"052886www5996"}],displayName:'www'},{ phoneNumbers:[{value:"0544282120"}],displayName:'hhhhh'}];
          contactsList.data= [];
          contactObject.data={};
          contacts.forEach(function (element) {
            if (element.displayName && element.displayName !== "" && element.phoneNumbers && element.phoneNumbers.length > 0) {
              contactsList.data.push({phoneNumber: element.phoneNumbers[0].value, name: element.displayName})
              contactObject.data[element.phoneNumbers[0].value] = {
                phoneNumber: element.phoneNumbers[0].value,
                name: element.displayName
              };
            }
          });
          deferred.resolve();
        }
        else {
          $cordovaContacts.find({}).then(function (allContacts) { //omitting parameter to .find() causes all contacts to be returned
            console.log(allContacts.length)
            console.log(angular.toJson(allContacts[0]), angular.toJson(allContacts[1]))
            contactsList.data= [];
            contactObject.data={};
            allContacts.forEach(function (element) {
              if (element.displayName && element.displayName !== "" && element.phoneNumbers && element.phoneNumbers.length > 0) {
                contactsList.data.push({phoneNumber: element.phoneNumbers[0].value, name: element.displayName})
                contactObject.data[element.phoneNumbers[0].value] = {
                  phoneNumber: element.phoneNumbers[0].value,
                  name: element.displayName
                };
              }
            });
            deferred.resolve();
            // $scope.contacts = allContacts;
          });
        }
        return deferred.promise;
      },

      getContactList: function () {
        var deferred = $q.defer();
        if (contactsList.data !== '') {
          deferred.resolve(contactsList.data);
        }
        else {
          this.getContacts().then(function (data) {
            deferred.resolve(contactsList.data);
          }, function (err) {
            deferred.reject('err')
          })
        }
        return deferred.promise;
      } ,
      getContactObject: function () {
        var deferred = $q.defer();
        if (contactsList.data !== '') {
          deferred.resolve(contactObject.data);
        }
        else {
          this.getContacts().then(function (contactList) {
            deferred.resolve(contactObject.data);
          }, function (err) {
            deferred.reject('err')
          })
        }
        return deferred.promise;
      }
    }
  });
})();
