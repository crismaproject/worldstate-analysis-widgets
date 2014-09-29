angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
    ).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.decisionStrategyManagerDirectiveController',
    [
        '$scope',
        'de.cismet.crisma.ICMM.Worldstates',
        'eu.crismaproject.worldstateAnalysis.services.AnalysisService',
        function ($scope, Worldstates, AnalysisService) {
            'use strict';
            $scope.editable = [];
            $scope.currentIntervalFunctions = [];
            $scope.selectedDecisionStrategyIndex = -1;
            $scope.tooltipDelete = {
                title: 'Delete this decision strategy'
            };
            $scope.tooltipAdd = {
                normaltitle: 'Create a new decision strategy',
                disabledTitle: 'Can not create Decision Strategy. Select a worldstate first',
                title:''
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
                var i, indicator, criteriaEmphases = [];
                if($scope.listItemsDisabled){
                    return;
                }
                for (i=0;i<$scope.indicatorVector.length;i++) {
                    indicator = $scope.indicatorVector[i];
                    criteriaEmphases.push({
                        indicator: indicator,
                        criteriaEmphasis:100
                    });
                }
                $scope.decisionStrategies.push({
                    name: 'Decision Strategy ' + ($scope.decisionStrategies.length + 1),
                    criteriaEmphases:criteriaEmphases,
                    satisfactionEmphasis:AnalysisService.getOwa().meanWeights($scope.indicatorVector.length <= 1 ? 1 : $scope.indicatorVector.length)
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
            
            $scope.getButtonStyle = function(){
                return {
                    'color':$scope.listItemsDisabled ? '#CCC':'#fff'
                };
            };
            
            $scope.worldstates = $scope.worldstates || [];
            $scope.listItemsDisabled = !($scope.worldstates && $scope.worldstates.length>0);
            $scope.$watch('worldstates', function () {
                $scope.updateModel();
                $scope.listItemsDisabled = !($scope.worldstates && $scope.worldstates.length>0);
                $scope.tooltipAdd.title = $scope.listItemsDisabled ? $scope.tooltipAdd.disabledTitle : $scope.tooltipAdd.normaltitle;
                if($scope.listItemsDisabled){
                    $scope.selectedDecisionStrategyIndex = -1;
                }
            }, true);
        }
    ]
    );



