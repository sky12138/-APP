//定义一个模块
angular.module('Controlle', ['Service'])

.controller('homeCtrl', ['$scope','$ionicTabsDelegate','$interval','$timeout','$state', '$http','$ionicSlideBoxDelegate','$ionicScrollDelegate', function($scope,$ionicTabsDelegate,$interval,$timeout,$state, $http,$ionicSlideBoxDelegate,$ionicScrollDelegate){
	  $http.get('show.json').success(function (result) {
            $scope.arry=result;
            $ionicSlideBoxDelegate._instances[0].update();
        });
        $http.get('Xmove.json').success(function (img) {
            $scope.Xmove=img;
        });
        $scope.To_buypage=function(){
        	$ionicTabsDelegate.select(1);
        };
        $scope.To_solepage=function(){
        	$ionicTabsDelegate.select(2);
        }
        $scope.getTop=function(){
        	$scope.Top=$ionicScrollDelegate.getScrollPosition()
          if($scope.Top.top<100){
          	angular.element(content_bar)[0].style.backgroundColor="rgba(60,220,100,0)"
          }else if($scope.Top.top>=100&&$scope.Top.top<200){
          		angular.element(content_bar)[0].style.backgroundColor="rgba(60,220,100,0.3)"
          }else if($scope.Top.top>=200&&$scope.Top.top<300){
          		angular.element(content_bar)[0].style.backgroundColor="rgba(60,220,100,0.6)"
          }else if($scope.Top.top>=300&&$scope.Top.top<400){
          		angular.element(content_bar)[0].style.backgroundColor="rgba(60,220,100,1)"
          }
        };
    	$timeout(function () {
            var scroll0 = $ionicScrollDelegate.$getByHandle('scroll0');
            var view = scroll0.getScrollView();
            // 先取得ionic自身的几个事件处理函数
            var touchStart = view.touchStart;
            var mouseDown = view.mouseDown;
            var touchMove = view.touchMove;
            var mouseMove = view.mouseMove;
            // 作用事件的ＤＯＭ元素
            var container = view.__container;
            // 移除原来的事件
            container.removeEventListener('touchstart', touchStart);
            container.removeEventListener('mousedown', mouseDown);
            document.removeEventListener('touchmove', touchMove);
            document.removeEventListener('mousemove', mouseMove);
            // 重新定义事件处理函数
            view.touchStart = function (evt) {
            	if(touchStart){
            		evt.preventDefault = function () { };
                	touchStart.apply(view, [evt]);
            	}
                
            };
            view.mouseDown = function (evt) {
            	if(mouseDown){
            		evt.preventDefault = function () { };
                	mouseDown.apply(view, [evt]);
            	}
                
            };
            view.touchMove = function (evt) {
            	if(touchMove){
            		evt.preventDefault = function () { };
                	touchMove.apply(view, [evt]);
            	}
                
            };
            view.mouseMove = function (evt) {
            	if(mouseMove){
            		evt.preventDefault = function () { };
                	mouseMove.apply(view, [evt]);
            	}
                
            };
            // 重新绑定事件
            container.addEventListener('touchstart', view.touchStart, false);
            container.addEventListener('mousedown', view.mouseDown, false);
            document.addEventListener('touchmove', view.touchMove, false);
            document.addEventListener('mousemove', view.mouseMove, false);

        });  
        $scope.time=4;
     	$scope.timer = $interval(function () {
	        	if ($scope.time == 1) {
	        		angular.element(box_listMove)[0].innerHTML="越野界的蓝领，两三万就能穿越无人区";
	        		$scope.time=5
	        	}else if($scope.time == 2){
	        		angular.element(box_listMove)[0].innerHTML="侃车胡同儿 这奥拓为什么这么猛？"
	        	}else if($scope.time == 3) {
	        		angular.element(box_listMove)[0].innerHTML="情怀碎一地的2500，中国越野界的鼻祖"
	        	}else if($scope.time == 4){
	        		angular.element(box_listMove)[0].innerHTML="精选好车好文，给找车添点乐趣"
	        	}
	        	$scope.time--;
	        }, 3000);
		
	}])

