angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
    ).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.CriteriaFunctionDirectiveController',
    [
        '$scope',
        function ($scope) {
            'use strict';
            $scope.criteriaFunctions = [];
            $scope.$watch('indicators', function () {

                console.log('foobar');
                $scope.criteriaFunctions.splice(0,$scope.criteriaFunctions.length);
                for (var i = 0; i < $scope.indicators.length; i++) {
                   
                    $scope.criteriaFunctions.push($scope.indicators[i].criteriaFunction);
                }
            }, true);
        }
    ]
    );



