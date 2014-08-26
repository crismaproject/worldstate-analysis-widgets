angular.module(
    'eu.crismaproject.worldstateAnalysis.services'
    ).factory(
    'eu.crismaproject.worldstateAnalysis.services.CriteriaCalculationService',
    [
        function () {
            'use strict';
            var calculateCriteria, interpolateValue;

            interpolateValue = function (indicatorValue, lowerBound, upperBound) {
                var max, min, lowerCriteriaValue, upperCriteriaValue, rate;
                max = Math.max(lowerBound.indicatorValue, upperBound.indicatorValue);
                min = Math.min(lowerBound.indicatorValue, upperBound.indicatorValue);
                lowerCriteriaValue = lowerBound.criteriaValue;
                upperCriteriaValue = upperBound.criteriaValue;
                rate = (max - indicatorValue) / (max - min);
                return upperCriteriaValue + ((lowerCriteriaValue - upperCriteriaValue) * rate);
            };

            calculateCriteria = function (indicatorValue, criteriaFunction) {
                var i, pre, suc, list = [];
                //check the format of the criteriaFunction
                if (!(criteriaFunction.lowerBoundary && criteriaFunction.upperBoundary && criteriaFunction.intervals)) {
                    throw new Error('CriteriaFunction is not valid');
                }
                list.push(criteriaFunction.lowerBoundary);
                list = list.concat(criteriaFunction.intervals);
                list.push(criteriaFunction.upperBoundary);
                if (criteriaFunction.lowerBoundary.indicatorValue > criteriaFunction.upperBoundary.indicatorValue) {
                    list.reverse();
                }
                //check if the indicatorValue is lower than the lowerBound

                if (indicatorValue <= list[0].indicatorValue) {
                    return list[0].criteriaValue;
                } else if (indicatorValue >= list[list.length - 1].indicatorValue) {
                    return list[list.length - 1].criteriaValue;
                } else {
                    //loop through the intervals...
                    for (i = 1; i < list.length; i++) {
                        pre = list[i - 1];
                        suc = list[i];
                        if (indicatorValue >= pre.indicatorValue && indicatorValue <= suc.indicatorValue) {
                            return interpolateValue(indicatorValue, pre, suc);
                        }
                    }
                    return interpolateValue(indicatorValue, suc, criteriaFunction.upperBoundary);
                }
            };
            return {
                'calculateCriteria': calculateCriteria
            };
        }
    ]
    );