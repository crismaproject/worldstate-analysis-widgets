angular.module(
    'eu.crismaproject.worldstateAnalysis.services'
    ).factory(
    'eu.crismaproject.worldstateAnalysis.services.IcmmPersistanceService',
    [
        'eu.crismaproject.worldstateAnalysis.services.CriteriaFunction',
        'eu.crismaproject.worldstateAnalysis.services.DecisionStrategies',
        function (CF, DS) {
            'use strict';
            var persistCriteriaFunctions, persistDecisionStrategies;

            persistCriteriaFunctions = function (criteriaFunctions) {
                CF.update(criteriaFunctions);
            };

            persistDecisionStrategies = function (decisionStrategies) {
                DS.update(decisionStrategies);
            };

            return {
                'persistCriteriaFunctions': persistCriteriaFunctions,
                'persistDecisionStrategies': persistDecisionStrategies
            };
        }
    ]
    );