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
                indexToRemove = [];
                for (i = 0; i < $scope.selectedWorldstates.length; i++) {
                    for (j = 0; j < $scope.worldstates.length; j++) {
                        if (angular.equals($scope.worldstates[j], $scope.selectedWorldstates[i])) {
                            indexToRemove.push(j);
                        }
                    }
                }
                for (i = 0; i < indexToRemove.length; i++) {
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

            onloadIccObjects = function (file) {
                return function (e) {
                    var fileObj, worldstateDummy;
                    try {
                        fileObj = JSON.parse(e.target.result);
                        /*
                         * accept two differnt kind of files. 
                         * 1. A plain icc data object.
                         * In that case we use apply a standard name to this object
                         * 
                         * 2. A worldstate Dummy object that already has a name
                         */

                        if (fileObj.name && fileObj.iccdata) {
                            worldstateDummy = fileObj;
                        } else {
                            //generate a uniqe id...
                            worldstateDummy = {
                                name: 'Nonamed ICC data ' + ($scope.worldstates.length + 1),
                                iccdata: fileObj
                            };
                        }

                        // we need an id to distinc the icc objects. eg. the ranking table use this id
                        // to keep track of the icc objects
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
                        $scope.$apply();

                    } catch (err) {
                        // show an error in the gui...
                        showFileLoadingError(file);
                    }
                };
            };

            onloadCfFile = function (theFile) {
                return function (e) {
                    var cfSet;
                    try {
                        cfSet = JSON.parse(e.target.result);

                        if (Object.prototype.toString.call(cfSet) === '[object Array]') {
                            $scope.criteriaFunctions = cfSet;
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
                    var ds;
                    try {
                        ds = JSON.parse(e.target.result);

                        if (Object.prototype.toString.call(ds) === '[object Array]') {
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


