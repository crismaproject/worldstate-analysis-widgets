angular.module(
    'eu.crismaproject.worldstateAnalysis.services'
).factory(
    'eu.crismaproject.worldstateAnalysis.services.IcmmPersistanceService',
    [
        'localStorageService',
        function (localStorageService) {
            'use strict';
            var persistCriteriaFunctions, persistDecisionStrategies;

            persistCriteriaFunctions = function (criteriaFunctions) {
                localStorageService.add('criteriaFunctionSet', criteriaFunctions);
            };

            persistDecisionStrategies = function (decisionStrategies) {
                localStorageService.add('decisionStrategies', decisionStrategies);
            };

            return {
                'persistCriteriaFunctions': persistCriteriaFunctions,
                'persistDecisionStrategies': persistDecisionStrategies
            };
        }
    ]
);