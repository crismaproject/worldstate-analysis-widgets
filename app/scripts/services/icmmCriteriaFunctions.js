angular.module(
    'eu.crismaproject.worldstateAnalysis.services'
    ).factory(
    'eu.crismaproject.worldstateAnalysis.services.CriteriaFunction',
    [
        '$resource',
        'CRISMA_ICMM_API',
        'CRISMA_DOMAIN',
        'de.cismet.crisma.ICMM.services.icmm',
        function ($resource, CRISMA_ICMM_API, CRISMA_DOMAIN, Icmm) {
            'use strict';

            var cf, processResult;
            processResult = function (cfDataObj) {
                var wrapper;
                if (cfDataObj) {
                    wrapper = JSON.parse(cfDataObj);
                    if(wrapper){
                        return JSON.parse(wrapper.criteriaFunctions);
                    }
                }
                return null;
            };

            cf = $resource(CRISMA_ICMM_API + '/' + CRISMA_DOMAIN + '.criteriafunctions/1', {
                cfId: '@id',
                deduplicate: false,
                omitNullValues: 'false'
            }, {
                'get': {
                    method: 'GET',
                    transformResponse: processResult
                },
                'query': {
                    isArray: true,
                    method: 'GET',
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
                            $self: '/CRISMA.criteriafunctions/1',
                            id: 1,
                            criteriaFunctions: angular.toJson(data)
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

            cf.getId = function () {
                return Icmm.getNextId(CRISMA_ICMM_API + '/' + CRISMA_DOMAIN, '.criteriafunctions');
            };

            return cf;
        }
    ]
    );