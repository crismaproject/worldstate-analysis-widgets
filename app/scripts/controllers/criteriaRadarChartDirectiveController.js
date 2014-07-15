angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.CriteriaRadarChartDirectiveController',
    [
        '$scope',
        function ($scope) {
            'use strict';
            $scope.legendItems = [];
            
            $scope.convertToChartDataStructure = function (criteriaVector) {
                var i, criteriaData, groupName, group, criteriaProp,
                    criteria, result, dataItem,legendItems;
                result = [];
                legendItems = [];
                for (i = 0; i < criteriaVector.length; i++) {
                    dataItem = [];
                    criteriaData = criteriaVector[i].data;
                    legendItems.push(criteriaVector[i].name);
                    for (groupName in criteriaData) {
                        if (criteriaData.hasOwnProperty(groupName)) {
                            group = criteriaData[groupName];
                            for (criteriaProp in group) {
                                if (group.hasOwnProperty(criteriaProp) &&
                                        criteriaProp !== 'displayName' &&
                                        criteriaProp !== 'iconResource') {
                                    criteria = group[criteriaProp];
                                    dataItem.push({
                                        axis: criteria.displayName,
                                        value: criteria.value
                                    });
                                }
                            }
                        }
                    }
                    result.push(dataItem);
                }
                return [result,legendItems];
            };
        }
    ]
);


