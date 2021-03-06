angular.module('eu.crismaproject.worldstateAnalysis.directives').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/criteriaEmphasesTemplate.html',
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\" style=\" white-space: nowrap;\n" +
    "         overflow: hidden;\n" +
    "         text-overflow: ellipsis;\">\n" +
    "        Criteria Emphasis\n" +
    "    </div>\n" +
    "    <div class=\"panel-body\" >\n" +
    "        <div class=\"row\">\n" +
    "\n" +
    "            <div  class=\"col-lg-2 col-md-2 col-sm-2 col-xs-4\" style=\"margin-bottom: 20px;\" ng-repeat=\"item in critEmphInternal\">\n" +
    "                <div class=\"row\">\n" +
    "                    <div  style=\"display:block;margin:0 auto;width:100px;\">\n" +
    "                        <knob knob-data=\"item.criteriaEmphasis\" knob-max=\"knobMax\" knob-options=\"knobOptions\"></knob>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div  style=\"display:block;margin:0 auto;width:100px;text-align: center;\">\n" +
    "                        <span>{{item.indicator.displayName}}</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('templates/criteriaFunctionManagerTemplate.html',
    "<div class=\"col-lg-12\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-3 col-md-12\">\n" +
    "            <div class=\"list-group\">\n" +
    "                <span id=\"importCf\" ng-show=\"fileAPIAvailable\" \n" +
    "                      ng-style=\"getButtonStyle()\"\n" +
    "                      style=\"margin-bottom: -30px; z-index: 50; font-size: 14px;\"\n" +
    "                      class=\"glyphicon glyphicon-upload btn-file\">\n" +
    "                    <input type=\"file\" ng-disabled=\"listItemsDisabled\" file-input=\"criteriaFunctionFile\" multiple>\n" +
    "                </span>\n" +
    "                <a class=\"list-group-item active\">\n" +
    "                    Criteria Functions \n" +
    "                    <i data-placement=\"top\" \n" +
    "                       data-type=\"info\" \n" +
    "                       data-delay=\"500\" \n" +
    "                       data-container=\"body\"\n" +
    "                       data-animation=\"am-fade-and-scale\" \n" +
    "                       bs-tooltip=\"tooltipAdd.title\"\n" +
    "                       ng-style=\"getButtonStyle()\"\n" +
    "                       ng-click=\"addCriteriaFunction()\" class=\"pull-right glyphicon glyphicon-plus-sign\"></i>\n" +
    "                </a>\n" +
    "                <a ng-click=\"setSelectedCriteriaFunction($index)\"\n" +
    "                   class=\"list-group-item\"\n" +
    "                   ng-class=\"getListItemClass($index)\"\n" +
    "                   ng-repeat=\"cf in criteriaFunctionSet\">\n" +
    "                    <span ng-hide=\"editable[$index]\">{{cf.name}}</span>\n" +
    "                    <input style =\"color:black;width:75%\" ng-hide=\"!editable[$index]\" type=\"text\" ng-model=\"cf.name\">\n" +
    "                    <div class=\"pull-right\" ng-hide=\"$index !== selectedCriteriaFunctionIndex\">\n" +
    "\n" +
    "                        <i ng-hide=\"listItemsDisabled || editable[$index]\" \n" +
    "                           data-placement=\"top\" data-type=\"info\" \n" +
    "                           data-delay=\"500\" \n" +
    "                           data-animation=\"am-fade-and-scale\" \n" +
    "                           data-container=\"body\"\n" +
    "                           bs-tooltip=\"tooltipRename.title\"\n" +
    "                           ng-click=\"editable[$index] = true\" \n" +
    "                           style=\"margin-right: 10px;\"\n" +
    "                           class=\"glyphicon glyphicon-pencil\"></i>\n" +
    "                        <i ng-hide=\"listItemsDisabled || !editable[$index]\"\n" +
    "                           data-placement=\"top\" \n" +
    "                           data-type=\"info\" \n" +
    "                           data-delay=\"500\" \n" +
    "                           data-animation=\"am-fade-and-scale\" \n" +
    "                           data-container=\"body\"\n" +
    "                           bs-tooltip=\"tooltipRenameDone.title\"\n" +
    "                           ng-click=\"editable[$index] = false\"\n" +
    "                           style=\"margin-right: 10px;\"\n" +
    "                           class=\"glyphicon glyphicon-ok\"></i>\n" +
    "                        <!--                            <i data-placement=\"bottom\" data-type=\"info\" data-delay=\"500\" data-animation=\"am-fade-and-scale\" bs-tooltip=\"tooltipSave.title\"\n" +
    "                                                       ng-click=\"saveCriteriaFunctions()\"\n" +
    "                                                       style=\"margin-right: 10px;\"\n" +
    "                                                       class=\"glyphicon glyphicon-floppy-disk\"></i>-->\n" +
    "                        <i data-placement=\"top\" \n" +
    "                           data-type=\"info\" \n" +
    "                           data-delay=\"500\" \n" +
    "                           data-animation=\"am-fade-and-scale\" \n" +
    "                           bs-tooltip=\"tooltipDelete.title\"\n" +
    "                           data-container=\"body\"\n" +
    "                           ng-hide=\"listItemsDisabled\"\n" +
    "                           ng-click=\"removeCriteriaFunction()\"\n" +
    "                           class=\"glyphicon glyphicon-minus-sign\"></i>\n" +
    "                    </div>\n" +
    "                </a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-lg-9 col-md-12\" style=\"margin-top: 20px\" ng-if=\"listItemsDisabled\">\n" +
    "            <div class=\"alert alert-warning\" role=\"alert\"><b>Warning:</b> No worldstates are selected</div>\n" +
    "        </div>\n" +
    "        <div class=\"col-lg-9 col-md-12\" style=\"margin-top: 20px\" ng-if=\"selectedCriteriaFunctionIndex >= 0 && criteriaFunctionSet[selectedCriteriaFunctionIndex]\">\n" +
    "            <div class=\"row\" ng-if=\"!listItemsDisabled\" ng-repeat=\"indicator in indicators\">\n" +
    "                <div class=\"col-lg-12\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-lg-12 vCenter\">\n" +
    "                            <img ng-src=\"{{indicator.iconResource}}\" style=\"margin-right:5px;margin-bottom: 5px\" /> <label>{{indicator.displayName}}</label>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-lg-12\" >\n" +
    "                            <indicator-band criteria-function=\"criteriaFunctionSet[selectedCriteriaFunctionIndex].criteriaFunctions[$index]\"></indicator-band>        \n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>   \n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/criteriaRadarPopupTemplate.html',
    "<div class=\"ngdialog-message\" \n" +
    "     style=\"width:500px;min-width: 500px\"\n" +
    "    criteria-radar \n" +
    "    worldstates=\"ws\" \n" +
    "    show-legend=\"false\"\n" +
    "    show-axis-text=\"true\"\n" +
    "    use-numbers=\"false\"\n" +
    "    criteria-function=\"criteriaFunction\">\n" +
    "</div>\n"
  );


  $templateCache.put('templates/decisionStrategyManagerTemplate.html',
    "<div class=\"col-lg-12\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-3 col-md-12\">\n" +
    "            <div class=\"list-group\">\n" +
    "                <span id=\"importDs\" ng-show=\"fileAPIAvailable\"\n" +
    "                      ng-style=\"getButtonStyle()\"\n" +
    "                      style=\"margin-bottom: -30px; z-index: 50; font-size: 14px;\"\n" +
    "                      class=\"glyphicon glyphicon-upload btn-file lg-margin-left\">\n" +
    "                    <input ng-disabled=\"listItemsDisabled\" type=\"file\" file-input=\"decisionStrategyFile\" multiple>\n" +
    "                </span>\n" +
    "                <a class=\"list-group-item active\">\n" +
    "                    Decision Strategies\n" +
    "                    <i data-placement=\"top\" \n" +
    "                       data-type=\"info\" \n" +
    "                       data-delay=\"500\" \n" +
    "                       data-container=\"body\"\n" +
    "                       data-animation=\"am-fade-and-scale\" \n" +
    "                       bs-tooltip=\"tooltipAdd.title\"\n" +
    "                       ng-style=\"getButtonStyle()\"\n" +
    "                       ng-click=\"addDecisionStrategy()\" class=\"pull-right glyphicon glyphicon-plus-sign\"></i>\n" +
    "                </a>\n" +
    "                <a ng-click=\"setSelectedDecisionStrategy($index)\"\n" +
    "                   ng-class=\"getItemStyle($index)\" \n" +
    "                   ng-repeat=\"cf in decisionStrategies\">\n" +
    "                    <span ng-hide=\"editable[$index]\">{{cf.name}}</span>\n" +
    "                    <input style =\"color:black; width:75%;\" ng-hide=\"!editable[$index]\" type=\"text\" ng-model=\"cf.name\">\n" +
    "                    <div class=\"pull-right\" ng-hide=\"$index !== selectedDecisionStrategyIndex\">\n" +
    "\n" +
    "                        <i ng-hide=\"listItemsDisabled || editable[$index]\" \n" +
    "                           data-placement=\"top\" data-type=\"info\" \n" +
    "                           data-delay=\"500\" \n" +
    "                           data-animation=\"am-fade-and-scale\" \n" +
    "                           data-container=\"body\"\n" +
    "                           bs-tooltip=\"tooltipRename.title\"\n" +
    "                           ng-click=\"editable[$index] = true\" \n" +
    "                           style=\"margin-right: 10px;\"\n" +
    "                           class=\"glyphicon glyphicon-pencil\"></i>\n" +
    "                        <i ng-hide=\"listItemDisabled || !editable[$index]\"\n" +
    "                           data-placement=\"top\" \n" +
    "                           data-type=\"info\" \n" +
    "                           data-delay=\"500\" \n" +
    "                           data-animation=\"am-fade-and-scale\" \n" +
    "                           data-container=\"body\"\n" +
    "                           bs-tooltip=\"tooltipRenameDone.title\"\n" +
    "                           ng-click=\"editable[$index] = false\"\n" +
    "                           style=\"margin-right: 10px;\"\n" +
    "                           class=\"glyphicon glyphicon-ok\"></i>\n" +
    "                        <i data-placement=\"top\" \n" +
    "                           ng-hide=\"listItemsDisabled\"\n" +
    "                           data-type=\"info\" \n" +
    "                           data-delay=\"500\" \n" +
    "                           data-animation=\"am-fade-and-scale\" \n" +
    "                           bs-tooltip=\"tooltipDelete.title\"\n" +
    "                           data-container=\"body\"\n" +
    "                           ng-click=\"removeDecisionStrategy()\"\n" +
    "                           class=\"glyphicon glyphicon-minus-sign\"></i>\n" +
    "                    </div>\n" +
    "                </a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-lg-9 col-md-12\" ng-if=\"listItemsDisabled\" style=\"margin-top: 20px\">\n" +
    "            <div class=\"alert alert-warning\" role=\"alert\"><b>Warning:</b> No worldstates are selected</div>\n" +
    "        </div>\n" +
    "        <div class=\"col-lg-9 col-md-12\" style=\"margin-top: 20px\" ng-if=\"!listItemsDisabled && selectedDecisionStrategyIndex >= 0 && decisionStrategies[selectedDecisionStrategyIndex]\">\n" +
    "            <decision-strategy worldstates=\"worldstates\" decision-strategy=\"currentDecisionStrategy\">\n" +
    "            </decision-strategy>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/decisionStrategyTemplate.html',
    "<div class=\"row\">\n" +
    "    <div class=\"col-lg-3 col-md-12\">\n" +
    "        <level-of-emphasis \n" +
    "            satisfaction-emphasis=\"decisionStrategy.satisfactionEmphasis\"\n" +
    "            indicator-size=\"indicatorSize\"\n" +
    "            >\n" +
    "        </level-of-emphasis>\n" +
    "    </div>\n" +
    "    <div class=\"col-lg-9 col-md-12\">\n" +
    "            <criteria-emphasis indicator-map=\"indicatorMap\" criteria-emphases=\"decisionStrategy.criteriaEmphases\">\n" +
    "                \n" +
    "            </criteria-emphasis>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('templates/fileContextProviderTemplate.html',
    "<div class=\"row\">\n" +
    "    <div ng-show=\"!fileAPIAvailable\" class=\"col-lg-12 col-md-12 col-sm-12\">\n" +
    "        <div class=\"alert alert-danger\">\n" +
    "            HTML 5 File APi is not available in your Browser. Please use a Browser that supports this.\n" +
    "            see also http://caniuse.com/#search=file%20api\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div ng-show=\"fileAPIAvailable\" class=\"col-lg-12 col-md-12 col-sm-12\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-lg-12\">\n" +
    "                <div class=\"panel-group\">\n" +
    "                    <div class=\"panel panel-default\">\n" +
    "                        <div class=\"panel-heading\" role=\"tab\" >\n" +
    "                            <h4 class=\"panel-title\">\n" +
    "                                <a ng-click=\"indicatorFileCollapsed = !indicatorFileCollapsed\">\n" +
    "                                    <i ng-if=\"!indicatorFileCollapsed\" class=\"glyphicon glyphicon-chevron-up\"></i>\n" +
    "                                    <i ng-if=\"indicatorFileCollapsed\" class=\"glyphicon glyphicon-chevron-down\"></i>\n" +
    "                                    Indicator files\n" +
    "                                </a>\n" +
    "                                <span style=\"font-size: 14px\" \n" +
    "                                      class=\"pull-right glyphicon glyphicon-plus-sign btn-file \">\n" +
    "                                    <span\n" +
    "                                        data-placement=\"top\" data-type=\"info\" \n" +
    "                                        data-delay=\"500\" \n" +
    "                                        data-animation=\"am-fade-and-scale\" \n" +
    "                                        data-container=\"body\"\n" +
    "                                        bs-tooltip=\"tooltipAdd.title\"></span>\n" +
    "                                    <input type=\"file\" file-input=\"iccObjects\" multiple>\n" +
    "                                </span>\n" +
    "                                <span style=\"margin-right:5px; font-size: 14px\" \n" +
    "                                      class=\"pull-right glyphicon glyphicon-minus-sign\"\n" +
    "                                      data-placement=\"top\" data-type=\"info\" \n" +
    "                                      data-delay=\"500\" \n" +
    "                                      data-animation=\"am-fade-and-scale\" \n" +
    "                                      data-container=\"body\"\n" +
    "                                      bs-tooltip=\"tooltipDeleteSelection.title\"\n" +
    "                                      ng-style=\"removeSelectionButtonStyle\"\n" +
    "                                      ng-click=\"removeSelectedDummyWS()\">\n" +
    "                                </span>\n" +
    "                            </h4>\n" +
    "                        </div>\n" +
    "                        <div class=\"panel-collapse\" collapse=\"indicatorFileCollapsed\" >\n" +
    "                            <ul class=\"list-group\">\n" +
    "                                <!--dummy item that indicates that no indicator objects are available-->\n" +
    "                                <li class=\"list-group-item\" ng-show=\"showDummyListItem\">\n" +
    "                                </li>\n" +
    "                                <li ng-click=\"toggleSelection($index)\"\n" +
    "                                    ng-class=\"getItemStyle($index)\"\n" +
    "                                    class=\"list-group-item\" ng-repeat=\"ws in worldstates\">\n" +
    "\n" +
    "                                    <span ng-hide=\"editable[$index]\" \n" +
    "                                          style=\"width: 90%;\n" +
    "                                          overflow: hidden;\n" +
    "                                          text-overflow: ellipsis; \n" +
    "                                          white-space: nowrap;\n" +
    "                                          display:inline-block\">\n" +
    "                                        {{ws.name}}\n" +
    "                                    </span>\n" +
    "                                    <input style =\"width: 90%; color:black;\" ng-hide=\"!editable[$index]\" type=\"text\" ng-model=\"ws.name\">\n" +
    "                                    <div class=\"pull-right\">\n" +
    "\n" +
    "                                        <i ng-hide=\"listItemsDisabled || editable[$index]\" \n" +
    "                                           data-placement=\"top\" data-type=\"info\" \n" +
    "                                           data-delay=\"500\" \n" +
    "                                           data-animation=\"am-fade-and-scale\" \n" +
    "                                           data-container=\"body\"\n" +
    "                                           bs-tooltip=\"tooltipRename.title\"\n" +
    "                                           ng-click=\"editable[$index] = true\" \n" +
    "                                           style=\"margin-right: 10px;\"\n" +
    "                                           class=\"glyphicon glyphicon-pencil\"></i>\n" +
    "                                        <i ng-hide=\"listItemDisabled || !editable[$index]\"\n" +
    "                                           data-placement=\"top\" \n" +
    "                                           data-type=\"info\" \n" +
    "                                           data-delay=\"500\" \n" +
    "                                           data-animation=\"am-fade-and-scale\" \n" +
    "                                           data-container=\"body\"\n" +
    "                                           bs-tooltip=\"tooltipRenameDone.title\"\n" +
    "                                           ng-click=\"editable[$index] = false\"\n" +
    "                                           style=\"margin-right: 10px;\"\n" +
    "                                           class=\"glyphicon glyphicon-ok\"></i>\n" +
    "                                    </div>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <!--<select style=\"width:100%\" ng-model=\"selectedWorldstates\" ng-options=\"ws.name for ws in worldstates\" multiple></select>-->\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div ng-show=\"fileLoading\" class=\"row\">\n" +
    "            <div class=\"col-lg-12\">\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div ng-show=\"fileLoadError\" class=\"row\">\n" +
    "            <div class=\"col-lg-12 col-md-12 col-sm-12\">\n" +
    "                <div class=\"alert alert-danger\">\n" +
    "                    {{errorMessage}}\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-lg-12\">\n" +
    "                <label>Criteria function file</label>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row\" style=\"margin-bottom: 20px;\">\n" +
    "            <div class=\"col-lg-2 col-md-2 col-sm-2\">\n" +
    "                <span class=\"btn btn-default btn-file\"  ng-disabled=\"noIndicatorsLoaded\">\n" +
    "                    Choose a file\n" +
    "                    <input type=\"file\" ng-disabled=\"noIndicatorsLoaded\" file-input=\"cfConfigFile\">\n" +
    "                </span>\n" +
    "            </div>\n" +
    "            <div class=\"col-lg-10 col-md-10 col-sm-10\">\n" +
    "                <div ng-if=\"noIndicatorsLoaded\" \n" +
    "                     class=\"alert alert-warning\">\n" +
    "                    <i class=\"glyphicon glyphicon-info-sign\"></i> \n" +
    "                    No indicator files selected\n" +
    "                </div>\n" +
    "                <div ng-if=\"cfFileLoadError\" \n" +
    "                     class=\"alert alert-danger\"\n" +
    "                     style=\"font-size: 14px;\">\n" +
    "                    <i class=\"glyphicon glyphicon-warning-sign\"></i>\n" +
    "                    {{cfFileLoadErrorMsg}}\n" +
    "                </div>\n" +
    "                <div class=\"alert alert-success\" ng-if=\"loadedCfFile\" style=\"vertical-align: middle\">\n" +
    "                    Loaded File: {{loadedCfFile}}\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-lg-12\">\n" +
    "                <label>Decision strategy file</label>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-lg-2 col-md-2 col-sm-2\">\n" +
    "                <span class=\"btn btn-default btn-file\" ng-disabled=\"noIndicatorsLoaded\">\n" +
    "                    Choose a file\n" +
    "                    <input type=\"file\" file-input=\"dsConfigFile\" ng-disabled=\"noIndicatorsLoaded\">\n" +
    "                </span>\n" +
    "            </div>\n" +
    "            <div class=\"col-lg-10 col-md-10 col-sm-10\">\n" +
    "                <div ng-if=\"noIndicatorsLoaded\" \n" +
    "                     class=\"alert alert-warning\">\n" +
    "                    <i class=\"glyphicon glyphicon-info-sign\"></i> \n" +
    "                    No indicator files selected\n" +
    "                </div>\n" +
    "                <div ng-if=\"dsFileLoadError\"\n" +
    "                     class=\"alert alert-danger\">\n" +
    "                    <i class=\"glyphicon glyphicon-warning-sign\"></i>\n" +
    "                    {{dsFileLoadErrorMsg}}\n" +
    "                </div>\n" +
    "                 <div class=\"alert alert-success\" ng-if=\"loadedDsfFile\" style=\"vertical-align: middle\">\n" +
    "                    Loaded File: {{loadedDsfFile}}\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('templates/icmmContextProviderTemplate.html',
    "<div class=\"row\">\n" +
    "    <div class=\"col-lg-12\">\n" +
    "        <div class=\"row\" style=\"margin-bottom: 20px;\">\n" +
    "            <div class=\"col-lg-4 col-md-6\">\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-lg-12\">\n" +
    "                        <label>ICMS instance</label>        \n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-lg-12 col-md-12\">\n" +
    "                        <div class=\"btn-group\" style=\"width: 100%\" dropdown>\n" +
    "                            <button type=\"button\" \n" +
    "                                    class=\"btn btn-default btn-sm\"\n" +
    "                                    style=\"width: 80%\">\n" +
    "                                 {{selectedIcms.name}}\n" +
    "                            </button>\n" +
    "                            <button type=\"button\" class=\"btn btn-default btn-sm dropdown-toggle\">\n" +
    "                                <span class=\"caret\"></span>\n" +
    "                                <span class=\"sr-only\">Toggle Dropdown</span>\n" +
    "                            </button>\n" +
    "                            <ul class=\"dropdown-menu\" role=\"menu\" >\n" +
    "                                <li ng-repeat=\"icms in backendUrls\" role=\"presentation\" ng-click=\"updateSelectedIcms($index)\">\n" +
    "                                    <a>{{icms.name}}</a>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-lg-12\">\n" +
    "                <catalogue-tree options=\"treeOptions\" nodes=\"treeNodes\" selection=\"treeSelection\" active-node=\"activeItem\"></catalogue-tree>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/indicatorBandItemTemplate.html',
    "<div id=\"popover-parent\" class=\"progress-bar table-display\" \n" +
    "     aria-valuemin=\"0\" aria-valuemax=\"100\"\n" +
    "     aria-valunow=\"{{getPercent()}}\"\n" +
    "     ng-style=\"intervalWidth()\"\n" +
    "     ng-class=\"getColorClass()\"\n" +
    "     ng-click=\"togglePopover($event)\"\n" +
    "     style=\"cursor: pointer;\"\n" +
    "     >\n" +
    "    <div class=\"closeIcon vCenter\" ng-if=\"!lowerBoundary && !upperBoundary\"><i ng-click=\"del(previousInterval);\n" +
    "                $event.stopPropagation()\" ng-hide=\"first\" class=\"glyphicon glyphicon-remove\"></i></div>\n" +
    "    <div id=\"popover-target\" class=\"vCenter\" style=\"width:100%\">\n" +
    "        <div ng-hide=\"actualHeightExceeded\" class=\"progress-labels\" style=\"width:100%\">\n" +
    "\n" +
    "            <span ng-if=\"lowerBoundary\">0%</span>\n" +
    "            <span ng-if=\"upperBoundary\">100%</span>\n" +
    "            <span ng-if=\"!lowerBoundary && !upperBoundary\">{{previousInterval.criteriaValue||'0' | number}}% - {{interval.criteriaValue| number}}% </span>\n" +
    "            <br/> \n" +
    "            <span ng-if=\"lowerBoundary && interval.indicatorValue>=previousInterval.indicatorValue\">&gt;=</span>\n" +
    "            <span ng-if=\"lowerBoundary && interval.indicatorValue<previousInterval.indicatorValue\">&lt;=</span>\n" +
    "            <span ng-if=\"upperBoundary && interval.indicatorValue>previousInterval.indicatorValue\">&gt;=</span>\n" +
    "            <span ng-if=\"upperBoundary && interval.indicatorValue<=previousInterval.indicatorValue\">&lt;=</span>\n" +
    "            <span ng-if=\"!lowerBoundary && !upperBoundary\">{{previousInterval.indicatorValue||'0' | number}} -</span>\n" +
    "            <span>{{interval.indicatorValue| number}}</span>\n" +
    "        </div>\n" +
    "        <div ng-hide=\"!actualHeightExceeded\">\n" +
    "            <i class=\"glyphicon glyphicon-info-sign \" style=\"color:black\" data-placement=\"top\" data-type=\"info\" data-animation=\"am-fade-and-scale\" bs-tooltip=\"tooltip\"></i>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div  class=\"closeIcon vCenter\" ng-if=\"!lowerBoundary && !upperBoundary\" ><i ng-click=\"del(interval);\n" +
    "                $event.stopPropagation()\" ng-hide=\"last\" class=\"glyphicon glyphicon-remove\"></i>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('templates/indicatorBandPopoverContentTemplate.html',
    "<form role=\"form\" name=\"form\">\n" +
    "    <div class=\"form-group\" ng-class=\"{'has-error has-feedback': form.losVal.$error.gpercent}\">\n" +
    "        <label for=\"exampleInputEmail1\">Level of satisfaction</label>\n" +
    "        <input ng-model=\"popOverItem.criteriaValue\"\n" +
    "               ng-disabled=\"lowerBoundary || upperBoundary\"\n" +
    "               gpercent\n" +
    "               name=\"losVal\"\n" +
    "               id=\"losVal\"\n" +
    "               type=\"text\" class=\"form-control\"\n" +
    "               placeholder=\"Level of satisfactory\">\n" +
    "        <span class=\"glyphicon glyphicon-warning-sign form-control-feedback\"\n" +
    "              ng-show=\"form.losVal.$error.gpercent\" \n" +
    "              style=\"line-height: 34px; font-size: 16px;\"\n" +
    "              data-toggle=\"tooltip\" data-placement=\"left\" title=\"Invalid level of satisfaction. Must be a percent value between 0 and 100.\"\n" +
    "              >\n" +
    "        </span>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\" ng-class=\"{'has-error has-feedback': form.indicatorVal.$error.gnumber}\">\n" +
    "        <label class=\"control-label\" for=\"indicatorVal\">Indicator value</label>\n" +
    "        <input ng-model=\"popOverItem.indicatorValue\"\n" +
    "               gnumber\n" +
    "               name=\"indicatorVal\"\n" +
    "               id=\"indicatorVal\"\n" +
    "               type=\"text\" class=\"form-control\"  \n" +
    "               placeholder=\"Indicator Value\">\n" +
    "        <span class=\"glyphicon glyphicon-warning-sign form-control-feedback\"\n" +
    "              ng-show=\"form.indicatorVal.$error.gnumber\" \n" +
    "              style=\"line-height: 34px; font-size: 16px;\"\n" +
    "              data-toggle=\"tooltip\" data-placement=\"left\" title=\"Invalid indicator value.\"\n" +
    "              >\n" +
    "        </span>\n" +
    "    </div>\n" +
    "    <button \n" +
    "        type=\"submit\" \n" +
    "        class=\"btn btn-default\" \n" +
    "        ng-disabled=\"form.indicatorVal.$error.gnumber || form.losVal.$error.gpercent\"\n" +
    "        ng-click=\"updateInterval($event);\n" +
    "        $hide()\">\n" +
    "        Save\n" +
    "    </button>\n" +
    "</form>"
  );


  $templateCache.put('templates/indicatorBandPopoverTemplate.html',
    "<div class=\"popover\" style=\"color:black\" ng-click=\"$event.stopPropagation();\">\n" +
    "  <div class=\"arrow\"></div>\n" +
    "  <div>\n" +
    "      <h3 class=\"popover-title\"  ng-show=\"title\">\n" +
    "          {{title}}\n" +
    "      </h3>\n" +
    "  </div>\n" +
    "  </h3>\n" +
    "  <div class=\"popover-content\" ng-bind=\"content\"></div>\n" +
    "</div>"
  );


  $templateCache.put('templates/indicatorBandTemplate.html',
    "<div class=\"row\">\n" +
    "    <div class=\"col-lg-12 col-md-12\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-lg-2 col-md-2 col-sm-2\" style=\"padding-right:5px;width:12.5%\">\n" +
    "<!--                we use the previous-interval binding to bind the upperBoundary\n" +
    "                to this element. this is necessary to correctly set the labels. \n" +
    "                see also \n" +
    "                https://github.com/crismaproject/worldstate-analysis-widgets/issues/36-->\n" +
    "                <div class=\"progress\">\n" +
    "                    <indicator-band-item \n" +
    "                        interval=\"criteriaFunction.lowerBoundary\" \n" +
    "                        previous-interval=\"criteriaFunction.upperBoundary\"\n" +
    "                        lower-boundary=\"true\"\n" +
    "                        on-interval-changed=\"updateLowerBoundary(indicatorValue)\"\n" +
    "                        title=\"Criteria / Indicator values\">\n" +
    "                    </indicator-band-item>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-lg-9 col-md-9 col-sm-9\">\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"progress\">\n" +
    "                        <indicator-band-item \n" +
    "                            ng-repeat=\"interval in criteriaFunction.intervals\"\n" +
    "                            interval=\"interval\"\n" +
    "                            previous-interval=\"$first ? criteriaFunction.lowerBoundary : criteriaFunction.intervals[$index-1]\"\n" +
    "                            first=\"$first\"\n" +
    "                            delete-interval=\"deleteInterval(interval)\"\n" +
    "                            on-interval-changed=\"createInterval(criteriaValue,indicatorValue)\"\n" +
    "                            get-color=\"getIntervalColor(interval)\"\n" +
    "                            >\n" +
    "                        </indicator-band-item>\n" +
    "                        <indicator-band-item \n" +
    "                            interval=\"criteriaFunction.upperBoundary\" \n" +
    "                            previous-interval=\"criteriaFunction.intervals[criteriaFunction.intervals.length-1] || criteriaFunction.lowerBoundary\"\n" +
    "                            last=\"true\"\n" +
    "                            first=\"criteriaFunction.intervals.length<=0\"\n" +
    "                            on-interval-changed=\"createInterval(criteriaValue,indicatorValue)\"\n" +
    "                            get-color=\"getIntervalColor(interval)\"\n" +
    "                            >\n" +
    "                        </indicator-band-item>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"row\" style=\"min-height: 20px;\">\n" +
    "                    <div class=\"intervalMarker\" ng-style=\"getIntervalWidth(interval, criteriaFunction.intervals[$index - 1])\" ng-repeat=\"interval in criteriaFunction.intervals\">\n" +
    "                        <span class=\"glyphicon glyphicon-chevron-up\" style=\"width:16px;float:right;margin-right: -8px;\"></span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-lg-2 col-md-2 col-sm-2\"  style=\"padding-left:5px;width: 12.5%\">\n" +
    "                <!-- we use the previous-interval binding to bind the lowerBoundary\n" +
    "                to this element. this is necessary to correctly set the labels. \n" +
    "                see also \n" +
    "                https://github.com/crismaproject/worldstate-analysis-widgets/issues/36-->\n" +
    "                <div class=\"progress\">\n" +
    "                    <indicator-band-item \n" +
    "                        interval=\"criteriaFunction.upperBoundary\" \n" +
    "                        previous-interval=\"criteriaFunction.lowerBoundary\"\n" +
    "                        upper-boundary=\"true\"\n" +
    "                        on-interval-changed=\"updateUpperBoundary(indicatorValue)\"\n" +
    "                        title=\"Criteria / Indicator values\">\n" +
    "                    </indicator-band-item>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('templates/indicatorBarChartTemplate.html',
    "<div>\n" +
    "    <div class=\"row\"ng-if=\"!worldstates || worldstates.length <= 0\">\n" +
    "        <div class=\"col-lg-12\">\n" +
    "            <div ng-hide=\"worldstates.length > 0\" class=\"alert alert-warning\">\n" +
    "                <strong>Warning: </strong>There are no worldstates selected.\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\" ng-if=\"worldstates && worldstates.length > 0\" >\n" +
    "        <div class=\"col-lg-12\" style=\"text-align: center; margin: 20px 0px;\">\n" +
    "            <span ng-repeat=\"ws in worldstates\" style=\"margin:0px 10px;\">\n" +
    "                <i class=\"glyphicon glyphicon-stop\" ng-style=\"getLegendColor($index)\"></i>{{ws.name}}\n" +
    "            </span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\" ng-if=\"worldstates && worldstates.length > 0\">\n" +
    "        <div class=\"col-lg-4 col-md-6 col-sm-6\"  ng-repeat=\"chartModel in chartModels\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-lg-12\" style=\"text-align: center\">\n" +
    "                    <label>{{chartModel[0].key}}</label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-lg-12\" nvd3-discrete-bar-chart style=\"margin-top: -40px;\"\n" +
    "                     data=\"chartModel\"\n" +
    "                     width=\"400\"\n" +
    "                     height=\"200\"\n" +
    "                     showXAxis=\"false\"\n" +
    "                     showYAxis=\"true\"\n" +
    "                     interactive=\"true\"\n" +
    "                     showValues=\"true\"\n" +
    "                     staggerlabels=\"true\"\n" +
    "                     forceY=\"{{chartModel.forceY}}\"\n" +
    "                     yaxistickformat=\"yAxisTickFormat\"\n" +
    "                     valueFormat=\"yAxisTickFormat\"\n" +
    "                     color=\"colorFunction()\"\n" +
    "                     tooltips=\"true\"\n" +
    "                     tooltipcontent=\"toolTipContentFunction()\">\n" +
    "                    <svg></svg>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('templates/indicatorCriteriaAxisChooserTemplate.html',
    "<div class=\"btn-group\"  dropdown>\n" +
    "    <button type=\"button\" \n" +
    "            class=\"btn btn-default btn-sm\">\n" +
    "        <img ng-src=\"{{selectedAxis.icon}}\" style=\"margin-right:5px;float:left\"/>{{selectedAxis.name}}\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-default btn-sm dropdown-toggle\">\n" +
    "        <span class=\"caret\"></span>\n" +
    "        <span class=\"sr-only\">Toggle Dropdown</span>\n" +
    "    </button>\n" +
    "     <ul class=\"dropdown-menu\" role=\"menu\" >\n" +
    "        <li ng-repeat=\"scale in scales\" role=\"presentation\" ng-click=\"axisSelected($index)\" ng-class=\"{'dropdown-header':scale.isGroup}\">\n" +
    "            <a ng-if=\"!scale.isGroup\">{{scale.name}}</a>\n" +
    "            <img ng-if=\"scale.isGroup\" ng-src=\"{{scale.icon}}\" style=\"margin-right:5px;float:left\"/>\n" +
    "            <span ng-if=\"scale.isGroup\" style=\"margin-top: 4px\">{{scale.name}}</span>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>"
  );


  $templateCache.put('templates/indicatorCriteriaTableHeader.html',
    "<tr>\n" +
    "    <th ng-repeat=\"column in columns\" class=\"text-left\" ng-style=\"getCellStyle($index)\">\n" +
    "        {{column.title}}\n" +
    "    </th>\n" +
    "</tr>"
  );


  $templateCache.put('templates/indicatorCriteriaTableTemplate.html',
    "<div id=\"indicatorCriteriaTable\">\n" +
    "    <div ng-if=\"!(worldstates.length > 0)\" class=\"alert alert-warning\">\n" +
    "        <strong>Warning: </strong>There are no worldstates selected.\n" +
    "    </div>\n" +
    "    <div ng-if=\"forCriteria && !criteriaFunction\" class=\"alert alert-warning\">\n" +
    "        <strong>Warning: </strong>No criteria function selected.\n" +
    "    </div>\n" +
    "    <div ng-show=\"!(worldstates.length <= 0 || (forCriteria && !criteriaFunction))\">\n" +
    "        <table  data-ng-table=\"tableParams\" class=\"table\" template-pagination=\"templates/nopager.html\"  template-header=\"templates/indicatorCriteriaTableHeader.html\">\n" +
    "            <tbody>\n" +
    "                <tr data-ng-repeat=\"row in $data\" ng-class=\"{'info':isGroupRow(row)}\" \n" +
    "                    ng-style=\"getRowStyle($index)\">\n" +
    "                    <td data-ng-repeat=\"col in columns\" ng-style=\"getCellStyle($index)\">\n" +
    "                        <img ng-if=\"isGroupRow(row) || detailIcons\" ng-src=\"{{row[col.field].icon}}\"/>\n" +
    "                        {{row[col.field].name}}\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>  \n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('templates/levelOfEmphasisTemplate.html',
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\" style=\" white-space: nowrap;\n" +
    "         overflow: hidden;\n" +
    "         text-overflow: ellipsis;\">\n" +
    "        Level of satisfaction emphasis\n" +
    "    </div>\n" +
    "    <div class=\"panel-body\" >\n" +
    "        <div ng-if=\"!expertMode && indicatorSize>=1\">\n" +
    "            <form name=\"myForm\" >\n" +
    "\n" +
    "                <div class=\"radio\">\n" +
    "                    <label>\n" +
    "                        <input type=\"radio\" ng-model=\"model.lse\"  value=\"2\">\n" +
    "                        only positive\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "                <div class=\"radio\">\n" +
    "                    <label>\n" +
    "                        <input type=\"radio\" ng-model=\"model.lse\"  value=\"1\">\n" +
    "                        over-emphasise positives\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "                <div class=\"radio\">\n" +
    "                    <label>\n" +
    "                        <input type=\"radio\" ng-model=\"model.lse\"  value=\"0\" checked=\"true\">\n" +
    "                        neutral\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "                <div class=\"radio\">\n" +
    "                    <label>\n" +
    "                        <input type=\"radio\" ng-model=\"model.lse\"  value=\"-1\">\n" +
    "                        over-emphasise negatives\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "                <div class=\"radio\">\n" +
    "                    <label>\n" +
    "                        <input type=\"radio\" ng-model=\"model.lse\" value=\"-2\">\n" +
    "                        only negative\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "        <div ng-if=\"expertMode\">\n" +
    "            <div class=\"alert alert-warning\" role=\"alert\">Expert Mode not yet implemented!</div>    \n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/nopager.html',
    ""
  );


  $templateCache.put('templates/rankingTableHeader.html',
    "<tr>\n" +
    "    <th ng-repeat=\"column in columns\"\n" +
    "        ng-if=\"$index < 3\"\n" +
    "        >\n" +
    "        {{column.title}}\n" +
    "    </th>\n" +
    "    <th ng-if=\"showRadarChart\">\n" +
    "        Criteria radar\n" +
    "    </th>\n" +
    "    <th ng-repeat=\"column in columns\"\n" +
    "        ng-if=\"showIndicators && $index >= 3\"\n" +
    "        >\n" +
    "        {{column.title}}\n" +
    "    </th>\n" +
    "</tr>"
  );


  $templateCache.put('templates/relationAnalysisChartTemplate.html',
    "<div class=\"col-lg-12\">\n" +
    "    <style>\n" +
    "        .nvd3 .nv-axis.nv-x path.domain {\n" +
    "            stroke-opacity: .75;\n" +
    "        }\n" +
    "    </style>\n" +
    "    <div  ng-hide=\"worldstates().length > 0\" class=\"row\">\n" +
    "        <!--two dropdowns for x and y axis-->\n" +
    "        <div class=\"alert alert-warning\">\n" +
    "            <strong>Warning: </strong>There are no worldstates selected.\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div  ng-hide=\"!(worldstates() && worldstates().length > 0)\" class=\"row\">\n" +
    "        <!--two dropdowns for x and y axis-->\n" +
    "        <div style=\"float: right;margin-bottom: 10px;\">\n" +
    "            <indicator-criteria-axis-chooser is-x-axis=\"false\" icc-object=\"iccObject\" selected-axis=\"yAxis\"></indicator-criteria-axis-chooser>\n" +
    "            <indicator-criteria-axis-chooser is-x-axis=\"true\" icc-object=\"iccObject\" selected-axis=\"xAxis\"></indicator-criteria-axis-chooser>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div  ng-hide=\"!(worldstates() && worldstates().length > 0)\" class=\"row\"> \n" +
    "        <!--chart-->\n" +
    "        <div class=\"col-lg-12\" ng-hide=\"forCriteria && !(yAxisCriteriaFunction && xAxisCriteriaFunction)\">\n" +
    "            <div nvd3-scatter-chart\n" +
    "                 data=\"chartdata\"\n" +
    "                 showLegend=\"true\"\n" +
    "                 interactive=\"true\"\n" +
    "                 tooltips=\"true\"\n" +
    "                 sizerange=\"[80,80]\"\n" +
    "                 zscale=\"zScale\"\n" +
    "                 showDistX=\"true\"\n" +
    "                 showDistY=\"true\"\n" +
    "                 xaxislabel=\"{{xAxis.name}}\"\n" +
    "                 yaxislabel=\"{{yAxis.name}}\"\n" +
    "                 margin='{left:90,top:0,bottom:50,right:50}'\n" +
    "                 yAxisTickFormat=\"yAxisTickFormatFunction()\"\n" +
    "                 xAxisTickFormat=\"xAxisTickFormatFunction()\"\n" +
    "                 height=\"{{chartHeight}}\"\n" +
    "                 >\n" +
    "                <svg></svg>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-lg-12\" ng-hide=\"!forCriteria || (yAxisCriteriaFunction && xAxisCriteriaFunction)\" >\n" +
    "            <div class=\"alert alert-warning\">\n" +
    "                <strong>Warning: </strong>No criteria function selected.\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('templates/worldstateAnalysisWidgetTemplate.html',
    "<div class=\"col-lg-12\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\" style=\"display:table;width:100%\">\n" +
    "                <i class=\"glyphicon glyphicon-list-alt\"></i>\n" +
    "                <h3 style=\"display:table-cell;vertical-align: middle\n" +
    "                    \" class=\"panel-title\">Worldstate ranking table</h3>\n" +
    "                <div class=\"pull-right\">\n" +
    "                    <div class=\"input-group \">\n" +
    "                        <div class=\"input-group-btn \" style=\"display: block\" ng-click=\"persistDecisionStrategies()\">\n" +
    "                            <button type=\"button\" class=\"btn btn-sm btn-primary dropdown-toggle\" data-toggle=\"dropdown\" ng-disabled=\"disabled\">\n" +
    "                                Change Mode <span class=\"caret\"></span>\n" +
    "                            </button>\n" +
    "                            <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                                <li style=\"padding-left: 10px;\"> \n" +
    "                                    <input type=\"checkbox\" ng-model=\"showTableIndicators\"> Show Indicators\n" +
    "                                </li>\n" +
    "                                <li style=\"padding-left: 10px;\"> \n" +
    "                                    <input type=\"checkbox\" ng-model=\"showTableRadarChart\"> Show radar chart\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"panel-body\">\n" +
    "                <worldstate-ranking-table \n" +
    "                    worldstates=\"worldstates\"\n" +
    "                    criteria-function=\"selectedCriteriaFunction\"\n" +
    "                    decision-strategy=\"selectedDecisionStrategy\"\n" +
    "                    show-indicators=\"showTableIndicators\"\n" +
    "                    show-radar-chart=\"showTableRadarChart\">  \n" +
    "                </worldstate-ranking-table>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "                <span class=\"pull-left\">\n" +
    "                    <i class=\"glyphicon glyphicon-list-alt\"></i>\n" +
    "                    <h3 style=\"display:inline\" class=\"panel-title\" ng-if=\"!forCriteriaTable\">Indicator table</h3>\n" +
    "                    <h3 style=\"display:inline\" class=\"panel-title\" ng-if=\"forCriteriaTable\">Criteria table</h3>\n" +
    "                </span>\n" +
    "                <span class=\"pull-right\">\n" +
    "                    <div class=\"btn-group\">\n" +
    "                        <button type=\"button\" class=\"btn btn-sm btn-primary dropdown-toggle\" data-toggle=\"dropdown\" ng-disabled=\"disabled\">\n" +
    "                            Change Mode <span class=\"caret\"></span>\n" +
    "                        </button>\n" +
    "                        <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                            <li><a ng-click=\"forCriteriaTable = false\"><i ng-show=\"!forCriteriaTable\" class=\"glyphicon glyphicon-ok-circle\"></i> <span ng-style=\"{\n" +
    "                                                        'padding-left'\n" +
    "                                                        : !forCriteriaTable? '0px': '19px'}\">Indicator</span></a></li>\n" +
    "                            <li><a ng-click=\"forCriteriaTable = true\"><i ng-show=\"forCriteriaTable\" class=\"glyphicon glyphicon-ok-circle\"> </i>  <span ng-style=\"{\n" +
    "                                                        'padding-left'\n" +
    "                                                        : forCriteriaTable? '0px': '19px'}\">Criteria</span></a></li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                </span>\n" +
    "                <span class=\"clearfix\"></span>\n" +
    "            </div>\n" +
    "            <div class=\"panel-body\">\n" +
    "                <indicator-criteria-table worldstates='worldstates' \n" +
    "                                          for-criteria='forCriteriaTable'\n" +
    "                                          criteria-function=\"selectedCriteriaFunction\"\n" +
    "                                          >\n" +
    "\n" +
    "                </indicator-criteria-table>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "                <i class=\"glyphicon glyphicon-stats\"></i>\n" +
    "                <h3 style=\"display:inline\" class=\"panel-title\" >Indicator bar charts</h3>\n" +
    "            </div>\n" +
    "            <div class=\"panel-body\">\n" +
    "                <indicator-bar-charts\n" +
    "                    worldstates=\"worldstates\"\n" +
    "                    >\n" +
    "\n" +
    "                </indicator-bar-charts>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <!-- end widget -->\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "                <span class=\"pull-left\">\n" +
    "                    <span class=\"widget-icon\"> <i class=\"fa fa-table\"></i> </span>\n" +
    "                    <h3 style=\"display:inline\" class=\"panel-title\">Worldstate relation analysis chart</h3>\n" +
    "                </span>\n" +
    "                <span class=\"pull-right\">\n" +
    "                    <div class=\"btn-group\">\n" +
    "                        <button type=\"button\" class=\"btn btn-sm btn-primary dropdown-toggle\" data-toggle=\"dropdown\" ng-disabled=\"disabled\">\n" +
    "                            Change Mode <span class=\"caret\"></span>\n" +
    "                        </button>\n" +
    "                        <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                            <li><a ng-click=\"isCriteria = false\"><i ng-show=\"!isCriteria\" class=\"glyphicon glyphicon-ok-circle\"></i> <span ng-style=\"{\n" +
    "                                                        'padding-left'\n" +
    "                                                        : !isCriteria? '0px': '19px'}\">Indicator</span></a></li>\n" +
    "                            <li><a ng-click=\"isCriteria = true\"><i ng-show=\"isCriteria\" class=\"glyphicon glyphicon-ok-circle\"> </i>  <span ng-style=\"{\n" +
    "                                                        'padding-left'\n" +
    "                                                        : isCriteria? '0px': '19px'}\">Criteria</span></a></li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                </span>\n" +
    "                <span class=\"clearfix\"></span>\n" +
    "            </div>\n" +
    "            <div class=\"panel-body\">\n" +
    "                <relation-analysis-chart style=\"padding-left:50px\" height=\"350\" \n" +
    "                                         for-criteria='isCriteria' \n" +
    "                                         worldstates=\"worldstates\"\n" +
    "                                         criteria-function=\"selectedCriteriaFunction\"\n" +
    "                                         >\n" +
    "                </relation-analysis-chart>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "                <span class=\"pull-left\">\n" +
    "                    <span class=\"widget-icon\"> <i class=\"fa fa-table\"></i> </span>\n" +
    "                    <h3 style=\"display:inline\" class=\"panel-title\">Criteria radar chart comparison</h3>\n" +
    "                </span>\n" +
    "                <span class=\"pull-right\">\n" +
    "\n" +
    "                </span>\n" +
    "                <span class=\"clearfix\"></span>\n" +
    "            </div>\n" +
    "            <div class=\"panel-body\">\n" +
    "                <div class=\"col-lg-3\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <label>Reference Worldstate</label>\n" +
    "                    </div>\n" +
    "                    <div class=\"row\">\n" +
    "\n" +
    "                        <select multiple=\"\" ng-model=\"worldstateRef\" \n" +
    "                                ng-options=\"ws.name for ws in allWorldstates\"\n" +
    "                                style=\"width: 100%;height: 100%\">\n" +
    "                        </select>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"col-lg-9\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-lg-4\" ng-repeat=\"chartModel in chartModels\">\n" +
    "                            <div class=\"panel panel-default\">\n" +
    "                                <div class=\"panel-heading\">\n" +
    "                                    <h3 class=\"panel-title ng-binding\">\n" +
    "                                        <i class=\"fa fa-globe\"></i>\n" +
    "                                        {{chartModel[0].name}}</h3>\n" +
    "                                </div>\n" +
    "                                <div class=\"panel-body no-padding text-align-center\">\n" +
    "                                    <div style=\"margin: 0 auto; padding-top: 20px\"  \n" +
    "                                         criteria-radar \n" +
    "                                         worldstates=\"chartModel\"\n" +
    "                                         criteria-function=\"selectedCriteriaFunction\"\n" +
    "                                         show-legend=\"true\"\n" +
    "                                         show-axis-text=true\n" +
    "                                         >\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\" style=\"display:table;width:100%\">\n" +
    "                <h3 style=\"display:table-cell;vertical-align: middle\n" +
    "                    \" class=\"panel-title\">Decision strategies</h3>\n" +
    "                <div class=\"pull-right\">\n" +
    "\n" +
    "                    <div class=\"input-group \">\n" +
    "                        <div class=\"input-group-btn \" style=\"display: block\" ng-click=\"persistDecisionStrategies()\">\n" +
    "                            <button type=\"button\" class=\"btn btn-success btn-sm\" style=\"min-width: 80px;\">\n" +
    "                                <span style=\"display:block;float:left\">\n" +
    "                                    <i ng-if=\"!showDsPersistSpinner && !showDsPersistDone\" class=\"glyphicon glyphicon-floppy-disk\"></i>\n" +
    "                                    <i ng-if=\"showDsPersistSpinner\" class=\"spin glyphicon glyphicon-refresh\" ></i>\n" +
    "                                    <i ng-if=\"showDsPersistDone\" class=\"glyphicon glyphicon-ok\"></i>\n" +
    "                                </span>\n" +
    "                                <span style=\"display:block;float:right\">\n" +
    "                                    Persist\n" +
    "                                </span>\n" +
    "                            </button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"panel-body\">\n" +
    "                <decision-strategy-manager worldstates=\"worldstates\" decision-strategies=\"decisionStrategies\"></decision-strategy-manager>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\" style=\"display:table;width:100%\">\n" +
    "                <h3 style=\"display:table-cell;vertical-align: middle\n" +
    "                    \" class=\"panel-title\">Criteria functions</h3>\n" +
    "                <div class=\"pull-right\">\n" +
    "\n" +
    "                    <div class=\"input-group \">\n" +
    "                        <div class=\"input-group-btn \" style=\"display: block\" ng-click=\"persistCriteriaFunctions()\">\n" +
    "                            <button type=\"button\" class=\"btn btn-success btn-sm\" style=\"min-width: 80px;\">\n" +
    "                                <span style=\"display:block;float:left\">\n" +
    "                                    <i ng-if=\"!showPersistSpinner && !showPersistDone\" class=\"glyphicon glyphicon-floppy-disk\"></i>\n" +
    "                                    <i ng-if=\"showPersistSpinner\" class=\"spin glyphicon glyphicon-refresh\" ></i>\n" +
    "                                    <i ng-if=\"showPersistDone\" class=\"glyphicon glyphicon-ok\"></i>\n" +
    "                                </span>\n" +
    "                                <span style=\"display:block;float:right\">\n" +
    "                                    Persist\n" +
    "                                </span>\n" +
    "                            </button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"panel-body\">\n" +
    "                <criteria-function-manager worldstates=\"worldstates\"  criteria-functions=\"criteriaFunctionSets\"></criteria-function-manager>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "</div>\n" +
    "<!-- end widget -->"
  );


  $templateCache.put('templates/worldstateRankingTableTemplate.html',
    "<div id=\"worldstateRankingTable\" style=\"overflow-x: auto\">\n" +
    "\n" +
    "    <div ng-if=\"!(worldstates.length > 0)\" class=\"alert alert-warning\">\n" +
    "        <strong>Warning: </strong>There are no worldstates selected.\n" +
    "    </div>\n" +
    "    <div ng-if=\"!(criteriaFunction || worldstates.length <= 0)\" class=\"alert alert-warning\">\n" +
    "        <strong>Warning: </strong>No criteria function selected.\n" +
    "    </div>\n" +
    "    <div ng-if=\"!(decisionStrategy || worldstates.length <= 0)\" class=\"alert alert-warning\">\n" +
    "        <strong>Warning: </strong>No decision strategy selected.\n" +
    "    </div>\n" +
    "    <div ng-show=\"((worldstates.length > 0) && criteriaFunction && decisionStrategy)\">\n" +
    "        <table  \n" +
    "            ng-table=\"tableParams\"\n" +
    "            template-header=\"templates/rankingTableHeader.html\"\n" +
    "            show-filter=\"false\" \n" +
    "            class=\"table table-striped\"\n" +
    "            style=\"white-space: nowrap\">\n" +
    "            <tbody>\n" +
    "                <tr ng-repeat=\"item in $data\">\n" +
    "                    <td ng-repeat=\"col in columns\" ng-if=\"$index < 3\" style=\"vertical-align: middle\">\n" +
    "                        {{item[col.field]}}\n" +
    "                    </td>\n" +
    "                    <td ng-if=\"showRadarChart\"\n" +
    "                        style=\"min-width:150px; width:150px; margin: 0 auto; padding-top: 20px\" \n" +
    "                        criteria-radar \n" +
    "                        worldstates=\"[item.ws]\" \n" +
    "                        show-legend=\"false\"\n" +
    "                        show-axis-text=\"true\"\n" +
    "                        use-numbers=\"true\"\n" +
    "                        criteria-function=\"criteriaFunction\"\n" +
    "                        ng-click=\"clickToOpen($index)\"\n" +
    "                        >\n" +
    "                    </td>\n" +
    "                    <td ng-repeat=\"col in columns\"  ng-if=\"showIndicators && $index >= 3\" style=\"vertical-align: middle\">\n" +
    "                        <span>\n" +
    "                            {{item[col.field].indicator}}\n" +
    "                            <br/>\n" +
    "                            {{item[col.field].los}}\n" +
    "                        </span>\n" +
    "                    </td>\n" +
    "\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "</div>"
  );

}]);
