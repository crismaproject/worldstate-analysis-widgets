angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
    ).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.worldstateRankingTableDirectiveController',
    [
        '$scope',
        '$filter',
        'ngTableParams',
        'de.cismet.crisma.ICMM.Worldstates',
        'eu.crismaproject.worldstateAnalysis.services.CriteriaCalculationService',
        'eu.crismaproject.worldstateAnalysis.services.AnalysisService',
        'ngDialog',
        function ($scope, $filter, NgTableParams, Worldstates, ccs, as, ngDialog) {
            'use strict';
            var getOrderedProperties, updateTable, getRankedWorldstates,
                getCriteriaVectorForWorldstate, extractIndicators, getCritAndWeightVector;
            getOrderedProperties = function (obj) {
                var p, keys;
                keys = [];
                for (p in obj) {
                    if (obj.hasOwnProperty(p)) {
                        keys.push(p);
                    }
                }
                keys.sort();
                return keys;
            };
            extractIndicators = function (worldstate) {
                var indicatorGroup, indicatorProp, iccObject, group, indicators;
                indicators = [];
                if (worldstate) {
                    iccObject = Worldstates.utils.stripIccData([worldstate], false)[0];
                    for (indicatorGroup in iccObject.data) {
                        if (iccObject.data.hasOwnProperty(indicatorGroup)) {
                            group = iccObject.data[indicatorGroup];
                            for (indicatorProp in group) {
                                if (group.hasOwnProperty(indicatorProp)) {
                                    if (indicatorProp !== 'displayName' && indicatorProp !== 'iconResource') {
                                        indicators.push(group[indicatorProp]);
                                    }
                                }
                            }
                        }
                    }
                }
                return indicators;
            };
            getCriteriaVectorForWorldstate = function (ws, critFunc) {
                var indicators, criterias, i;
                indicators = extractIndicators(ws);
                criterias = [];
                if (indicators && indicators.length === critFunc.criteriaFunctions.length) {
                    for (i = 0; i < indicators.length; i++) {
                        /*jshint -W083 */
                        critFunc.criteriaFunctions.forEach(function (cf) {
                            if (cf.indicator === indicators[i].displayName) {
                                criterias.push({
                                    indicator: indicators[i],
                                    criteria: ccs.calculateCriteria(indicators[i].value, cf) / 100
                                });
                            }
                        });
                    }
                }
                return criterias;
            };
            getCritAndWeightVector = function (dec, criteria) {
                var critWeight, i, critEmph;
                critWeight = {};
                critWeight.criteria = [];
                critWeight.weights = [];
                for (i = 0; i < dec.criteriaEmphases.length; i++) {
                    critEmph = dec.criteriaEmphases[i];
                    /*jshint -W083 */
                    criteria.forEach(function (c) {
                        if (c.indicator.displayName === critEmph.indicator.displayName) {
                            critWeight.criteria.push(c.criteria);
                            critWeight.weights.push(critEmph.criteriaEmphasis / 100);
                        }
                    });
                }
                return critWeight;
            };
            getRankedWorldstates = function (worldstates, criteriaFunction, decisionStrategy) {
                var i, ws, crit, score, critWeight, rankedWs, insertIndex;
                rankedWs = [];
                for (i = 0; i < worldstates.length; i++) {
                    ws = worldstates[i];
                    crit = getCriteriaVectorForWorldstate(ws, criteriaFunction);
                    critWeight = getCritAndWeightVector(decisionStrategy, crit);
                    score = as.getOwa().aggregateLS(critWeight.criteria, decisionStrategy.satisfactionEmphasis, critWeight.weights);
                    if (rankedWs.length === 0) {
                        rankedWs.push({
                            worldstate: ws,
                            score: score
                        });
                    } else {
                        insertIndex = -1;
                        /*jshint -W083 */
                        rankedWs.forEach(function (rankItem, index) {
                            if (insertIndex === -1 && rankItem && rankItem.score && score <= rankItem.score) {
                                insertIndex = index;
                            }
                        });
                        if (insertIndex !== -1) {
                            rankedWs.splice(insertIndex, 0, {
                                worldstate: ws,
                                score: score
                            });
                        } else {
                            rankedWs.push({
                                worldstate: ws,
                                score: score
                            });
                        }
                    }
                }
                rankedWs = rankedWs.reverse();
                rankedWs.forEach(function (item, index) {
                    item.rank = index + 1;
                });
                return rankedWs;
            };
            $scope.clickToOpen = function (index) {
                $scope.ws = $scope.tableData[index].ws;
                ngDialog.open({
                    template: 'templates/criteriaRadarPopupTemplate.html',
                    scope: $scope,
                    className: 'ngdialog-theme-default ngdialog-theme-custom ngdialog-theme-width'
                });
            };
            updateTable = function () {
                var rankedWorldstates, i, obj, iccData, indicatorGroup, group, indicatorProp, indicator,
                    crit, addedCriteriaCols;
                if ($scope.criteriaFunction && $scope.decisionStrategy && $scope.worldstates && $scope.worldstates.length > 0) {
                    addedCriteriaCols = [];
                    //assume the getRankedWorldstates method returns an ascending ordered array / map etc
                    rankedWorldstates = getRankedWorldstates($scope.worldstates, $scope.criteriaFunction, $scope.decisionStrategy);
                    if (!rankedWorldstates && rankedWorldstates.length <= 0) {
                        throw new Error('Could not rank the worldstates...');
                    }

                    $scope.tooltip = {checked: false};
                    $scope.tooltip.title = '';
                    $scope.tableData = [];
                    if ($scope.showRadarChart) {
                        var f = extractIndicators($scope.worldstates[0]);
                        for (i = 0; i < f.length; i++) {
                            $scope.tooltip.title = $scope.tooltip.title + '<br/>' + (i + 1) + ': ' + f[i].displayName;
                        }
                    }
                    $scope.columns = [{
                            title: 'Rank',
                            field: 'rank'
                        }, {
                            title: 'Worldstate',
                            field: 'worldstate'
                        }, {
                            title: 'Score',
                            field: 'score'
                        }
                    ];
                    for (i = 0; i < rankedWorldstates.length; i++) {
                        obj = {
                            'rank': rankedWorldstates[i].rank,
                            'worldstate': rankedWorldstates[i].worldstate.name,
                            'ws': rankedWorldstates[i].worldstate,
                            'score': $filter('number')(rankedWorldstates[i].score * 100, 2) + ' %'
                        };

                        if ($scope.showIndicators) {

                            //we want to add the indicator and criteria....
                            iccData = Worldstates.utils.stripIccData([rankedWorldstates[i].worldstate])[0].data;
                            for (indicatorGroup in iccData) {
                                if (iccData.hasOwnProperty(indicatorGroup)) {
                                    group = iccData[indicatorGroup];
                                    for (indicatorProp in group) {
                                        if (group.hasOwnProperty(indicatorProp) && indicatorProp !== 'displayName' && indicatorProp !== 'iconResource') {
                                            indicator = group[indicatorProp];
                                            crit = 0;
                                            /*jshint -W083 */
                                            $scope.criteriaFunction.criteriaFunctions.forEach(function (cf) {
                                                if (cf.indicator === indicator.displayName) {
                                                    crit = ccs.calculateCriteria(indicator.value, cf);
                                                }
                                            });
                                            obj[indicator.displayName] = {
                                                indicator: $filter('number')(indicator.value) + ' ' + indicator.unit,
                                                los: $filter('number')(crit, 2) + ' % LoS'
                                            };
                                            if (addedCriteriaCols.indexOf(indicator.displayName) === -1) {
                                                addedCriteriaCols.push(indicator.displayName);
                                                $scope.columns.push({
                                                    title: $scope.showRadarChart ? indicator.displayName + ' (' + ($scope.columns.length - 2) + ')' : indicator.displayName,
                                                    field: indicator.displayName,
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        $scope.tableData.push(obj);
                    }
                    if ($scope.tableParams) {
                        $scope.tableParams.reload();
                    } else {
                        $scope.tableParams = new NgTableParams({
                            page: 1, // show first page
                            count: 1000, // count per page
                            sorting: {
                                name: 'asc'     // initial sorting
                            }
                        }, {
                            counts: [], // hide page counts control
                            total: 1, // value less than count hide pagination
                            getData: function ($defer, params) {
                                // use build-in angular filter
                                var orderedData = params.sorting() ?
                                    $filter('orderBy')($scope.tableData, params.orderBy()) :
                                    $scope.tableData;
                                params.total(orderedData.length); // set total for recalc pagination
                                $defer.resolve($scope.tableData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                            }
                        });
                    }
                }
            };
            $scope.tableVisibleSwitch = '0';
            $scope.$watch('worldstates', function () {
                if ($scope.worldstates && $scope.worldstates.length > 0) {
                    updateTable();
                }
            }, true);
            $scope.$watch('decisionStrategy', function (newVal, oldVal) {
                if (newVal !== oldVal && $scope.worldstates && $scope.worldstates.length > 0) {
                    updateTable();
                }
            }, true);
            $scope.$watch('criteriaFunction', function (newVal, oldVal) {
                if (newVal !== oldVal && $scope.worldstates && $scope.worldstates.length > 0) {
                    updateTable();
                }
            }, true);
            $scope.$watch('showIndicators', function (newVal, oldVal) {
                if (newVal !== oldVal && $scope.worldstates && $scope.worldstates.length > 0) {
                    updateTable();
                }
            });
            $scope.$watch('showRadarChart', function (newVal, oldVal) {
                if (newVal !== oldVal && $scope.worldstates && $scope.worldstates.length > 0) {
                    updateTable();
                }
            });
        }
    ]
    );