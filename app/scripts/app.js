// this is only used for demo/testing purposes
angular.module(
    'eu.crismaproject.worldstateAnalysis.demoApp',
    [
        'eu.crismaproject.worldstateAnalysis.demoApp.controllers',
        'eu.crismaproject.worldstateAnalysis.directives',
        'eu.crismaproject.worldstateAnalysis.services',
        'de.cismet.crisma.widgets.worldstateTreeWidget',
        'mgcrea.ngStrap',
        'gettext'
    ]
).run(function (I18nizer) {
    'use strict';
    
    I18nizer.setLocale('en');
});
