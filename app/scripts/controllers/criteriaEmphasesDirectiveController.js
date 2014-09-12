angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
    ).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.criteriaEmphasesController',
    [
        '$scope',
        function ($scope) {
            'use strict';
            var ctrl, criteriaEmpInternalWatch;

            ctrl = this;

            this.updateCriteriaEmphases = function () {
                var i, item;
                for (i = 0; i < $scope.critEmphInternal.length; i++) {
                    item = $scope.critEmphInternal[i];
                    if($scope.criteriaEmphases[i]){
                        $scope.criteriaEmphases[i].criteriaEmphasis = item.criteriaEmphasis;
                    }else{
                        $scope.criteriaEmphases.push({
                            indicator : item.indicator,
                            criteriaEmphasis : item.criteriaEmphasis
                        });
                    }
                }
            };

            this.updateInternalCriteriaEmphases = function () {
                var critEmphExists, newCritEmphInternal, indicatorName;
                newCritEmphInternal = [];
                for (indicatorName in $scope.indicatorMap) {
                    if ($scope.indicatorMap.hasOwnProperty(indicatorName)) {
                        //check if there is a value for that indicator in the bounded critEmphases
                        critEmphExists = false;
                        if ($scope.criteriaEmphases && $scope.criteriaEmphases.length !== 0) {
                            /*jshint -W083 */
                            $scope.criteriaEmphases.forEach(function (critEmph) {
                                if (critEmph.indicator.displayName === $scope.indicatorMap[indicatorName].displayName) {
                                    critEmphExists = true;
                                    newCritEmphInternal.push(critEmph);
                                }
                            });
                        }
                        // create a default criteriaEmphasis of 100
                        if (!critEmphExists) {
                            newCritEmphInternal.push({
                                indicator: $scope.indicatorMap[indicatorName],
                                criteriaEmphasis: 100
                            });
                        }
                    }
                }
                $scope.critEmphInternal = newCritEmphInternal;
            };

            this.registerInternalWatch = function () {
                //internal changes (knob) must be propagated...
                criteriaEmpInternalWatch = $scope.$watch('critEmphInternal', function (newVal,oldVal) {
                    if(newVal !== oldVal){
                        ctrl.updateCriteriaEmphases();
                    }
                }, true);
            };

            $scope.knobMax = 100;
            $scope.knobOptions = {
                'width': 100,
                'height': 80,
                'displayInput': true,
                'angleOffset': -125,
                'angleArc': 250
            };

            $scope.criteriaEmphases = $scope.criteriaEmphases || [];
            $scope.indicatorMap = {};
            $scope.$watch('indicatorMap', function () {
                if ($scope.indicatorMap && Object.keys($scope.indicatorMap).length !== 0) {
                    ctrl.updateInternalCriteriaEmphases();
                }
            }, true);

            $scope.$watch('criteriaEmphases', function (newVal, oldVal) {
                // we need to derigster the watch for the internal model, because it changes the external model
                if (newVal !== oldVal) {
                    criteriaEmpInternalWatch();
                    ctrl.updateInternalCriteriaEmphases();
                    $scope.criteriaEmphases = $scope.critEmphInternal;
                    ctrl.registerInternalWatch();
                }
            }, true);

            ctrl.registerInternalWatch();

        }
    ]
    );


