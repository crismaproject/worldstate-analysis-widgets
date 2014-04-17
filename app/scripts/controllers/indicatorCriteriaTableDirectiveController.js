angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.IndicatorCriteriaTableDirectiveController',
    [
        '$scope',
        '$filter',
        'eu.crismaproject.worldstateAnalysis.services.AnalysisService',
        'ngTableParams',
        function ($scope, $filter, analysisService, NgTableParams) {
            'use strict';

            var dataVector, field, getOrderedProperties, group, i, iccData, j,
                k_outer, k_inner, keys_outer, keys_inner, prop, val;

            dataVector = analysisService.getWorldstateUtils().stripIccData($scope.worldstates, $scope.forCriteria);

            $scope.rows = [];
            $scope.columns = [
                {title: $scope.forCriteria ? 'Criteria' : 'Indicators', field: 'f1', visible: true}
            ];

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

            j = 0;
            iccData = dataVector[0].data;
            keys_outer = getOrderedProperties(iccData);
            for (k_outer = 0; k_outer < keys_outer.length; ++k_outer) {
                group = iccData[keys_outer[k_outer]];
                $scope.rows[j++] = {f1: {name: group.displayName, icon: group.iconResource}};

                keys_inner = getOrderedProperties(group);
                for (k_inner = 0; k_inner < keys_inner.length; ++k_inner) {
                    prop = keys_inner[k_inner];
                    if (prop !== 'displayName' && prop !== 'iconResource') {
                        $scope.rows[j++] = {f1: {name: group[prop].displayName, icon: group[prop].iconResource}};
                    }
                }
            }

            for (i = 0; i < dataVector.length; ++i) {
                field = 'f' + (i + 2);
                $scope.columns.push({title: dataVector[i].name, field: field, visible: true});

                iccData = dataVector[i].data;
                j = 0;
                keys_outer = getOrderedProperties(iccData);
                for (k_outer = 0; k_outer < keys_outer.length; ++k_outer) {
                    group = iccData[keys_outer[k_outer]];
                    $scope.rows[j++][field] = null;

                    keys_inner = getOrderedProperties(group);
                    for (k_inner = 0; k_inner < keys_inner.length; ++k_inner) {
                        prop = keys_inner[k_inner];
                        if (prop !== 'displayName' && prop !== 'iconResource') {
                            val = group[prop].value;
                            if (val % 1 !== 0) {
                                val = $filter('number')(val, 2);
                            }
                            $scope.rows[j++][field] = {name: val + ' ' + group[prop].unit};
                        }
                    }
                }
            }

            $scope.tableParams = new NgTableParams(
                {
                    page: 1,
                    count: $scope.rows.length
                },
                {
                    counts: [],
                    total: 1,
                    getData: function ($defer, params) {
                        $defer.resolve(
                            $scope.rows.slice(
                                (params.page() - 1) * params.count(),
                                params.page() * params.count()
                            )
                        );
                    }
                }
            );
        }
    ]
);