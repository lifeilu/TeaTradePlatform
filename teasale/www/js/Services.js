/**
 * Created by kubenetes on 2016/11/5.
 */
angular.module('tea.services', ['ngCordova'])

.factory('UserService', function($http, baseUrl, port, $cordovaFileTransfer){
	var UserService = {};
	//var ss = '1';
	UserService.currentUser = {};

	UserService.setCurrentUser = function(currentUser){
		UserService.currentUser = currentUser;
		//console.log("ss" + ss)
	}

	UserService.getCurrentUser = function(){
		return angular.copy(UserService.currentUser);
	}

	UserService.register = function(registerInfo){
		return $http({
			method: 'POST',
			url: baseUrl + port + '/api/teaSaler/register',
			data: JSON.stringify(registerInfo),
			crossDomain: true,
			headers: {'Content-Type': 'application/json;charset=UTF-8'}
		});
	}

	UserService.login = function(loginInfo){
		return $http({
			method: 'POST',
			url: baseUrl + port + '/api/teaSaler/login',
			data: JSON.stringify(loginInfo),
			crossDomain: true,
			headers: {'Content-Type': 'application/json;charset=UTF-8'}
		});
	}

	UserService.uploadLicense = function(userId, imageURI){
		var options = new FileUploadOptions();
		options.fileKey = "picture";
		options.httpMethod = "POST";
		var url = baseUrl + port + '/api/image/licence/upload?teaSalerId=' + userId;
		return $cordovaFileTransfer.upload(url, imageURI, options);
	}

	UserService.getTeaSalerById = function(userId){
		return $http({
			url: baseUrl + port + '/api/teaSaler/' + userId,
			method: 'GET',
			crossDomain: true
		})
	};

	UserService.uploadPortrait = function(accountId, imageURI){
		var options = new FileUploadOptions();
		options.fileKey = "picture";
		options.httpMethod = "POST";
		var url = baseUrl + port + '/api/image/head/upload?accountId=' + accountId;
		return $cordovaFileTransfer.upload(url, imageURI, options);
	}

	UserService.pricePredicate = function(){
		return $http({
			url: baseUrl + port + '/api/products/price/lastpredicte',
			method: 'GET',
			crossDomain: true
		})
	}


	return UserService;
})

.factory('ProductService', function($http, baseUrl, port, $cordovaFileTransfer){
	var ProductService = {};

	ProductService.currentProducts = {};

	ProductService.setCurrentProducts = function(object){
		ProductService.currentProducts = object;
	}

	ProductService.getProductType = function(){
		return $http({
			method: 'GET',
			url: baseUrl + port + '/api/productTypes/getAllProductType?state=1&pageSize=10000',
			crossDomain: true
		});
	};

	ProductService.addNewProduct = function(teaSellerId, productTypeId, newProductInfo){
		return $http({
			method: 'POST',
			url: baseUrl + port + '/api/product/new?productType_id=' + productTypeId + '&teaSeller_id=' + teaSellerId,
			data: JSON.stringify(newProductInfo),
			crossDomain: true,
			headers: {'Content-Type': 'application/json;charset=UTF-8'}
		})
	};

	ProductService.getProductByTeaSalerId = function(teaSaler_id, state){
		var url =  baseUrl + port + '/api/products/getByTeaSalerAndState?teaSaler_id=' + teaSaler_id + '&pageSize=10000';
		if(state == 0 || state == 1){
			url = url + '&state=' + state;
		}
		return $http({
			method: 'GET',
			url: url,
			crossDomain: true
		});
	};

	ProductService.getProductByProductId = function(productId){
		return $http({
			url: baseUrl + port + '/api/products/getById?id=' + productId,
			method: 'GET',
			crossDomain: true
		})
	}

	ProductService.startSell = function(productId){
		var helpArray = [];
		var helpObject = {};
		helpObject.id = productId;
		helpArray.push(helpObject);
		return $http({
			method: 'PUT',
			url: baseUrl + port + '/api/products/startSell',
			data: JSON.stringify(helpArray),
			crossDomain: true,
			headers: {'Content-Type': 'application/json;charset=UTF-8'}
		});
	};

	ProductService.downProduct = function(productId){
		return $http({
			method: 'PUT',
			url: baseUrl + port + '/api/products/down?product_id=' + productId,
			crossDomain: true,
			headers: {'Content-Type': 'application/json;charset=UTF-8'}
		})
	};

	ProductService.modifyProduct = function(productInfo){
		var helpArray = [];
		var helpObject = {};
		helpObject.id = productInfo.id;
		helpObject.stock = productInfo.stock;
		helpObject.price = productInfo.price;
		helpObject.startNum = productInfo.startNum;
		helpObject.discount = productInfo.discount;
		helpObject.isFree = productInfo.isFree;
		helpObject.postage = productInfo.postage;
		helpObject.deliverLimit = productInfo.deliverLimit;
		helpArray.push(helpObject);
		return $http({
			method: 'PUT',
			url: baseUrl + port + '/api/products/update',
			data: JSON.stringify(helpArray),
			crossDomain: true,
			headers: {'Content-Type': 'application/json;charset=UTF-8'}
		});
	};

	ProductService.deleteProduct = function(productId){
		var helpObject = {};
		var helpArray = [];
		helpObject.id = productId;
		helpArray.push(helpObject);
		return $http({
			method: 'PUT',
			url: baseUrl + port + '/api/products/delete',
			data: helpArray,
			crossDomain: true
		});
	};

	ProductService.getDetailPic = function(productId){
		return $http({
			method: 'GET',
			url: baseUrl + port + '/api/image/getImageByProduct?type=0&product_id=' + productId,
			crossDomain: true
		});
	}

	ProductService.uploadPic = function(productId, type, imageURI){
		//type 0详情图片 1主页图片
		var options = new FileUploadOptions();
		options.fileKey = "pictures";
		options.httpMethod = "POST";
		var url = baseUrl + port + '/api/image/upload?image_id=-1&product_id=' + productId + "&type=" + type;
		return $cordovaFileTransfer.upload(url, imageURI, options);
	}

	ProductService.deletePic = function(imageId){
		var helpObject = {};
		var helpArray = [];
		helpObject.id = imageId;
		helpArray.push(helpObject);
		return $http({
			method: 'PUT',
			url: baseUrl + port + '/api/image/delete',
			data: helpArray,
			crossDomain: true
		});
	}

	return ProductService;
})

