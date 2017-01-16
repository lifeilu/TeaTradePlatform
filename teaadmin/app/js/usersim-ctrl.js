/**
 * Created by lulifei on 17/1/11.
 */
angular.module('myApp')
    .controller('UserSimCtrl', function ($scope, $http,$location,baseUrl,$rootScope) {
        var currentUser = localStorage['user'];
        if(currentUser == null) {
            $location.path('/');
        }
        $scope.logout = function(){
            var r = confirm("确认退出？");
            if (r == true) {
                delete localStorage['user'];
                $location.path('/');
            }
            else{
                console.log('取消退出');
            }
        }

        $scope.rowCollection = [];
        var reqAdd = {
            method: 'GET',
            url: baseUrl + '/api/statistics/countSim'
        };
        $http(reqAdd)
            .success(function (data, config, status) {
                if (data.data) {
                    $scope.rowCollection = data.data.content;
                    console.log($scope.rowCollection);
                    $scope.drawSimChart();
                    // alert('success!');
                }
                else {
                    alert('网络错误，请重试'+ data.data.code);
                }
            }).error(function (data) {
                console.log(data)
                alert('网络错误' );
        });


$scope.drawSimChart = function() {

    // function parseSim(sim) {
    //     for (var key in sim) {
    //         return {'key': key, 'value': sim[key]}
    //     }
    // }
    // var data = [];
    //
    // for (var key in  $scope.rowCollection) {
    //     for (var j = 0; j < $scope.rowCollection[key].length; j++) {
    //         var temp1 = parseSim($scope.rowCollection[key][j]);
    //         // console.log(temp1);
    //         data.push([key, temp1.key, temp1.value]);
    //     }
    // }

    var data = [];
    var map = {};
    for(var key in  $scope.rowCollection){
        map[ $scope.rowCollection[key].myname] = key;
        for(var j = 0; j <  $scope.rowCollection[key].content.length; j++){
            data.push([ $scope.rowCollection[key].myname,  $scope.rowCollection[key].content[j].name, parseFloat( $scope.rowCollection[key].content[j].sim)]);
        }
    }

    // var colors = {
    //     "1": "#da4480"
    //     , "2": "#5ab449"
    //     , "3": "#7f5acd"
    //     , "4": "#aab740"
    //     , "5": "#ce58c0"
    //     , "6": "#50a26e"
    //     , "7": "#d1434b"
    //     , "8": "#45c0bc"
    //     , "9": "#ce5929"
    //     , "10": "#4e7bda"
    //     , "11": "#d49d3c"
    //     , "Norwich City": "#6660a3"
    //     , "Southampton": "#7b853c"
    //     , "Stoke City": "#b58dde"
    //     , "Sunderland": "#97622e"
    //     , "Swansea City": "#609dd6"
    //     , "Tottenham": "#e29074"
    //     , "Watford": "#9c4b88"
    //     , "West Bromwich": "#ab505f"
    //     , "West Ham Utd": "#dc85b6"
    // };


    var colors = [
        "#da4480"
        ,"#5ab449"
        ,"#7f5acd"
        ,"#aab740"
        ,"#ce58c0"
        ,"#50a26e"
        ,"#d1434b"
        ,"#45c0bc"
        ,"#ce5929"
        ,"#4e7bda"
        ,"#d49d3c"
        ,"#6660a3"
        ,"#7b853c"
        ,"#b58dde"
        ,"#97622e"
        ,"#609dd6"
        ,"#e29074"
        ,"#9c4b88"
        ,"#ab505f"
        ,"#dc85b6"
    ];


    var sortOrder = [
        "Arsenal"
        , "Aston Villa"
        , "Bournemouth"
        , "Chelsea"
        , "Crystal Palace"
        , "Everton"
        , "Leicester City"
        , "Liverpool"
        , "Manchester City"
        , "Manchester Utd"
        , "Newcastle Utd"
        , "Norwich City"
        , "Southampton"
        , "Stoke City"
        , "Sunderland"
        , "Swansea City"
        , "Tottenham"
        , "Watford"
        , "West Bromwich"
        , "West Ham Utd"
    ];

    function sort(a, b) {
        return d3.ascending(sortOrder.indexOf(a), sortOrder.indexOf(b));
    }

    var ch = viz.ch().data(data)
        .padding(.01)
        .sort(sort)
        .innerRadius(215)
        .outerRadius(225)
        .duration(1000)
        .chordOpacity(0.3)
        .labelPadding(.03)
        .fill(function (d) {
            // return colors[d];
            return colors[map[d] % colors.length];
        });

    // var width = 1200, height = 1100;

    var width = 600, height = 550;


    var svg = d3.select("#sim").append("svg").attr("height", height).attr("width", width);

    svg.append("g").attr("transform", "translate(300,275)").call(ch);

// adjust height of frame in bl.ocks.org
    d3.select(self.frameElement).style("height", height + "px").style("width", width + "px");
}



    });