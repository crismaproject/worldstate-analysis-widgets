angular.module(
    'eu.crismaproject.worldstateAnalysis.demoApp.controllers'
).controller(
    'eu.crismaproject.worldstateAnalysis.demoApp.controllers.MainController',
    [
        '$scope',
        '$timeout',
        'eu.crismaproject.worldstateAnalysis.services.IcmmPersistanceService',
        'eu.crismaproject.worldstateAnalysis.services.FilesPersistanceService',
        function ($scope, $timeout, IcmmPersistanceService, FilesPersistanceService) {
            'use strict';

            var createChartModels;
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

            $scope.$watch('worldstateRef', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    createChartModels();
                }
            });
            $scope.$watchCollection('worldstates', function (newVal, oldVal) {
                if (newVal !== oldVal && $scope.worldstates) {
                    createChartModels();
                }
            });

            $scope.updateSelectedCriteriaFunction = function (index) {
                $scope.selectedCriteriaFunction = $scope.criteriaFunctions[index];
            };

            $scope.updateSelectedDecisionStrategy = function (index) {
                $scope.selectedDecisionStrategy = $scope.decisionStrategies[index];
            };

            $scope.persistCriteriaFunctions = function () {
                $scope.showPersistSpinner = true;
                $scope.showPersistDone = false;
                $timeout(function () {
                    if ($scope.icmmTabVisible) {
                        IcmmPersistanceService.persistCriteriaFunctions($scope.criteriaFunctions);
                    } else {
                        FilesPersistanceService.persistCriteriaFunctions($scope.criteriaFunctions);
                    }

                    $scope.showPersistSpinner = false;
                    $scope.showPersistDone = true;
                    $timeout(function () {
                        $scope.showPersistDone = false;
                    }, 1500);
                }, 500);

            };

            $scope.indicatorVector = [];

            $scope.showDsPersistSpinner = false;
            $scope.showDsPersistDone = false;

            $scope.persistDecisionStrategies = function () {
                $scope.showDsPersistSpinner = true;
                $scope.showDsPersistDone = false;
                $timeout(function () {
                    if ($scope.icmmTabVisible) {
                        IcmmPersistanceService.persistDecisionStrategies($scope.decisionStrategies);
                    } else {
                        FilesPersistanceService.persistDecisionStrategies($scope.decisionStrategies);
                    }
                    $scope.showDsPersistSpinner = false;
                    $scope.showDsPersistDone = true;
                    $timeout(function () {
                        $scope.showDsPersistDone = false;
                    }, 1500);
                }, 500);
            };

            $scope.indicatorVector = [];

            /*
             * Since we want to showcase the icmm based context provider as well as the file based context provider
             * we need to update the bindings for the analysis widgets everyt time the user switches between 
             * the icmm and the file tab.
             * The following code is not needed if only one of both context providers is used.
             */

            function watchIcmmWs () {
                return $scope.$watch('worldstatesIcmm', function () {
                    $scope.worldstates = $scope.worldstatesIcmm;
                });
            }

            $scope.derigsterIcmmWsWatch = watchIcmmWs();

            function watchFilesWs () {
                return $scope.$watch('worldstatesFiles', function () {
                    $scope.worldstates = $scope.worldstatesFiles;
                });
            }

            // refWorldstate watches
            function watchRefWsIcmm () {
                return $scope.$watch('refWorldstatesIcmm', function () {
                    $scope.refWorldstates = $scope.refWorldstatesIcmm;
                });
            }

            $scope.derigsterRefWsIcmmWatch = watchRefWsIcmm();

            function watchRefWsFiles () {
                return $scope.$watch('refWorldstatesFiles', function () {
                    $scope.refWorldstates = $scope.refWorldstatesFiles;
                });
            }

            // criteriaFunctions watches
            function watchCfIcmm () {
                return $scope.$watch('criteriaFunctionsIcmm', function () {
                    $scope.criteriaFunctions = $scope.criteriaFunctionsIcmm;
                });
            }

            $scope.derigsterCfIcmm = watchCfIcmm();

            function watchCfFiles () {
                return $scope.$watch('criteriaFunctionsFiles', function () {
                    $scope.criteriaFunctions = $scope.criteriaFunctionsFiles;
                });
            }

            //decision strategy watches
            function watchDsIcmm () {
                return $scope.$watch('decisionStrategiesIcmm', function () {
                    $scope.decisionStrategies = $scope.decisionStrategiesIcmm;
                });
            }

            $scope.derigsterDsIcmm = watchDsIcmm();

            function watchDsFiles () {
                return $scope.$watch('decisionStrategiesFiles', function () {
                    $scope.decisionStrategies = $scope.decisionStrategiesFiles;
                });
            }


            $scope.icmmTabVisible = true;
            $scope.switchToIcmmTab = function () {
                $scope.icmmTabVisible = true;
                $scope.derigsterFilesWsWatch();
                $scope.derigsterIcmmWsWatch = watchIcmmWs();

                $scope.derigsterRefWsFilesWatch();
                $scope.derigsterRefWsIcmmWatch = watchRefWsIcmm();

                $scope.derigsterCfFilesWatch();
                $scope.derigsterCfIcmm = watchCfIcmm();

                $scope.derigsterDsFilesWatch();
                $scope.derigsterDsIcmm = watchDsIcmm();
                
                $scope.selectedCriteriaFunction = undefined;
                $scope.selectedDecisionStrategy= undefined;
            };


            $scope.switchToFilesTab = function () {
                $scope.icmmTabVisible = false;

                $scope.derigsterIcmmWsWatch();
                $scope.derigsterFilesWsWatch = watchFilesWs();

                $scope.derigsterRefWsIcmmWatch();
                $scope.derigsterRefWsFilesWatch = watchRefWsFiles();

                $scope.derigsterCfIcmm();
                $scope.derigsterCfFilesWatch = watchCfFiles();

                $scope.derigsterDsIcmm();
                $scope.derigsterDsFilesWatch = watchDsFiles();
                
                $scope.selectedCriteriaFunction = undefined;
                $scope.selectedDecisionStrategy= undefined;
            };

        }
    ]
    );
