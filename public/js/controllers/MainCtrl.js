/**
 * Created by William on 10/29/17.
 */
angular.module('MainCtrl', []).controller('MainController', function($scope, $http, $uibModal) {

    $scope.formData = {};
    $http.get('/info')
        .then(function(data){
                $scope.genderModel = data.data[0];
                $scope.raceModel = data.data[1];
                $scope.ageModel = data.data[2];
            }, function(error){
                    console.log('Error: ' + error);
                });

    $scope.queryDisease = function() {
       // console.log($scope.formData);
        $http.post('/queryDisease', $scope.formData)
            .then(function(data){
            // clear the formdata
                // $scope.formData = {};
                $scope.queryResult = [data.data];
                console.log(data);
            }, function(error){
                console.log('Error: ' + error);
            });

    };

    $scope.showRelation = function(relation) {
        // show the related diseases and weight by sigmajs or d3.js
        // first execute the query to get the result

        console.log('called');
        $http.get('miserables.json').then(function(response) {
            $scope.data = response.data;
            console.log($scope.data);
        });

    }

   // $scope.data = '123';
    $scope.showDialog = function(event) {
        console.log('opening dialog');
        console.log(event);
        var modalInstance = $uibModal.open({
            templateUrl: 'dialog.html',
        });
    };

}).directive('graphVisualization', function($uibModal) {
    // constants
    var margin = 20,
        width = 800,
        height = 500 - .5 - margin;
       // color = d3.interpolateRgb("#f77", "#77f");

    return {
        restrict: 'E',
        scope: {
            val: '='
        },
        link: function (scope, element) {
        console.log(element);
            var svg = d3.select(element[0])
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .call(d3.zoom().on("zoom", function () {
                    svg.attr("transform", d3.event.transform)
                }))
                .append("g")

          //  var color = d3.scaleOrdinal(d3.schemeCategory20);

         //   var simulation = d3.forceSimulation()
          //      .force("link", d3.forceLink().distance(10).strength(0.5))
          //      .force("charge", d3.forceManyBody())
          //      .force("center", d3.forceCenter(width / 2, height / 2));

            scope.$watch('val', function(graph, scope) {

                var color = d3.scaleOrdinal(d3.schemeCategory20);

                var simulation = d3.forceSimulation()
                    .force("link", d3.forceLink().distance(10).strength(0.5))
                    .force("charge", d3.forceManyBody())
                    .force("center", d3.forceCenter(width / 2, height / 2));
                svg.selectAll('*').remove();
                //   d3.json("miserables.json", function(error, graph) {
                if (!graph) {
                    return ;
                }

                var nodes = graph.nodes,
                    nodeById = d3.map(nodes, function (d) {
                        return d.id;
                    }),
                    links = graph.links,
                    bilinks = [];

                links.forEach(function (link) {
                    var s = link.source = nodeById.get(link.source),
                        t = link.target = nodeById.get(link.target),
                        i = {}; // intermediate node
                    nodes.push(i);
                    links.push({source: s, target: i}, {source: i, target: t});
                    bilinks.push([s, i, t]);
                });

                var link = svg.selectAll(".link")
                    .data(bilinks)
                    .enter().append("path")
                    .attr("class", "link");
/*
                var node = svg.selectAll(".node")
                    .data(nodes.filter(function (d) {
                        return d.id;
                    }))
                    .enter().append("circle")
                    .attr("class", "node")
                    .attr("r", 5)
                    .attr("fill", function (d) {
                        return color(d.group);
                    })
                    .call(d3.drag()
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended));
*/

                var tooltip = d3.select("body")
                    .append("div")
                    .style("visibility", "hidden")
                    .style("position", "absolute")
                    .style("z-index", "10")
                    .text(function (d) {
                        return "tooltip";
                    });

                var node = svg.selectAll(".node")
                    .data(nodes.filter(function (d) {
                        return d.id;
                    }))
                    .enter().append("g")
                    .attr("class", "node")
                    .on("mouseover", function(d) {
                        d3.select(this).select("circle").transition()
                            .duration(750)
                            .attr("r", 10);
                        tooltip.text(d.id);
                        tooltip.style("visibility", "visible");

                        return tooltip.style("top", (event.pageY-10)+"px")
                                      .style("left",(event.pageX+10)+"px");
                    })
                    .on("click", function(d) {
                        // scope.showDialog(d);
                        // show the details of disease or care team??
                        var modalInstance = $uibModal.open({
                            templateUrl: 'dialog',
                        }).result.then(function(){}, function(res){});
                    })
                    .on("mouseout", function(d) {
                        d3.select(this).select("circle").transition()
                            .duration(750)
                            .attr("r", 8);
                        tooltip.style("visibility", "hidden");
                    })
                    .call(d3.drag()
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended));

                node.append("circle")
                    .attr("r", 8)
                    .attr("fill", function (d) {
                        return color(d.group);
                    });
                node.append("title")
                    .text(function (d) {
                        return d.id;
                    });


                // add text to show the name near the node
                /*node.append("text")
                    .attr("dy", function(d) {
                        return -3;
                    })
                    .text(function(d){
                        return d.id;
                    });
                    */
                simulation
                    .nodes(nodes)
                    .on("tick", ticked);

                simulation.force("link")
                    .links(links);

                function ticked() {
                    link.attr("d", positionLink);
                    node.attr("transform", positionNode);
                }
                //    });
                function positionLink(d) {
                    //     console.log('link');
                    return "M" + d[0].x + "," + d[0].y
                        + "S" + d[1].x + "," + d[1].y
                        + " " + d[2].x + "," + d[2].y;
                }

                function positionNode(d) {
                    //   console.log('node');
                    return "translate(" + d.x + "," + d.y + ")";
                }

                function dragstarted(d) {
                    //  console.log('dragestart');
                    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                    d.fx = d.x, d.fy = d.y;
                }

                function dragged(d) {
                    //  console.log('draged');
                    d.fx = d3.event.x, d.fy = d3.event.y;
                }

                function dragended(d) {
                    //   console.log('dragend');
                    if (!d3.event.active) simulation.alphaTarget(0);
                    d.fx = null, d.fy = null;
                }

            })


        }
    };


});