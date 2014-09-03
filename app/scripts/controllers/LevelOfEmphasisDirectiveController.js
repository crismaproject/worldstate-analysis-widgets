angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
    ).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.levelOfEmphasisDirectiveController',
    [
        '$scope',
        'eu.crismaproject.worldstateAnalysis.services.AnalysisService',
        function ($scope, AnalysisService) {
            'use strict';
            var controller, owa, i;

            controller = this;
            owa = AnalysisService.getOwa();

            this.updateLseVectors = function () {
                controller.onlyPositiveLse = [];
                for (i = 0; i < $scope.indicatorSize; i++) {
                    if (i === 0) {
                        this.onlyPositiveLse[i] = 1;
                    } else {
                        this.onlyPositiveLse[i] = 0;
                    }
                }
                controller.overEmphPosLse = owa.hLSWeights($scope.indicatorSize);
                controller.neutralLse = owa.meanWeights($scope.indicatorSize);
                controller.overEmphNegLse = owa.lLSWeights($scope.indicatorSize);
                controller.onlyNegativeLse = [];
                for (i = 0; i < $scope.indicatorSize; i++) {
                    if (i === $scope.indicatorSize - 1) {
                        controller.onlyPositiveLse[i] = 1;
                    } else {
                        controller.onlyPositiveLse[i] = 0;
                    }
                }
            };
            this.updateSatisfactionEmphasis = function (lse) {
                var weights;
                switch (parseInt(lse)) {
                    case -2:
                        {
                            weights = controller.onlyNegativeLse;
                            break;
                        }
                    case -1:
                        {
                            weights = controller.overEmphNegLse;
                            break;
                        }
                    case 0:
                        {
                            weights = controller.neutralLse;
                            break;
                        }
                    case 1:
                        {
                            weights = controller.overEmphPosLse;
                            break;
                        }
                    case 2:
                        {
                            weights = controller.onlyPositiveLse;
                            break;
                        }

                }
                return weights;
            };
            
            this.updateInternalModel = function(satisfactionEmphVector){
                if (satisfactionEmphVector === this.onlyNegativeLse){
                    return -2;
                }else if (satisfactionEmphVector === this.overEmphNegLse){
                    return -1;
                }else if (satisfactionEmphVector === this.neutralLse){
                    return 0
                }else if (satisfactionEmphVector === this.overEmphNPosLse){
                    return 1
                }else if (satisfactionEmphVector === this.onlyPositiveLse){
                    return 2
                }
                return 0;
            };

            controller.updateLseVectors();
            $scope.model = {lse: 0};
            $scope.satisfactionEmphasis = controller.updateSatisfactionEmphasis($scope.model.lse);
            $scope.$watch('model', function () {
                $scope.satisfactionEmphasis = controller.updateSatisfactionEmphasis($scope.model.lse);
            }, true);

            $scope.$watch('satisfactionEmphasis', function () {
                $scope.model.lse = controller.updateInternalModel($scope.satisfactionEmphasis);
            }, true);
            
            $scope.$watch('indicatorSize',function(){
                controller.updateLseVectors();
                $scope.satisfactionEmphasis = controller.updateSatisfactionEmphasis($scope.model.lse);
            },true);
        }
    ]
    );


