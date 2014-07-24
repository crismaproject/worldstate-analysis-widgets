angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
    ).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.IndicatorBandDirectiveController',
    [
        '$scope',
        function ($scope) {
            'use strict';
            var dataModel, colorClasses, criteriaSortFunction;
            dataModel = {
                lowerBoundary: {
                    criteriaValue: 0,
                    indicatorValue: 100
                },
                upperBoundary: {
                    criteriaValue: 100,
                    indicatorValue: 0
                },
                intervals: [
//                    {
//                        criteriaValue: 25,
//                        indicatorValue: 75
//                    },
//                    {
//                        criteriaValue: 50,
//                        indicatorValue: 50
//                    },
//                    {
//                        criteriaValue: 75,
//                        indicatorValue: 25
//                    }
                ]
            };

            colorClasses = ['color-b', 'color-c', 'color-d', 'color-e', 'color-f', 'color-g',
                'color-h'];

            criteriaSortFunction = function (intervalA, intervalB) {
                return intervalA.criteriaValue - intervalB.criteriaValue;
            };

            $scope.lowerBoundary = dataModel.lowerBoundary;
            $scope.upperBoundary = dataModel.upperBoundary;
            $scope.intervals = dataModel.intervals.sort(criteriaSortFunction);

            $scope.getIntervalColor = function (interval) {
                var total = $scope.intervals.length;

                var index = -1;
                if (interval) {
                    for (var i = 0; i < total; i++) {
                        var foo = $scope.intervals[i];
                        if (foo.criteriaValue === interval.criteriaValue) {
                            index = i;
                            break;
                        }
                    }
                }
                var c;
                if (total == 0) {
//                c = E_ORANGE_SHERBERT;
                    c = 'color-e';
                } else if (total == 1) {
                    if (index == 0) {
//                    c = D_AFFINITY;
                        c = 'color-d';
                    } else {
//                    c = G_JAYANTHI;
                        c = 'color-g';
                    }
                } else if (total == 2) {
                    if (index == 0) {
//                    c = C_FEELING_ORANGE;
                        c = 'color-c';
                    } else if (index == 1) {
//                    c = F_PEACE_BABY_YELLOW;
                        c = 'color-f';
                    } else {
//                    c = H_HONEY_DO;
                        c = 'color-h';
                    }
                } else if (total == 3) {
                    if (index == 0) {
//                    c = C_FEELING_ORANGE;
                        c = 'color-c';
                    } else if (index == 1) {
//                    c = E_ORANGE_SHERBERT;
                        c = 'color-e';
                    } else if (index == 2) {
//                    c = F_PEACE_BABY_YELLOW;
                        c = 'color-f';
                    } else {
//                    c = H_HONEY_DO;
                        c = 'color-h';
                    }
                } else if (total == 4) {
                    if (index == 0) {
//                    c = C_FEELING_ORANGE;
                        c = 'color-c';
                    } else if (index == 1) {
//                    c = D_AFFINITY;
                        c = 'color-d';
                    } else if (index == 2) {
//                    c = F_PEACE_BABY_YELLOW;
                        c = 'color-f';
                    } else if (index == 3) {
//                    c = G_JAYANTHI;
                        c = 'color-g';
                    } else {
//                    c = H_HONEY_DO;
                        c = 'color-h';
                    }
                } else if (total == 5) {
                    if (index == 0) {
//                    c = C_FEELING_ORANGE;
                        c = 'color-c';
                    } else if (index == 1) {
//                    c = D_AFFINITY;
                        c = 'color-d';
                    } else if (index == 2) {
//                    c = F_PEACE_BABY_YELLOW;
                        c = 'color-f';
                    } else if (index == 3) {
//                    c = G_JAYANTHI;
                        c = 'color-g';
                    } else if (index == 4) {
//                    c = H_HONEY_DO;
                        c = 'color-h';
                    } else {
//                    c = I_SPLASH_OF_LIME;
                        c = 'color-i';
                    }
                } else {
                    if (index == 0) {
//                    c = C_FEELING_ORANGE;
                        c = 'color-c';
                    } else if (index == 1) {
//                    c = D_AFFINITY;
                        c = 'color-d';
                    } else if (index == 2) {
//                    c = E_ORANGE_SHERBERT;
                        c = 'color-e';
                    } else if (index == 3) {
//                    c = F_PEACE_BABY_YELLOW;
                        c = 'color-f';
                    } else if (index == 4) {
//                    c = G_JAYANTHI;
                        c = 'color-';
                    } else if (index == 5) {
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
                var index = $scope.intervals.indexOf(interval);
                $scope.intervals.splice(index, 1);
            };

            $scope.updateLowerBoundary = function (criteriaVal, indicatorVal) {
                $scope.lowerBoundary.indicatorValue = indicatorVal;
            };

            $scope.updateUpperBoundary = function (criteriaVal, indicatorVal) {
                $scope.upperBoundary.indicatorValue = indicatorVal;
            };

            $scope.createInterval = function (criteriaVal, indicatorVal) {
                var newInterval = {
                    criteriaValue: criteriaVal,
                    indicatorValue: indicatorVal
                };
                $scope.intervals.push(newInterval);
                $scope.intervals.sort(criteriaSortFunction);
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


