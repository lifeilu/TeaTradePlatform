/**
 * Created by kubenetes on 2016/10/24.
 */
angular.module('tea.controllers', ['selectAddress', 'ionic.closePopup', 'tea.services', 'ngCordova', 'countUpModule'])

.filter("onSale", function(){
	return function(input, state){
		if(input == undefined){
			return;
		}
		var result = [];
		var array = Array.prototype.slice.call(input);
		for(var i = 0; i < array.length; i++){
			if(array[i].state == state){
				result.push(array[i]);
			}
		}
		return result;
	}
})

.filter("level", function(){
	return function(input){
		if(input == undefined){
			return;
		}
		if(input == 1){
			return "一般";
		}
		else if(input == 2){
			return "中等";
		}
		else if(input == 3){
			return "上等";
		}
		else
			return "未知等级";
	}
})

.filter("productImageUrl", function(baseUrl, port){
	return function(input){
		if(input == undefined){
			return;
		}
		return baseUrl + port + '/api/image/getByUrl?url=' + input;
	}
})

.filter("maxLength", function(){
	return function(input, length){
		if(input == undefined){
			return;
		}
		var temp = input;
		var result = '';
		if(temp.length > length){
			result = temp.substr(0, length);
			result += '...';
		}
		else {
			result = temp;
		}
		return result;
	}
})

.filter("myDate", function(){
	return function (input){
		if(input == undefined){
			return;
		}
		return input.replace(/(\d{4})-(\d{2})-(\d{2})/, "$1年$2月$3日");
	}
})

.filter("orderState", function(){
	return function(input){
		if(input == undefined){
			return;
		}
		if(input.state == 3){
			return "已取消";
		}
		if(input.state == 0){
			return "未付款";
		}
		if(input.crowdFunding != undefined) {
			if (input.state == 1 && input.crowdFunding.type == 1 && input.refund_state == 2) {
				return "等待收取尾款";
			}
			if (input.state == 1 && input.crowdFunding.type == 1 && input.refund_state == 1 && input.isSend == 0) {
				return "未发货";
			}
			if (input.state == 1 && input.crowdFunding.type == 1 && input.refund_state == 0) {
				return "未付款";
			}
		}
		if(input.isSend == 0){
			return "未发货";
		}
		else if(input.isConfirm == 0){
			return "等待收货";
		}
		else if(input.isConfirm == 1){
			return "交易成功";
		}
		return "未知状态";
	}
})

.filter("ZCType", function() {
	return function (input) {
		if(input == undefined){
			return;
		}
		if (input == 0) {
			return "现货众筹";
		}
		else if(input == 1){
			return "预售众筹";
		}
		return "未知模式";
	}
})

.filter("restDay", function(){
	return function(input){
		if(input == undefined){
			return;
		}
		var pattern = /(\d{4})-(\d{2})-(\d{2})/;
		var result = pattern.exec(input);
		var dealDate = new Date(result[1],result[2]-1,result[3]);
		//console.log(result);
		//console.log(dealDate);
		var now = new Date();
		var diff = dealDate.getTime() - now.getTime();
		if(diff < 0){
			return 0;
		}
		return Math.ceil(diff/(24*3600*1000));
	}
})

.filter("parseDate", function(){
	return function(input){
		if(input == undefined){
			return;
		}
		var result = (/(\d{4})-(\d{2})-(\d{2})/).exec(input);
		return new Date(result[1], result[2]-1, result[3]);
	}
})

.filter('ZBSearch', function(){

	function getParticipate(input, flag){
		var result = [];
		var result1 = [];
		for(var i = 0; i < input.length; i++){
			if(input[i].order != undefined && input[i].order.state != 3){
				result.push(input[i]);
			}
			else{
				result1.push(input[i]);
			}
		}
		if(flag == true){
			return result;
		}
		else{
			return result1;
		}
	}

	function getLevel(input, level){
		if(level == -1){
			return input;
		}
		else{
			var result = [];
			for(var i = 0; i < input.length; i++){
				if(input[i].product.level == level){
					result.push(input[i]);
				}
			}
			return result;
		}
	}

	function getState(input, state){
		if(state == -1){
			return input;
		}
		else{
			var result = [];
			for(var i = 0; i < input.length; i++){
				if(input[i].state == state){
					result.push(input[i]);
				}
			}
			return result;
		}
	}

	function getType(input, type){
		if(type == -1){
			return input;
		}
		else{
			var result = [];
			for(var i = 0; i < input.length; i++){
				if(input[i].product.productType.id == type){
					result.push(input[i]);
				}
			}
			return result;
		}
	}

	function getSend(input, send){
		if(send == -1){
			return input;
		}
		else{
			var result = [];
			for(var i = 0; i < input.length; i++){
				if((input[i].order.isSend + input[i].order.isConfirm) == send){
					result.push(input[i]);
				}
			}
			return result;
		}
	}

	return function(input, object){
		if(input == undefined){
			return;
		}
		var temp1 = getParticipate(input, object.participate);
		var temp2 = getLevel(temp1, object.level);
		var temp3 = getState(temp2, object.state);
		var temp4 = getType(temp3, object.type);
		var temp5 = getSend(temp4, object.send);
		var result = temp5;
		return result;
	}
})

.filter('orderSearch', function(){

	function getLevel(input, level){
		if(level == -1){
			return input;
		}
		else{
			var result = [];
			for(var i = 0; i < input.length; i++){
				for(var j = 0; j < input[i].orderItems.length; j++){
					if(input[i].orderItems[j].product.level == level){
						result.push(input[i]);
						break;
					}
				}
			}
			return result;
		}
	}

	function getState(input, state){
		if(state == -1){
			return input;
		}
		if(state == 3){
			var result1 = [];
			for(var i = 0; i < input.length; i++){
				if(input[i].orderEn.state == 3){
					result1.push(input[i]);
				}
			}
			return result1;

		}
		if(state == 4){
			var result1 = [];
			for(var i = 0; i < input.length; i++){
				if(input[i].orderEn.state == 0){
					result1.push(input[i]);
				}
			}
			return result1;
		}
		var result = [];
		for(var i = 0; i < input.length; i++){
			if((input[i].orderEn.isSend + input[i].orderEn.isConfirm) == state && (input[i].orderEn.state == 1 || input[i].orderEn.state == 2)){
				result.push(input[i]);
			}
		}
		return result;
	}

	function getType(input, type){
		if(type == -1){
			return input;
		}
		else{
			var result = [];
			for(var i = 0; i < input.length; i++){
				for(var j = 0; j < input[i].orderItems.length; j++){
					if(input[i].orderItems[j].product.productType.id == type){
						result.push(input[i]);
						break;
					}
				}
			}
			return result;
		}
	}

	function getProduct(input, product){
		if(product == -1){
			return input;
		}
		else{
			var result = [];
			for(var i = 0; i < input.length; i++){
				for(var j = 0; j < input[i].orderItems.length; j++){
					if(input[i].orderItems[j].product.id == product){
						result.push(input[i]);
						break;
					}
				}
			}
			return result;
		}
	}

	return function(input, object){
		if(input == undefined){
			return;
		}
		var temp1 = getLevel(input, object.level);
		var temp2 = getState(temp1, object.state);
		var temp3 = getType(temp2, object.type);
		var temp4 = getProduct(temp3, parseInt(object.product));
		var result = temp4;
		return result;
	}
})

.filter('ZCSearch', function(){

	function getZCType(input, ZCType){
		if(ZCType == -1){
			return input;
		}
		else {
			var result = [];
			for (var i = 0; i < input.length; i++) {
				if (input[i].type == ZCType) {
					result.push(input[i]);
				}
			}
			return result;
		}
	}

	function getLevel(input, level){
		if(level == -1){
			return input;
		}
		else{
			var result = [];
			for(var i = 0; i < input.length; i++){
				if(input[i].product.level == level){
					result.push(input[i]);
				}
			}
			return result;
		}
	}

	function getState(input, state){
		if(state == -1){
			return input;
		}
		else{
			var result = [];
			var temp;
			for(var i = 0; i < input.length; i++){
				temp = input[i].state > 3 ? 3 : input[i].state;
				if(temp == state){
					result.push(input[i]);
				}
			}
			return result;
		}
	}

	function getType(input, type){
		if(type == -1){
			return input;
		}
		else{
			var result = [];
			for(var i = 0; i < input.length; i++){
				if(input[i].product.productType.id == type){
					result.push(input[i]);
				}
			}
			return result;
		}
	}

	return function(input, object){
		if(input == undefined){
			return;
		}
		var temp1 = getZCType(input, object.ZCType);
		var temp2 = getLevel(temp1, object.level);
		var temp3 = getState(temp2, object.state);
		var temp4 = getType(temp3, object.type);
		var result = temp4;
		return result;
	}

})

