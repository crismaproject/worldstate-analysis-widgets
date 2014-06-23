angular.module(
    'eu.crismaproject.worldstateAnalysis.directives',
    [
        'eu.crismaproject.worldstateAnalysis.controllers',
        'ngTable',
        'de.cismet.crisma.ICMM.Worldstates',
    ]
).directive(
    'indicatorCriteriaTable',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                worldstates: '=',
                forCriteria: '=',
                detailIcons: '@'
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/indicatorCriteriaTableTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.IndicatorCriteriaTableDirectiveController'
            };
        }
    ]
);