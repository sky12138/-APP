var app=angular.module('MyApp', ['ionic','Controlle','Service'])
	app.controller("Mycontroller",function($scope,$timeout,$ionicScrollDelegate){
		
	});
	
	app.run(function ($rootScope, $state, $ionicTabsDelegate) {
        $rootScope.$on('$ionicView.beforeEnter', function () {
          if ($state.current.name === 'goodes'||$state.current.name === 'SignIn'||$state.current.name === 'siginOut') {
              $ionicTabsDelegate.showBar(false);
          	} else {
              	$ionicTabsDelegate.showBar(true);
    		}
			//$ionicTabsDelegate.showBar($state.current.name != 'detail');
        });
        $rootScope.user_Id=0;
	});		
	
	app.config(function ($ionicConfigProvider,$stateProvider) {
	   //配置安卓表格头部置底
	  $ionicConfigProvider.tabs.position('bottom');
       //配置路由
    	$stateProvider.state('tab1', {
            url: '/tab1',
            views:{
                view1: {
                    templateUrl: "templates/tab_idx.html",
                    controller: "homeCtrl"
           		}
            }
    	}).state('tab2', {
	        url: '/tab2',
	        views:{
	            view2: {
	                templateUrl: "templates/buy_car.html",
	                controller: "buyCtrl"
	            }
	        }
  		}).state('tab3', {
	        url: '/tab3',
	        views:{
	            view3: {
	                templateUrl: "templates/sole_car.html",
	                controller: "soleCtrl"
	            }
	        }
	    }).state('tab4',{
	    	url: '/tab4',
//	    	cache:false,
	    	views:{
	            view4: {
	                templateUrl: "templates/person.html",
	                controller: "personCtrl"
	            }
	        }
	    }).state('goodes', {
            url: '/gooodes/:id',
            views: {
                view2: {
                    templateUrl: 'templates/list.html',
                    controller: "goodesCtrl"
                }
            }
        }).state('SignIn',{
        	url:'/SignIn',
        	views:{
        		 view4: {
                    templateUrl: 'templates/signIn.html',
                    controller: "SignInCtrl"
                }
        	}
        }).state('siginOut',{
        	url:'/siginOut',
        	views:{
        		 view4: {
                    templateUrl: 'templates/siginOut.html',
                    controller: "siginOutCtrl"
                }
        	}
        })
    	
   	})