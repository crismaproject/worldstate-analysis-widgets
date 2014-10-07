angular.module(
    'eu.crismaproject.worldstateAnalysis.services'
    ).factory(
    'I18nizer',
    [
        'gettextCatalog',
        '$http',
        function (gettextCatalog, $http) {
            'use strict';
            var locale, setLocale, getLocale, getGlobalize, glob;

            locale = 'en';

            setLocale = function (loc) {
                var l;
//                gettextCatalog.debug = true;
                l = loc.substring(0, 2);
                $http.get('i18n/cldr/main/' + l + '/numbers.json').success(function (data) {
                    Globalize.load(data);
                    Globalize.locale(l);
                    glob = new Globalize(l);
                });
                gettextCatalog.setCurrentLanguage(l);
                gettextCatalog.loadRemote('i18n/' + l + '.json');
                locale = loc;
            };

            getLocale = function () {
                return locale;
            };
            
            getGlobalize = function(){
                return glob;
            };

            return {
                'setLocale': setLocale,
                'getLocale': getLocale,
                'getGlobObj': getGlobalize
            };
        }
    ]
    ).filter(
    'localeNumber',
    [
        'I18nizer',
        function (i18nizer) {
            var count=0;
            function foo (number) {
                console.log('localeNumber filter: '+(++count));
                return i18nizer.getGlobObj().formatNumber(number);
            };
            
            foo.$stateful = true;
            return foo;
        }
    ]
    );