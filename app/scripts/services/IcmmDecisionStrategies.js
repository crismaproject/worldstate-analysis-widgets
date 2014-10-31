angular.module(
    'eu.crismaproject.worldstateAnalysis.services'
    ).factory(
    'eu.crismaproject.worldstateAnalysis.services.DecisionStrategies',
    [
        '$resource',
        'CRISMA_ICMM_API',
        'CRISMA_DOMAIN',
        'de.cismet.crisma.ICMM.services.icmm',
        function ($resource, CRISMA_ICMM_API, CRISMA_DOMAIN, Icmm) {
            'use strict';
            var transformedData, processResult;
            processResult = function (dsDataObj) {
                var wrapper;
                if (dsDataObj) {
                    wrapper = JSON.parse(dsDataObj);
                    return JSON.parse(wrapper.decisionStrategies);
                }
                return null;

            };
            transformedData = $resource(CRISMA_ICMM_API + '/' + CRISMA_DOMAIN + '.decisionstrategies/1', {
                dsId: '@id',
                deduplicate: false,
                omitNullValues: 'false'
            }, {
                'query': {
                    method: 'GET',
                    isArray: true,
                    params: {
                        level: '1',
                        omitNullValues: 'true'
                    },
                    transformResponse: processResult
                },
                'update': {
                    method: 'PUT',
                    transformRequest: function (data) {
                        var transformedData, wrapper;
                        wrapper = {
                            $self: '/CRISMA.decisionstrategies/1',
                            id: 1,
                            decisionStrategies: angular.toJson(data)
                        };
                        transformedData = JSON.stringify(wrapper, function (k, v) {
                            // we have to take care of angular properties by ourselves
                            if (k.substring(0, 1) === '$' && !(k === '$self' || k === '$ref')) {
                                return undefined;
                            }

                            return v;
                        });
                        return transformedData;
                    }
                }
            });

            transformedData.getId = function () {
                return Icmm.getNextId(CRISMA_ICMM_API + '/' + CRISMA_DOMAIN, '.decisionstrategies');
            };

            return transformedData;
        }
    ]
    );
