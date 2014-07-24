angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
    ).directive(
    'indicatorBand',
    [
        function () {
            'use strict';

            var scope;
            scope = {
                worldstates: '&',
                chartHeight: '@height',
                forCriteria: '='
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/indicatorBandTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.IndicatorBandDirectiveController',
            };
        }
    ]
    ).directive(
    'indicatorBandItem',
    [
        '$popover',
        function ($popover) {
            'use strict';
            var scope;
            scope = {
                interval: '=',
                previousInterval: '=',
                first: '=',
                last: '=',
                lowerBoundary: '@',
                upperBoundary: '@',
                deleteInterval: '&',
                onIntervalChanged: '&',
                getColor: '&'
            };
            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/indicatorBandItemTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.IndicatorBandItemDirectiveController',
                replace: true,
                link: function (scope, elem, attrs) {
                    var popover = $popover(elem.find('#popover-target'), {
                        scope: scope,
                        title: attrs.title || 'Create a new interval',
                        template: "templates/indicatorBandPopoverTemplate.html",
                        contentTemplate: "templates/indicatorBandPopoverContentTemplate.html",
                        placement: 'bottom',
                        trigger: 'manual',
                    });

                    scope.togglePopover = function (event) {
                        popover.$promise.then(popover.toggle);
                    };

                    scope.hidePopover = function () {
                        popover.$promise.then(popover.hide);
                    };
                }
            };
        }
    ]
    );