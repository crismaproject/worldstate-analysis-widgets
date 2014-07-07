angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
    ).directive(
    'criteriaRadar',
    [
        'de.cismet.crisma.ICMM.Worldstates',
        '$timeout',
        function (WorldstateService, $timeout) {
            'use strict';

            var scope, defaultCfg, legendSize;

            defaultCfg = {
                radius: 5,
                w: 500,
                h: 500,
                factor: 1,
                factorLegend: .85,
                levels: 3,
                maxValue: 0,
                radians: 2 * Math.PI,
                opacityArea: 0.5,
                ToRight: 5,
                TranslateX: 80,
                TranslateY: 30,
                ExtraWidthX: 100,
                ExtraWidthY: 100,
                color: d3.scale.category10()
            };
            legendSize = 0.25;
            scope = {
                worldstates: '=',
                selector: '@'
            };

            return {
                scope: scope,
                restrict: 'A',
//                templateUrl: 'templates/indicatorCriteriaTableTemplate.html',
//                controller: 'eu.crismaproject.worldstateAnalysis.controllers.criteriaRadarChartDirectiveController',
                link: function (scope, elem) {
                    var dataVector, convertToChartDataStructure, chartData,
                        LegendOptions = [];

                    convertToChartDataStructure = function (criteriaVector) {
                        var i, criteriaData, groupName, group, criteriaProp,
                            criteria, result, dataItem;
                        var result = [];
                        LegendOptions = [];
                        for (i = 0; i < criteriaVector.length; i++) {
                            dataItem = [];
                            criteriaData = criteriaVector[i].data;
                            LegendOptions.push(criteriaVector[i].name);
                            for (groupName in criteriaData) {
                                group = criteriaData[groupName];
                                for (criteriaProp in group) {
                                    if (criteriaProp !== 'displayName' && criteriaProp !== 'iconResource') {
                                        criteria = group[criteriaProp];
                                        dataItem.push({
                                            axis: criteria.displayName,
                                            value: criteria.value
                                        });
                                    }
                                }
                            }
                            result.push(dataItem);
                        }
                        return result;
                    };
                    scope.$watch('worldstates', function (newVal, oldVal) {
                        var w = elem.width(), h = elem.width(), colorscale = d3.scale.category10();
                        if (newVal != oldVal) {
                            if (scope.worldstates && scope.worldstates.length > 0) {
                                // we are only interest in criteria data
                                dataVector = WorldstateService.utils.stripIccData(scope.worldstates, true);
                                // remove everything from the element...
                                elem.removeData();
                                elem.empty();
                                elem[0].empty;
                                chartData = convertToChartDataStructure(dataVector);
                                var mycfg = {
                                    w: elem.width() - (elem.width() * legendSize),
                                    h: elem.width() - (elem.width() * legendSize),
                                    maxValue: 0.6,
                                    levels: 4,
                                }

                                var divNode = d3.select(elem[0]).append('div')
//                                    .attr('class','col-lg-6')
//                                    .attr('style','float:left')
                                    .attr('width', '100%')
                                    .attr('heigth', '100%')
//                                    .attr('viewBox','0 0 100 100')
                                    .node();
                                RadarChart.draw(divNode, chartData, mycfg);
                                var svg = d3.select(elem[0])
//                                    .select('svg')
                                    .append('div')
//                                    .attr('style','float:left')
                                    .append('svg')
                                    .attr("width", (w))
                                    .attr("height", (w))
//                                    .attr('x', mycfg.w)
//                                    
                                //Create the title for the legend
//                                var text = svg.append("text")
//                                    .attr("class", "title")
////                                    .attr('transform', 'translate(90,0)')
//                                    .attr("x", 10)
//                                    .attr("y", 10)
//                                    .attr("font-size", "12px")
//                                    .attr("fill", "#404040")
//                                    .text("Worldstates");

                                //Initiate Legend	
                                var legendContainer = svg.append("g")
                                    .attr("class", "legend")
                                    .attr("height", w - 10)
                                    .attr("width", w - 10)
//                                    .attr('transform', 'translate(0,20)')
                                    ;
                                //Create colour squares
                                var rects = legendContainer.selectAll('rect')
                                    .data(LegendOptions)
                                    .enter()
                                    .append("rect")
                                    .attr("y", 15)
                                    .attr("x", function (d, i) {
                                        return i * 20;
                                    })
                                    .attr("width", 10)
                                    .attr("height", 10)
                                    .style("fill", function (d, i) {
                                        return colorscale(i);
                                    })
                                    ;
                                //Create text next to squares
                                var labels = legendContainer.selectAll('text')
                                    .data(LegendOptions)
                                    .enter()
                                    .append("text")
                                    .attr("y", 24)
                                    .attr("x", function (d, i) {
                                        return i * 30 + 15;
                                    })
                                    .attr("font-size", "11px")
                                    .attr("fill", "#737373")
                                    .text(function (d) {
                                        return d;
                                    });

//                               
                                var xOff = [0];
                                var yOff = 0;
                                var xCorr = 0;
                                labels.attr('transform', function (data, i) {
                                    var width = d3.select(this).node().getBBox().width;
                                    var oldXOff = xOff.reduce(function (prev, curr) {
                                        return prev + curr;
                                    });
                                    xOff.push(width);
                                    if (oldXOff + width -xCorr> w) {
                                        yOff += 20;
                                        xCorr = oldXOff + i * 30;
                                    }
                                    var off = oldXOff - xCorr;
                                    var res = 'translate(' + off + ',' + yOff + ')';
                                    return res;
                                });

                                yOff = 0;
                                xCorr = 0;
                                rects.attr('transform', function (data, i) {
                                    var off = xOff.reduce(function (prev, curr, index) {
                                        if (index - 1 < i) {
                                            return prev + curr;
                                        } else {
                                            return prev;
                                        }

                                    });
                                    if (off + xOff[i]-xCorr > w) {
                                        yOff += 20;
                                        xCorr = off + i * 30;
                                    }
                                    off = off -xCorr;
                                    off = off + i * 10;
                                    return 'translate(' + off + ','+yOff+')';
                                });
                            }
                        }

                    });
                }
            };
        }
    ]
    );