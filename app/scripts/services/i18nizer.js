angular.module(
    'eu.crismaproject.worldstateAnalysis.services'
).factory(
    'I18nizer',
    [
        'gettextCatalog',
        function (gettextCatalog) {
            'use strict';
            var locale, setLocale, getLocale;

            locale = 'en';

            setLocale = function (loc) {
//                gettextCatalog.debug = true;
                gettextCatalog.setCurrentLanguage(loc);
                gettextCatalog.loadRemote('i18n/' + loc + '.json');
                locale = loc;
            };

            getLocale = function () {
                return locale;
            };

            return {
                'setLocale': setLocale,
                'getLocale': getLocale
            };
        }
    ]
);