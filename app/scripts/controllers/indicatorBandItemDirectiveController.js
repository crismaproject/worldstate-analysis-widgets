angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
    ).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.IndicatorBandItemDirectiveController',
    [
        '$scope',
        '$filter',
        '$element',
        '$timeout',
        function ($scope, $filter, $element, $timeout) {
            'use strict';
            $scope.actualHeightExceeded = false;
            $scope.getElementHeight = function () {
                return $element.height();
            };
            $scope.getElementWidth = function () {
                return $element.width();
            };
            $scope.checkActualHeight = function () {
                $timeout(function () {
                    var childElem = $scope.lowerBoundary || $scope.upperBoundary ? $element.children()[0] : $element.children()[1];
                    if (angular.element(childElem).height() > angular.element($element.parent()).height()) {
                        $scope.actualHeightExceeded = true;
                    } else {
                        if ($scope.actualHeightExceeded) {
                            $timeout(function () {
                                $scope.checkActualHeight();
                            });
                        }
                        $scope.actualHeightExceeded = false;
                    }
                },500);
            };
            $scope.actualHeightExceeded = false;
            $scope.checkActualHeight();

            $scope.$on('band-item-added', function () {
                $scope.checkActualHeight();
            });

            $scope.$on('band-item-removed', function () {
                $scope.checkActualHeight();
            });

            $scope.getCriteriaSuggestion = function () {
                var criteriaSuggestion;
                if (!$scope.interval || $scope.upperBoundary) {
                    criteriaSuggestion = 100;
                } else {
                    if (!$scope.previousInterval) {
                        criteriaSuggestion = ($scope.interval.criteriaValue) / 2;
                    } else {
                        criteriaSuggestion = $scope.previousInterval.criteriaValue + ($scope.interval.criteriaValue - $scope.previousInterval.criteriaValue) / 2;
                    }
                }
                return criteriaSuggestion;
            };
            $scope.$on('tooltip.show.before', function () {
                $scope.popOverItem.criteriaValue = $scope.getCriteriaSuggestion();
            });
            $scope.minWidth = 80;
            var indicatorVal = $scope.interval ? $scope.interval.indicatorValue || 0 : 0;
            $scope.popOverItem = {
                criteriaValue: $scope.getCriteriaSuggestion(),
                indicatorValue: $filter('number')(indicatorVal)
            };
            $scope.getPercent = function () {
                var sumBefore = 0;
                if ($scope.lowerBoundary || $scope.upperBoundary) {
                    return 100;
                }
                if ($scope.previousInterval) {
                    sumBefore = $scope.previousInterval.criteriaValue || 0;
                }
                if ($scope.interval && $scope.interval.criteriaValue) {
//                    return  Math.floor(($scope.interval.criteriaValue - sumBefore))
                    return ($scope.interval.criteriaValue - sumBefore);
                }
                return (100 - sumBefore);
            };
            $scope.intervalWidth = function () {
                var percentage = $scope.getPercent();
                return {
                    width: percentage + '%'
                };
            };
            $scope.getColorClass = function () {
                if ($scope.lowerBoundary) {
                    return 'color-a';
                }
                if ($scope.upperBoundary) {
                    return 'color-j';
                }
                return $scope.getColor({interval: $scope.interval});
            };
            $scope.del = function (interval) {
                $scope.deleteInterval({interval: interval});
                $scope.$emit('band-item-removed');
            };
            $scope.updateInterval = function (event) {
                $scope.onIntervalChanged({
                    criteriaValue: $scope.popOverItem.criteriaValue,
                    indicatorValue: $scope.popOverItem.indicatorValue
                });
                $scope.hidePopover();
                //this is necessary to avoid poping up the poover for the new created interval
                event.stopPropagation();
            };
            $scope.getTooltipTitle = function () {
                var title = '';
                title += 'Criteria: ';
                if ($scope.lowerBoundary) {
                    title += '0%';
                } else if ($scope.upperBoundary) {
                    title += '100%';
                } else {
                    title += ($scope.previousInterval.criteriaValue || '0') + '% -' + $scope.interval.criteriaValue + '%';
                }
                title += 'Indicator Values: ';
                if ($scope.lowerBoundary) {
                    title += '<= ' + ($scope.interval ? $scope.interval.indicatorValue || 0 : 0);
                } else if ($scope.upperBoundary) {
                    title += '>= ' + ($scope.interval ? $scope.interval.indicatorValue || 0 : 0);
                } else {
                    title += ($scope.interval ? $scope.interval.indicatorValue || 0 : 0) + '- ' + $scope.interval.indicatorValue;
                }
                return title;
            };
            $scope.tooltip = {
                title: $scope.getTooltipTitle(),
                checked: false
            };
        }
    ]
    );