.directive('scrollToTop', function($ionicScrollDelegate){
	return{
		restrict: 'A',
		link: function(scope, element, attr){
			element.bind('dblclick', function(){
				console.log('my first directive');
				$ionicScrollDelegate.scrollTop(true);
			});
		}
	}
})

.directive('liquidAngular', function($timeout){
	return{
		restrict: 'A',
		scope:{
			liquidValue: '='
		},
		link: function(scope, element, attr){
			var config = liquidFillGaugeDefaultSettings();
			config.circleColor = "rgba(44, 162, 191, 0.9)";
			config.textColor = "rgba(44, 162, 191, 0.9)";
			config.waveColor = "rgba(44, 162, 191, 0.9)";
			config.textVertPosition = 0.6;
			config.waveAnimateTime = 2000;
			config.waveHeight = 0.1;
			config.waveCount = 1.5;
			$timeout(function(){
				loadLiquidFillGauge(attr.id, scope.liquidValue, config);
			});
		}
	}

})

.controller('loginCtrl', function($scope, $state, $ionicHistory, $ionicViewSwitcher, UserService, $timeout){
	$scope.loginInfo = {};
	$scope.loginError = {};
	$scope.loginError.flag = false;
	$ionicHistory.clearCache();
	var clearLoginError = function(ss){
		$scope.loginError.flag = false;
		$scope.loginError.info = "";
	};
	//$state.go("tabs.product");
	$scope.login = function(){
		if($scope.loginInfo.tel == '' || $scope.loginInfo.tel == undefined
			|| $scope.loginInfo.password == '' || $scope.loginInfo.password == undefined){
			$scope.loginError.flag = true;
			$scope.loginError.info = "用户名或密码未填写";
			$timeout(clearLoginError, 1200);
			return;
		}
		UserService.login($scope.loginInfo)
			.success(function(data){
				if(data.code == 500){
					$scope.loginError.flag = true;
					$scope.loginError.info = data.data;
					$timeout(clearLoginError,1200);
				}
				else if(data.code == 200){
					//console.log(data);
					UserService.setCurrentUser(data.data);
					$ionicHistory.nextViewOptions({
						disableBack: true
					})
					$ionicViewSwitcher.nextTransition("swap");
					$ionicHistory.clearCache().then(function(){
						$state.go("tabs.product");
					})
				}
			})
			.error(function(){
				$scope.loginError.flag = true;
				$scope.loginError.info = "网络错误";
				$timeout(clearLoginError, 1200);
			})
	}

})

.controller('registerCtrl', function($scope, $cordovaCamera, $cordovaToast, $cordovaFileTransfer, $cordovaActionSheet, UserService, $state){
	$scope.passwordVisible = 0;
	$scope.portrait = "img/portrait.png";
	$scope.registerInfo = {};
	$scope.registerInfo.level = 1;
	$scope.registerError = {
		'flag' : false,
		'info' : ''
	};

	//上传头像
	$scope.pickPortrait = function(){
		var actionSheetOptions = {
			title: '上传头像',
			buttonLabels: ['相机', '从图库选择'],
			addCancelButtonWithLabel: '取消',
			androidEnableCancelButton: true
		};
		$cordovaActionSheet.show(actionSheetOptions).then(function (btnIndex) {
			var imageSource;
			if(btnIndex == 1){
				imageSource = Camera.PictureSourceType.CAMERA;
			}
			else if(btnIndex == 2){
				imageSource = Camera.PictureSourceType.PHOTOLIBRARY;
			}
			else{
				return;
			}
			var cameraOptions = {
				//这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
				quality: 80,                                            //相片质量0-100
				destinationType: Camera.DestinationType.DATA_URL,        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
				sourceType: imageSource,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
				allowEdit: true,                                        //在选择之前允许修改截图
				encodingType:Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
				targetWidth: 200,                                        //照片宽度
				targetHeight: 200,                                       //照片高度
				mediaType:0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
				cameraDirection:0                                      //枪后摄像头类型：Back= 0,Front-facing = 1
			};

			$cordovaCamera.getPicture(cameraOptions).then(function(imageData) {
				$scope.portrait = "data:image/jpeg;base64," + imageData;
				//console.log(imageURI);
			}, function(err) {
				// error

			});
		});
	}

	//上传营业执照
	$scope.pickCertificate = function(){
		var actionSheetOptions = {
			title: '上传营业执照',
			buttonLabels: ['相机', '从图库选择'],
			addCancelButtonWithLabel: '取消',
			androidEnableCancelButton: true
		};
		$cordovaActionSheet.show(actionSheetOptions).then(function (btnIndex) {
			var imageSource;
			if(btnIndex == 1){
				imageSource = Camera.PictureSourceType.CAMERA;
			}
			else if(btnIndex == 2){
				imageSource = Camera.PictureSourceType.PHOTOLIBRARY;
			}
			else{
				return;
			}
			var cameraOptions = {
				//这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
				quality: 70,                                            //相片质量0-100
				destinationType: Camera.DestinationType.FILE_URI,        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
				sourceType: imageSource,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
				allowEdit: false,                                        //在选择之前允许修改截图
				encodingType:Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
				mediaType:0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
				cameraDirection:0                                      //枪后摄像头类型：Back= 0,Front-facing = 1
			};
			$cordovaCamera.getPicture(cameraOptions).then(function(imageURI) {
				$scope.certificateURI = imageURI;
				//console.log(imageURI);
				//var data={};
				//$cordovaFile.readAsText(imageURI)
				//	.then(function (success) {
				//		// success
				//		console.log(success);
				//		$http({
				//			method:'POST',
				//			url: "http://202.120.40.175:17000/api/image/licence/upload?teaSalerId=2",
				//			data: data
				//		}).success(function(data){
				//			console.log(data);
				//		})
				//	}, function (error) {
				//		console.log(error);
				//		// error
				//	});
			}, function(err) {
				// error

			});
		});
	}

	//注册
	$scope.register = function(){
		if($scope.registerInfo.name == '' || $scope.registerInfo.name == undefined){
			$scope.registerError.flag = true;
			$scope.registerError.info = "请填写姓名";
			return;
		}
		else if($scope.registerInfo.nickname == '' || $scope.registerInfo.nickname == undefined){
			$scope.registerError.flag = true;
			$scope.registerError.info = "请填写昵称";
			return;
		}
		else if($scope.registerInfo.tel == '' || $scope.registerInfo.tel == undefined
			|| (/^[0-9]{11}$/).test($scope.registerInfo.tel) == false){
			$scope.registerError.flag = true;
			$scope.registerError.info = "请正确填写11位手机号";
			return;
		}
		else if($scope.registerInfo.password == '' || $scope.registerInfo.password == undefined){
			$scope.registerError.flag = true;
			$scope.registerError.info = "请填写密码";
			return;
		}
		else if($scope.registerInfo.idCard == '' || $scope.registerInfo.idCard == undefined
			|| (/^[0-9]{17}(X|\d|x)$/).test($scope.registerInfo.idCard) == false){
			$scope.registerError.flag = true;
			$scope.registerError.info = "请正确填写18位身份证号";
			return;
		}
		else if($scope.registerInfo.address == '' || $scope.registerInfo.address == undefined){
			$scope.registerError.flag = true;
			$scope.registerError.info = "请填写地址";
			return;
		}
		else if($scope.registerInfo.zip == '' || $scope.registerInfo.zip == undefined
			|| (/^[0-9]{6}$/).test($scope.registerInfo.zip) == false){
			$scope.registerError.flag = true;
			$scope.registerError.info = "请正确填写邮编";
			return;
		}
		else if($scope.registerInfo.level == 1 && ($scope.certificateURI == undefined || $scope.certificateURI == '')){
			$scope.registerError.flag = true;
			$scope.registerError.info = "请上传营业执照";
			return;
		}
		UserService.register($scope.registerInfo)
			.success(function(data){
				if(data.code == 200){
					if($scope.registerInfo.level == 1) {
						UserService.uploadLicense(data.data.id, $scope.certificateURI)
							.then(function (result) {
								// Success!
								$cordovaToast.showShortBottom("注册成功");
								$state.go('login');
							}, function (err) {
								// Error
							}, function (progress) {
								// constant progress updates
							});
					}
					else{
						$cordovaToast.showShortBottom("注册成功");
						$state.go('login');
					}
				}
				else if(data.code == 500){
					$scope.registerError.flag = true;
					$scope.registerError.info = data.data;
				}
			})
			.error(function(){
				$scope.registerError.flag = true;
				$scope.registerError.info = "网络错误,重新注册";
			})
	}

})

