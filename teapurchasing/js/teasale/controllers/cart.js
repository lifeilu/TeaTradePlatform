angular.module('teasale').controller('CartCtrl', function ($scope,$http,coverAuth,$stateParams,$state,$location) {
    $scope.allval = 0;
    $scope.freight = 0;
    $scope.carts = [];
    if($scope.currentUser){
      $scope.user = {
        address:$scope.currentUser.address,
        zip:$scope.currentUser.zip,
        tel:$scope.currentUser.tel,
        nickname:$scope.currentUser.nickname
      }
      var readCart = {
        method: 'GET',
        url: '/api/carts/searchAll?customer_id='+$scope.currentUser.id,     
      }; 

      $http(readCart).then(function (res) {
        console.log(res);
        $scope.carts=res.data.data;
        $scope.carts.forEach(function(teasaler){
          teasaler.checked = false;
          teasaler.list.forEach(function(tea){
            tea.checked = false;
          });
        })
      });
      var address = $scope.currentUser.address;
      var addstrs = address.split(" ");
      if(addstrs.length!=0){
          if(addstrs.length==1){
              $scope.p = addstrs[0];
          }
          else{
              if(addstrs.length==2){
                  $scope.p = addstrs[0];
                  $scope.c = addstrs[1];
              }
              else{
                  if(addstrs.length==3){
                      $scope.p = addstrs[0];
                      $scope.c = addstrs[1];
                      $scope.a = addstrs[2];
                  }
                  else{
                      $scope.p = addstrs[0];
                      $scope.c = addstrs[1];
                      $scope.a = addstrs[2];
                      $scope.d = addstrs[3];                                    
                  }
              }
          }
      }
    }
    else{
      sessionStorage['history'] = $location.path();
      $state.go('login');
    }
    $scope.$watch('carts', function () {
        $scope.allval = 0;
        $scope.freight = 0;
        $scope.carts.forEach(function(teasaler){
          var frei = 0;
          var free = 0;
          teasaler.list.forEach(function(tea){
            if(tea.checked==true){
              $scope.allval= ($scope.allval *100 + (tea.product.price * 10) * Number(tea.num) * (tea.product.discount * 10)) / 100;
              if(tea.product.isFree==1){
                free = 1;
              }
              frei+=tea.product.postage;
            }
          })
          if(free == 0){
            $scope.freight+=frei;
          }
        });  
    },true);
    $scope.checkAll = function(){
      if($scope.allcheck==true){
        $scope.carts.forEach(function(teasaler){
          teasaler.checked = true;
          teasaler.list.forEach(function(tea){
            tea.checked = true;
          })
        });
      }
      else{
        $scope.carts.forEach(function(teasaler){
          teasaler.checked = false;
          teasaler.list.forEach(function(tea){
            tea.checked = false;
          })
        });
      }
    };
    function iszip(obj){
      var reg= /^[1-9][0-9]{5}$/;
        if(obj == null || obj.length!=6 || !obj.match(reg)){
          return false;
        }
        return true;
    }
    function isphone(obj){
      var reg=/^1[0-9]{10}/;
      if(obj == null || obj.length!=11 || !obj.match(reg)){
        return false;
      }
      return true;
    }
    $scope.checkSaler = function(teasaler){
      if(teasaler.checked==true){
        teasaler.list.forEach(function(tea){
          tea.checked =true;
        })
      }
      else{
        teasaler.list.forEach(function(tea){
          tea.checked = false;
        })
      }
    }
    $scope.remove = function(tea){
      console.log(tea.id);
      var data = [{id:tea.id}];
      var reqdelete = {
        method: 'PUT',
        url: '/api/carts/delete',
        data:data      
      }; 
      $http(reqdelete).then(function (res) {
        console.log(res);
        alert("删除成功");
        var pos = 0;
        for(var i = 0;i<$scope.carts.length;i++){
          var tealist = $scope.carts[i].list;
          for(var j = 0;j<tealist.length;j++){
            if(tealist[j].id==tea.id){
              if(tealist.length==1){
                $scope.carts.splice(i,1);
                return;
              }
              else{
                $scope.carts[i].list.splice(j,1);
                return;
              }
            }            
          }
        }
      });  
    };
    $scope.addnum = function(tea){
      tea.num++;
    };
    $scope.decnum = function(tea){
      if(tea.num > tea.product.startNum){
        tea.num--;
      }
      else{
        alert("购买数量不应低于最低数量");        
      }
    };
    $scope.submit = function(){
      var data = [];
      var flag = 0;
      if($scope.user.zip.length==0||$scope.user.address.length==0||$scope.user.nickname.length==0||$scope.user.tel.length==0){
          alert("请输入所有信息");
      }
      else{
        if(!iszip($scope.user.zip)){
          alert("邮编格式错误");
        }
        else{
          if(!isphone($scope.user.tel)){
            alert("电话格式错误");
          }
          else{
            $scope.carts.forEach(function(teasaler){
              var salerdata = {
                teaSalerId:teasaler.teaSaler.id,
                customerId:$scope.currentUser.id,
                name:$scope.user.nickname,
                address:$scope.user.address,
                zip:$scope.user.zip,
                tel:$scope.user.tel,
                type:0,
                createOrderItemModels:[]
              }
              teasaler.list.forEach(function(tea){
                if(tea.checked==true){
                  if(tea.num<tea.product.startNum){
                    tea.num = tea.product.startNum;
                    if(flag==0){
                      alert("购买数量不应低于最低数量");
                      flag = 1;
                    }
                    return;
                  }
                  else{
                    salerdata.createOrderItemModels.push({productId:tea.product.id, num:tea.num});              
                  }
                }            
              });
              if(salerdata.createOrderItemModels.length!=0){
                data.push(salerdata);
              }
            });
            if(flag==0){
              if(data.length!=0){
                var reqAdd = {
                  method: 'POST',
                  url: '/api/orders/add',
                  data: JSON.stringify(data)
                };
                $http(reqAdd).then(function(res){
                  if(res.data.code==200){
                    alert("购买成功");
                    console.log(res);
                    $state.go('main.purchase');            
                  }
                  else{
                    alert(res.data.data.msg);
                  }
                });          
              }
              else{
                alert("请选择商品");
              }
            }            
          }
        }
      }
    }
});