.controller('buyCtrl', ['$scope', '$state', '$http','$ionicSlideBoxDelegate', function($scope, $state, $http,$ionicSlideBoxDelegate){
	 $scope.host="http://localhost:3000";
	 $scope.page=0;
	 $scope.show=true;
	 $scope.show_down=true;
	 $scope.goods_arry=[];
    $scope.getData=function(){
    	$http.get($scope.host+'/api/goods/get_of_page', { params: {pidx:$scope.page} }).success(function (result) {
			$scope.goods_arry = $scope.goods_arry.concat(result.data.lst);
			 //数据加载完隐藏
			 if(result.data.lst.length==0){
	    			$scope.show=false;
			}
			$scope.$broadcast("scroll.infiniteScrollComplete");; // 通知框架数据已加载完毕
			$scope.page++; // 将页码加1，下次再获取数据的时候应该是下一页的数据
		});
    }
    $scope.getData_down=function(){
    	$http.get($scope.host+'/api/goods/get_of_page', { params: {pidx:$scope.page} }).success(function (result) {
			$scope.goods_arry =result.data.lst.concat($scope.goods_arry);
			 //数据加载完隐藏
			 if(result.data.lst.length==0){
	    			$scope.page=0;
				}		
			$scope.$broadcast("scroll.refreshComplete"); // 通知框架数据已加载完毕
			$scope.page++; // 将页码加1，下次再获取数据的时候应该是下一页的数据
		});
    }
}])

.controller('soleCtrl',['$scope', '$state','$http','$ionicSlideBoxDelegate',function($scope, $state,$http,$ionicSlideBoxDelegate){
	$scope.soleUser={
    	number:null
    }
    //手机正则验证匹配13，14，15，18开头的手机号码！
    var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
    $scope.hmshow=false;
	$scope.textNumber=function() {
		if (reg.test($scope.soleUser.number)) {
		    $scope.hmshow=false;
		}else{
		    $scope.hmshow=true;
		};
    }
}])

.controller('personCtrl',['$scope','$rootScope','$state','$http','$ionicSlideBoxDelegate','out',function($scope,$rootScope,$state,$http,$ionicSlideBoxDelegate,out){
	$scope.host="http://localhost:3000";
	$http.get('Xmove.json').success(function (img) {
        $scope.ymove=img;
  });
//out.UserOut() 
//获取用户id
//$scope.user_Id=0;
//if($scope.user_Id=0){
//	angular.element(User_id)[0].innerHTML="立即登录";
//}
   $scope.$on('data_id', function(e,data){
				$rootScope.user_Id=data;
				//判断用户是否登录
			  if($rootScope.user_Id==0){
			  	//未登录
			  	angular.element(User_id)[0].innerHTML="立即登录";
			  	console.log("未登录")
			  }else{
			  	//登录  通过用户id从服务器获取用户信息
			  	$http.get($scope.host+'/api/users/get', {params:{id:$rootScope.user_Id}}).success(function (result) {
				    angular.element(User_id)[0].innerHTML = result.data.name;
				    angular.element(User_id)[0].setAttribute("disabled","disabled");
				    console.log("登录")
					});
			  }
			});
			$scope.$on('out_id', function(e,data){
				console.log(data);
				console.log("接送")
			});	
}])

.controller('goodesCtrl',['$scope','$ionicScrollDelegate','$ionicTabsDelegate','$state','$stateParams','$http',function($scope,$ionicScrollDelegate,$ionicTabsDelegate,$state,$stateParams,$http){
	 $scope.host="http://localhost:3000";
	var id = $stateParams.id;
	$scope.id = id;
	$http.get($scope.host+'/api/goods/get', {
	    params: {
	        id: id
	    }
	}).success(function (result) {
	    $scope.name = result.data.name;
	    $scope.ico = result.data.ico;
	    $scope.content = result.data.content;
	    $scope.price = result.data.price;
	});
	$http.get('Xmove.json').success(function (img) {
	    $scope.cmove=img;
	});
	//头部渐变
	$scope.list_getTop=function(){
		$scope.Top=$ionicScrollDelegate.getScrollPosition()
	  if($scope.Top.top<100){
	  	angular.element(Back_top)[0].style.backgroundColor="rgba(255,255,255,0)";
	  	angular.element(Back_top)[0].style.borderBottom="none"
	  }else if($scope.Top.top>=100&&$scope.Top.top<200){
	  		angular.element(Back_top)[0].style.backgroundColor="rgba(255,255,255,0.3)"
	  }else if($scope.Top.top>=200&&$scope.Top.top<300){
	  		angular.element(Back_top)[0].style.backgroundColor="rgba(255,255,255,0.6)";
	  		angular.element(Back_top)[0].style.borderBottom="1px solid gray"
	  }else if($scope.Top.top>=300&&$scope.Top.top<400){
	  		angular.element(Back_top)[0].style.backgroundColor="rgba(255,255,255,1)"
	  }
	};
	//返回按钮
	$scope.back=function(){
		$state.go("tab2");
	}

}])

