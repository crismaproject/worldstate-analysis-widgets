angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
).directive(
    'criteriaFunction',
    [
        function () {
            'use strict';

            var scope;
            scope = {
                indicators:'=',
                criteriaFunctions:'=?'
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/criteriaFunctionTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.CriteriaFunctionDirectiveController',
            };
        }
    ]
);