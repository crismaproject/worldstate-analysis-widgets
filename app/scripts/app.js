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
    ).run(function (I18nizer, $http) {
    'use strict';
    $http.get('i18n/cldr/supplemental/likelySubtags.json').success(function (data) {
        Globalize.load(data);
        //set the default locale
            Globalize.locale('en');
        I18nizer.setLocale('en');
    });
}
);
