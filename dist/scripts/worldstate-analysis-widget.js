// this is only used for demo/testing purposes
angular.module('eu.crismaproject.worldstateAnalysis.demoApp', [
  'eu.crismaproject.worldstateAnalysis.demoApp.controllers',
  'eu.crismaproject.worldstateAnalysis.directives',
  'eu.crismaproject.worldstateAnalysis.services',
  'de.cismet.crisma.widgets.worldstateTreeWidget'
]);
angular.module('eu.crismaproject.worldstateAnalysis.controllers', []).controller('eu.crismaproject.worldstateAnalysis.controllers.IndicatorCriteriaTableDirectiveController', [
  '$scope',
  '$filter',
  'de.cismet.crisma.ICMM.Worldstates',
  'ngTableParams',
  function ($scope, $filter, WorldstateService, NgTableParams) {
    'use strict';
    var getOrderedProperties = function (obj) {
        var p, keys;
        keys = [];
        for (p in obj) {
          if (obj.hasOwnProperty(p)) {
            keys.push(p);
          }
        }
        keys.sort();
        return keys;
      }, updateTable = function () {
        var field, group, i, iccData, j, k_outer, k_inner, keys_outer, keys_inner, prop, val, dataVector = WorldstateService.utils.stripIccData($scope.worldstates, $scope.forCriteria);
        if (!(!$scope.worldstates || $scope.worldstates.length === 0)) {
          $scope.rows = [];
          $scope.columns = [{
              title: $scope.forCriteria ? 'Criteria' : 'Indicators',
              field: 'f1',
              visible: true
            }];
          j = 0;
          iccData = dataVector[0].data;
          keys_outer = getOrderedProperties(iccData);
          for (k_outer = 0; k_outer < keys_outer.length; ++k_outer) {
            group = iccData[keys_outer[k_outer]];
            $scope.rows[j++] = {
              f1: {
                name: group.displayName,
                icon: group.iconResource
              }
            };
            keys_inner = getOrderedProperties(group);
            for (k_inner = 0; k_inner < keys_inner.length; ++k_inner) {
              prop = keys_inner[k_inner];
              if (prop !== 'displayName' && prop !== 'iconResource') {
                $scope.rows[j++] = {
                  f1: {
                    name: group[prop].displayName,
                    icon: group[prop].iconResource
                  }
                };
              }
            }
          }
          for (i = 0; i < dataVector.length; ++i) {
            field = 'f' + (i + 2);
            $scope.columns.push({
              title: dataVector[i].name,
              field: field,
              visible: true
            });
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
                  $scope.rows[j++][field] = { name: val + ' ' + group[prop].unit };
                }
              }
            }
          }
        }
        if ($scope.tableParams) {
          $scope.tableParams.reload();
        } else {
          $scope.tableParams = new NgTableParams({
            page: 1,
            count: $scope.rows.length
          }, {
            counts: [],
            total: $scope.worldstates.length,
            getData: function ($defer, params) {
              if ($scope.worldstates.length <= 0) {
                return null;
              }
              $defer.resolve($scope.rows.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
          });
        }
      };
    $scope.tableVisibleSwitch = '0';
    $scope.isGroupRow = function (row) {
      return row.f2 === null;
    };
    $scope.getRowStyle = function (index) {
      var row = $scope.rows[index], groupRowStyle = { 'font-weight': 'bold' };
      return $scope.isGroupRow(row) ? groupRowStyle : '';
    };
    $scope.getCellStyle = function (index) {
      var dataCellStyle = { 'text-align': 'right' };
      return index > 0 ? dataCellStyle : '';
    };
    $scope.$watchCollection('worldstates', function () {
      if ($scope.worldstates) {
        updateTable();
      }
    });
    $scope.$watch('forCriteria', function (newVal, oldVal) {
      if (newVal !== oldVal && $scope.worldstates) {
        updateTable();
      }
    });
  }
]);
// only for testing/demo
angular.module('eu.crismaproject.worldstateAnalysis.demoApp.controllers', [
  'de.cismet.crisma.ICMM.Worldstates',
  'de.cismet.cids.rest.collidngNames.Nodes'
]).controller('eu.crismaproject.worldstateAnalysis.demoApp.controllers.MainController', [
  '$scope',
  'de.cismet.collidingNameService.Nodes',
  'de.cismet.crisma.ICMM.Worldstates',
  function ($scope, Nodes, Worldstates) {
    'use strict';
    $scope.activeItem = {};
    $scope.treeOptions = {
      checkboxClass: 'glyphicon glyphicon-unchecked',
      folderIconClosed: 'icon-world.png',
      folderIconOpen: 'icon-world.png',
      leafIcon: 'icon-world.png',
      imagePath: 'bower_components/crisma-worldstate-tree-widget-angular/dist/images/',
      multiSelection: true
    };
    // every time the treeSelection changes, we need to determine the
    // corresponding worldstates to the selected nodes. 
    $scope.treeSelection = [];
    $scope.$watchCollection('treeSelection', function (newVal, oldVal) {
      var i, wsId, wsNode, wsArr = [], worldstateCallback = function (worldstate) {
          wsArr.push(worldstate);
          if (wsArr.length === $scope.treeSelection.length) {
            if (!$scope.worldstates) {
              $scope.worldstates = [];
            } else {
              $scope.worldstates.splice(0, $scope.worldstates.length);
            }
            $scope.worldstates = wsArr;
          }
        };
      if (newVal !== oldVal) {
        //clear the old worldstate array
        if ($scope.treeSelection.length <= 0) {
          $scope.worldstates.splice(0, $scope.worldstates.length);
        }
        for (i = 0; i < $scope.treeSelection.length; i++) {
          wsNode = $scope.treeSelection[i].objectKey;
          wsId = wsNode.substring(wsNode.lastIndexOf('/') + 1, wsNode.length);
          Worldstates.get({ 'wsId': wsId }, worldstateCallback);
        }
      }
    });
    // Retrieve the top level nodes from the icmm api
    $scope.treeNodes = Nodes.query(function (data) {
      console.log(data);
    });
  }
]);
angular.module('eu.crismaproject.worldstateAnalysis.directives', [
  'eu.crismaproject.worldstateAnalysis.controllers',
  'ngTable',
  'de.cismet.crisma.ICMM.Worldstates'
]).directive('indicatorCriteriaTable', [function () {
    'use strict';
    var scope;
    scope = {
      worldstates: '=',
      forCriteria: '=',
      detailIcons: '@'
    };
    return {
      scope: scope,
      restrict: 'E',
      templateUrl: 'templates/indicatorCriteriaTableTemplate.html',
      controller: 'eu.crismaproject.worldstateAnalysis.controllers.IndicatorCriteriaTableDirectiveController'
    };
  }]);
