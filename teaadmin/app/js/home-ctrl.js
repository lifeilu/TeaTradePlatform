/**
 * Created by lulifei on 16/12/6.
 */

angular.module('myApp')
    .controller('HomeCtrl', function ($scope,$http,$location,baseUrl) {
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

       $scope.addClass = function(){
           var aLi = document.getElementById('ad').getElementsByTagName("li");
           var i = 0;
           for (i = 0; i < aLi.length; i++){
               aLi[i].onclick = function (){
                   for (i = 0; i < aLi.length; i++) aLi[i].className = aLi[i].className.replace(/\s?active/,"");
                   this.className += " active";
               };
           }
       };
       $scope.toggleCtrl = function() {
           alert('changeView');
           $scope.list1 = ! $scope.list1;
            // var x = document.getElementById('list1');
            // if (x.style.display === 'none') {
            //     x.style.display = 'block';
            // } else {
            //     x.style.display = 'none';
            // }
        };


$scope.mybubble = function () {
    console.log('enter bubble');

var w = window.innerWidth*0.68*0.95;
        var oR = w/(1+3*nTop);
        var h = Math.ceil(w/nTop*2);
        var nTop = 0;
        var svgContainer = d3.select("#mainBubble")
        svgContainer.style("height",h+"px");


        var svg = d3.select("#mainBubble").append("svg")
            .attr("class", "mainBubbleSVG")
            .attr("width", w)
            .attr("height",h)
            .on("mouseleave", function() {return resetBubbles();});
//    svg.attr("width", w);
//    svg.attr("height",h);

//    var mainNote = svg.append("text")
//        .attr("id", "bubbleItemNote")
//        .attr("x", 10)
//        .attr("y",h-15)
////        .attr("y", w/2-15)
//        .attr("font-size", 12)
//        .attr("dominant-baseline", "middle")
//        .attr("alignment-baseline", "middle")
//        .style("fill", "#888888")
//        .text(function(d) {return "";});


//    d3.select("#bubbleItemNote").text("茶行天下管理员端功能包括：用户管理、订单管理、产品类型管理、数据分析");

        var t = svg.transition()
            .duration(650);

        t.selectAll(".topBubble")
            .attr("r", function(d) { return oR; })
            .attr("cx", function(d, i) {return oR*(3*(1+i)-1);})
            .attr("cy", (h+oR)/3);
        t.selectAll(".topBubbleText")
            .attr("font-size", 30)
            .attr("x", function(d, i) {return oR*(3*(1+i)-1);})
            .attr("y", (h+oR)/3);

        for(var k = 0; k < nTop; k++)
        {
            t.selectAll(".childBubbleText" + k)
                .attr("x", function(d,i) {return (oR*(3*(k+1)-1) + oR*1.5*Math.cos((i-1)*45/180*3.1415926));})
                .attr("y", function(d,i) {return ((h+oR)/3 +        oR*1.5*Math.sin((i-1)*45/180*3.1415926));})
                .attr("font-size", 6)
                .style("opacity",0.5);
            t.selectAll(".childBubble" + k)
                .attr("r",  function(d) {return oR/3.0;})
                .style("opacity",0.5)
                .attr("cx", function(d,i) {return (oR*(3*(k+1)-1) + oR*1.5*Math.cos((i-1)*45/180*3.1415926));})
                .attr("cy", function(d,i) {return ((h+oR)/3 +        oR*1.5*Math.sin((i-1)*45/180*3.1415926));});

        }

        var t = svg.transition()
            .duration(650);

        t.selectAll(".topBubble")
            .attr("r", function(d) { return oR; })
            .attr("cx", function(d, i) {return oR*(3*(1+i)-1);})
            .attr("cy", (h+oR)/3);
        t.selectAll(".topBubbleText")
            .attr("font-size", 30)
            .attr("x", function(d, i) {return oR*(3*(1+i)-1);})
            .attr("y", (h+oR)/3);

        for(var k = 0; k < nTop; k++)
        {
            t.selectAll(".childBubbleText" + k)
                .attr("x", function(d,i) {return (oR*(3*(k+1)-1) + oR*1.5*Math.cos((i-1)*45/180*3.1415926));})
                .attr("y", function(d,i) {return ((h+oR)/3 +        oR*1.5*Math.sin((i-1)*45/180*3.1415926));})
                .attr("font-size", 6)
                .style("opacity",0.5);
            t.selectAll(".childBubble" + k)
                .attr("r",  function(d) {return oR/3.0;})
                .style("opacity",0.5)
                .attr("cx", function(d,i) {return (oR*(3*(k+1)-1) + oR*1.5*Math.cos((i-1)*45/180*3.1415926));})
                .attr("cy", function(d,i) {return ((h+oR)/3 +        oR*1.5*Math.sin((i-1)*45/180*3.1415926));});

        }


        d3.json("../main_bubble.json", function(error, root) {
            console.log(error);

            var bubbleObj = svg.selectAll(".topBubble")
                .data(root.children)
                .enter().append("g")
                .attr("id", function(d,i) {return "topBubbleAndText_" + i});

            console.log(root);
            nTop = root.children.length;
            oR = w/(1+3*nTop);
            h = Math.ceil(w/nTop*2);
            svgContainer.style("height",h+"px");

            var colVals = d3.scale.category10();

            bubbleObj.append("circle")
                .attr("class", "topBubble")
                .attr("id", function(d,i) {return "topBubble" + i;})
                .attr("r", function(d) { return oR; })
                .attr("cx", function(d, i) {return oR*(3*(1+i)-1);})
                .attr("cy", (h+oR)/3)
                .style("fill", function(d,i) { return colVals(i); }) // #1f77b4
                .style("opacity",0.3)
                .on("mouseover", function(d,i) {return activateBubble(d,i);});


            bubbleObj.append("text")
                .attr("class", "topBubbleText")
                .attr("x", function(d, i) {return oR*(3*(1+i)-1);})
                .attr("y", (h+oR)/3)
                .style("fill", function(d,i) { return colVals(i); }) // #1f77b4
                .attr("font-size", 12)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")
                .attr("alignment-baseline", "middle")
                .text(function(d) {return d.name})
                .on("mouseover", function(d,i) {return activateBubble(d,i);});


            for(var iB = 0; iB < nTop; iB++)
            {
                var childBubbles = svg.selectAll(".childBubble" + iB)
                    .data(root.children[iB].children)
                    .enter().append("g");

                //var nSubBubble = Math.floor(root.children[iB].children.length/2.0);

                childBubbles.append("circle")
                    .attr("class", "childBubble" + iB)
                    .attr("id", function(d,i) {return "childBubble_" + iB + "sub_" + i;})
                    .attr("r",  function(d) {return oR/3.0;})
                    .attr("cx", function(d,i) {return (oR*(3*(iB+1)-1) + oR*1.5*Math.cos((i-1)*45/180*3.1415926));})
                    .attr("cy", function(d,i) {return ((h+oR)/3 +        oR*1.5*Math.sin((i-1)*45/180*3.1415926));})
                    .attr("cursor","pointer")
                    .style("opacity",0.5)
                    .style("fill", "#eee")
                    .on("click", function(d,i) {
                        // window.open(d.address);
                        window.open(d.address, '_self');

                    })
                    .on("mouseover", function(d,i) {
                        //window.alert("say something");
                        var noteText = "";
                        if (d.note == null || d.note == "") {
                            noteText = d.address;
                        } else {
                            noteText = d.note;
                        }
                        d3.select("#bubbleItemNote").text(noteText);
                    })
                    .append("svg:title")
                    .text(function(d) { return d.address; });
                childBubbles.append("text")
                    .attr("class", "childBubbleText" + iB)
                    .attr("x", function(d,i) {return (oR*(3*(iB+1)-1) + oR*1.5*Math.cos((i-1)*45/180*3.1415926));})
                    .attr("y", function(d,i) {return ((h+oR)/3 +        oR*1.5*Math.sin((i-1)*45/180*3.1415926));})
                    .style("opacity",0.5)
                    .attr("text-anchor", "middle")
                    .style("fill", function(d,i) { return colVals(iB); }) // #1f77b4
                    .attr("font-size", 6)
                    .attr("cursor","pointer")
                    .attr("dominant-baseline", "middle")
                    .attr("alignment-baseline", "middle")
                    .text(function(d) {return d.name})
                    .on("click", function(d,i) {
//                    window.location.href(d.address);
                        window.open(d.address, '_self');
//                    window.open(d.address);
                    });
            }

        });

        resetBubbles = function () {
            w = window.innerWidth*0.68*0.95;
            oR = w/(1+3*nTop);

            h = Math.ceil(w/nTop*2);
            svgContainer.style("height",h+"px");
//        mainNote.attr("y",h-15);

            svg.attr("width", w);
            svg.attr("height",h);

//        d3.select("#bubbleItemNote").text("茶行天下管理员端功能包括：用户管理、订单管理、产品类型管理、数据分析");

            var t = svg.transition()
                .duration(650);

            t.selectAll(".topBubble")
                .attr("r", function(d) { return oR; })
                .attr("cx", function(d, i) {return oR*(3*(1+i)-1);})
                .attr("cy", (h+oR)/3);
            t.selectAll(".topBubbleText")
                .attr("font-size", 30)
                .attr("x", function(d, i) {return oR*(3*(1+i)-1);})
                .attr("y", (h+oR)/3);

            for(var k = 0; k < nTop; k++)
            {
                t.selectAll(".childBubbleText" + k)
                    .attr("x", function(d,i) {return (oR*(3*(k+1)-1) + oR*1.5*Math.cos((i-1)*45/180*3.1415926));})
                    .attr("y", function(d,i) {return ((h+oR)/3 +        oR*1.5*Math.sin((i-1)*45/180*3.1415926));})
                    .attr("font-size", 6)
                    .style("opacity",0.5);
                t.selectAll(".childBubble" + k)
                    .attr("r",  function(d) {return oR/3.0;})
                    .style("opacity",0.5)
                    .attr("cx", function(d,i) {return (oR*(3*(k+1)-1) + oR*1.5*Math.cos((i-1)*45/180*3.1415926));})
                    .attr("cy", function(d,i) {return ((h+oR)/3 +        oR*1.5*Math.sin((i-1)*45/180*3.1415926));});

            }
        }


        function activateBubble(d,i) {
            // increase this bubble and decrease others
            var t = svg.transition()
                .duration(d3.event.altKey ? 7500 : 350);

            t.selectAll(".topBubble")
                .attr("cx", function(d,ii){
                    if(i == ii) {
                        // Nothing to change
                        return oR*(3*(1+ii)-1) - 0.6*oR*(ii-1);
                    } else {
                        // Push away a little bit
                        if(ii < i){
                            // left side
                            return oR*0.6*(3*(1+ii)-1);
                        } else {
                            // right side
                            return oR*(nTop*3+1) - oR*0.6*(3*(nTop-ii)-1);
                        }
                    }
                })
                .attr("r", function(d, ii) {
                    if(i == ii)
                        return oR*1.8;
                    else
                        return oR*0.8;
                });

            t.selectAll(".topBubbleText")
                .attr("x", function(d,ii){
                    if(i == ii) {
                        // Nothing to change
                        return oR*(3*(1+ii)-1) - 0.6*oR*(ii-1);
                    } else {
                        // Push away a little bit
                        if(ii < i){
                            // left side
                            return oR*0.6*(3*(1+ii)-1);
                        } else {
                            // right side
                            return oR*(nTop*3+1) - oR*0.6*(3*(nTop-ii)-1);
                        }
                    }
                })
                .attr("font-size", function(d,ii){
                    if(i == ii)
                        return 30*1.5;
                    else
                        return 30*0.6;
                });

            var signSide = -1;
            for(var k = 0; k < nTop; k++)
            {
                signSide = 1;
                if(k < nTop/2) signSide = 1;
                t.selectAll(".childBubbleText" + k)
                    .attr("x", function(d,i) {return (oR*(3*(k+1)-1) - 0.6*oR*(k-1) + signSide*oR*2.5*Math.cos((i-1)*45/180*3.1415926));})
                    .attr("y", function(d,i) {return ((h+oR)/3 + signSide*oR*2.5*Math.sin((i-1)*45/180*3.1415926));})
                    .attr("font-size", function(){
                        return (k==i)?12:6;
                    })
                    .style("opacity",function(){
                        return (k==i)?1:0;
                    });

                t.selectAll(".childBubble" + k)
                    .attr("cx", function(d,i) {return (oR*(3*(k+1)-1) - 0.6*oR*(k-1) + signSide*oR*2.5*Math.cos((i-1)*45/180*3.1415926));})
                    .attr("cy", function(d,i) {return ((h+oR)/3 + signSide*oR*2.5*Math.sin((i-1)*45/180*3.1415926));})
                    .attr("r", function(){
                        return (k==i)?(oR*0.55):(oR/3.0);
                    })
                    .style("opacity", function(){
                        return (k==i)?1:0;
                    });
            }
        }

        window.onresize = resetBubbles;
    }
    $scope.mybubble();
});