angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
    ).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.RelationAnalysisChartDirectiveController',
    [
        '$scope',
        'de.cismet.crisma.ICMM.Worldstates',
        '$timeout',
        function ($scope, WorldstateService, $timeout) {
            var createChartData, getDataValueForAxis, iccDataHasScaleItems,
                watchCallback;
            createChartData = function (iccData, xAxis, yAxis) {
                var i, iccItem, valueX, valueY, data = [];

                var firstValueX = 0;
                for (i = 0; i < iccData.length; i++) {
                    iccItem = iccData[0];
                    valueX = Math.random() * 1000 // getDataValueForAxis(xAxis, iccItem);
                    valueY = Math.random() * 1000 //getDataValueForAxis(yAxis, iccItem);
                    if (firstValueX === 0) {
                        firstValueX = valueX;
                    }
                    data.push({
                        key: iccData[i].name,
                        values: [{
                                x: valueX,
                                y: valueY,
                            }]
                    });
                }

                return data;
            };

            getDataValueForAxis = function (axis, iccObject) {
                var i, axisProp, iccItem, iccGroup, iccGroupProp;
                if (!(axis && axis.name)) {
                    return null;
                }
                axisProp = axis.name;
                iccItem = iccObject.data;
                for (iccGroupProp in iccItem) {
                    if (iccItem.hasOwnProperty(iccGroupProp)) {
                        iccGroup = iccItem[iccGroupProp];
                        for (var iccProp in iccGroup) {
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

            iccDataHasScaleItems = function (axis, data) {
                return getDataValueForAxis(axis, data[0]) !== null;
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
                    return d3.round(d, 2)
                };
            };

            $scope.xAxis;
            $scope.yAxis;
            getAxisProperties = function (iccData) {
                var group, i, axesGroup, res = [];
                if (iccData && iccData.length > 0) {
                    var worldstateIccData = iccData[0].data;
                    for (group in worldstateIccData) {
                        axesGroup = worldstateIccData[group];
                        res.push({
                            name: axesGroup.displayName,
                            icon: axesGroup.iconResource,
                            isGroup: true
                        });
                        for (var prop in axesGroup) {
                            if (axesGroup.hasOwnProperty(prop)) {
                                if (prop !== 'displayName' && prop !== 'iconResource') {
                                    res.push({
                                        name: axesGroup[prop].displayName,
                                        icon: axesGroup[prop].iconResource,
                                        isGroup: false
                                    });
                                }
                            }
                        }
                    }
                }
                return res;
            };
            
            $scope.$watch('worldstates()', function () {
                if ($scope.worldstates() && $scope.worldstates().length > 0) {
                    $scope.iccData = WorldstateService.utils.stripIccData($scope.worldstates(), $scope.forCriteria);
                    $scope.iccObject = $scope.iccData[0];
                    if ($scope.xAxis && $scope.yAxis) {
                        if ($scope.xAxis.name.indexOf('Select') === -1 &&
                            $scope.yAxis.name.indexOf('Select') === -1
                            ) {
                            $scope.chartdata = createChartData($scope.iccData, $scope.xAxis, $scope.yAxis);
                        }
                    }
                }
            });

            watchCallback = function () {
                if ($scope.xAxis && $scope.yAxis) {
                    if ($scope.xAxis.name.indexOf('Select') === -1 &&
                        $scope.yAxis.name.indexOf('Select') === -1
                        ) {
                        $scope.chartdata = createChartData($scope.iccData, $scope.xAxis, $scope.yAxis);
                    }
                }
            };

            $scope.$watch('xAxis', watchCallback);

            $scope.$watch('yAxis', watchCallback);
        }
    ]
    );


