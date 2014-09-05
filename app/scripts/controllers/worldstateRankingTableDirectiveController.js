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
        function ($scope, $filter, NgTableParams, Worldstates, ccs, as) {
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
                        critFunc.criteriaFunctions.forEach(function (cf, index) {
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
                    score = as.getOwa().aggregateLS(critWeight.criteria, decisionStrategy.satisfactionEmphasis, critWeight.weights)
                    if (rankedWs.length === 0) {
                        rankedWs.push({
                            worldstate: ws,
                            score: score
                        });
                    } else {
                        insertIndex = -1;
                        rankedWs.forEach(function (rankItem, index) {
                            if (score < rankItem.ws) {
                                insertIndex = index
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
                rankedWs.forEach(function(item,index){
                    item.rank=index+1;
                });
                return rankedWs;
            };

            updateTable = function () {
                var rankedWorldstates, i, rank, score, tableData;
                if ($scope.criteriaFunction && $scope.decisionStrategy && $scope.worldstates && $scope.worldstates.length > 0) {

                    //assume the getRankedWorldstates method returns an ascending ordered array / map etc
                    rankedWorldstates = getRankedWorldstates($scope.worldstates, $scope.criteriaFunction, $scope.decisionStrategy);
                    if (!rankedWorldstates && rankedWorldstates.length <= 0) {
                        throw new Error("Could not rank the worldstates...");
                    }
                    $scope.tableData = [];
                    for (i = 0; i < rankedWorldstates.length; i++) {
                        $scope.tableData.push({
                            'rank': rankedWorldstates[i].rank,
                            'worldstate': rankedWorldstates[i].worldstate.name,
                            'score': rankedWorldstates[i].score
                        });
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
                            total: $scope.tableData.length, // length of data
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
                if ($scope.worldstates && $scope.worldstates.length>0) {
                    updateTable();
                }
            },true);
            $scope.$watch('decisionStrategy', function (newVal, oldVal) {
                if (newVal !== oldVal && $scope.worldstates && $scope.worldstates.length>0) {
                    updateTable();
                }
            },true);

            $scope.$watch('criteriaFunction', function (newVal, oldVal) {
                if (newVal !== oldVal && $scope.worldstates && $scope.worldstates.length>0) {
                    updateTable();
                }
            }, true);
        }
    ]
    );