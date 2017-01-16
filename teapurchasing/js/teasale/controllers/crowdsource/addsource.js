angular.module('teasale').controller('SourceAddCtrl', function ($scope,$http,coverAuth,$stateParams,Upload,$state) {
  $scope.source = {   
  }
  Date.prototype.format = function(format){
    var o = {
      "M+" : this.getMonth()+1, //month
      "d+" : this.getDate(),    //day
      "h+" : this.getHours(),   //hour
      "m+" : this.getMinutes(), //minute
      "s+" : this.getSeconds(), //second
      "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
      "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
    (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,
    RegExp.$1.length==1 ? o[k] :
    ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
  }
  $scope.levels = [{name:"一般",id:1},{name:"中等",id:2},{name:"上等",id:3}];
  $scope.level = $scope.levels[0];
  if ($scope.currentUser==null) {
      sessionStorage['history'] = $location.path();
      $state.go('login');
  }
  $scope.logout=function(){
      delete localStorage['user'];
      $scope.currentUser = null;
  };
  $scope.login =function(){
    sessionStorage['history'] = $location.path();
    $state.go('login');
  }
  var getProductCategory={
          method: 'GET',
          url: '/api/productTypes/getAllProductType?state=1',
          
  }; 
  $http(getProductCategory).then(function (res) {
  	$scope.productcategorys=res.data.data;
    $scope.productcategory = $scope.productcategorys[0];
    console.log($scope.productcategorys);
  })
  //$scope.user = $scope.currentUser;
  /*datapicker*/  
  $scope.today = new Date();
  $scope.tomorrow = new Date();
  $scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
  $scope.minDate = $scope.tomorrow;
  $scope.minDate2 = $scope.tomorrow;
  $scope.clear = function () {
    $scope.dt = null;
  };

  $scope.opensend = function($event,options) {
    if($scope.dealDate!=null){
      $scope.minDate2 = $scope.dealDate.time;
    }
    $event.preventDefault();
    $event.stopPropagation();

    options.opened = true;
  };

  $scope.openfinish = function($event,options) {
    $event.preventDefault();
    $event.stopPropagation();
    options.opened = true;

  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  /*var d = new Date();
  var date = d.format('yyyy-MM-dd hh:mm:ss');
  console.log(date);*/
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd hh:mm:ss', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[1];
  $scope.$dismiss = function () {
    $modalInstance.dismiss('cancel');
  };
  $scope.createDate = {};
  $scope.dealDate = {};
  $scope.deliverDate = {};
  /* image upload*/
  $scope.avatarSource = "/images/tea1.jpg";
  $scope.readAvatar = function (result) {

      var file = document.getElementById('avatar-student');
      if (typeof FileReader === 'undefined') {
          result.innerHTML = "抱歉，你的浏览器不支持 FileReader";
          input.setAttribute('disabled', 'disabled');
      } else {
          file.addEventListener('change', readFile, false);
      }
  };
  function readFile() {
    console.log(this.files[0]);
    document.getElementById("img-source").src = window.URL.createObjectURL(this.files[0]);
  }
  function isnum(obj){
    if(obj == null||obj<0){
      return false;
    }
    return true;
  }
  $scope.confirm = function(){
    if($scope.dealDate.time==null||$scope.deliverDate.time==null||$scope.product.name==null||$scope.content==null||!isnum($scope.source.earnest)||!isnum($scope.source.unitNum)||!isnum($scope.source.unitMoney)||!isnum($scope.source.totalNum)){
      alert("请输入正确的众包信息");
    }
    else{
      if($scope.picfile==null){
        alert("请上传图片");
      }
      else{
        var create = $scope.today.format('yyyy-MM-dd hh:mm:ss');
        var deal = $scope.dealDate.time.format('yyyy-MM-dd hh:mm:ss');
        var deliver = $scope.deliverDate.time.format('yyyy-MM-dd hh:mm:ss');
        if(deal>=deliver){
          alert("众包结束时间必须早于发货时间");
        }
        else{
          var data = {
            "earnest":$scope.source.earnest,
            "unitNum":$scope.source.unitNum,
            "unitMoney":$scope.source.unitMoney,
            "createDate":create,
            "dealDate":deal,
            "deliverDate":deliver,
            "totalNum":$scope.source.totalNum      
          };
          var data2=
          {
            "level": $scope.level.id,
            "name":$scope.product.name,
            "locality": $scope.product.locality,
            "remark":$scope.content
          };
          var reqAdd2 = {
            method: 'POST',
            url: '/api/crowdSourcing/newProduct?productType_id='+$scope.productcategory.id,
            data: JSON.stringify(data2)
          };   
          $http(reqAdd2).then(function(res){
            $scope.product = res.data.data;
            console.log($scope.picfile);
            Upload.upload({
                url: '/api/image/upload?product_id='+$scope.product.id+"&type=1",
                data: { 
                    pictures:$scope.picfile
                }
            }).then(function (resp) {
              var reqAdd = {
                method: 'POST',
                url: 'api/crowdSourcing/new?product_id='+$scope.product.id+'&customer_id='+$scope.currentUser.id,
                data: JSON.stringify(data)
              }; 
              console.log(data);
              $http(reqAdd).then(function(res2){
                console.log(res2); 
                if(res2.data.code==500){
                  alert("余额不足");
                }
                else{
                  alert("新增成功");
                  $state.go("sourcelist");              
                }
              }); 
            })                  
          })
        }
      }        
    }
  }
});