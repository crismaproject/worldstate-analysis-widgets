angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
).directive(
    'criteriaFunctionManager',
    [
        function () {
            'use strict';

            var scope;
            scope = {
                worldstates:'=',
                criteriaFunctionSet:'=criteriaFunctions'
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/criteriaFunctionManagerTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.CriteriaFunctionManagerDirectiveController'
            };
        }
    ]
);