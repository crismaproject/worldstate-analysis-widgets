angular.module(
    'eu.crismaproject.worldstateAnalysis.controllers'
    ).controller(
    'eu.crismaproject.worldstateAnalysis.controllers.FileContextProviderDirectiveController',
    [
        '$scope',
        'de.cismet.crisma.ICMM.services.icmm',
        function ($scope, Icmm) {
            'use strict';
            var showFileLoadingError, showFileLoading, onloadIccObjects, onloadCfFile, onloadDsFile;

            //initialize the bindings
            $scope.selectedWorldstates = [];
            $scope.worldstates = [];
            $scope.criteriaFunctions = [];
            $scope.decisionStrategies = [];
            $scope.showDummyListItem = true;
            $scope.removeSelectionBtnDisabled = true;
            $scope.removeSelectionButtonStyle = {
                'color': '#888'
            };
            $scope.noIndicatorsLoaded = true;
            /*
             * the indicator maps keeps track of the indicators that each object  
             * (e.g. indicator object, criteriaFunction and decisionStrategy) that are loaded by this directive
             *  must provide
             */
            $scope.tooltipRename = {
                title: 'Rename criteria function'
            };
            $scope.tooltipRenameDone = {
                title: 'Done'
            };
            $scope.tooltipDeleteSelection = {
                title: 'Done'
            };
            $scope.tooltipDeleteSelection = {
                title: 'Remove selection'
            };
            $scope.tooltipAdd = {
                title: 'Add Icc Objects from file'
            };
            $scope.editable = [];
            $scope.toggleSelection = function (index) {
                var wsToToggle, i, isSelected;
                wsToToggle = $scope.worldstates[index];
                //check if the worldstate is already contained in the selectedWorldstates array..
                isSelected = -1;
                for (i = 0; i < $scope.selectedWorldstates.length; i++) {
                    if ($scope.selectedWorldstates[i].id === wsToToggle.id) {
                        isSelected = i;
                        break;
                    }
                }

                if (isSelected >= 0) {
                    $scope.selectedWorldstates.splice(isSelected, 1);
                } else {
                    $scope.selectedWorldstates.push(wsToToggle);
                }
            };

            $scope.$watchCollection('selectedWorldstates', function () {
                //if no indicator objects are selected anymore whe need to disable the button
                if ($scope.selectedWorldstates.length <= 0) {
                    $scope.removeSelectionBtnDisabled = true;
                    $scope.removeSelectionButtonStyle = {
                        'color': '#CCC'
                    };
                } else {
                    $scope.removeSelectionBtnDisabled = false;
                    $scope.removeSelectionButtonStyle = {};
                }
            });

            $scope.getItemStyle = function (index) {
                var c = 'list-group-item';
                var wsToToggle, i, isSelected;
                wsToToggle = $scope.worldstates[index];
                //check if the worldstate is already contained in the selectedWorldstates array..
                isSelected = -1;
                for (i = 0; i < $scope.selectedWorldstates.length; i++) {
                    if ($scope.selectedWorldstates[i].id === wsToToggle.id) {
                        isSelected = i;
                    }
                }

                if (isSelected >= 0) {
                    c += ' list-group-item-info';
                }

                return c;
            };

            //check if the File API is available
            $scope.fileAPIAvailable = (window.File && window.FileReader && window.FileList && window.Blob) ? true : false;

            $scope.removeSelectedDummyWS = function () {
                var i, j, indexToRemove;
                if ($scope.removeSelectionBtnDisabled) {
                    return;
                }
                indexToRemove = [];
                for (i = 0; i < $scope.selectedWorldstates.length; i++) {
                    for (j = 0; j < $scope.worldstates.length; j++) {
                        if (angular.equals($scope.worldstates[j], $scope.selectedWorldstates[i])) {
                            indexToRemove.push(j);
                        }
                    }
                }
                for (i = indexToRemove.length - 1; i >= 0; i--) {
                    $scope.worldstates.splice(indexToRemove[i], 1);
                }
                $scope.selectedWorldstates = [];
            };

            /*
             * be carefull calling this function from angular contexts
             * @param {type} file that could not be loaded properly...
             * @returns {undefined}
             */
            showFileLoadingError = function (file, err) {
                $scope.errorFile = file;
                $scope.fileLoadError = true;
                $scope.errorMessage = err.message;
                $scope.$apply();
            };

            showFileLoading = function () {
                $scope.fileLoadError = false;
                $scope.fileLoading = true;
            };

            $scope.fileLoadError = false;
            $scope.fileLoading = false;

            $scope.showCfFileLoadingError = function (message) {
                $scope.cfFileLoadError = true;
                $scope.cfFileLoadErrorMsg = 'Criteria functions not loaded. '+message;
                $scope.$apply();
            };

            $scope.showDsFileLoadingError = function (message) {
                $scope.dsFileLoadError = true;
                $scope.dsFileLoadErrorMsg = 'Decision strategies not loaded. '+message;
                $scope.$apply();
            };

            onloadIccObjects = function (file) {
                return function (e) {
                    var fileObj, worldstateDummy, indicatorProp, indicator, origLoadedIndicators, indicatorGroup,
                        containsIndicator;
                    try {
                        fileObj = JSON.parse(e.target.result);
                        /*
                         * accept two differnt kind of files. 
                         * 1. A plain icc data object.
                         * In that case we apply a standard name to this object
                         * 
                         * 2. A worldstate Dummy object that already has a name
                         */

                        if (fileObj.name && fileObj.iccdata) {
                            worldstateDummy = fileObj;
                            origLoadedIndicators = fileObj.iccdata;
                            worldstateDummy.iccdata = {
                                actualaccessinfo: JSON.stringify(worldstateDummy.iccdata)
                            };
                        } else {
                            //generate a uniqe id...
                            origLoadedIndicators = fileObj;
                            worldstateDummy = {
                                name: 'Nonamed indicator data ' + ($scope.worldstates.length + 1),
                                iccdata: {
                                    actualaccessinfo: JSON.stringify(fileObj)
                                }
                            };
                        }
                        if (!$scope.indicatorMap) {
                            $scope.indicatorMap = {};
                            for (indicatorGroup in origLoadedIndicators) {
                                if (origLoadedIndicators.hasOwnProperty(indicatorGroup)) {
                                    for (indicatorProp in origLoadedIndicators[indicatorGroup]) {
                                        if (origLoadedIndicators[indicatorGroup].hasOwnProperty(indicatorProp)) {
                                            if (indicatorProp !== 'displayName' && indicatorProp !== 'iconResource') {
                                                $scope.indicatorMap[indicatorProp] = origLoadedIndicators[indicatorGroup][indicatorProp];
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            for (indicator in $scope.indicatorMap) {
                                if ($scope.indicatorMap.hasOwnProperty(indicator)) {
                                    containsIndicator = false;
                                    for (indicatorGroup in origLoadedIndicators) {
                                        if (origLoadedIndicators.hasOwnProperty(indicatorGroup)) {
                                            for (indicatorProp in origLoadedIndicators[indicatorGroup]) {
                                                if (origLoadedIndicators[indicatorGroup].hasOwnProperty()) {
                                                    if (indicatorProp !== 'displayName' && indicatorProp !== 'iconResource') {
                                                        if ($scope.indicatorMap[indicator].displayName === origLoadedIndicators[indicatorGroup][indicatorProp].displayName) {
                                                            containsIndicator = true;
                                                            break;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (!containsIndicator) {
                                        console.error('loaded indicator data does not match to the first loaded indicator set');
                                    }
                                }
                            }
                        }

                        // we need an id to distinc the icc objects. eg. the ranking table use this id
                        // to keep track of the indicator objects
                        if (!worldstateDummy.id) {
                            worldstateDummy.id = Math.floor((Math.random() * 1000000) + 1);
                        }

                        Icmm.convertToCorrectIccDataFormat(worldstateDummy);

                        if ($scope.worldstates) {
                            $scope.worldstates.push(worldstateDummy);
                            $scope.editable.push(false);
                        } else {
                            $scope.editable.push(false);
                            $scope.worldstates = [worldstateDummy];
                        }
                        $scope.showDummyListItem = false;
                        $scope.noIndicatorsLoaded = false;
                        // when indicator objects are added we want them to be selected by default
                        $scope.selectedWorldstates.splice(0, $scope.selectedWorldstates.length);
                        $scope.worldstates.forEach(function (object, index) {
                            $scope.toggleSelection(index);
                        });

                        $scope.$apply();

                    } catch (err) {
                        // show an error in the gui...
                        showFileLoadingError(file);
                    }
                };
            };

            onloadCfFile = function (theFile) {
                return function (e) {
                    var cfSet, cf, i, j, indicatorProp, indicatorFound, cfIndicator, msg;
                    try {
                        cfSet = JSON.parse(e.target.result);

                        if (Object.prototype.toString.call(cfSet) === '[object Array]') {
                            // we need to check if the criteria Functions defined in the file
                            // match to the indicators of the loaded indicator files...
                            for (indicatorProp in $scope.indicatorMap) {
                                for (i = 0; i < cfSet.length; i++) {
                                    cf = cfSet[i];
                                    for (j = 0; j < cf.criteriaFunctions.length; j++) {
                                        cfIndicator = cf.criteriaFunctions[j].indicator;
                                        indicatorFound = false;

                                        if ($scope.indicatorMap[indicatorProp].displayName === cfIndicator) {
                                            indicatorFound = true;
                                            break;
                                        }
                                    }
                                    if (!indicatorFound) {
                                        msg = 'Could not find indicator "' + $scope.indicatorMap[indicatorProp].displayName + '" in criteria function "' + cf.name + '"';
                                        console.error(msg);
                                        $scope.showCfFileLoadingError(msg);
                                        return;
                                    }
                                }
                            }
                            $scope.criteriaFunctions = cfSet;
                            $scope.loadedCfFile = theFile.name;

                        }
                        $scope.$apply();
                    } catch (err) {
                        // show an error in the gui...
                        console.error('Could not read Criteria Function Config File: ' + theFile.name);
                    }
                };
            };

            onloadDsFile = function (theFile) {
                return function (e) {
                    var ds, s, i, j, indicatorProp, indicatorFound, cfIndicator, msg;
                    try {
                        ds = JSON.parse(e.target.result);

                        if (Object.prototype.toString.call(ds) === '[object Array]') {
                            // we need to check if the decision strategies defined in the file
                            // match to the indicators of the loaded indicator files...
                            for (indicatorProp in $scope.indicatorMap) {
                                for (i = 0; i < ds.length; i++) {
                                    s = ds[i];
                                    for (j = 0; j < s.criteriaEmphases.length; j++) {
                                        cfIndicator = s.criteriaEmphases[j].indicator.displayName;
                                        indicatorFound = false;

                                        if ($scope.indicatorMap[indicatorProp].displayName === cfIndicator) {
                                            indicatorFound = true;
                                            break;
                                        }
                                    }
                                    if (!indicatorFound) {
                                        msg = 'Could not find indicator "' + $scope.indicatorMap[indicatorProp].displayName + '" in decision strategy "' + s.name + '"';
                                        console.error(msg);
                                        $scope.showDsFileLoadingError(msg);
                                        return;
                                    }
                                }
                            }
                            $scope.loadedDsfFile = theFile.name;
                            $scope.decisionStrategies = ds;
                        }
                        $scope.$apply();
                    } catch (err) {
                        // show an error in the gui...
                        console.error('Could not read Decision Strategy Config File: ' + theFile.name);
                    }
                };
            };

            /*
             * When the newFile property has changed the User want's to add a new list of files..
             */
            $scope.$watch('iccObjects', function (newVal, oldVal) {
                var i, file, reader;
                if (!angular.equals(newVal, oldVal) && newVal) {
                    showFileLoading();

                    for (i = 0; i < $scope.iccObjects.length; i++) {

                        file = $scope.iccObjects[i];

                        reader = new FileReader();
                        reader.onload = onloadIccObjects(file);
                        try {
                            //we assume that the file is utf-8 encoded
                            reader.readAsText(file);
                        } catch (err) {
                            // show an error in the gui...
                            showFileLoadingError(file);
                        }

                    }

                }
            });

            $scope.$watch('cfConfigFile', function (newVal, oldVal) {
                var file;
                if (!angular.equals(newVal, oldVal) && newVal) {
                    showFileLoading();

                    file = $scope.cfConfigFile[0];

                    var reader = new FileReader();
                    reader.onload = onloadCfFile(file);

                    try {
                        //we assume that the file is utf-8 encoded
                        reader.readAsText(file);
                    } catch (err) {
                        // show an error in the gui...
                        console.error('Could not read Criteria Function Config File: ' + file.name);
                    }

                }

            });

            $scope.$watch('dsConfigFile', function (newVal, oldVal) {
                var file;
                if (!angular.equals(newVal, oldVal) && newVal) {
                    showFileLoading();

                    file = $scope.dsConfigFile[0];

                    var reader = new FileReader();
                    reader.onload = onloadDsFile(file);

                    try {
                        //we assume that the file is utf-8 encoded
                        reader.readAsText(file);
                    } catch (err) {
                        // show an error in the gui...
                        console.error('Could not read Decision Strategy Config File: ' + file.name);
                    }

                }

            });
        }
    ]
    );


