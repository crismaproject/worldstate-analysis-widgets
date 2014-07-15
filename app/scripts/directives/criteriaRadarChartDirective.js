angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
).directive(
    'criteriaRadar',
    [
        'de.cismet.crisma.ICMM.Worldstates',
        function (WorldstateService) {
            'use strict';

            var scope, linkFunction, drawLegend;
            scope = {
                localModel: '&worldstates'
            };

            drawLegend = function (elem, chartConfig, legendItems) {
                var colorscale, legendSvg, legendContainer, rects,
                    labelWidthHistory, labels, labelWidth, breakIndex, yOff;
                colorscale = d3.scale.category10();
                legendSvg = d3.select(elem[0])
                    .append('div')
                    .append('svg')
                    .attr('width', chartConfig.w)
                    .attr('height', 5);

                //Initiate Legend
                legendContainer = legendSvg.append('g')
                    .attr('class', 'legend')
                    .attr('height', 5)
                    .attr('width', 50);

                //Create colour squares
                rects = legendContainer.selectAll('rect')
                    .data(legendItems)
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
                labels = legendContainer.selectAll('text')
                    .data(legendItems)
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
                labelWidthHistory = [];
                labelWidth = [];
                breakIndex = 0;
                yOff = 0;
                labels.attr('transform', function (data, i) {
                    var width, sumLabelWidth, sumRectWidth, margin, offset;
                    width = d3.select(this).node().getBBox().width;
                    sumLabelWidth = labelWidth.reduce(function (prev, curr) {
                        return prev + curr;
                    }, 0);

                    labelWidth.push(width);
                    labelWidthHistory.push(width);
                    sumRectWidth = (i - breakIndex + 1) * 15;
                    margin = (i - breakIndex) * 20;
                    offset = sumLabelWidth + sumRectWidth + margin;

                    if (offset + width > chartConfig.w) {
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
                    var sumLabelWidth, sumRectWidth, margin, offset;
                    sumLabelWidth = labelWidthHistory.reduce(function (prev, curr, index) {
                        if (index < i && index >= breakIndex) {
                            return prev + curr;
                        }
                        return prev;
                    }, 0);
                    sumRectWidth = (i - breakIndex) * 15;
                    margin = (i - breakIndex) * 20;
                    offset = sumLabelWidth + sumRectWidth + margin;
                    if (offset + labelWidthHistory[i] > chartConfig.w) {
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
                    var legendWidth, off;
                    legendWidth = d3.select(this).node().getBBox().width;
                    off = (chartConfig.w - legendWidth) / 2;
                    off = off < 0 ? 0 : off;
                    return 'translate(' + off + ',' + '0)';
                });

            };

            linkFunction = function (scope, elem) {
                var dataVector, cfg, width,chartDataModel;
                //we want the chart to adjust to the size of the element it is placed in
                width = elem.width ? elem.width() : 200;
                cfg = {
                    w: width,
                    h: width,
                    maxValue: 100,
                    levels: 4
                };
                
                scope.$watchCollection('localModel()', function () {
                    // remove everything from the element...
                    elem.removeData();
                    elem.empty();
                    if (scope.localModel() && scope.localModel().length > 0) {
                        // we are only interest in criteria data
                        dataVector = WorldstateService.utils.stripIccData(scope.localModel(), true);
                        chartDataModel = scope.convertToChartDataStructure(dataVector);
                        scope.chartData = chartDataModel[0];
                        scope.legendItems=chartDataModel[1];

                        var divNode = d3.select(elem[0]).append('div')
                            .attr('style', 'display:block;margin: 0 auto;')
                            .node();

                        RadarChart.draw(divNode, scope.chartData, cfg);
                        drawLegend(elem, cfg,scope.legendItems);
                    }
                });
            };

            return {
                scope: scope,
                restrict: 'A',
                link: linkFunction,
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.CriteriaRadarChartDirectiveController'
            };
        }
    ]
);