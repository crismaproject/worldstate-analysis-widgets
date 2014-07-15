describe('RelationAnalysisChartDirective Test Suite', function () {
    'use strict';
    var ws, ws2;
    //our test objects..
    ws = [{
            '$self': '/CRISMA.worldstates/1',
            'id': 1,
            'name': 'Ski-Weltmeisterschaften Garmisch-Partenkirchen 1',
            'description': 'Im Februar 2011 finden in Garmisch-Partenkirchen die Ski-Weltmeisterschaften statt. An den Veranstaltungsstätten Gudiberg und Kandahar stehen Tribünen mit einem Fassungsvermögen von bis zu 6.000 Zuschauern. Die Einsatzkräfte des BRK Garmisch-Partenkirchen werden bei einen Großschadensereignis im Rahmen der Ski-WM primär zum Einsatz kommen.',
            'categories': [
                {
                    '$self': '/CRISMA.categories/1',
                    'id': 1,
                    'key': 'Exercise',
                    'classification': {
                        '$self': '/CRISMA.classifications/1',
                        'id': 1,
                        'key': 'CAPTURE'
                    }
                }
            ],
            'creator': 'mscholl',
            'created': new Date().toISOString(),
            'origintransition': null,
            'worldstatedata': [
                {
                    '$self': '/CRISMA.dataitems/1',
                    'id': 1,
                    'name': 'Exercise Data',
                    'description': 'Data relevant for the exercise',
                    'lastmodified': new Date().toISOString(),
                    'temporalcoveragefrom': '2010-11-20T10:05:00.000Z',
                    'temporalcoverageto': '2010-11-20T11:55:00.000Z',
                    'spatialcoverage': 'SRID=4326;POINT (47.493611111111 11.100833333333)',
                    'datadescriptor': {
                        '$self': '/CRISMA.datadescriptors/2',
                        'id': 2,
                        'name': 'exercise_slot',
                        'description': 'Dataslot for exercise data',
                        'categories': [
                            {
                                '$self': '/CRISMA.categories/4',
                                'id': 4,
                                'key': 'capture_data',
                                'classification': {
                                    '$self': '/CRISMA.classifications/1',
                                    'id': 1,
                                    'key': 'CAPTURE'
                                }
                            }
                        ],
                        'defaultaccessinfocontenttype': 'application/x-www-form-urlencoded',
                        'defaultaccessinfo': 'http://crisma.cismet.de/pilotE/ait/icmm_api/CRISMA.exercises/:id?deduplicate=true'
                    },
                    'actualaccessinfocontenttype': 'text/plain',
                    'actualaccessinfo': '1',
                    'categories': [
                        {
                            '$self': '/CRISMA.categories/5',
                            'id': 5,
                            'key': 'exercise_data',
                            'classification': {
                                '$self': '/CRISMA.classifications/1',
                                'id': 1,
                                'key': 'CAPTURE'
                            }
                        }
                    ]
                }
            ],
            'iccdata': [
                {
                    '$self': '/CRISMA.dataitems/3',
                    'id': 3,
                    'name': 'Criteria',
                    'description': 'Criteria data',
                    'lastmodified': new Date().toISOString(),
                    'temporalcoveragefrom': '2010-11-20T10:05:00.000Z',
                    'temporalcoverageto': '2010-11-20T11:55:00.000Z',
                    'spatialcoverage': 'SRID=4326;POINT (47.493611111111 11.100833333333)',
                    'datadescriptor': {
                        '$self': '/CRISMA.datadescriptors/1',
                        'id': 1,
                        'name': 'icc_slot',
                        'description': 'Dataslot for icc data',
                        'categories': [
                            {
                                '$self': '/CRISMA.categories/3',
                                'id': 3,
                                'key': 'ICC_DATA',
                                'classification': {
                                    '$self': '/CRISMA.classifications/2',
                                    'id': 2,
                                    'key': 'ICC_DATA'
                                }
                            }
                        ],
                        'defaultaccessinfocontenttype': 'application/json',
                        'defaultaccessinfo': null
                    },
                    'actualaccessinfocontenttype': 'application/json',
                    'actualaccessinfo': '{"casualties":{"displayName":"Casualties","iconResource":"images/flower_16.png","noOfDead":{"displayName":"Number of dead","iconResource":"images/flower_dead_16.png","value":"15","unit":"Percent"},"noOfInjured":{"displayName":"Number of injured","iconResource":"images/flower_injured_16.png","value":"80","unit":"Percent"},"noOfHomeless":{"displayName":"Number of homeless","iconResource":"images/flower_homeless_16.png","value":"5","unit":"Percent"}},"cost":{"directDamageCost":{"displayName":"Direct damage cost","iconResource":"images/dollar_direct_16.png","value":"90","unit":"Percent"},"displayName":"Economic cost","iconResource":"images/dollar_16.png","indirectDamageCost":{"displayName":"Indirect damage cost","iconResource":"images/dollar_indirect_16.png","value":"50","unit":"Percent"},"restorationCost":{"displayName":"Direct restoration cost","iconResource":"images/dollar_restoration_16.png","value":"34","unit":"Percent"}},"damagedBuildings":{"displayName":"Damaged buildings","iconResource":"images/home_16.png","lostBuildings":{"displayName":"Lost buildings","iconResource":"images/home_lost_16.png","value":"49","unit":"Percent"},"unsafeBuildings":{"displayName":"Unsafe buildings","iconResource":"images/home_unsafe_16.png","value":"29","unit":"Percent"}},"damagedInfrastructure":{"damagedRoadSegments":{"displayName":"Number of damaged road segments","iconResource":"images/road_damaged_16.png","value":"34","unit":"Percent"},"displayName":"Damaged Infrastructure","iconResource":"images/road_16.png"},"evacuationCost":{"displayName":"Evacuation cost","iconResource":"images/money_evac_16.png","totalEvacuationCost":{"displayName":"Total evacuationcost","iconResource":"images/money_total_evac_16.png","value":"80","unit":"Percent"}}}',
                    'categories': [
                        {
                            '$self': '/CRISMA.categories/6',
                            'id': 6,
                            'key': 'Criteria',
                            'classification': {
                                '$self': '/CRISMA.classifications/2',
                                'id': 2,
                                'key': 'ICC_DATA'
                            }
                        }
                    ]
                }
            ],
            'childworldstates': []
        }];
    
    ws2 = [{
            '$self': '/CRISMA.worldstates/1',
            'id': 1,
            'name': 'Ski-Weltmeisterschaften Garmisch-Partenkirchen 1',
            'description': 'Im Februar 2011 finden in Garmisch-Partenkirchen die Ski-Weltmeisterschaften statt. An den Veranstaltungsstätten Gudiberg und Kandahar stehen Tribünen mit einem Fassungsvermögen von bis zu 6.000 Zuschauern. Die Einsatzkräfte des BRK Garmisch-Partenkirchen werden bei einen Großschadensereignis im Rahmen der Ski-WM primär zum Einsatz kommen.',
            'categories': [
                {
                    '$self': '/CRISMA.categories/1',
                    'id': 1,
                    'key': 'Exercise',
                    'classification': {
                        '$self': '/CRISMA.classifications/1',
                        'id': 1,
                        'key': 'CAPTURE'
                    }
                }
            ],
            'creator': 'mscholl',
            'created': new Date().toISOString(),
            'origintransition': null,
            'worldstatedata': [
                {
                    '$self': '/CRISMA.dataitems/1',
                    'id': 1,
                    'name': 'Exercise Data',
                    'description': 'Data relevant for the exercise',
                    'lastmodified': new Date().toISOString(),
                    'temporalcoveragefrom': '2010-11-20T10:05:00.000Z',
                    'temporalcoverageto': '2010-11-20T11:55:00.000Z',
                    'spatialcoverage': 'SRID=4326;POINT (47.493611111111 11.100833333333)',
                    'datadescriptor': {
                        '$self': '/CRISMA.datadescriptors/2',
                        'id': 2,
                        'name': 'exercise_slot',
                        'description': 'Dataslot for exercise data',
                        'categories': [
                            {
                                '$self': '/CRISMA.categories/4',
                                'id': 4,
                                'key': 'capture_data',
                                'classification': {
                                    '$self': '/CRISMA.classifications/1',
                                    'id': 1,
                                    'key': 'CAPTURE'
                                }
                            }
                        ],
                        'defaultaccessinfocontenttype': 'application/x-www-form-urlencoded',
                        'defaultaccessinfo': 'http://crisma.cismet.de/pilotE/ait/icmm_api/CRISMA.exercises/:id?deduplicate=true'
                    },
                    'actualaccessinfocontenttype': 'text/plain',
                    'actualaccessinfo': '1',
                    'categories': [
                        {
                            '$self': '/CRISMA.categories/5',
                            'id': 5,
                            'key': 'exercise_data',
                            'classification': {
                                '$self': '/CRISMA.classifications/1',
                                'id': 1,
                                'key': 'CAPTURE'
                            }
                        }
                    ]
                }
            ],
            'iccdata': [
                {
                    '$self': '/CRISMA.dataitems/3',
                    'id': 3,
                    'name': 'Criteria',
                    'description': 'Criteria data',
                    'lastmodified': new Date().toISOString(),
                    'temporalcoveragefrom': '2010-11-20T10:05:00.000Z',
                    'temporalcoverageto': '2010-11-20T11:55:00.000Z',
                    'spatialcoverage': 'SRID=4326;POINT (47.493611111111 11.100833333333)',
                    'datadescriptor': {
                        '$self': '/CRISMA.datadescriptors/1',
                        'id': 1,
                        'name': 'icc_slot',
                        'description': 'Dataslot for icc data',
                        'categories': [
                            {
                                '$self': '/CRISMA.categories/3',
                                'id': 3,
                                'key': 'ICC_DATA',
                                'classification': {
                                    '$self': '/CRISMA.classifications/2',
                                    'id': 2,
                                    'key': 'ICC_DATA'
                                }
                            }
                        ],
                        'defaultaccessinfocontenttype': 'application/json',
                        'defaultaccessinfo': null
                    },
                    'actualaccessinfocontenttype': 'application/json',
                    'actualaccessinfo': '{"casualties":{"displayName":"Casualties","iconResource":"images/flower_16.png","noOfDead":{"displayName":"Number of dead","iconResource":"images/flower_dead_16.png","value":"15","unit":"Percent"},"noOfInjured":{"displayName":"Number of injured","iconResource":"images/flower_injured_16.png","value":"80","unit":"Percent"},"noOfHomeless":{"displayName":"Number of homeless","iconResource":"images/flower_homeless_16.png","value":"5","unit":"Percent"}},"cost":{"directDamageCost":{"displayName":"Direct damage cost","iconResource":"images/dollar_direct_16.png","value":"90","unit":"Percent"},"displayName":"Economic cost","iconResource":"images/dollar_16.png","indirectDamageCost":{"displayName":"Indirect damage cost","iconResource":"images/dollar_indirect_16.png","value":"50","unit":"Percent"},"restorationCost":{"displayName":"Direct restoration cost","iconResource":"images/dollar_restoration_16.png","value":"34","unit":"Percent"}},"damagedBuildings":{"displayName":"Damaged buildings","iconResource":"images/home_16.png","lostBuildings":{"displayName":"Lost buildings","iconResource":"images/home_lost_16.png","value":"49","unit":"Percent"},"unsafeBuildings":{"displayName":"Unsafe buildings","iconResource":"images/home_unsafe_16.png","value":"29","unit":"Percent"}},"damagedInfrastructure":{"damagedRoadSegments":{"displayName":"Number of damaged road segments","iconResource":"images/road_damaged_16.png","value":"34","unit":"Percent"},"displayName":"Damaged Infrastructure","iconResource":"images/road_16.png"},"evacuationCost":{"displayName":"Evacuation cost","iconResource":"images/money_evac_16.png","totalEvacuationCost":{"displayName":"Total evacuationcost","iconResource":"images/money_total_evac_16.png","value":"80","unit":"Percent"}}}',
                    'categories': [
                        {
                            '$self': '/CRISMA.categories/6',
                            'id': 6,
                            'key': 'Criteria',
                            'classification': {
                                '$self': '/CRISMA.classifications/2',
                                'id': 2,
                                'key': 'ICC_DATA'
                            }
                        }
                    ]
                }
            ],
            'childworldstates': []
        },{
            '$self': '/CRISMA.worldstates/1',
            'id': 1,
            'name': 'Ski-Weltmeisterschaften Garmisch-Partenkirchen 1',
            'description': 'Im Februar 2011 finden in Garmisch-Partenkirchen die Ski-Weltmeisterschaften statt. An den Veranstaltungsstätten Gudiberg und Kandahar stehen Tribünen mit einem Fassungsvermögen von bis zu 6.000 Zuschauern. Die Einsatzkräfte des BRK Garmisch-Partenkirchen werden bei einen Großschadensereignis im Rahmen der Ski-WM primär zum Einsatz kommen.',
            'categories': [
                {
                    '$self': '/CRISMA.categories/1',
                    'id': 1,
                    'key': 'Exercise',
                    'classification': {
                        '$self': '/CRISMA.classifications/1',
                        'id': 1,
                        'key': 'CAPTURE'
                    }
                }
            ],
            'creator': 'mscholl',
            'created': new Date().toISOString(),
            'origintransition': null,
            'worldstatedata': [
                {
                    '$self': '/CRISMA.dataitems/1',
                    'id': 1,
                    'name': 'Exercise Data',
                    'description': 'Data relevant for the exercise',
                    'lastmodified': new Date().toISOString(),
                    'temporalcoveragefrom': '2010-11-20T10:05:00.000Z',
                    'temporalcoverageto': '2010-11-20T11:55:00.000Z',
                    'spatialcoverage': 'SRID=4326;POINT (47.493611111111 11.100833333333)',
                    'datadescriptor': {
                        '$self': '/CRISMA.datadescriptors/2',
                        'id': 2,
                        'name': 'exercise_slot',
                        'description': 'Dataslot for exercise data',
                        'categories': [
                            {
                                '$self': '/CRISMA.categories/4',
                                'id': 4,
                                'key': 'capture_data',
                                'classification': {
                                    '$self': '/CRISMA.classifications/1',
                                    'id': 1,
                                    'key': 'CAPTURE'
                                }
                            }
                        ],
                        'defaultaccessinfocontenttype': 'application/x-www-form-urlencoded',
                        'defaultaccessinfo': 'http://crisma.cismet.de/pilotE/ait/icmm_api/CRISMA.exercises/:id?deduplicate=true'
                    },
                    'actualaccessinfocontenttype': 'text/plain',
                    'actualaccessinfo': '1',
                    'categories': [
                        {
                            '$self': '/CRISMA.categories/5',
                            'id': 5,
                            'key': 'exercise_data',
                            'classification': {
                                '$self': '/CRISMA.classifications/1',
                                'id': 1,
                                'key': 'CAPTURE'
                            }
                        }
                    ]
                }
            ],
            'iccdata': [
                {
                    '$self': '/CRISMA.dataitems/3',
                    'id': 3,
                    'name': 'Criteria',
                    'description': 'Criteria data',
                    'lastmodified': new Date().toISOString(),
                    'temporalcoveragefrom': '2010-11-20T10:05:00.000Z',
                    'temporalcoverageto': '2010-11-20T11:55:00.000Z',
                    'spatialcoverage': 'SRID=4326;POINT (47.493611111111 11.100833333333)',
                    'datadescriptor': {
                        '$self': '/CRISMA.datadescriptors/1',
                        'id': 1,
                        'name': 'icc_slot',
                        'description': 'Dataslot for icc data',
                        'categories': [
                            {
                                '$self': '/CRISMA.categories/3',
                                'id': 3,
                                'key': 'ICC_DATA',
                                'classification': {
                                    '$self': '/CRISMA.classifications/2',
                                    'id': 2,
                                    'key': 'ICC_DATA'
                                }
                            }
                        ],
                        'defaultaccessinfocontenttype': 'application/json',
                        'defaultaccessinfo': null
                    },
                    'actualaccessinfocontenttype': 'application/json',
                    'actualaccessinfo': '{"casualties":{"displayName":"Casualties","iconResource":"images/flower_16.png","noOfDead":{"displayName":"Number of dead","iconResource":"images/flower_dead_16.png","value":"15","unit":"Percent"},"noOfInjured":{"displayName":"Number of injured","iconResource":"images/flower_injured_16.png","value":"80","unit":"Percent"},"noOfHomeless":{"displayName":"Number of homeless","iconResource":"images/flower_homeless_16.png","value":"5","unit":"Percent"}},"cost":{"directDamageCost":{"displayName":"Direct damage cost","iconResource":"images/dollar_direct_16.png","value":"90","unit":"Percent"},"displayName":"Economic cost","iconResource":"images/dollar_16.png","indirectDamageCost":{"displayName":"Indirect damage cost","iconResource":"images/dollar_indirect_16.png","value":"50","unit":"Percent"},"restorationCost":{"displayName":"Direct restoration cost","iconResource":"images/dollar_restoration_16.png","value":"34","unit":"Percent"}},"damagedBuildings":{"displayName":"Damaged buildings","iconResource":"images/home_16.png","lostBuildings":{"displayName":"Lost buildings","iconResource":"images/home_lost_16.png","value":"49","unit":"Percent"},"unsafeBuildings":{"displayName":"Unsafe buildings","iconResource":"images/home_unsafe_16.png","value":"29","unit":"Percent"}},"damagedInfrastructure":{"damagedRoadSegments":{"displayName":"Number of damaged road segments","iconResource":"images/road_damaged_16.png","value":"34","unit":"Percent"},"displayName":"Damaged Infrastructure","iconResource":"images/road_16.png"},"evacuationCost":{"displayName":"Evacuation cost","iconResource":"images/money_evac_16.png","totalEvacuationCost":{"displayName":"Total evacuationcost","iconResource":"images/money_total_evac_16.png","value":"80","unit":"Percent"}}}',
                    'categories': [
                        {
                            '$self': '/CRISMA.categories/6',
                            'id': 6,
                            'key': 'Criteria',
                            'classification': {
                                '$self': '/CRISMA.classifications/2',
                                'id': 2,
                                'key': 'ICC_DATA'
                            }
                        }
                    ]
                }
            ],
            'childworldstates': []
        },{
            '$self': '/CRISMA.worldstates/1',
            'id': 1,
            'name': 'Ski-Weltmeisterschaften Garmisch-Partenkirchen 1',
            'description': 'Im Februar 2011 finden in Garmisch-Partenkirchen die Ski-Weltmeisterschaften statt. An den Veranstaltungsstätten Gudiberg und Kandahar stehen Tribünen mit einem Fassungsvermögen von bis zu 6.000 Zuschauern. Die Einsatzkräfte des BRK Garmisch-Partenkirchen werden bei einen Großschadensereignis im Rahmen der Ski-WM primär zum Einsatz kommen.',
            'categories': [
                {
                    '$self': '/CRISMA.categories/1',
                    'id': 1,
                    'key': 'Exercise',
                    'classification': {
                        '$self': '/CRISMA.classifications/1',
                        'id': 1,
                        'key': 'CAPTURE'
                    }
                }
            ],
            'creator': 'mscholl',
            'created': new Date().toISOString(),
            'origintransition': null,
            'worldstatedata': [
                {
                    '$self': '/CRISMA.dataitems/1',
                    'id': 1,
                    'name': 'Exercise Data',
                    'description': 'Data relevant for the exercise',
                    'lastmodified': new Date().toISOString(),
                    'temporalcoveragefrom': '2010-11-20T10:05:00.000Z',
                    'temporalcoverageto': '2010-11-20T11:55:00.000Z',
                    'spatialcoverage': 'SRID=4326;POINT (47.493611111111 11.100833333333)',
                    'datadescriptor': {
                        '$self': '/CRISMA.datadescriptors/2',
                        'id': 2,
                        'name': 'exercise_slot',
                        'description': 'Dataslot for exercise data',
                        'categories': [
                            {
                                '$self': '/CRISMA.categories/4',
                                'id': 4,
                                'key': 'capture_data',
                                'classification': {
                                    '$self': '/CRISMA.classifications/1',
                                    'id': 1,
                                    'key': 'CAPTURE'
                                }
                            }
                        ],
                        'defaultaccessinfocontenttype': 'application/x-www-form-urlencoded',
                        'defaultaccessinfo': 'http://crisma.cismet.de/pilotE/ait/icmm_api/CRISMA.exercises/:id?deduplicate=true'
                    },
                    'actualaccessinfocontenttype': 'text/plain',
                    'actualaccessinfo': '1',
                    'categories': [
                        {
                            '$self': '/CRISMA.categories/5',
                            'id': 5,
                            'key': 'exercise_data',
                            'classification': {
                                '$self': '/CRISMA.classifications/1',
                                'id': 1,
                                'key': 'CAPTURE'
                            }
                        }
                    ]
                }
            ],
            'iccdata': [
                {
                    '$self': '/CRISMA.dataitems/3',
                    'id': 3,
                    'name': 'Criteria',
                    'description': 'Criteria data',
                    'lastmodified': new Date().toISOString(),
                    'temporalcoveragefrom': '2010-11-20T10:05:00.000Z',
                    'temporalcoverageto': '2010-11-20T11:55:00.000Z',
                    'spatialcoverage': 'SRID=4326;POINT (47.493611111111 11.100833333333)',
                    'datadescriptor': {
                        '$self': '/CRISMA.datadescriptors/1',
                        'id': 1,
                        'name': 'icc_slot',
                        'description': 'Dataslot for icc data',
                        'categories': [
                            {
                                '$self': '/CRISMA.categories/3',
                                'id': 3,
                                'key': 'ICC_DATA',
                                'classification': {
                                    '$self': '/CRISMA.classifications/2',
                                    'id': 2,
                                    'key': 'ICC_DATA'
                                }
                            }
                        ],
                        'defaultaccessinfocontenttype': 'application/json',
                        'defaultaccessinfo': null
                    },
                    'actualaccessinfocontenttype': 'application/json',
                    'actualaccessinfo': '{"casualties":{"displayName":"Casualties","iconResource":"images/flower_16.png","noOfDead":{"displayName":"Number of dead","iconResource":"images/flower_dead_16.png","value":"15","unit":"Percent"},"noOfInjured":{"displayName":"Number of injured","iconResource":"images/flower_injured_16.png","value":"80","unit":"Percent"},"noOfHomeless":{"displayName":"Number of homeless","iconResource":"images/flower_homeless_16.png","value":"5","unit":"Percent"}},"cost":{"directDamageCost":{"displayName":"Direct damage cost","iconResource":"images/dollar_direct_16.png","value":"90","unit":"Percent"},"displayName":"Economic cost","iconResource":"images/dollar_16.png","indirectDamageCost":{"displayName":"Indirect damage cost","iconResource":"images/dollar_indirect_16.png","value":"50","unit":"Percent"},"restorationCost":{"displayName":"Direct restoration cost","iconResource":"images/dollar_restoration_16.png","value":"34","unit":"Percent"}},"damagedBuildings":{"displayName":"Damaged buildings","iconResource":"images/home_16.png","lostBuildings":{"displayName":"Lost buildings","iconResource":"images/home_lost_16.png","value":"49","unit":"Percent"},"unsafeBuildings":{"displayName":"Unsafe buildings","iconResource":"images/home_unsafe_16.png","value":"29","unit":"Percent"}},"damagedInfrastructure":{"damagedRoadSegments":{"displayName":"Number of damaged road segments","iconResource":"images/road_damaged_16.png","value":"34","unit":"Percent"},"displayName":"Damaged Infrastructure","iconResource":"images/road_16.png"},"evacuationCost":{"displayName":"Evacuation cost","iconResource":"images/money_evac_16.png","totalEvacuationCost":{"displayName":"Total evacuationcost","iconResource":"images/money_total_evac_16.png","value":"80","unit":"Percent"}}}',
                    'categories': [
                        {
                            '$self': '/CRISMA.categories/6',
                            'id': 6,
                            'key': 'Criteria',
                            'classification': {
                                '$self': '/CRISMA.classifications/2',
                                'id': 2,
                                'key': 'ICC_DATA'
                            }
                        }
                    ]
                }
            ],
            'childworldstates': []
        }]
    
    describe('CriteriaRadarChart Directive Tests', function () {
        var $compile, $rootScope, scope, $controller, WorldstateService;
        function compare (a, b) {
            if (a.axis < b.axis)
                return -1;
            if (a.axis > b.axis)
                return 1;
            return 0;
        }

        // Load the myApp module, which contains the directive
        beforeEach(function () {
            // we mock the constants necessary for the Worldstates Service
            module(function ($provide) {
                $provide.constant('CRISMA_DOMAIN', 'CRISMA');
                $provide.constant('CRISMA_ICMM_API', 'http://localhost:8890');
            });
            module('de.cismet.crisma.ICMM.Worldstates');
            module('eu.crismaproject.worldstateAnalysis.directives');

        });

        // Store references to $rootScope and $compile
        // so they are available to all tests in this describe block
        beforeEach(inject(
            [
                '$compile',
                '$rootScope',
                function (compile, rootScope) {
                    $compile = compile;
                    $rootScope = rootScope;
                }
            ]
            ));

        beforeEach(inject(
            [
                '$controller',
                'de.cismet.crisma.ICMM.Worldstates',
                function (c, wsService) {
                    $controller = c;
                    WorldstateService = wsService;
                }
            ]
            ));


        it('contains at least an svg element if correct data is provided', function () {
            var scope = $rootScope.$new();
            scope.worldstates = ws;

            // Compile a piece of HTML containing the directive
            var element = $compile(angular.element('<div class="col-lg-6" criteria-radar worldstates="worldstates">'))(scope);
            // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
            $rootScope.$digest();
            // Check that the compiled element contains the templated content
            expect(element.html()).toContain('<svg');
        });

        it('calculates correct chart data for a single worldstate', function () {
            var scope, chartModelRef, chartModel,
                dataVector, wsDataRef, wsData;
            var scope = $rootScope.$new();

            chartModelRef = [[{
                        axis: 'Number of dead',
                        value: '15'
                    }, {
                        axis: 'Total evacuationcost',
                        value: '80'
                    }, {
                        axis: 'Number of damaged road segments',
                        value: '34'
                    }, {
                        axis: 'Unsafe buildings',
                        value: '29'
                    }, {
                        axis: 'Lost buildings',
                        value: '49'
                    }, , {
                        axis: 'Direct restoration cost',
                        value: '34'
                    }, {
                        axis: 'Indirect damage cost',
                        value: '50'
                    }, {
                        axis: 'Direct damage cost',
                        value: '90'
                    }, {
                        axis: 'Number of homeless',
                        value: '5'
                    }, {
                        axis: 'Number of injured',
                        value: '80'
                    }].sort(compare)];

            $controller('eu.crismaproject.worldstateAnalysis.controllers.CriteriaRadarChartDirectiveController', {
                $scope: scope
            });

            dataVector = WorldstateService.utils.stripIccData(ws, true);
            chartModel = scope.convertToChartDataStructure(dataVector)[0];
            expect(chartModelRef.length).toEqual(chartModel.length);
            for (var i = 0; i < chartModel.length; i++) {
                wsDataRef = chartModelRef[i];
                wsData = chartModel[i].sort(compare);
                for (var j = 0; j < wsDataRef.length; j++) {
                    expect(wsDataRef[j]).toEqual(wsData[j]);
                }
            }
        });

        it('calculates correct chart data for a set of worldstates', function () {
            var scope, chartModelRef, chartModel,
                iccData, wsDataRef, wsData;
            var scope = $rootScope.$new();

            chartModelRef = [{
                    axis: 'Number of dead',
                    value: '15'
                }, {
                    axis: 'Total evacuationcost',
                    value: '80'
                }, {
                    axis: 'Number of damaged road segments',
                    value: '34'
                }, {
                    axis: 'Unsafe buildings',
                    value: '29'
                }, {
                    axis: 'Lost buildings',
                    value: '49'
                }, , {
                    axis: 'Direct restoration cost',
                    value: '34'
                }, {
                    axis: 'Indirect damage cost',
                    value: '50'
                }, {
                    axis: 'Direct damage cost',
                    value: '90'
                }, {
                    axis: 'Number of homeless',
                    value: '5'
                }, {
                    axis: 'Number of injured',
                    value: '80'
                }].sort(compare);

            chartModelRef = [chartModelRef, chartModelRef, chartModelRef];

            $controller('eu.crismaproject.worldstateAnalysis.controllers.CriteriaRadarChartDirectiveController', {
                $scope: scope
            });
            
            iccData = WorldstateService.utils.stripIccData(ws2, true);
            chartModel = scope.convertToChartDataStructure(iccData)[0];
            expect(chartModelRef.length).toEqual(chartModel.length);
            for (var i = 0; i < chartModel.length; i++) {
                wsDataRef = chartModelRef[i];
                wsData = chartModel[i].sort(compare);
                for (var j = 0; j < wsDataRef.length; j++) {
                    expect(wsDataRef[j]).toEqual(wsData[j]);
                }
            }
        });

    });

});