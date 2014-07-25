angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
    ).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.CriteriaFunctionManagerDirectiveController',
    [
        '$scope',
        'localStorageService',
        function ($scope,localStorageService) {
            'use strict';

            $scope.criteriaFunctionSet = localStorageService.get('criteriaFunctionSet') || [];
            $scope.editable = [];
            $scope.currentIntervalFunctions = [];
            $scope.selectedCriteriaFunctionIndex = -1;
            $scope.tooltipDelete = 'Delete the selected criteria function';
            $scope.tooltipAdd = 'Create a new criteria function';
            $scope.tooltipSave = 'Save all criteria functions';

            $scope.addCriteriaFunction = function () {
                var i, criteriaFunctions = [];
                for (i = 0; i < $scope.indicators.length; i++) {
                    criteriaFunctions.push({
                        lowerBoundary: {
                            criteriaValue: 0,
                            indicatorValue: 0
                        },
                        upperBoundary: {
                            criteriaValue: 100,
                            indicatorValue: 0
                        },
                        intervals: []
                    });
                }
                $scope.criteriaFunctionSet.push({
                    name: 'Criteria function ' + ($scope.criteriaFunctionSet.length + 1),
                    criteriaFunctions: criteriaFunctions
                });
                $scope.editable.push(false);
            };

            $scope.removeCriteriaFunction = function () {
                $scope.criteriaFunctionSet.splice($scope.selectedCriteriaFunctionIndex, 1);
            };

            $scope.isActiveItem = function (index) {
                if ($scope.selectedCriteriaFunctionIndex === index) {
                    return 'list-group-item-info';
                } else {
                    return '';
                }
            };

            $scope.setSelectedCriteriaFunction = function (index) {
                $scope.selectedCriteriaFunctionIndex = index;
                $scope.currentCriteriaFunction = $scope.criteriaFunctionSet[$scope.selectedCriteriaFunctionIndex];
            };
            
            $scope.saveCriteriaFunctions = function(){
                localStorageService.add('criteriaFunctionSet',$scope.criteriaFunctionSet);
            };

        }
    ]
    );