.controller('tabsProductCtrl', function($scope, $rootScope, $ionicScrollDelegate, $ionicHistory, UserService, ProductService, $cordovaToast, $timeout){
	$scope.scroll = function(){
		$ionicScrollDelegate.scrollTop(true);
	}
	$scope.state = 0;

	$scope.currentUser = UserService.getCurrentUser();
	var getAllProduct = function (){
		ProductService.getProductByTeaSalerId(UserService.currentUser.id, -1)
			.success(function(data){
				if(data.code == 200){
					$scope.products = data.data;
					ProductService.setCurrentProducts(angular.copy(data.data));
					//angular.forEach($scope.products, function(ele){
					//	ele.url = baseUrl + port + '/api/image/getByUrl?url=' + ele.url
					//});
				}
			})
			.error(function(){
				$cordovaToast.showShortBottom('网络错误,获取产品失败');
			});
	};

	getAllProduct();

	$rootScope.$on('refreshProducts', function(event, data){
		getAllProduct();
	})

	$scope.startSell = function(product){
		ProductService.startSell(product.id)
			.success(function(data){
				if(data.code == 200){
					getAllProduct();
				}
				else{
					$cordovaToast.showShortBottom('产品上架失败');
				}
			})
			.error(function(){
				$cordovaToast.showShortBottom('网络错误,产品上架失败');
			})
	};

	$scope.refreshProductList = function(){
		ProductService.getProductByTeaSalerId(UserService.currentUser.id, -1)
			.success(function(data){
				if(data.code == 200){
					$scope.products = data.data;
					ProductService.setCurrentProducts(angular.copy(data.data));
					$timeout($scope.$broadcast('scroll.refreshComplete'), 800);
					//angular.forEach($scope.products, function(ele){
					//	ele.url = baseUrl + port + '/api/image/getByUrl?url=' + ele.url
					//});
				}
			})
			.error(function(){
				$cordovaToast.showShortBottom('网络错误,获取产品失败');
			});
	};

	$scope.deleteProduct = function(product){
		ProductService.deleteProduct(product.id)
			.success(function(data){
				if(data.code == 200){
					var index = $scope.products.indexOf(product);
					console.log("delete product" + index);
					$scope.products.splice(index, 1); //刷新产品
					$cordovaToast.showShortBottom('产品删除成功');

				}
			})
	};

	$scope.downProduct = function(product){
		ProductService.downProduct(product.id)
			.success(function(data){
				if(data.code == 200){
					product.state = 0; //刷新产品
					$cordovaToast.showShortBottom('产品下架成功');
				}
				else{
					$cordovaToast.showShortBottom('产品下架失败');
				}
			})
			.error(function(error){
				$cordovaToast.showShortBottom('网络错误, 产品下架失败');
			})
	}

})

.controller('addProductCtrl', function($scope, $rootScope, ProductService, UserService, $state, $cordovaToast, $timeout){
	$scope.newProductInfo = {};
	$scope.newProductInfo.unit = "两";
	$scope.newProductInfo.isFree = 0;
	$scope.newProductInfo.level = '1';
	$scope.newProductType = {};
	$scope.errorAddProduct = {
		flag: false,
		info: ''
	};
	function clearError(){
		$scope.errorAddProduct = {
			flag: false,
			info: ''
		};
	}
	$scope.currentUser = UserService.currentUser;
	ProductService.getProductType()
		.success(function(data){
			if(data.code == 500){

			}
			else if(data.code == 200){
				$scope.productTypes = data.data;
				if($scope.productTypes.length > 0){
					$scope.newProductType.type = $scope.productTypes[0];
				}
			}
		})
		.error(function(){

		});
	$scope.addNewProduct = function(){
		if($scope.newProductInfo.name == undefined || $scope.newProductInfo.name == ''){
			$scope.errorAddProduct.flag = true;
			$scope.errorAddProduct.info = '请正确填写产品名';
			return;
		}
		if($scope.newProductInfo.remark == undefined || $scope.newProductInfo.remark == ''){
			$scope.errorAddProduct.flag = true;
			$scope.errorAddProduct.info = '请正确填写产品描述';
			return;
		}
		if($scope.newProductInfo.locality == undefined || $scope.newProductInfo.locality == ''){
			$scope.errorAddProduct.flag = true;
			$scope.errorAddProduct.info = '请正确填写地址';
			return;
		}
		if($scope.newProductInfo.stock == undefined || $scope.newProductInfo.stock == '' || isNaN(parseInt($scope.newProductInfo.stock)) || $scope.newProductInfo.stock <= 0 || parseInt($scope.newProductInfo.stock) != $scope.newProductInfo.stock){
			$scope.errorAddProduct.flag = true;
			$scope.errorAddProduct.info = '请正确填写库存';
			return;
		}
		if($scope.newProductInfo.startNum == undefined || $scope.newProductInfo.startNum == '' || isNaN(parseInt($scope.newProductInfo.startNum)) || $scope.newProductInfo.startNum < 0 || $scope.newProductInfo.startNum > $scope.newProductInfo.stock || parseInt($scope.newProductInfo.startNum) != $scope.newProductInfo.startNum){
			$scope.errorAddProduct.flag = true;
			$scope.errorAddProduct.info = '请正确填写起售数量,不能大于库存';
			return;
		}
		if($scope.newProductInfo.price == undefined || $scope.newProductInfo.price == '' || isNaN(parseFloat($scope.newProductInfo.price)) || $scope.newProductInfo.price < 0){
			$scope.errorAddProduct.flag = true;
			$scope.errorAddProduct.info = '请正确填写单价';
			return;
		}
		if($scope.newProductInfo.discount == undefined || $scope.newProductInfo.discount == '' || isNaN(parseFloat($scope.newProductInfo.discount)) || $scope.newProductInfo.discount < 0 || $scope.newProductInfo.discount > 1 ||
			/\.(\d*)/.exec($scope.newProductInfo.discount.toString())[1].length > 2){
			$scope.errorAddProduct.flag = true;
			$scope.errorAddProduct.info = '请正确填写折扣,0~1之间的小数,最多两位小数';
			return;
		}
		if($scope.newProductInfo.deliverLimit == undefined || $scope.newProductInfo.deliverLimit == '' || isNaN(parseInt($scope.newProductInfo.deliverLimit)) || $scope.newProductInfo.deliverLimit < 0 || parseInt($scope.newProductInfo.deliverLimit) != $scope.newProductInfo.deliverLimit){
			$scope.errorAddProduct.flag = true;
			$scope.errorAddProduct.info = '请正确填写发货间隔';
			return;
		}
		if($scope.newProductInfo.isFree == 0){
			if($scope.newProductInfo.postage == undefined || $scope.newProductInfo.postage == '' || isNaN(parseFloat($scope.newProductInfo.postage)) || $scope.newProductInfo.postage < 0){
				$scope.errorAddProduct.flag = true;
				$scope.errorAddProduct.info = '请正确填写邮费';
				return;
			}
		}
		console.log($scope.newProductType);
		ProductService.addNewProduct($scope.currentUser.id ,$scope.newProductType.type.id, $scope.newProductInfo)
			.success(function(data){
				if(data.code == 500){
					$cordovaToast.showShortBottom(data.data);
				}
				else if(data.code == 200){
					console.log(data);
					$rootScope.$broadcast('refreshProducts', {});
					$state.go('tabs.product');
					$cordovaToast.showShortBottom('添加茶品成功');
				}
			})
			.error(function(){

			});
	}


})

