angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.CriteriaRadarChartDirectiveController',
    [
        '$scope',
        'eu.crismaproject.worldstateAnalysis.services.CriteriaCalculationService',
        function ($scope,ccs) {
            'use strict';
            $scope.legendItems = [];
            
            $scope.convertToChartDataStructure = function (indicatorVector) {
                var i, j, indicatorData, groupName, group, criteriaProp,
                    indiactor, result, dataItem,legendItems, criteriaFunction;
                result = [];
                legendItems = [];
                for (i = 0; i < indicatorVector.length; i++) {
                    dataItem = [];
                    indicatorData = indicatorVector[i].data;
                    legendItems.push(indicatorVector[i].name);
                    for (groupName in indicatorData) {
                        if (indicatorData.hasOwnProperty(groupName)) {
                            group = indicatorData[groupName];
                            for (criteriaProp in group) {
                                if (group.hasOwnProperty(criteriaProp) &&
                                        criteriaProp !== 'displayName' &&
                                        criteriaProp !== 'iconResource') {
                                    indiactor = group[criteriaProp];
                                    for(j=0;j<$scope.criteriaFunction.criteriaFunctions.length;j++){
                                        if($scope.criteriaFunction.criteriaFunctions[j].indicator === indiactor.displayName){
                                            criteriaFunction=$scope.criteriaFunction.criteriaFunctions[j];
                                            break;
                                        }
                                    }
                                    dataItem.push({
                                        axis: $scope.useNumbers ? dataItem.length+1 :indiactor.displayName,
                                        value: ccs.calculateCriteria(indiactor.value,criteriaFunction)
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


