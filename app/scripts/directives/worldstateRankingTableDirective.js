angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
).directive(
    'worldstateRankingTable',
    [
        function () {
            'use strict';

            var scope;
            scope = {
                worldstates:'=',
                criteriaFunction:'=',
                decisionStrategy:'=',
                showIndicators:'=',
                showRadarChart:'='
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl:'templates/worldstateRankingTableTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.worldstateRankingTableDirectiveController'
            };
        }
    ]
);