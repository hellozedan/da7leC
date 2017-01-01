(function(){
  angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'angularMoment', 'ngCordova', 'firebase','ui.identicon'])

    .run(function($ionicPlatform, $state, ConfigurationService, UserService, EntityService,$timeout) {
      // $ionicPlatform.on('pause', function() {
      //   Firebase.goOffline();
      //
      // });
      // $ionicPlatform.on('resume', function() {
      //   Firebase.goOnline();
      //
      // });
      $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          setTimeout(function() {
            navigator.splashscreen.hide();
          }, 50);
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
        var isNotificationClicked = false;
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


        var user = ConfigurationService.UserDetails();
        if (user) {
          UserService.CheckUser()
            .then(function (user) {

              if(user.isNeedLogin === false){


                // var ref = new Firebase("https://mustknow.firebaseIO.com");
                //
                // ref.authWithCustomToken(user.fireToken, function (error, authData) {
                //
                //   if (error) {
                //     console.log("Login Failed!", error);
                //   } else {
                //     if(!isNotificationClicked)
                ConfigurationService.getContactList().then(function (user) {
                  $state.go("friends");
                },function(){
                  $state.go("friends");
                });

                //   }
                // });
              }
              else{
                $state.go("login");
              }
            }, function (err) {
              $state.go("login");
            });
        }else{
          $state.go("login");
        }

      });
    })
    .factory('focus', function($timeout, $window) {
      return function(id) {
        // timeout makes sure that is invoked after any other event has been triggered.
        // e.g. click events that need to run before the focus or
        // inputs elements that are in a disabled state but are enabled when those events
        // are triggered.
        $timeout(function() {
          var element = $window.document.getElementById(id);
          if(element)
            element.focus();
        });
      };
    })

    .directive('eventFocus', function(focus) {
      return function(scope, elem, attr) {
        elem.on(attr.eventFocus, function() {
          focus(attr.eventFocusId);
        });

        // Removes bound events in the element itself
        // when the scope is destroyed
        scope.$on('$destroy', function() {
          element.off(attr.eventFocus);
        });
      };
    })

    .config(function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('tab', {
          url: '/tab',
          abstract: true,
          templateUrl: 'templates/tabs/html/tabs.html'
        })
        .state('login', {
          url: "/login",
          templateUrl: "templates/login/html/login.html",
          controller: "loginCtrl"

        })
        .state('chat', {
          url: "/chat",
          templateUrl: "templates/chat/html/chat.html",
          controller: "chatCtrl"

        })
        .state('userProfile', {
          url: "/userProfile/:userId/:first_name",
          templateUrl: "templates/profile/html/userProfile.html",
          controller: "userProfileCtrl"
        })
        .state('blockedUsers', {
          url: "/blockedUsers",
          templateUrl: "templates/blockedUsers/html/blockedUsers.html",
          controller: "blockedUsersCtrl"
        })

        // Each tab has its own nav history stack:

        .state('tab.subjects', {
          url: '/subjects',
          views: {
            'tab-subjects': {
              templateUrl: 'templates/match/html/subjects.html',
              controller: 'subjectsCtrl'
            }
          }
        })
        .state('tab.match', {
          url: "/match",
          views: {
            'tab-match': {
              templateUrl: "templates/match/html/match.html",
              controller: 'matchCtrl'
            }
          }
        })

        .state('tab.messages', {
          url: '/messages',
          views: {
            'tab-messages': {
              templateUrl: 'templates/messages/html/messages.html',
              controller: 'messagesCtrl'
            }
          }
        })
        .state('friends', {
          url: "/friends",
          templateUrl: "templates/friends/html/friends.html",
          controller: "friendsCtrl"

        })
        .state('invite', {
          url: "/invite",
          templateUrl: "templates/invite/html/invite.html",
          controller: "inviteCtrl"

        })
        // .state('tab.friends', {
        //   url: '/friends',
        //   views: {
        //     'tab-friends': {
        //       templateUrl: 'templates/friends/html/friends.html',
        //       controller: 'friendsCtrl'
        //     }
        //   }
        // })


        .state('tab.myProfile', {
          url: '/myProfile',
          views: {
            'tab-myProfile': {
              templateUrl: 'templates/profile/html/myProfile.html',
              controller: 'myProfileCtrl'
            }
          }
        });

      // if none of the above states are matched, use this as the fallback


    });
})();