.controller('modifyProductCtrl', function($scope, $rootScope, ProductService, UserService, $state, $stateParams, $ionicModal, $ionicPopup, $cordovaToast, $cordovaCamera, $cordovaFileTransfer, $cordovaActionSheet) {
	$scope.editMode = false;
	$scope.switchEditMode = function(){
		$scope.editMode = !$scope.editMode;
	}
	$scope.errorModifyProduct = {
		flag: false,
		info: ''
	};
	$scope.isOnSale = $stateParams.modifyProductInfo.state == 1 ? true : false;

	$scope.modifyProductInfo = angular.copy($stateParams.modifyProductInfo);

	$scope.modifyProduct = function(){
		if($scope.modifyProductInfo.stock == undefined || $scope.modifyProductInfo.stock == '' || isNaN(parseInt($scope.modifyProductInfo.stock)) || $scope.modifyProductInfo.stock <= 0 || parseInt($scope.modifyProductInfo.stock) != $scope.modifyProductInfo.stock){
			$scope.errorModifyProduct.flag = true;
			$scope.errorModifyProduct.info = '请正确填写库存';
			return;
		}
		if($scope.modifyProductInfo.startNum == undefined || $scope.modifyProductInfo.startNum == '' || isNaN(parseInt($scope.modifyProductInfo.startNum)) || $scope.modifyProductInfo.startNum < 0 || $scope.modifyProductInfo.startNum > $scope.modifyProductInfo.stock || parseInt($scope.modifyProductInfo.startNum) != $scope.modifyProductInfo.startNum){
			$scope.errorModifyProduct.flag = true;
			$scope.errorModifyProduct.info = '请正确填写起售数量,不能大于库存';
			return;
		}
		if($scope.modifyProductInfo.price == undefined || $scope.modifyProductInfo.price == '' || isNaN(parseFloat($scope.modifyProductInfo.price)) || $scope.modifyProductInfo.price < 0){
			$scope.errorModifyProduct.flag = true;
			$scope.errorModifyProduct.info = '请正确填写单价';
			return;
		}
		if($scope.modifyProductInfo.discount == undefined || $scope.modifyProductInfo.discount == '' || isNaN(parseFloat($scope.modifyProductInfo.discount)) || $scope.modifyProductInfo.discount < 0 || $scope.modifyProductInfo.discount > 1 ||
			/\.(\d*)/.exec($scope.modifyProductInfo.discount.toString())[1].length > 2){
			$scope.errorModifyProduct.flag = true;
			$scope.errorModifyProduct.info = '请正确填写折扣,0~1之间的小数,最多两位小数';
			return;
		}
		if($scope.modifyProductInfo.deliverLimit == undefined || $scope.modifyProductInfo.deliverLimit == '' || isNaN(parseInt($scope.modifyProductInfo.deliverLimit)) || $scope.modifyProductInfo.deliverLimit < 0 || parseInt($scope.modifyProductInfo.deliverLimit) != $scope.modifyProductInfo.deliverLimit){
			$scope.errorModifyProduct.flag = true;
			$scope.errorModifyProduct.info = '请正确填写发货间隔';
			return;
		}
		if($scope.modifyProductInfo.isFree == 0){
			if($scope.modifyProductInfo.postage == undefined || $scope.modifyProductInfo.postage == '' || isNaN(parseFloat($scope.modifyProductInfo.postage)) || $scope.modifyProductInfo.postage < 0){
				$scope.errorModifyProduct.flag = true;
				$scope.errorModifyProduct.info = '请正确填写邮费';
				return;
			}
		}
		ProductService.modifyProduct($scope.modifyProductInfo)
			.success(function(data){
				if(data.code == 200){
					$rootScope.$broadcast('refreshProducts', {});
					$state.go('tabs.product');
					$cordovaToast.showShortBottom('修改产品信息成功');
				}
				else {
					$cordovaToast.showShortBottom('修改产品信息失败');
				}
			})
			.error(function(){
				$cordovaToast.showShortBottom('网络错误');
			})
	};

	ProductService.getDetailPic($scope.modifyProductInfo.id)
		.success(function(data){
			$scope.detailPic = data.data;
		});

	$ionicModal.fromTemplateUrl('templates/homePic.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.homePicModal = modal;
	});

	$ionicModal.fromTemplateUrl('templates/detailPic.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.detailPicModal = modal;
	});

	$scope.uploadPic = function(productId, type){
		var actionSheetOptions = {
			title: {0:'上传产品详情图片', 1:'上传产品首页图片'}[type],
			buttonLabels: ['相机', '从图库选择'],
			addCancelButtonWithLabel: '取消',
			androidEnableCancelButton: true
		};
		$cordovaActionSheet.show(actionSheetOptions).then(function (btnIndex) {
			var imageSource;
			if(btnIndex == 1){
				imageSource = Camera.PictureSourceType.CAMERA;
			}
			else if(btnIndex == 2){
				imageSource = Camera.PictureSourceType.PHOTOLIBRARY;
			}
			else{
				return;
			}
			var cameraOptions = {
				//这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
				quality: 70,                                            //相片质量0-100
				destinationType: Camera.DestinationType.FILE_URI,        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
				sourceType: imageSource,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
				allowEdit: false,                                        //在选择之前允许修改截图
				encodingType:Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
				mediaType:0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
				cameraDirection:0                                      //枪后摄像头类型：Back= 0,Front-facing = 1
			};
			$cordovaCamera.getPicture(cameraOptions).then(function(imageURI) {
				ProductService.uploadPic(productId, type, imageURI)
					.then(function(result) {
						// Success!
						$cordovaToast.showShortBottom(actionSheetOptions.title + "成功");
						console.log(result);
						if(type == 0){
							ProductService.getDetailPic($scope.modifyProductInfo.id)
								.success(function(data){
									$scope.detailPic = data.data;
								});
						}
						else if(type == 1){
							ProductService.getProductByProductId($scope.modifyProductInfo.id)
								.success(function(data){
									$scope.modifyProductInfo.url = data.data.url;
								})
								.error(function(){

								})
						}
					}, function(err) {
						// Error
						console.log(err);
					}, function (progress) {
						// constant progress updates
					});
				//console.log(imageURI);
				//var data={};
				//$cordovaFile.readAsText(imageURI)
				//	.then(function (success) {
				//		// success
				//		console.log(success);
				//		$http({
				//			method:'POST',
				//			url: "http://202.120.40.175:17000/api/image/licence/upload?teaSalerId=2",
				//			data: data
				//		}).success(function(data){
				//			console.log(data);
				//		})
				//	}, function (error) {
				//		console.log(error);
				//		// error
				//	});
			}, function(err) {
				// error

			});
		});
	}

	$scope.showDeleteConfirm = function(picture){
		console.log($scope.detailPic.indexOf(picture));
		//var index1 = $scope.detailPic.indexOf(picture);
		//$scope.detailPic.splice(index1 ,1);
		if(!$scope.editMode || $scope.isOnSale){
			return;
		}

		var confirmPopup = $ionicPopup.confirm({
			title: '删除图片',
			template: '确认删除此图片?不可恢复',
			cancelText: '取消', // String (default: 'Cancel'). The text of the Cancel button.
			cancelType: 'button-default', // String (default: 'button-default'). The type of the Cancel button.
			okText: '删除', // String (default: 'OK'). The text of the OK button.
			okType: 'button-assertive' //
		});

		confirmPopup.then(function(res) {
			if(res) {
				ProductService.deletePic(picture.id)
					.success(function(data){
						if(data.code == 200){
							$cordovaToast.showShortBottom("图片删除成功");
							var index = $scope.detailPic.indexOf(picture);
							$scope.detailPic.splice(index ,1);
						}
					})
			} else {
				console.log('You are not sure');
			}
		});
	}
})

