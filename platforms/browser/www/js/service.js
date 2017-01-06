angular.module('Service', [])

.service('out', ['$http',function($http){
		return{
			UserOut:function(){
				
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
			
			
			}
		}
}])