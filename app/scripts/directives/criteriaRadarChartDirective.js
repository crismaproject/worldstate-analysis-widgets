angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
    ).directive(
    'criteriaRadar',
    [
        'de.cismet.crisma.ICMM.Worldstates',
        '$timeout',
        function (WorldstateService, $timeout) {
            'use strict';

            var scope, defaultCfg;

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
                        LegendOptions=[];
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
                        var w = 500, h = 500, colorscale = d3.scale.category10();
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
                                    w: w,
                                    h: h,
                                    maxValue: 0.6,
                                    levels: 4,
                                }
                                
                                var divNode = d3.select(elem[0]).append('div')
//                                    .attr('class','col-lg-6')
                                    .attr('style','float:left')
                                    .node();
                                RadarChart.draw(divNode, chartData, mycfg);
                                var svg = d3.select(elem[0])
//                                    .selectAll('svg')
                                    .append('div')
                                    .attr('style','float:left')
                                    .append('svg')
                                    .attr("width",250)
                                    .attr("height", h)

                                //Create the title for the legend
                                var text = svg.append("text")
                                    .attr("class", "title")
//                                    .attr('transform', 'translate(90,0)')
                                    .attr("x", 10)
                                    .attr("y", 10)
                                    .attr("font-size", "12px")
                                    .attr("fill", "#404040")
                                    .text("Worldstates");

                                //Initiate Legend	
                                var legend = svg.append("g")
                                    .attr("class", "legend")
                                    .attr("height", 100)
                                    .attr("width", 200)
                                    .attr('transform', 'translate(0,20)')
                                    ;
                                //Create colour squares
                                legend.selectAll('rect')
                                    .data(LegendOptions)
                                    .enter()
                                    .append("rect")
                                    .attr("x", 15)
                                    .attr("y", function (d, i) {
                                        return i * 20;
                                    })
                                    .attr("width", 10)
                                    .attr("height", 10)
                                    .style("fill", function (d, i) {
                                        return colorscale(i);
                                    })
                                    ;
                                //Create text next to squares
                                legend.selectAll('text')
                                    .data(LegendOptions)
                                    .enter()
                                    .append("text")
                                    .attr("x", 35)
                                    .attr("y", function (d, i) {
                                        return i * 20 + 9;
                                    })
                                    .attr("font-size", "11px")
                                    .attr("fill", "#737373")
                                    .text(function (d) {
                                        return d;
                                    })
                                    ;
                            }
                        }

                    });
                }
            };
        }
    ]
    );