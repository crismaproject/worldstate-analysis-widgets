// only for testing/demo
angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
    ).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.MainController',
    [
        '$scope',
        'de.cismet.collidingNameService.Nodes',
        'de.cismet.crisma.ICMM.Worldstates',
        function ($scope, Nodes, Worldstates) {
            'use strict';
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
                var i, wsId, wsNode, wsArr = [];
                if (newVal !== oldVal) {
                    //clear the old worldstate array
                    if ($scope.treeSelection.length <= 0) {
                        $scope.worldstates.splice(0, $scope.worldstates.length);
                    }
                    for (i = 0; i < $scope.treeSelection.length; i++) {
                        wsNode = $scope.treeSelection[i].objectKey;
                        wsId = wsNode.substring(wsNode.lastIndexOf('/') + 1, wsNode.length);
                        Worldstates.get({'wsId': wsId}, function (worldstate) {
                            wsArr.push(worldstate);
                            if (wsArr.length === $scope.treeSelection.length) {
                                if (!$scope.worldstates) {
                                    $scope.worldstates = [];
                                } else {
                                    $scope.worldstates.splice(0, $scope.worldstates.length);
                                }
                                $scope.worldstates = wsArr;
                            }
                        });
                    }

                }
            });
            // Retrieve the top level nodes from the icmm api
            $scope.treeNodes = Nodes.query();
        }
    ]
    );