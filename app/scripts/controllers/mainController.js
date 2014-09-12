angular.module(
    'eu.crismaproject.worldstateAnalysis.demoApp.controllers',
    [
        'de.cismet.crisma.ICMM.Worldstates',
        'de.cismet.cids.rest.collidngNames.Nodes',
        'LocalStorageModule'
    ]
).controller(
    'eu.crismaproject.worldstateAnalysis.demoApp.controllers.MainController',
    [
        '$scope',
        'de.cismet.collidingNameService.Nodes',
        'de.cismet.crisma.ICMM.Worldstates',
        'localStorageService',
        '$timeout',
        function ($scope, Nodes, Worldstates, localStorageService, $timeout) {
            'use strict';
            
            var createChartModels, getIndicators;
            $scope.forCriteriaTable = false;
            $scope.chartModels = [];

            createChartModels = function () {
                var j, modelArr;
                $scope.chartModels = [];
                if ($scope.worldstates && $scope.worldstates.length > 0) {
                    for (j = 0; j < $scope.worldstates.length; j++) {
                        modelArr = [];
                        if ($scope.worldstates[j]) {
                            modelArr.push($scope.worldstates[j]);
                        }
                        if ($scope.worldstateRef) {
                            modelArr = modelArr.concat($scope.worldstateRef);
                        }
                        $scope.chartModels.push(modelArr);
                    }
                }
            };

            getIndicators = function () {
                var indicatorGroup, indicatorProp, iccObject, group, j,
                    indicatorName, indicator, add, forEachFunc;
                forEachFunc = function (value, index, arr) {
                    if (indicatorName === value.displayName) {
                        add = false;
                    }
                    if (index === arr.length - 1 && add) {
                        $scope.indicatorVector.push(indicator);
                    }
                };

                if ($scope.worldstates && $scope.worldstates.length > 0) {
                    for (j = 0; j < $scope.worldstates.length; j++) {
                        iccObject = Worldstates.utils.stripIccData([$scope.worldstates[j]], false)[0];
                        for (indicatorGroup in iccObject.data) {
                            if (iccObject.data.hasOwnProperty(indicatorGroup)) {
                                group = iccObject.data[indicatorGroup];
                                for (indicatorProp in group) {
                                    if (group.hasOwnProperty(indicatorProp)) {
                                        if (indicatorProp !== 'displayName' && indicatorProp !== 'iconResource') {
                                            if ($scope.indicatorVector.length > 0) {
                                                indicatorName = group[indicatorProp].displayName;
                                                indicator = group[indicatorProp];
                                                add = true;
                                                $scope.indicatorVector.forEach(forEachFunc);
                                            } else {
                                                $scope.indicatorVector.push(group[indicatorProp]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            $scope.persistCriteriaFunctions = function () {
                $scope.showPersistSpinner = true;
                $scope.showPersistDone = false;
                $timeout(function () {
                    localStorageService.add('criteriaFunctionSet', $scope.criteriaFunctionSets);
                    $scope.showPersistSpinner = false;
                    $scope.showPersistDone = true;
                    $timeout(function () {
                        $scope.showPersistDone = false;
                    }, 1500);
                }, 500);

            };

            Worldstates.query({level:5},function (data) {
                $scope.allWorldstates = data;
            });

            $scope.$watch('worldstateRef', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    createChartModels();
                    getIndicators();
                }
            });
            $scope.$watch('worldstates', function (newVal, oldVal) {
                if (newVal !== oldVal && $scope.worldstates) {
                    createChartModels();
                    getIndicators();
                }
            }, true);

            $scope.indicatorVector = [];
            
            $scope.criteriaFunctionSet = localStorageService.get('criteriaFunctionSet') || [];
            $scope.criteriaFunctionSets = $scope.criteriaFunctionSet;
            $scope.selectedCriteriaFunction = $scope.criteriaFunctionSet[0];
            $scope.$watch('criteriaFunctionSet', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    console.log('received changes in criteria function');
                }
            }, true);
            $scope.showDsPersistSpinner = false;
            $scope.showDsPersistDone = false;
            $scope.decisionStrategies = localStorageService.get('decisionStrategies') || [];
            $scope.selectedDecisionStrategy = $scope.decisionStrategies[0];
            $scope.persistDecisionStrategies = function () {
                $scope.showDsPersistSpinner = true;
                $scope.showDsPersistDone = false;
                $timeout(function () {
                    localStorageService.add('decisionStrategies', $scope.decisionStrategies);
                    $scope.showDsPersistSpinner = false;
                    $scope.showDsPersistDone = true;
                    $timeout(function(){
                        $scope.showDsPersistDone = false;
                    },1500);
                }, 500);
            };
            $scope.activeItem = {};
            $scope.treeOptions = {
                checkboxClass: 'glyphicon glyphicon-unchecked',
                folderIconClosed: 'icon-world.png',
                folderIconOpen: 'icon-world.png',
                leafIcon: 'icon-world.png',
                imagePath: 'bower_components/crisma-worldstate-tree-widget-angular/dist/images/',
                multiSelection: true
            };
            // every time the treeSelection changes, we need to determine the
            // corresponding worldstates to the selected nodes. 
            $scope.treeSelection = [];
            $scope.$watchCollection('treeSelection', function (newVal, oldVal) {
                var i, wsId, wsNode, wsArr = [],
                    worldstateCallback = function (worldstate) {
                        wsArr.push(worldstate);
                        if (wsArr.length === $scope.treeSelection.length) {
                            if (!$scope.worldstates) {
                                $scope.worldstates = [];
                            } else {
                                $scope.worldstates.splice(0, $scope.worldstates.length);
                            }
                            $scope.worldstates = wsArr;
                        }
                    };
                if (newVal !== oldVal) {
                    //clear the old worldstate array
                    if ($scope.treeSelection.length <= 0) {
                        $scope.worldstates.splice(0, $scope.worldstates.length);
                    }
                    for (i = 0; i < $scope.treeSelection.length; i++) {
                        wsNode = $scope.treeSelection[i].objectKey;
                        wsId = wsNode.substring(wsNode.lastIndexOf('/') + 1, wsNode.length);
                        Worldstates.get({'wsId': wsId}, worldstateCallback);
                    }
                }
            });

            $scope.updateSelectedCriteriaFunction = function (index) {
                $scope.selectedCriteriaFunction = $scope.criteriaFunctionSet[index];
            };
            
            $scope.updateSelectedDecisionStrategy = function (index) {
                $scope.selectedDecisionStrategy = $scope.decisionStrategies[index];
            };

            $scope.indicatorVector = [];
            // Retrieve the top level nodes from the icmm api
            $scope.treeNodes = Nodes.query(function () {
                var wsId, wsNode, ws, iccObject, group;
                wsNode = $scope.treeNodes[0].objectKey;
                wsId = wsNode.substring(wsNode.lastIndexOf('/') + 1, wsNode.length);
                ws = Worldstates.get({'wsId': wsId}, function () {
                    var indicatorGroup, indicatorProp;
                    iccObject = Worldstates.utils.stripIccData([ws], false)[0];
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
                });
            });
        }
    ]
    );