.controller('tabsZhongchouCtrl', function($scope, $rootScope, $filter, UserService, ProductService, ZCService, $timeout, $ionicModal, $ionicPopup, $cordovaToast){

	$scope.addZCError = {
		flag: false,
		info: ''
	}

	$scope.modifyZCError = {
		flag: false,
		info: ''
	}

	$scope.showFilter = true;

	$scope.$watch('showFilter', function(newValue, oldValue){
		if(newValue == oldValue){
			return;
		}
		if(newValue == true){
			$('#ZCSearch').addClass('animated slideInDown').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('animated slideInDown');
			});
		}
		else{
			$('#ZCSearch').addClass('animated slideOutUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('animated slideOutUp');
			});
		}
	})

	$scope.filter = {
		ZCType: -1,
		level: -1,
		state: -1,
		type: -1,
		custom: ''
	};

	ProductService.getProductByTeaSalerId(UserService.currentUser.id, -1)
		.success(function(data){
			if(data.code == 200){
				$scope.notOnSaleProducts = $filter('onSale')(data.data, 0);
				//angular.forEach($scope.products, function(ele){
				//	ele.url = baseUrl + port + '/api/image/getByUrl?url=' + ele.url
				//});
			}
		})
		.error(function(){
			$cordovaToast.showShortBottom('网络错误,获取产品失败');
		});

	var getAllZC = function(){
		ZCService.getZC(UserService.currentUser.id)
			.success(function(data){
				if(data.code == 200) {
					//console.log(JSON.stringify(data.data.content));
					$scope.ZCs = $filter('orderBy')(data.data.content, function(ZC){
						return 0 - ZC.id;
					})
				}
			})
	};

	getAllZC();

	$scope.refreshZCList = function(){
		ZCService.getZC(UserService.currentUser.id)
			.success(function(data){
				if(data.code == 200) {
					//console.log(JSON.stringify(data.data.content));
					$scope.ZCs = $filter('orderBy')(data.data.content, function(ZC){
						return 0 - ZC.id;
					})
					$timeout($scope.$broadcast('scroll.refreshComplete'), 800);
				}
			})
	}

	$scope.showAddZCModal = function(){
		$scope.addZCError.flag = false;
		$scope.newZC = {};
		$scope.newZC.productId = $scope.notOnSaleProducts[0].id.toString();
		$scope.newZC.type = "0";
		//$scope.notOnSaleProducts = $filter('onSale')(ProductService.currentProducts, 0);
		$ionicModal.fromTemplateUrl('templates/addZCModal.html', {
			scope: $scope,
			hardwareBackButtonClose: false
		}).then(function(modal) {
			$scope.addZCModal = modal;
			$scope.addZCModal.show();
		});
	}

	$scope.addNewZC = function(){
		console.log($scope.newZC);
		var temp = new Date();
		var now = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());

		if($scope.newZC.productId == undefined || $scope.newZC.productId == '' || $scope.newZC.productId == null){
			$scope.addZCError.flag = true;
			$scope.addZCError.info = '请选择一个产品';
			return;
		}

		if($scope.newZC.unitNum == undefined || $scope.newZC.unitNum == '' || isNaN(parseInt($scope.newZC.unitNum)) || $scope.newZC.unitNum <= 0 || parseInt($scope.newZC.unitNum) != $scope.newZC.unitNum){
			$scope.addZCError.flag = true;
			$scope.addZCError.info = '请正确填写每份数量';
			return;
		}
		if($scope.newZC.unitMoney == undefined || $scope.newZC.unitMoney == '' || isNaN(parseFloat($scope.newZC.unitMoney)) || $scope.newZC.unitMoney < 0){
			$scope.addZCError.flag = true;
			$scope.addZCError.info = '请正确填写每份售价';
			return;
		}
		if($scope.newZC.type == 1) {
			if ($scope.newZC.earnest == undefined || $scope.newZC.earnest == '' || isNaN(parseFloat($scope.newZC.earnest)) || $scope.newZC.earnest < 0 || $scope.newZC.earnest > $scope.newZC.unitMoney) {
				$scope.addZCError.flag = true;
				$scope.addZCError.info = '请正确填写每份订金,不能大于每份售价';
				return;
			}
		}
		if($scope.newZC.totalNum == undefined || $scope.newZC.totalNum == '' || isNaN(parseInt($scope.newZC.totalNum)) || $scope.newZC.totalNum < 0 || parseInt($scope.newZC.totalNum) != $scope.newZC.totalNum){
			$scope.addZCError.flag = true;
			$scope.addZCError.info = '请正确填写总份数';
			return;
		}
		if($scope.newZC.dealDate == undefined || $scope.newZC.dealDate == ''){
			$scope.addZCError.flag = true;
			$scope.addZCError.info = '请填写众筹结束时间';
			return;
		}
		else{

		}
		if($scope.newZC.type == 1) {
			if ($scope.newZC.payDate == undefined || $scope.newZC.payDate == '') {
				$scope.addZCError.flag = true;
				$scope.addZCError.info = '请填写缴纳尾款时间';
				return;
			}
		}
		if ($scope.newZC.deliverDate == undefined || $scope.newZC.deliverDate == '') {
			$scope.addZCError.flag = true;
			$scope.addZCError.info = '请填写开始发货时间';
			return;
		}

		if(new Date($scope.newZC.dealDate.getFullYear(),$scope.newZC.dealDate.getMonth(), $scope.newZC.dealDate.getDate()).getTime() <= now.getTime()){
			$scope.addZCError.flag = true;
			$scope.addZCError.info = '众筹结束时间必须晚于当前时间';
			return;
		}

		if($scope.newZC.type == 1) {
			if (new Date($scope.newZC.payDate.getFullYear(), $scope.newZC.payDate.getMonth(), $scope.newZC.payDate.getDate()).getTime() <= now.getTime()) {
				$scope.addZCError.flag = true;
				$scope.addZCError.info = '缴纳尾款时间必须晚于当前时间';
				return;
			}
		}

		if(new Date($scope.newZC.deliverDate.getFullYear(),$scope.newZC.deliverDate.getMonth(), $scope.newZC.deliverDate.getDate()).getTime() <= now.getTime()){
			$scope.addZCError.flag = true;
			$scope.addZCError.info = '开始发货时间必须晚于当前时间';
			return;
		}

		if(new Date($scope.newZC.dealDate.getFullYear(),$scope.newZC.dealDate.getMonth(), $scope.newZC.dealDate.getDate()).getTime() >=
			new Date($scope.newZC.deliverDate.getFullYear(),$scope.newZC.deliverDate.getMonth(), $scope.newZC.deliverDate.getDate()).getTime()){
			$scope.addZCError.flag = true;
			$scope.addZCError.info = '众筹结束时间必须早于开始发货时间';
			return;
		}

		if($scope.newZC.type == 1) {
			if(new Date($scope.newZC.dealDate.getFullYear(),$scope.newZC.dealDate.getMonth(), $scope.newZC.dealDate.getDate()).getTime() >=
				new Date($scope.newZC.payDate.getFullYear(),$scope.newZC.payDate.getMonth(), $scope.newZC.payDate.getDate()).getTime()){
				$scope.addZCError.flag = true;
				$scope.addZCError.info = '众筹结束时间必须早于缴纳尾款时间';
				return;
			}
			if(new Date($scope.newZC.deliverDate.getFullYear(),$scope.newZC.deliverDate.getMonth(), $scope.newZC.deliverDate.getDate()).getTime() <=
				new Date($scope.newZC.payDate.getFullYear(),$scope.newZC.payDate.getMonth(), $scope.newZC.payDate.getDate()).getTime()){
				$scope.addZCError.flag = true;
				$scope.addZCError.info = '缴纳尾款时间必须早于开始发货时间';
				return;
			}
		}

		var helpObject = angular.copy($scope.newZC);
		var productId = helpObject.productId;
		delete  helpObject.productId;
		helpObject.dealDate = $filter('date')(helpObject.dealDate, "yyyy-MM-dd HH:mm:ss");
		helpObject.deliverDate = $filter('date')(helpObject.deliverDate, "yyyy-MM-dd HH:mm:ss");
		if(helpObject.type == 1){
			helpObject.payDate = $filter('date')(helpObject.payDate, "yyyy-MM-dd HH:mm:ss");
		}
		if(helpObject.type == 0){
			delete helpObject.earnest;
			delete helpObject.payDate;
		}

		ZCService.addNewZC(productId, helpObject)
			.success(function(data){
				if(data.code == 200){
					$scope.addZCError.flag = false;
					$scope.addZCModal.remove();
					console.log("成功");
					//刷新众筹
					getAllZC();
					$rootScope.$broadcast('refreshProducts', {});
					//刷新产品
					ProductService.getProductByTeaSalerId(UserService.currentUser.id, -1)
						.success(function(data){
							if(data.code == 200){
								$scope.notOnSaleProducts = $filter('onSale')(data.data, 0);
								//angular.forEach($scope.products, function(ele){
								//	ele.url = baseUrl + port + '/api/image/getByUrl?url=' + ele.url
								//});
							}
						})
						.error(function(){

						});
					$cordovaToast.showShortBottom("添加众筹成功");
				}
				else{
					$cordovaToast.showShortBottom("添加众筹失败");
				}
			})
			.error(function(){
				$cordovaToast.showShortBottom("添加众筹失败");
			})

	}

	$ionicModal.fromTemplateUrl('templates/modifyZCModal.html', {
		scope: $scope,
		hardwareBackButtonClose: false
	}).then(function(modal) {
		$scope.modifyZCModal = modal;
	});

	$scope.showModifyZCModal = function(ZC){
		$scope.modifyZCError.flag = false;
		var temp = angular.copy(ZC);
		$scope.modifyZCInfo = {};
		$scope.modifyZCInfo.id = temp.id;
		$scope.modifyZCInfo.product = temp.product;
		$scope.modifyZCInfo.type = temp.type.toString();
		$scope.modifyZCInfo.unitNum = temp.unitNum;
		$scope.modifyZCInfo.unitMoney = temp.unitMoney;
		$scope.modifyZCInfo.totalNum = temp.totalNum;
		$scope.modifyZCInfo.dealDate = $filter('parseDate')(temp.dealDate);
		$scope.modifyZCInfo.deliverDate = $filter('parseDate')(temp.deliverDate);
		if(temp.type == 1){
			$scope.modifyZCInfo.earnest = temp.earnest;
			$scope.modifyZCInfo.payDate = $filter('parseDate')(temp.payDate);
		}
		$scope.modifyZCModal.show();
	}

	$scope.modifyZC = function(modifyZCInfo){
		var temp = new Date();
		var now = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());
		var data = angular.copy(modifyZCInfo);
		data.type = parseInt(data.type);
		if(data.unitNum == undefined || data.unitNum == '' || isNaN(parseInt(data.unitNum)) || data.unitNum <= 0 || parseInt(data.unitNum) != data.unitNum){
			$scope.modifyZCError.flag = true;
			$scope.modifyZCError.info = '请正确填写每份数量';
			return;
		}
		if(data.unitMoney == undefined || data.unitMoney == '' || isNaN(parseFloat(data.unitMoney)) || data.unitMoney < 0){
			$scope.modifyZCError.flag = true;
			$scope.modifyZCError.info = '请正确填写每份售价';
			return;
		}
		if(data.type == 1) {
			if (data.earnest == undefined || data.earnest == '' || isNaN(parseFloat(data.earnest)) || data.earnest < 0 || data.earnest > data.unitMoney) {
				$scope.modifyZCError.flag = true;
				$scope.modifyZCError.info = '请正确填写每份订金,不能大于每份售价';
				return;
			}
		}
		if(data.totalNum == undefined || data.totalNum == '' || isNaN(parseInt(data.totalNum)) || data.totalNum < 0 || parseInt(data.totalNum) != data.totalNum){
			$scope.modifyZCError.flag = true;
			$scope.modifyZCError.info = '请正确填写总份数';
			return;
		}
		if(data.dealDate == undefined || data.dealDate == ''){
			$scope.modifyZCError.flag = true;
			$scope.modifyZCError.info = '请填写众筹结束时间';
			return;
		}
		else{

		}
		if(data.type == 1) {
			if (data.payDate == undefined || data.payDate == '') {
				$scope.modifyZCError.flag = true;
				$scope.modifyZCError.info = '请填写缴纳尾款时间';
				return;
			}
		}
		if (data.deliverDate == undefined || data.deliverDate == '') {
			$scope.modifyZCError.flag = true;
			$scope.modifyZCError.info = '请填写开始发货时间';
			return;
		}

		if(new Date(data.dealDate.getFullYear(),data.dealDate.getMonth(), data.dealDate.getDate()).getTime() <= now.getTime()){
			$scope.modifyZCError.flag = true;
			$scope.modifyZCError.info = '众筹结束时间必须晚于当前时间';
			return;
		}

		if(data.type == 1) {
			if (new Date(data.payDate.getFullYear(), data.payDate.getMonth(), data.payDate.getDate()).getTime() <= now.getTime()) {
				$scope.modifyZCError.flag = true;
				$scope.modifyZCError.info = '缴纳尾款时间必须晚于当前时间';
				return;
			}
		}

		if(new Date(data.deliverDate.getFullYear(),data.deliverDate.getMonth(), data.deliverDate.getDate()).getTime() <= now.getTime()){
			$scope.modifyZCError.flag = true;
			$scope.modifyZCError.info = '开始发货时间必须晚于当前时间';
			return;
		}

		if(new Date(data.dealDate.getFullYear(),data.dealDate.getMonth(), data.dealDate.getDate()).getTime() >=
			new Date(data.deliverDate.getFullYear(),data.deliverDate.getMonth(), data.deliverDate.getDate()).getTime()){
			$scope.modifyZCError.flag = true;
			$scope.modifyZCError.info = '众筹结束时间必须早于开始发货时间';
			return;
		}

		if(data.type == 1) {
			if(new Date(data.dealDate.getFullYear(),data.dealDate.getMonth(), data.dealDate.getDate()).getTime() >=
				new Date(data.payDate.getFullYear(),data.payDate.getMonth(), data.payDate.getDate()).getTime()){
				$scope.modifyZCError.flag = true;
				$scope.modifyZCError.info = '众筹结束时间必须早于缴纳尾款时间';
				return;
			}
			if(new Date(data.deliverDate.getFullYear(),data.deliverDate.getMonth(), data.deliverDate.getDate()).getTime() <=
				new Date(data.payDate.getFullYear(),data.payDate.getMonth(), data.payDate.getDate()).getTime()){
				$scope.modifyZCError.flag = true;
				$scope.modifyZCError.info = '缴纳尾款时间必须早于开始发货时间';
				return;
			}
		}

		delete data.product;
		data.dealDate = $filter('date')(data.dealDate, "yyyy-MM-dd HH:mm:ss");
		data.deliverDate = $filter('date')(data.deliverDate, "yyyy-MM-dd HH:mm:ss");
		if(data.type == 1){
			data.payDate = $filter('date')(data.payDate, "yyyy-MM-dd HH:mm:ss");
		}
		if(data.type == 0){
			delete data.earnest;
			delete data.payDate;
		}
		ZCService.modifyZC(data)
			.success(function(result){
				if(result.code == 200){
					$scope.modifyZCModal.hide();
					getAllZC();
					$cordovaToast.showShortBottom("修改众筹成功");
				}
				else{
					$cordovaToast.showShortBottom("修改众筹失败");
				}
			})
			.error(function(e){
				$cordovaToast.showShortBottom("网络错误,修改众筹失败");
			})

	}

	$scope.showDeleteZCConfirm = function(ZC){
		var confirmPopup = $ionicPopup.confirm({
			title: '删除众筹',
			template: '确认删除此众筹?不可恢复',
			cancelText: '取消', // String (default: 'Cancel'). The text of the Cancel button.
			cancelType: 'button-default', // String (default: 'button-default'). The type of the Cancel button.
			okText: '删除', // String (default: 'OK'). The text of the OK button.
			okType: 'button-assertive' //
		});

		confirmPopup.then(function(res) {
			if(res) {
				ZCService.deleteZC(ZC.id)
					.success(function(data){
						if(data.code == 200){
							var index = $scope.ZCs.indexOf(ZC);
							$scope.ZCs.splice(index ,1); //刷新众筹
							$cordovaToast.showShortBottom("众筹删除成功");
						}
						else{
							$cordovaToast.showShortBottom("众筹删除失败");
						}
					})
					.error(function(e){
						$cordovaToast.showShortBottom("网络错误");
					})
			} else {
				console.log('You are not sure');
			}
		});
	}

	$scope.showZCDetailModal = function(ZC){
		$scope.ZCDetailInfo = angular.copy(ZC);

		var option = "?crowdFundingId=" + ZC.id;

		$scope.ZCOrders = ZCService.getZCOrder(option)
			.success(function(data){
				$scope.ZCOrders = data.data.content;
			})
			.error(function(error){

			});

		$ionicModal.fromTemplateUrl('pages/zhongchouDetail.html', {
			scope: $scope,
			hardwareBackButtonClose: false
		}).then(function (modal) {
			$scope.ZCDetailModal = modal;
			$scope.ZCDetailModal.show();
		});


	}

	$scope.confirmZC = function(ZC){
		ZCService.confirmZC(ZC.id)
			.success(function(data){
				ZC.state = data.data.state; //刷新众筹
				$cordovaToast.showShortBottom("接受众筹成功");
			})
			.error(function(){
				$cordovaToast.showShortBottom("网络错误,接受众筹失败");
			})
	}

	$scope.sendZCOrder = function(order){
		$scope.wuliu = {};
		var help = {
			orderId: order.id,
			isConfirm: 0,
			isSend: 1
		}
		var myPopup = $ionicPopup.show({
			template: '<input type="text" ng-model="wuliu.id" placeholder="物流单号" style="">',
			title: '众筹发货',
			subTitle: '填写物流单号',
			scope: $scope,
			buttons: [
				{text: '取消'},
				{
					text: '<b>发货</b>',
					type: 'my-balanced',
					onTap: function (e) {
						console.log('物流信息', $scope.wuliu.id);
						if ($scope.wuliu.id == undefined || $scope.wuliu.id == '') {
							e.preventDefault();
							$cordovaToast.showShortBottom('请填写物流单号');
							return;
						}
						else{
							help.wuliu = $scope.wuliu.id;
							ZCService.sendZCOrder(help)
								.success(function(data){
									if(data.code == 200){
										order.isSend = data.data.isSend;
										order.wuliu = data.data.wuliu;
										$cordovaToast.showShortBottom("众筹订单发货成功");
									}
									else{
										$cordovaToast.showShortBottom("众筹订单发货失败");
									}
								})
								.error(function(){
									$cordovaToast.showShortBottom("网络错误, 众筹订单发货失败");
								})
						}
					}
				}
			]
		});

	}

})

