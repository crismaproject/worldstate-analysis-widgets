angular.module('eu.crismaproject.worldstateAnalysis.directives')
    .directive('knob', function () {
        return {
            restrict: 'EACM',
            template: function (elem, attrs) {

                return '<input ng-model="knobData">';

            },
            replace: true,
            scope: {
                knobData: "=",
                knobOptions: "="
            },
            link: function (scope, elem, attrs) {


                var renderKnob = function () {
                    var knobOptions = scope.knobOptions || {
                        'max': 100,
                        'width': 100,
                        'height': 100,
                        'displayInput': false,
                        'angleOffset': -125,
                        'angleArc': 250,
                    };
                    knobOptions.change = function (v) {
                        scope.knobData = v;
                        scope.$apply();
                    };
                    $elem = elem;
                    $elem.val(scope.knobData);
                    $elem.knob(knobOptions);
                    //
                    elem.find('div').css('display','block')
                        .css('margin','0 auto');

                };

                scope.$watch('knobData', function () {
                    renderKnob();
                },true);

                scope.$watch('knobOptions', function () {
                    renderKnob();
                });

            }
        };
    });