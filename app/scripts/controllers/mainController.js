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

            Worldstates.query({level: 2}, function (data) {
                $scope.allWorldstates = data;
            });

            $scope.$watch('worldstateRef', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    createChartModels();
                    getIndicators();
                }
            });
            $scope.$watchCollection('worldstates', function (newVal, oldVal) {
                if (newVal !== oldVal && $scope.worldstates) {
                    createChartModels();
                    getIndicators();
                }
            });

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
                    $timeout(function () {
                        $scope.showDsPersistDone = false;
                    }, 1500);
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
            $scope.treeSelection = [];
            $scope.worldstates = [];
            // every time the treeSelection changes, we need to determine the
            // corresponding worldstates to the selected nodes. 
            // we assume that the treeSelection watch is only fired as a result of selection
            // or deselection events in the tree.
            $scope.$watchCollection('treeSelection', function (newVal, oldVal) {
                var i, wsId, wsNode, ws, objectKey, isContained;

                if (newVal !== oldVal) {
                    if ($scope.indicatorVector.length === 0) {
                        wsNode = $scope.treeSelection[0].objectKey;
                        wsId = wsNode.substring(wsNode.lastIndexOf('/') + 1, wsNode.length);
                        Worldstates.get({'wsId': wsId}, function (ws) {
                            var indicatorGroup, indicatorProp, iccObject, group;
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
                    }
                    if ($scope.treeSelection.length > $scope.worldstates.length) {
                        //we need to find the new element in the treeSelection array.
                        for (i = $scope.treeSelection.length - 1; i >= 0; i++) {
                            wsNode = $scope.treeSelection[i];
                            isContained = false;
                            /*jshint -W083 */
                            $scope.worldstates.forEach(function (val) {
                                objectKey = wsNode.objectKey;
                                wsId = parseInt(objectKey.substring(objectKey.lastIndexOf('/') + 1, objectKey.length));
                                if (parseInt(val.id) === wsId) {
                                    isContained = true;
                                }
                            });
                            if (!isContained) {
                                objectKey = wsNode.objectKey;
                                wsId = objectKey.substring(objectKey.lastIndexOf('/') + 1, objectKey.length);
                                /*jshint -W083 */
                                Worldstates.get({level: 2, fields: 'id,name,iccdata,actualaccessinfo, actualaccessinfocontenttype', deduplicate: false, 'wsId': wsId}, function (tmpWs) {
                                    $scope.worldstates.push(tmpWs);
                                });
                                break;
                            }
                        }
                    } else if ($scope.treeSelection.length < $scope.worldstates.length) {
                        //we need to find the deleted element in the treeSelection array.
                        for (i = 0; i < $scope.worldstates.length; i++) {
                            ws = $scope.worldstates[i];
                            isContained = false;
                            /*jshint -W083 */
                            $scope.treeSelection.forEach(function (val) {
                                objectKey = val.objectKey;
                                wsId = parseInt(objectKey.substring(objectKey.lastIndexOf('/') + 1, objectKey.length));
                                if (parseInt(ws.id) === wsId) {
                                    isContained = true;
                                }
                            });
                            if (!isContained) {
                                $scope.worldstates.splice(i, 1);
                                break;
                            }
                        }
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
            });
        }
    ]
    );
