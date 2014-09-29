angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
    ).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.CriteriaFunctionManagerDirectiveController',
    [
        '$scope',
        'de.cismet.crisma.ICMM.Worldstates',
        function ($scope, Worldstates) {
            'use strict';
            $scope.editable = [];
            $scope.indicators = [];
            $scope.currentIntervalFunctions = [];
            $scope.selectedCriteriaFunctionIndex = -1;
            $scope.tooltipDelete = {
                title: 'Delete this criteria function'
            };
            $scope.tooltipAdd = {
                normaltitle: 'Create a new criteria function',
                disabledTitle: 'Can not create criteria function. Select a worldstate first',
                title:''
            };
            $scope.tooltipSave = {
                title: 'Save changes'
            };
            $scope.tooltipRename = {
                title: 'Rename criteria function'
            };
            $scope.tooltipRenameDone = {
                title: 'Done'
            };

            $scope.addCriteriaFunction = function () {
                var i, criteriaFunctions = [];
                if($scope.listItemsDisabled){
                    return;
                }
                for (i = 0; i < $scope.indicators.length; i++) {
                    criteriaFunctions.push({
                        indicator: $scope.indicators[i].displayName,
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

            $scope.getListItemClass = function (index) {
                var classList = 'list-group-item';
                if ($scope.listItemsDisabled) {
                    classList += ' disabled';
                }
                if ($scope.selectedCriteriaFunctionIndex === index) {
                    classList += ' list-group-item-info';
                }
                return classList;
            };

            $scope.setSelectedCriteriaFunction = function (index) {
                if (!$scope.listItemsDisabled) {
                    $scope.selectedCriteriaFunctionIndex = index;
                    $scope.currentCriteriaFunction = $scope.criteriaFunctionSet[$scope.selectedCriteriaFunctionIndex];
                }
            };
            
            $scope.getButtonStyle = function(){
                return {
                    'color':$scope.listItemsDisabled ? '#CCC':'#fff'
                };
            };

            $scope.listItemsDisabled = $scope.indicators && $scope.indicators.length <= 0 ? true : false;
            $scope.tooltipAdd.title = $scope.listItemsDisabled ? $scope.tooltipAdd.disabledTitle : $scope.tooltipAdd.normaltitle;
            $scope.$watchCollection('worldstates', function (newVal, oldVal) {
                var indicatorGroup, indicatorProp, iccObject, group;
                if (newVal !== oldVal) {
                    if ($scope.worldstates && $scope.worldstates.length === 0) {
                        $scope.indicators = [];
                    } else {
                        if ($scope.indicators.length === 0) {
                            iccObject = Worldstates.utils.stripIccData([$scope.worldstates[0]], false)[0];
                            for (indicatorGroup in iccObject.data) {
                                if (iccObject.data.hasOwnProperty(indicatorGroup)) {
                                    group = iccObject.data[indicatorGroup];
                                    for (indicatorProp in group) {
                                        if (group.hasOwnProperty(indicatorProp)) {
                                            if (indicatorProp !== 'displayName' && indicatorProp !== 'iconResource') {
                                                $scope.indicators.push(group[indicatorProp]);
                                            }
                                        }
                                    }
                                }
                            }

                        }
                    }
                    $scope.listItemsDisabled = $scope.indicators && $scope.indicators.length <= 0 ? true : false;
                    $scope.tooltipAdd.title = $scope.listItemsDisabled ? $scope.tooltipAdd.disabledTitle : $scope.tooltipAdd.normaltitle;
                    if ($scope.listItemsDisaled) {
                        $scope.selectedCriteriaFunctionIndex = -1;
                    }
                }
            });

        }
    ]
    );



