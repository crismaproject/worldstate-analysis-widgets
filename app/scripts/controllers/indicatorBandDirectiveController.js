angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
    ).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.IndicatorBandDirectiveController',
    [
        '$scope',
        function ($scope) {
            'use strict';
            var initData, criteriaSortFunction;
            initData = {
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 0
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: []
            };

            criteriaSortFunction = function (intervalA, intervalB) {
                return intervalA.criteriaValue - intervalB.criteriaValue;
            };

            if (!$scope.criteriaFunction) {
                $scope.criteriaFunction = initData;
            }

            $scope.criteriaFunction.lowerBoundary = $scope.criteriaFunction.lowerBoundary || initData.lowerBoundary;
            $scope.criteriaFunction.upperBoundary = $scope.criteriaFunction.upperBoundary || initData.upperBoundary;
            $scope.criteriaFunction.intervals = $scope.criteriaFunction.intervals ? ($scope.criteriaFunction.intervals.sort(criteriaSortFunction) || initData.intervals.sort(criteriaSortFunction)) : initData.intervals.sort(criteriaSortFunction);

            $scope.$watch('criteriaFunction', function () {
                if ($scope.criteriaFunction) {
                    $scope.criteriaFunction.lowerBoundary = $scope.criteriaFunction.lowerBoundary || initData.lowerBoundary;
                    $scope.criteriaFunction.upperBoundary = $scope.criteriaFunction.upperBoundary || initData.upperBoundary;
                    $scope.criteriaFunction.intervals = $scope.criteriaFunction.intervals ? ($scope.criteriaFunction.intervals.sort(criteriaSortFunction) || initData.intervals.sort(criteriaSortFunction)) : initData.intervals.sort(criteriaSortFunction);
                }
            });


            $scope.getIntervalColor = function (interval) {
                var tmpInterval, i, total = $scope.criteriaFunction.intervals.length;

                var index = -1;
                if (interval) {
                    for (i = 0; i < total; i++) {
                        tmpInterval = $scope.criteriaFunction.intervals[i];
                        if (tmpInterval.criteriaValue === interval.criteriaValue) {
                            index = i;
                            break;
                        }
                    }
                }
                var c;
                if (total === 0) {
//                c = E_ORANGE_SHERBERT;
                    c = 'color-e';
                } else if (total === 1) {
                    if (index === 0) {
//                    c = D_AFFINITY;
                        c = 'color-d';
                    } else {
//                    c = G_JAYANTHI;
                        c = 'color-g';
                    }
                } else if (total === 2) {
                    if (index === 0) {
//                    c = C_FEELING_ORANGE;
                        c = 'color-c';
                    } else if (index === 1) {
//                    c = F_PEACE_BABY_YELLOW;
                        c = 'color-f';
                    } else {
//                    c = H_HONEY_DO;
                        c = 'color-h';
                    }
                } else if (total === 3) {
                    if (index === 0) {
//                    c = C_FEELING_ORANGE;
                        c = 'color-c';
                    } else if (index === 1) {
//                    c = E_ORANGE_SHERBERT;
                        c = 'color-e';
                    } else if (index === 2) {
//                    c = F_PEACE_BABY_YELLOW;
                        c = 'color-f';
                    } else {
//                    c = H_HONEY_DO;
                        c = 'color-h';
                    }
                } else if (total === 4) {
                    if (index === 0) {
//                    c = C_FEELING_ORANGE;
                        c = 'color-c';
                    } else if (index === 1) {
//                    c = D_AFFINITY;
                        c = 'color-d';
                    } else if (index === 2) {
//                    c = F_PEACE_BABY_YELLOW;
                        c = 'color-f';
                    } else if (index === 3) {
//                    c = G_JAYANTHI;
                        c = 'color-g';
                    } else {
//                    c = H_HONEY_DO;
                        c = 'color-h';
                    }
                } else if (total === 5) {
                    if (index === 0) {
//                    c = C_FEELING_ORANGE;
                        c = 'color-c';
                    } else if (index === 1) {
//                    c = D_AFFINITY;
                        c = 'color-d';
                    } else if (index === 2) {
//                    c = F_PEACE_BABY_YELLOW;
                        c = 'color-f';
                    } else if (index === 3) {
//                    c = G_JAYANTHI;
                        c = 'color-g';
                    } else if (index === 4) {
//                    c = H_HONEY_DO;
                        c = 'color-h';
                    } else {
//                    c = I_SPLASH_OF_LIME;
                        c = 'color-i';
                    }
                } else {
                    if (index === 0) {
//                    c = C_FEELING_ORANGE;
                        c = 'color-c';
                    } else if (index === 1) {
//                    c = D_AFFINITY;
                        c = 'color-d';
                    } else if (index === 2) {
//                    c = E_ORANGE_SHERBERT;
                        c = 'color-e';
                    } else if (index === 3) {
//                    c = F_PEACE_BABY_YELLOW;
                        c = 'color-f';
                    } else if (index === 4) {
//                    c = G_JAYANTHI;
                        c = 'color-';
                    } else if (index === 5) {
//                    c = H_HONEY_DO;
                        c = 'color-h';
                    } else {
//                    c = I_SPLASH_OF_LIME;
                        c = 'color-i';
                    }
                }

                return c;
            };

            $scope.deleteInterval = function (interval) {
                var index = $scope.criteriaFunction.intervals.indexOf(interval);
                $scope.criteriaFunction.intervals.splice(index, 1);
            };

            $scope.updateLowerBoundary = function (indicatorVal) {
                $scope.criteriaFunction.lowerBoundary.indicatorValue = indicatorVal;
            };

            $scope.updateUpperBoundary = function (indicatorVal) {
                $scope.criteriaFunction.upperBoundary.indicatorValue = indicatorVal;
            };

            $scope.$on('band-item-removed', function (args, interval) {
                if (args.targetScope !== $scope) {
                    $scope.$broadcast('band-item-removed');
                } else {
                    $scope.deleteInterval(interval);
                }
            });

            $scope.createInterval = function (criteriaVal, indicatorVal) {
                var newInterval = {
                    criteriaValue: criteriaVal,
                    indicatorValue: indicatorVal
                };
                $scope.criteriaFunction.intervals.push(newInterval);
                $scope.criteriaFunction.intervals.sort(criteriaSortFunction);
                $scope.$broadcast('band-item-added');
            };

            $scope.getIntervalWidth = function (interval, previousInterval) {
                var sumBefore = 0;
                if (previousInterval) {
                    sumBefore = previousInterval.criteriaValue || 0;
                }
                if (interval && interval.criteriaValue) {
                    return {
                        width: (interval.criteriaValue - sumBefore) + '%'
                    };
                }
                return {
                    width: (100 - sumBefore) + '%'
                };
            };
        }
    ]
    );