.controller('SignInCtrl',['$scope','$rootScope','$ionicTabsDelegate','$ionicPopup','$http',function($scope,$rootScope,$ionicTabsDelegate,$ionicPopup,$http){
	$scope.signin={
		sigin_phone:null
	}
	$scope.I=null;
	$scope.change=function(){
		if($scope.signin.sigin_phone.length==11){
			angular.element(YZM)[0].style.backgroundColor="green";
		  angular.element(YZM)[0].removeAttribute("disabled");
		}else{
			angular.element(YZM)[0].style.backgroundColor="gray";
			angular.element(YZM)[0].innerHTML="获取验证码";
		  angular.element(YZM)[0].setAttribute("disabled","disabled");
		}
	}
	$scope.get_yzm=function(){
		var i='';
		//手机号码验证
		var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
		if (reg.test($scope.signin.sigin_phone)) {
		    angular.element(YZM)[0].innerHTML="获取验证码";
		}else{
		     angular.element(YZM)[0].innerHTML="号码不存在";
		     ngular.element(YZM)[0].style.backgroundColor="gray";
    }
		//验证码
    for(var c=0;c<4;c++){
        var a=parseInt(Math.random()*3);//0-2
        if(a==0){
            i+=parseInt(Math.random()*10);//0-9
        }else if (a==1){
            i+=String.fromCharCode(parseInt(Math.random() * 26 + 65));//0-25  65-90
        }else if (a==2){
            i+=String.fromCharCode(parseInt(Math.random() * 26 + 97));
        }
    };
     $scope.I=i;
     $ionicPopup.alert({
       title: '验证码',
       template: i
     });
	};
	$scope.Q={
		yzm:null
	}
	$scope.userId=null;
	$scope.host="http://localhost:3000";
	$scope.signin=function(){
		console.log($scope.Q.yzm);
		if($scope.Q.yzm==$scope.I){
			console.log("登录成功");
			//登陆成功 用户保存到服务器
			$http.post($scope.host+'/api/users/add',{
				name: $scope.signin.sigin_phone
			}).success(function(result){
				if(result.err==0){//新用户
					//开一个广播，把请求到的数据给传出去
				  //$broadcast(广播的名字，数据)
					$rootScope.$broadcast('data_id',result.id);
				}else{//老用户
					$http.get($scope.host+"/api/users/gets").success(function(rel){
						console.log(rel);
						for(var j=0;j<rel.data.length;j++){
							if(rel.data[j].name==$scope.signin.sigin_phone){
								$rootScope.$broadcast('data_id',rel.data[j].id);
								console.log(rel.data[j].id);
							}
						}
					})
				}
			});
			//跳转到个人中心
			$ionicTabsDelegate.select(3);
		}else{
			$ionicPopup.alert({
       title: '提示',
       template: "验证码有误！"
     });
		}
		
	}
}])

.controller("siginOutCtrl",['$scope','$rootScope','$state','$http','$ionicTabsDelegate',function($scope,$rootScope,$state,$http,$ionicTabsDelegate){
	console.log($rootScope.user_Id);
	if($rootScope.user_Id==0){
		angular.element(sigin_out).css({"display":"none"})
	}else{
		angular.element(sigin_out).css({"display":"block"})
	}
	$scope.user_out=function(){
		console.log("退出")
		angular.element(User_id)[0].innerHTML="立即登录";
		angular.element(User_id)[0].removeAttribute("disabled");
		$rootScope.$broadcast('data_id',0);
		$rootScope.user_Id=0;
//		$state.go('siginOut')
$ionicTabsDelegate.select(3)
	}
}])