.factory('OrderService', function($http, baseUrl, port){
	var OrderService = {};

	OrderService.getOrderByTeaSalerId = function(teaSalerId){
		return $http({
			method : 'GET',
			url : baseUrl + port + '/api/orders/orderItems/search?teaSalerId=' + teaSalerId + '&pageSize=10000',
			crossDomain : true
		});
	};

	OrderService.sendOrder = function(orderId, wuliu){
		var helpObject = {};
		helpObject.orderId = orderId;
		helpObject.isSend = 1;
		helpObject.wuliu = wuliu;
		return $http({
			method: 'PUT',
			url: baseUrl + port + "/api/order/update",
			data: helpObject,
			crossDomain: true
		})
	}

	return OrderService;
})

.factory('ZCService', function($http, baseUrl, port){
	var ZCService = {};

	ZCService.addNewZC = function(productId, data){
		return $http({
			url: baseUrl + port + "/api/crowdFund/new?product_id=" + productId,
			method: 'POST',
			data: data,
			crossDomain: true,
			headers: {'Content-Type': 'application/json;charset=UTF-8'}
		})
	}

	ZCService.getZC = function(teaSalerId){
		return $http({
			url: baseUrl + port + "/api/crowdFund/search?teaSaler_id=" + teaSalerId + '&pageSize=10000',
			method: 'GET',
			crossDomain: true
		})
	}

	ZCService.deleteZC = function(ZCId){
		var helpArray = [];
		var helpObject = {
			'id': ZCId
		}
		helpArray.push(helpObject);
		return $http({
			url: baseUrl + port + "/api/crowdFund/delete",
			method: 'PUT',
			data: helpArray,
			crossDomain: true
		})
	}

	ZCService.modifyZC = function(ZC){
		return $http({
			url: baseUrl + port + "/api/crowdFund/update",
			method: 'PUT',
			data: ZC,
			crossDomain: true
		})


	};

	ZCService.confirmZC = function(id){
		return $http({
			url: baseUrl + port + "/api/crowdFund/confirm",
			method: 'PUT',
			data: {
				'id': id
			},
			crossDomain: true,
			headers: {'Content-Type': 'application/json;charset=UTF-8'}
		})
	};

	ZCService.getZCOrder = function(option){
		return $http({
			url: baseUrl + port + "/api/crowdFundOrders/search" + option,
			method: 'GET',
			crossDomain: true
		})
	};

	ZCService.sendZCOrder = function(data) {
		return $http({
			url: baseUrl + port + "/api/crowdFundOrder/update",
			method: 'PUT',
			data: data,
			crossDomain: true,
			headers: {'Content-Type': 'application/json;charset=UTF-8'}
		})
	}

	return ZCService;
})

.factory('ZBService', function($http, baseUrl, port){
	var ZBService = {};

	ZBService.getZB = function(option){
		return $http({
			url: baseUrl + port + '/api/crowdSourcing/search?' + option + '&pageSize=10000',
			method: 'GET',
			crossDomain: true
		});
	};

	ZBService.participateZB = function(data){
		return $http({
			url: baseUrl + port + '/api/crowdSourcingOder/new',
			method: 'POST',
			data: data,
			crossDomain: true,
			headers: {'Content-Type': 'application/json;charset=UTF-8'}
		});
	};

	ZBService.getZBOrder = function(option){
		return $http({
			url:  baseUrl + port + '/api/crowdSourcingOder/search' + option + '&pageSize=1000000',
			method: 'GET',
			crossDomain: true
		});
	};

	ZBService.sendOrder = function(data){
		return $http({
			url: baseUrl + port + '/api/crowdSourcingOder/update',
			method: 'PUT',
			data: data,
			crossDomain: true,
			headers: {'Content-Type': 'application/json;charset=UTF-8'}
		});
	};

	ZBService.cancelOrder = function(data) {
		return $http({
			url: baseUrl + port + '/api/crowdSourcingOder/cancel',
			method: 'PUT',
			data: data,
			crossDomain: true,
			headers: {'Content-Type': 'application/json;charset=UTF-8'}
		});
	};

	return ZBService;
})