.controller('tabsZhongbaoCtrl', function($scope, $filter, $timeout, UserService, ZBService, $ionicPopup, $cordovaToast){

	$scope.showFilter = true;

	$scope.$watch('showFilter', function(newValue, oldValue){
		if(newValue == oldValue){
			return;
		}
		if(newValue == true){
			$('#ZBSearch').addClass('animated slideInDown').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('animated slideInDown');
			});
		}
		else{
			$('#ZBSearch').addClass('animated slideOutUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('animated slideOutUp');
			});
		}
	})

	$scope.filter = {
		participate: true,
		level: -1,
		state: -1,
		type: -1,
		send: -1, //0未发货 1已发货 2已收货
		custom: ''
	};

	var getAllZB = function(){
		ZBService.getZB('')
			.success(function(ZBData){
				//$scope.ZBs = data.data.content;
				//console.log(JSON.stringify($scope.ZBs));
				var option = '?teaSalerId=' + UserService.currentUser.id;
				ZBService.getZBOrder(option)
					.success(function(orderData){
						var zbs = $filter('orderBy')(ZBData.data.content, function(ZB){
							return 0 - ZB.id;
						})
						var orders = $filter('orderBy')(orderData.data.content, 'id');

						for(var i = 0; i < orders.length; i++){
							for(var j = 0; j < zbs.length; j++){
								if(zbs[j].id == orders[i].crowdSourcing.id){
									zbs[j].order = orders[i];
									break;
								}
							}
						}
						$scope.ZBs = zbs;
						console.log($scope.ZBs);
						console.log($filter('ZBSearch')($scope.ZBs, $scope.filter));
						//console.log(JSON.stringify($scope.ZBs));
					})
			});
	}

	getAllZB();

	$scope.refreshZB = function(){
		ZBService.getZB('')
			.success(function(ZBData){
				//$scope.ZBs = data.data.content;
				//console.log(JSON.stringify($scope.ZBs));
				var option = '?teaSalerId=' + UserService.currentUser.id;
				ZBService.getZBOrder(option)
					.success(function(orderData){
						var zbs = $filter('orderBy')(ZBData.data.content, function(ZB){
							return 0 - ZB.id;
						})
						var orders = $filter('orderBy')(orderData.data.content, 'id');
						for(var i = 0; i < orders.length; i++){
							for(var j = 0; j < zbs.length; j++){
								if(zbs[j].id == orders[i].crowdSourcing.id){
									zbs[j].order = orders[i];
									break;
								}
							}
						}
						$scope.ZBs = zbs;
						console.log($filter('ZBSearch')($scope.ZBs, $scope.filter));
						//console.log(JSON.stringify($scope.ZBs));
						$timeout($scope.$broadcast('scroll.refreshComplete'), 800);
					})
			});
	}

	$scope.participateZB = function(ZB){
		$scope.help = {};
		var myPopup = $ionicPopup.show({
			template: '<input type="number" ng-model="help.participateZBUnitNum" placeholder="请输入参与份数">',
			title: '参与众包,仍需' + ZB.remainderNum + '份',
			scope: $scope,
			buttons: [
				{ text: '取消' },
				{
					text: '<b>确认</b>',
					type: 'my-balanced',
					onTap: function(e) {
						if ($scope.help.participateZBUnitNum <= 0 ||
							$scope.help.participateZBUnitNum == undefined ||
							$scope.help.participateZBUnitNum =="" ||
							!angular.isNumber($scope.help.participateZBUnitNum)||
							$scope.help.participateZBUnitNum > ZB.remainderNum ||
							parseInt($scope.help.participateZBUnitNum) != $scope.help.participateZBUnitNum) {
							// 不允许用户关闭，除非输入 wifi 密码
							$cordovaToast.showShortBottom("请正确输入份数,整数,大于零,小于等于众包需求份数");
							console.log($scope.help.participateZBUnitNum);
							e.preventDefault();

						} else {
							var helpObject = {};
							helpObject.teaSalerId = UserService.getCurrentUser().id;
							helpObject.name = UserService.getCurrentUser().name;
							helpObject.customerId = ZB.customer.id;
							helpObject.address = UserService.getCurrentUser().address;
							helpObject.zip = UserService.getCurrentUser().zip;
							helpObject.tel = UserService.getCurrentUser().tel;
							helpObject.crowdSourcingId = ZB.id;
							helpObject.num = $scope.help.participateZBUnitNum;
							ZBService.participateZB(helpObject)
								.success(function(data){
									console.log(data);
									getAllZB();
									myPopup.close();
									$cordovaToast.showShortBottom('参与成功');
								})
								.error(function(e){
									myPopup.close();
									$cordovaToast.showShortBottom('参与失败');
								})
							e.preventDefault();
							//return $scope.data.wifi;
						}
					}
				},
			]
		});
	}

	$scope.sendZB = function(ZB){
		$scope.wuliu = {};
		var helpObject = {};
		helpObject.orderId = ZB.order.id;
		helpObject.isSend = 1;
		helpObject.isConfirm = 0;
		var myPopup = $ionicPopup.show({
			template: '<input type="text" ng-model="wuliu.id" placeholder="物流单号" style="">',
			title: '众包发货',
			subTitle: '填写物流单号',
			scope: $scope,
			buttons: [
				{text: '取消'},
				{
					text: '<b>发货</b>',
					type: 'my-balanced',
					onTap: function (e) {
						console.log('物流信息', $scope.wuliu.id);
						if ($scope.wuliu.id == undefined || $scope.wuliu.id == '') {
							e.preventDefault();
							$cordovaToast.showShortBottom('请填写物流单号');
							return;
						}
						else {
							helpObject.wuliu = $scope.wuliu.id;
							ZBService.sendOrder(helpObject)
								.success(function(data){
									getAllZB();
									$cordovaToast.showShortBottom("众包发货成功");
								})
								.error(function(){
									$cordovaToast.showShortBottom("网络错误, 发货失败");
								});
						}
					}
				}
			]
		});


	};

	$scope.cancelZB = function(ZB){
		var helpObject = {
			id: ZB.order.id
		};
		ZBService.cancelOrder(helpObject)
			.success(function(data){
				getAllZB();
				$cordovaToast.showShortBottom("取消参与众包成功");
			})
			.error(function(){
				$cordovaToast.showShortBottom("网络错误, 取消参与众包失败");
			})
	};
})