angular.module('eu.crismaproject.worldstateAnalysis.services', []).factory('eu.crismaproject.worldstateAnalysis.services.AnalysisService', [function () {
    'use strict';
    var owa;
    owa = function () {
      var checkVector, checkVectorRange, epsilon, equals, eFactor, publicApi, self;
      // default tolerance
      epsilon = 1e-7;
      eFactor = 1000000;
      self = this;
      publicApi = {};
      equals = function (a, b, e) {
        return Math.abs(a - b) < e;
      };
      checkVectorRange = function (vector) {
        var i;
        for (i = 0; i < vector.length; ++i) {
          if (vector[i] < 0 || vector[i] > 1) {
            throw 'arg value not within range [0, 1]: arg[' + i + ']=' + vector[i];
          }
        }
      };
      checkVector = function (vector) {
        var i, sum;
        checkVectorRange(vector);
        sum = 0;
        for (i = 0; i < vector.length; ++i) {
          sum += vector[i];
        }
        if (!equals(sum, 1, epsilon)) {
          throw 'sum of vector is not 1: ' + sum;
        }
      };
      publicApi.orness = function (weights) {
        var i, n, orness;
        checkVector(weights);
        n = weights.length;
        orness = 0;
        for (i = 0; i < weights.length; ++i) {
          orness += (n - (i + 1)) * weights[i];
        }
        orness *= 1 / (n - 1);
        return orness;
      };
      publicApi.dispersion = function (weights) {
        var i, dispersion;
        checkVector(weights);
        dispersion = 0;
        for (i = 0; i < weights.length; ++i) {
          if (weights[i] !== 0) {
            dispersion += weights[i] * Math.log(weights[i]);
          }
        }
        dispersion *= -1;
        return dispersion;
      };
      // or in other words, emphasis on andness
      // exponential gratification (i^e)
      publicApi.lLSWeights = function (criteriaCount) {
        var i, sum, weights;
        sum = 0;
        for (i = 1; i <= criteriaCount; ++i) {
          sum = sum + Math.pow(i, Math.E);
        }
        weights = [];
        for (i = 1; i <= criteriaCount; ++i) {
          weights[i - 1] = Math.pow(i, Math.E) / sum;
        }
        checkVector(weights);
        return weights;
      };
      // or in other words, emphasis on orness
      publicApi.hLSWeights = function (criteriaCount) {
        return owa.lLSWeights(criteriaCount).reverse();
      };
      publicApi.meanWeights = function (criteriaCount) {
        var i, d, mean, weights;
        mean = 1 / criteriaCount;
        weights = [];
        for (i = 0; i < criteriaCount; ++i) {
          weights[i] = mean;
        }
        d = owa.dispersion(weights);
        if (!equals(d, Math.log(criteriaCount), epsilon)) {
          throw 'rounding error: [dispersion=' + d + '|log=' + Math.log(criteriaCount) + ']';
        }
        return weights;
      };
      publicApi.orderedArgs = function (vector) {
        return vector.slice(0).sort().reverse();
      };
      publicApi.aggregateLS = function (criteria, weights, importance) {
        var crit, i, ordered, res,
          // only needed if importance is not null
          andness, imp, multiplier, power, orness, sat;
        checkVector(weights);
        checkVectorRange(criteria);
        if (criteria.length !== weights.length) {
          throw 'criteria and weights must have the same amount of items';
        }
        if (importance) {
          checkVectorRange(importance);
          if (criteria.length !== importance.length) {
            throw 'criteria and importance must have the same amount of items';
          }
          crit = [];
          orness = owa.orness(weights);
          andness = 1 - orness;
          for (i = 0; i < importance.length; ++i) {
            imp = importance[i];
            sat = criteria[i];
            multiplier = Math.max(imp, andness);
            power = Math.max(imp, orness);
            res = multiplier * Math.pow(sat, power);
            crit[i] = res;
          }
        } else {
          crit = criteria;
        }
        ordered = owa.orderedArgs(crit);
        res = 0;
        for (i = 0; i < ordered.length; ++i) {
          res += ordered[i] * weights[i];
        }
        return res;
      };
      return publicApi;
    }();
    return {
      getOwa: function () {
        return owa;
      }
    };
  }]);