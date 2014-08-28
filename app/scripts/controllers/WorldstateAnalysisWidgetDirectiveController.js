angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
    ).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.WorldstateAnalysisWidgetDirectiveController',
    [
        '$scope',
        'de.cismet.crisma.ICMM.Worldstates',
        function ($scope, Worldstates) {
            'use strict';
            var worldstates = [], createChartModels, getIndicators;
            $scope.worldstateRef;
            $scope.forCriteriaTable = true;
            $scope.chartModels = [];

            createChartModels = function () {
                $scope.chartModels = [];
                if ($scope.worldstates && $scope.worldstates.length > 0) {
                    for (var j = 0; j < $scope.worldstates.length; j++) {
                        var modelArr = [];
                        if ($scope.worldstates[j]) {
                            modelArr.push($scope.worldstates[j]);
                        }
                        if ($scope.worldstateRef) {
                            modelArr = modelArr.concat($scope.worldstateRef);
                        }
                        $scope.chartModels.push(modelArr);
                    }
                }
            };

            getIndicators = function () {
                var indicatorGroup, indicatorProp, iccObject, group;
                if ($scope.worldstates && $scope.worldstates.length > 0) {
                    for (var j = 0; j < $scope.worldstates.length; j++) {
                        iccObject = Worldstates.utils.stripIccData([$scope.worldstates[j]], false)[0];
                        for (indicatorGroup in iccObject.data) {
                            if (iccObject.data.hasOwnProperty(indicatorGroup)) {
                                group = iccObject.data[indicatorGroup];
                                for (indicatorProp in group) {
                                    if (group.hasOwnProperty(indicatorProp)) {
                                        if (indicatorProp !== 'displayName' && indicatorProp !== 'iconResource') {
                                            if ($scope.indicatorVector.length > 0) {
                                                var indicatorName = group[indicatorProp].displayName;
                                                var indicator = group[indicatorProp];
                                                var add = true;
                                                $scope.indicatorVector.forEach(function (value, index, arr) {
                                                    if (indicatorName === value.displayName) {
                                                        add = false;
                                                    }
                                                    if (index === arr.length - 1 && add) {
                                                        $scope.indicatorVector.push(indicator);
                                                    }
                                                });
                                            } else {
                                                $scope.indicatorVector.push(group[indicatorProp]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            Worldstates.query(function (data) {
                $scope.allWorldstates = data;
            });

            $scope.$watch('worldstateRef', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    createChartModels();
                    getIndicators();
                }
            });
            $scope.$watch("worldstates", function (newVal, oldVal) {
                if(newVal !== oldVal && $scope.worldstates){
                            createChartModels();
                            getIndicators();
                }
            }, true);

            $scope.indicatorVector = [];
        }
    ]
    );