.controller('tabsOrderCtrl', function($scope, $filter, $stateParams, UserService, OrderService, $cordovaToast, $timeout, $ionicPopup){

	$scope.showFilter = true;

	$scope.$watch('showFilter', function(newValue, oldValue){
		if(newValue == oldValue){
			return;
		}
		if(newValue == true){
			$('#OrderSearch').addClass('animated slideInDown').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('animated slideInDown');
			});
		}
		else{
			$('#OrderSearch').addClass('animated slideOutUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('animated slideOutUp');
			});
		}
	});

	$scope.filter = {
		state: -1,
		level: -1,
		type: -1,
		product: '-1',
		custom: ''
	};

	$scope.filter.product = $stateParams.product.toString();
	console.log('state params', $stateParams.product);

	var getAllMyOder = function(){
		OrderService.getOrderByTeaSalerId(UserService.currentUser.id)
			.success(function(data){
				$scope.orders = $filter('orderBy')(data.data.list, function(order){
					return 0 - Date.parse(order.orderEn.createDate);
				});
				var temp = new Map();
				for(var i = 0; i < $scope.orders.length; i++){
					for(var j = 0; j < $scope.orders[i].orderItems.length; j++){
						//temp[$scope.orders[i].orderItems[j].product.id] = $scope.orders[i].orderItems[j].product;
						temp.set($scope.orders[i].orderItems[j].product.id, $scope.orders[i].orderItems[j].product);
					}
				}
				$scope.searchProducts = [];
				temp.forEach(function(value, key, map){
					$scope.searchProducts.push(value);
				})
			})
	};

	getAllMyOder();

	$scope.sendOrder = function(order){
		$scope.wuliu = {};
		var myPopup = $ionicPopup.show({
			template: '<input type="text" ng-model="wuliu.id" placeholder="物流单号" style="">',
			title: '订单发货',
			subTitle: '填写物流单号',
			scope: $scope,
			buttons: [
				{ text: '取消' },
				{
					text: '<b>发货</b>',
					type: 'my-balanced',
					onTap: function(e) {
						console.log('物流信息', $scope.wuliu.id);
						if($scope.wuliu.id == undefined || $scope.wuliu.id == ''){
							e.preventDefault();
							$cordovaToast.showShortBottom('请填写物流单号');
							return;
						}
						else {
							OrderService.sendOrder(order.orderEn.id, $scope.wuliu.id)
								.success(function (data) {
									if (data.code == 200) {
										order.orderEn.isSend = data.data.isSend;
										order.orderEn.wuliu = $scope.wuliu.id;
										$cordovaToast.showShortBottom('发货成功');
									}
									else {
										$cordovaToast.showShortBottom('发货失败');
									}
								})
								.error(function () {
									$cordovaToast.showShortBottom('发货失败');
								})
						}
					}
				},
			]
		});

	}

	$scope.refreshOrder = function(){
		OrderService.getOrderByTeaSalerId(UserService.currentUser.id)
			.success(function(data){
				$scope.orders = $filter('orderBy')(data.data.list, function(order){
					return 0 - Date.parse(order.orderEn.createDate);
				})
				var temp = new Map();
				for(var i = 0; i < $scope.orders.length; i++){
					for(var j = 0; j < $scope.orders[i].orderItems.length; j++){
						//temp[$scope.orders[i].orderItems[j].product.id] = $scope.orders[i].orderItems[j].product;
						temp.set($scope.orders[i].orderItems[j].product.id, $scope.orders[i].orderItems[j].product);
					}
				}
				$scope.searchProducts = [];
				temp.forEach(function(value, key, map){
					$scope.searchProducts.push(value);
				})
				$timeout($scope.$broadcast('scroll.refreshComplete'), 800);
			})
	}
	//console.log(JSON.stringify($scope.orders));

})

