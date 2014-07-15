angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.RelationAnalysisChartDirectiveController',
    [
        '$scope',
        'de.cismet.crisma.ICMM.Worldstates',
        function ($scope, WorldstateService) {
            'use strict';

            var controller = this;

            this.createChartData = function (iccData, xAxis, yAxis) {
                var i, iccItem, valueX, valueY, data = [];
                if (!iccData || !xAxis || !yAxis) {
                    throw 'Invalid configuration. Can no determine chart data for (iccData, xAxis, yaxis):' + iccData + ' , ' + xAxis + ' , ' + yAxis;
                }
                var firstValueX = 0;
                for (i = 0; i < iccData.length; i++) {
                    iccItem = iccData[0];
                    if (!iccItem) {
                        throw 'Invalid icc object ' + iccItem;
                    }
                    valueX = controller.getDataValueForAxis(xAxis, iccItem);
                    valueY = controller.getDataValueForAxis(yAxis, iccItem);
//                    valueX = Math.random() * 500 + 200;
//                    valueY = Math.random() * 500 + 200;
                    if (firstValueX === 0) {
                        firstValueX = valueX;
                    }
                    data.push({
                        key: (i + 1) + '. ' + iccData[i].name,
                        values: [{
                            x: valueX,
                            y: valueY
                        }]
                    });
                }

                return data;
            };

            this.getDataValueForAxis = function (axis, iccObject) {
                var axisProp, iccItem, iccGroup, iccProp, iccGroupProp;
                if (!(axis && axis.name)) {
                    return null;
                }
                axisProp = axis.name;
                iccItem = iccObject.data;
                for (iccGroupProp in iccItem) {
                    if (iccItem.hasOwnProperty(iccGroupProp)) {
                        iccGroup = iccItem[iccGroupProp];
                        for (iccProp in iccGroup) {
                            if (iccGroup.hasOwnProperty(iccProp)) {
                                if (iccGroup[iccProp].displayName === axisProp) {
                                    return iccGroup[iccProp].value;
                                }
                            }
                        }
                    }
                }
                return null;
            };


            $scope.getXAxisLabel = function () {
                var res = '';
                if ($scope.xAxis && $scope.xAxis.name) {
                    res = $scope.xAxis.name;
                }
                return res;
            };

            $scope.getYAxisLabel = function () {
                var res = '';
                if ($scope.yAxis && $scope.yAxis.name) {
                    res = $scope.yAxis.name;
                }
                return res;
            };

            $scope.zScale = d3.scale.linear();

            $scope.yAxisTickFormatFunction = function () {
                return function (d) {
                    return d3.round(d, 2);
                };
            };

            $scope.xAxisTickFormatFunction = function () {
                return function (d) {
                    return d3.round(d, 2);
                };
            };

            this.dataChangedWatchCallback = function () {
                if ($scope.worldstates() && $scope.worldstates().length > 0) {
                    $scope.iccData = WorldstateService.utils.stripIccData($scope.worldstates(), $scope.forCriteria);
                    $scope.iccObject = $scope.iccData[0];
                    if ($scope.xAxis && $scope.yAxis) {
                        if ($scope.xAxis.name.indexOf('Select') === -1 &&
                                $scope.yAxis.name.indexOf('Select') === -1
                                ) {
                            $scope.chartdata = controller.createChartData($scope.iccData, $scope.xAxis, $scope.yAxis);
                        }
                    }
                }
            };

            this.axisWatchCallback = function () {
                if ($scope.xAxis && $scope.yAxis) {
                    if ($scope.xAxis.name.indexOf('Select') === -1 &&
                            $scope.yAxis.name.indexOf('Select') === -1
                            ) {
                        $scope.chartdata = controller.createChartData($scope.iccData, $scope.xAxis, $scope.yAxis);
                    }
                }
            };

            $scope.$watch('xAxis', this.axisWatchCallback);
            $scope.$watch('yAxis', this.axisWatchCallback);

            $scope.$watch('forCriteria', this.dataChangedWatchCallback);
            $scope.$watch('worldstates()', this.dataChangedWatchCallback);
        }
    ]
);


