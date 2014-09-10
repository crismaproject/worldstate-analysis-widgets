angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
    ).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.indicatorBarChartDirectiveController',
    [
        '$scope',
        'de.cismet.crisma.ICMM.Worldstates',
        function ($scope, WorldstateService) {
            'use strict';
            var ctrl;
            ctrl = this;
            $scope.chartModels = [[
                    {
                        "key": "Series 1",
                        "values": [['ws1', 10], ['ws2', 20], ['ws3', 30], ['ws4', 40]]
                    }], [{
                        "key": "Series 2",
                        "values": [['ws1', 10], ['ws2', 20], ['ws3', 30], ['ws4', 40]]
                    }]
            ];



            this.createChartModels = function () {
                var i, indicatorMap, indicators, indicatorGroup, indicatorGroupProp, indicatorProp, indicatorSet;
                indicatorMap = {};
                for (i = 0; i < $scope.worldstates.length; i++) {
                    indicators = WorldstateService.utils.stripIccData([$scope.worldstates[i]])[0].data;
                    for (indicatorGroupProp in indicators) {
                        if (indicators.hasOwnProperty(indicatorGroupProp)) {
                            indicatorGroup = indicators[indicatorGroupProp];
                            for (indicatorProp in indicatorGroup) {
                                if (indicatorGroup.hasOwnProperty(indicatorProp) && indicatorProp !== 'displayName' && indicatorProp !== 'iconResource') {
                                    if (!indicatorMap[indicatorProp]) {
                                        indicatorMap[indicatorProp] = {
                                            key: indicatorGroup[indicatorProp].displayName,
                                            forceY: [0, 0],
                                            values: []
                                        };
                                    }
                                    if (parseInt(indicatorGroup[indicatorProp].value) > indicatorMap[indicatorProp].forceY) {
                                        indicatorMap[indicatorProp].forceY[1] = parseInt(indicatorGroup[indicatorProp].value);
                                    }
                                    indicatorMap[indicatorProp].values.push([$scope.worldstates[i].name, parseInt(indicatorGroup[indicatorProp].value)]);
                                }
                            }
                        }
                    }
                }
                var a = [];
                for (indicators in indicatorMap) {
                    if (indicatorMap.hasOwnProperty(indicators)) {
                        a.push([indicatorMap[indicators]]);
                    }
                }
                $scope.chartModels = a;
            };

            var colorCategory = d3.scale.category20().range();
            $scope.colorFunction = function () {
                return function (d, i) {
                    return colorCategory[i % colorCategory.length];
                };
            };
            
            
            $scope.getLegendColor = function($index){
                return {
                    'color':$scope.colorFunction()(0,$index)
                }
            };

            $scope.$watch('worldstates', function () {
                if ($scope.worldstates && $scope.worldstates.length > 0) {
                    ctrl.createChartModels();
                }
            }, true);
        }
    ]
    );



