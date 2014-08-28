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
        function ($scope, Nodes, Worldstates, localStorageService) {
            'use strict';
            $scope.criteriaFunctionSet = localStorageService.get('criteriaFunctionSet') || [];
            $scope.selectedCriteriaFunction = $scope.criteriaFunctionSet[0];
            $scope.persistCriteriaFunctions = function () {
                localStorageService.add('criteriaFunctionSet', $scope.criteriaFunctionSet);
            };
            $scope.$watch('criteriaFunctionSet', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    console.log('received changes in criteria function');
                }
            }, true);
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