.controller('tabsProfileCtrl', function($scope, UserService, $ionicModal, $ionicHistory, $state, $cordovaActionSheet, $cordovaCamera, $cordovaToast){
	UserService.getTeaSalerById(UserService.getCurrentUser().id)
		.success(function(data){
			$scope.currentUser = data.data;
			UserService.currentUser = data.data;
		});
	$scope.logout = function(){
		$ionicHistory.clearCache().then(function(){
			$state.go("login");
		})
	};

	$scope.uploadPortrait = function(){
		var actionSheetOptions = {
			title: '上传头像',
			buttonLabels: ['相机', '从图库选择'],
			addCancelButtonWithLabel: '取消',
			androidEnableCancelButton: true
		};
		$cordovaActionSheet.show(actionSheetOptions).then(function (btnIndex) {
			var imageSource;
			if(btnIndex == 1){
				imageSource = Camera.PictureSourceType.CAMERA;
			}
			else if(btnIndex == 2){
				imageSource = Camera.PictureSourceType.PHOTOLIBRARY;
			}
			else{
				return;
			}
			var cameraOptions = {
				//这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
				quality: 70,                                            //相片质量0-100
				destinationType: Camera.DestinationType.FILE_URI,        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
				sourceType: imageSource,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
				allowEdit: false,                                        //在选择之前允许修改截图
				encodingType:Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
				mediaType:0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
				cameraDirection:0                                      //枪后摄像头类型：Back= 0,Front-facing = 1
			};
			$cordovaCamera.getPicture(cameraOptions).then(function(imageURI) {
				UserService.uploadPortrait($scope.currentUser.account.id, imageURI)
					.then(function(result) {
						// Success!
						UserService.getTeaSalerById(UserService.getCurrentUser().id)
							.success(function(data){
								$scope.currentUser = data.data;
							});
						$cordovaToast.showShortBottom(actionSheetOptions.title + "成功");
						console.log(result);
					}, function(err) {
						// Error
						console.log(err);
					}, function (progress) {
						// constant progress updates
					});
				//console.log(imageURI);
				//var data={};
				//$cordovaFile.readAsText(imageURI)
				//	.then(function (success) {
				//		// success
				//		console.log(success);
				//		$http({
				//			method:'POST',
				//			url: "http://202.120.40.175:17000/api/image/licence/upload?teaSalerId=2",
				//			data: data
				//		}).success(function(data){
				//			console.log(data);
				//		})
				//	}, function (error) {
				//		console.log(error);
				//		// error
				//	});
			}, function(err) {
				// error

			});
		});
	}

	$scope.showPricePredicate = function(){
		$ionicModal.fromTemplateUrl('templates/pricePredicate.html', {
			scope: $scope,
			hardwareBackButtonClose: false
		}).then(function (modal) {
			$scope.pricePredicateModal = modal;
			$scope.pricePredicateModal.show();
		});
		UserService.pricePredicate()
			.success(function(data){
				$scope.pricesPredicates = data.data;
			})
	}
});