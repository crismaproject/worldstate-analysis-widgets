angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
).directive(
    'criteriaEmphasis',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                criteriaEmphases: '=',
                indicatorMap:'='
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/criteriaEmphasesTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.criteriaEmphasesController'
            };
        }
    ]
);