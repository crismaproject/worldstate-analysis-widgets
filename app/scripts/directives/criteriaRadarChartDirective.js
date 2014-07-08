angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
    ).directive(
    'criteriaRadar',
    [
        'de.cismet.crisma.ICMM.Worldstates',
        function (WorldstateService) {
            'use strict';

            var scope;
            scope = {
                localModel: '&worldstates'
            };

            return {
                scope: scope,
                restrict: 'A',
                link: function (scope, elem) {
                    var dataVector, convertToChartDataStructure, chartData,
                        LegendOptions = [], cfg, drawLegend;
                    //we want the chart to adjust to the size of the element it is placed in
                    cfg = {
                        w: elem.width(),
                        h: elem.width(),
                        maxValue: 100,
                        levels: 4
                    };

                    convertToChartDataStructure = function (criteriaVector) {
                        var i, criteriaData, groupName, group, criteriaProp,
                            criteria, result, dataItem;
                        result = [];
                        LegendOptions = [];
                        for (i = 0; i < criteriaVector.length; i++) {
                            dataItem = [];
                            criteriaData = criteriaVector[i].data;
                            LegendOptions.push(criteriaVector[i].name);
                            for (groupName in criteriaData) {
                                if (criteriaData.hasOwnProperty(groupName)) {
                                    group = criteriaData[groupName];
                                    for (criteriaProp in group) {
                                        if (group.hasOwnProperty(criteriaProp) &&
                                            criteriaProp !== 'displayName' &&
                                            criteriaProp !== 'iconResource') {
                                            criteria = group[criteriaProp];
                                            dataItem.push({
                                                axis: criteria.displayName,
                                                value: criteria.value
                                            });
                                        }
                                    }
                                }
                            }
                            result.push(dataItem);
                        }
                        return result;
                    };

                    drawLegend = function () {
                        var colorscale = d3.scale.category10();
                        var legendSvg = d3.select(elem[0])
                            .append('div')
                            .append('svg')
                            .attr('width', cfg.w)
                            .attr('height', 5);

                        //Initiate Legend
                        var legendContainer = legendSvg.append('g')
                            .attr('class', 'legend')
                            .attr('height', 5)
                            .attr('width', 50);

                        //Create colour squares
                        var rects = legendContainer.selectAll('rect')
                            .data(LegendOptions)
                            .enter()
                            .append('rect')
                            .attr('y', 15)
                            .attr('x', 0)
                            .attr('width', 10)
                            .attr('height', 10)
                            .style('fill', function (d, i) {
                                return colorscale(i);
                            });

                        //Create text next to squares
                        var labels = legendContainer.selectAll('text')
                            .data(LegendOptions)
                            .enter()
                            .append('text')
                            .attr('y', 24)
                            .attr('x', 0)
                            .attr('font-size', '11px')
                            .attr('fill', '#737373')
                            .text(function (d) {
                                return d;
                            });

//                      we need to adjust the position of the legend labels
//                      and break the line if necessary
                        var labelWidthHistory = [];
                        var labelWidth = [];
                        var breakIndex = 0;
                        var yOff = 0;
                        labels.attr('transform', function (data, i) {
                            var width = d3.select(this).node().getBBox().width;
                            var sumLabelWidth = labelWidth.reduce(function (prev, curr) {
                                return prev + curr;
                            }, 0);

                            labelWidth.push(width);
                            labelWidthHistory.push(width);
                            var sumRectWidth = (i - breakIndex + 1) * 15;
                            var margin = (i - breakIndex) * 20;
                            var offset = sumLabelWidth + sumRectWidth + margin;

                            if (offset + width > cfg.w) {
                                yOff += 20;
                                breakIndex = i;
                                labelWidth = [width];
                                offset = 15;
                            }
                            return 'translate(' + offset + ',' + yOff + ')';
                        });

                        yOff = 0;
                        breakIndex = 0;
                        rects.attr('transform', function (data, i) {
                            var sumLabelWidth = labelWidthHistory.reduce(function (prev, curr, index) {
                                if (index < i && index >= breakIndex) {
                                    return prev + curr;
                                }
                                return prev;
                            }, 0);
                            var sumRectWidth = (i - breakIndex) * 15;
                            var margin = (i - breakIndex) * 20;
                            var offset = sumLabelWidth + sumRectWidth + margin;
                            if (offset + labelWidthHistory[i] > cfg.w) {
                                yOff += 20;
                                breakIndex = i;
                                offset = 0;
                            }
                            return 'translate(' + offset + ',' + yOff + ')';
                        });

                        //set the size of the legend containers correctly
                        legendSvg.attr('height', yOff + 50);
                        legendContainer.attr('height', yOff + 50);

                        //center the legend horizontally
                        legendContainer.attr('transform', function () {
                            var legendWidth = d3.select(this).node().getBBox().width;
                            var off = (cfg.w - legendWidth) / 2;
                            off = off < 0 ? 0 : off;
                            return 'translate(' + off + ',' + '0)';
                        });

                    };

                    scope.$watchCollection('localModel()', function (newVal, oldVal) {
                        // remove everything from the element...
                        elem.removeData();
                        elem.empty();
                        if (scope.localModel() && scope.localModel().length > 0) {
                            // we are only interest in criteria data
                            dataVector = WorldstateService.utils.stripIccData(scope.localModel(), true);
                            chartData = convertToChartDataStructure(dataVector);

                            var divNode = d3.select(elem[0]).append('div')
                                .attr('style', 'display:block;margin: 0 auto;')
                                .node();

                            RadarChart.draw(divNode, chartData, cfg);
                            drawLegend();
                        }
                    });
                }
            };
        }
    ]
    );