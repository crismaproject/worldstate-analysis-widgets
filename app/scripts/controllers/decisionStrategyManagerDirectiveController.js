angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
    ).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.decisionStrategyManagerDirectiveController',
    [
        '$scope',
        'de.cismet.crisma.ICMM.Worldstates',
        function ($scope, Worldstates) {
            'use strict';
            $scope.editable = [];
            $scope.currentIntervalFunctions = [];
            $scope.selectedDecisionStrategyIndex = -1;
            $scope.tooltipDelete = {
                title: 'Delete this decision strategy'
            };
            $scope.tooltipAdd = {
                title: 'Create a new decision strategy'
            };
            $scope.tooltipSave = {
                title: 'Save changes'
            };
            $scope.tooltipRename = {
                title: 'Rename decision strategy'
            };
            $scope.tooltipRenameDone = {
                title: 'Done'
            };

            $scope.addDecisionStrategy = function () {
                var i, decisionStrategy = [];
                for (i = 0; i < $scope.worldstates.length; i++) {
                    decisionStrategy.push({
                        indicator: $scope.worldstates[i].displayName,
                    });
                }
                $scope.decisionStrategies.push({
                    name: 'Decision Strategy ' + ($scope.decisionStrategies.length + 1),
                });
                $scope.editable.push(false);
            };

            $scope.removeDecisionStrategy = function () {
                $scope.decisionStrategies.splice($scope.selectedDecisionStrategyIndex, 1);
            };

            $scope.getItemStyle = function (index) {
                var c = 'list-group-item';
                if ($scope.selectedDecisionStrategyIndex === index) {
                    c += ' list-group-item-info';
                }
                if($scope.listItemsDisabled){
                    c+= ' disabled';
                }
                
                return c;
            };

            $scope.setSelectedDecisionStrategy = function (index) {
                if(!$scope.listItemsDisabled){
                    $scope.selectedDecisionStrategyIndex = index;
                    $scope.currentDecisionStrategy = $scope.decisionStrategies[$scope.selectedDecisionStrategyIndex];
                }
            };

            $scope.updateModel = function () {
                var i, indicatorGroup, indicatorProp, iccObject, group;
                $scope.indicatorVector = [];
                for (i = 0; i < $scope.worldstates.length; i++) {

                    iccObject = Worldstates.utils.stripIccData([$scope.worldstates[i]], false)[0];
                    for (indicatorGroup in iccObject.data) {
                        if (iccObject.data.hasOwnProperty(indicatorGroup)) {
                            group = iccObject.data[indicatorGroup];
                            for (indicatorProp in group) {
                                if (group.hasOwnProperty(indicatorProp)) {
                                    if (indicatorProp !== 'displayName' && indicatorProp !== 'iconResource') {
                                        $scope.indicatorVector.push(group[indicatorProp]);
                                    }
                                }
                            }
                        }
                    }
                }
            };
            $scope.worldstates = $scope.worldstates || [];
            $scope.listItemsDisabled = !($scope.worldstates && $scope.worldstates.length>0);
            $scope.$watch('worldstates', function () {
                $scope.updateModel();
                $scope.listItemsDisabled = !($scope.worldstates && $scope.worldstates.length>0);
                if($scope.listItemsDisabled){
                    $scope.selectedDecisionStrategyIndex = -1;
                }
            }, true);
        }
    ]
    );



