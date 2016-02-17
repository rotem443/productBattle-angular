angular.module("mdtTemplates", []).run(["$templateCache", function($templateCache) {$templateCache.put("/main/templates/mdtAlternateHeaders.html","<div class=\"mdt-header-alternate\" layout=\"row\" layout-align=\"start center\">\n    <span class=\"alternate-text\" flex>{{tableDataStorageService.getNumberOfSelectedRows()}} item selected</span>\n    <md-button class=\"md-icon-button md-primary\" ng-click=\"deleteSelectedRows()\" aria-label=\"Delete selected rows\">\n        <ng-md-icon icon=\"delete\" size=\"24\"></ng-md-icon>\n    </md-button>\n\n    <md-button class=\"md-icon-button md-primary\" aria-label=\"More options\" ng-click=\"createSelectedBattels(event)\">\n        <ng-md-icon icon=\"add\" size=\"24\"></ng-md-icon>\n    </md-button>\n</div>");
$templateCache.put("/main/templates/mdtCardFooter.html","<div class=\"mdt-footer\" layout=\"row\" ng-show=\"isPaginationEnabled()\">\n    <div class=\"mdt-pagination\"\n         layout=\"row\"\n         layout-align=\"end center\"\n         flex>\n\n        <span layout-margin>Rows per page:</span>\n        <md-input-container>\n            <md-select ng-model=\"rowsPerPage\" aria-label=\"rows per page\">\n                <md-option ng-value=\"pageSize\" ng-repeat=\"pageSize in mdtPaginationHelper.rowsPerPageValues\">{{pageSize}}</md-option>\n            </md-select>\n        </md-input-container>\n\n        <span layout-margin>\n            {{mdtPaginationHelper.getStartRowIndex()+1}}-{{mdtPaginationHelper.getEndRowIndex()+1}} of {{mdtPaginationHelper.getTotalRowsCount()}}\n        </span>\n\n        <md-button class=\"md-icon-button md-primary\" aria-label=\"Previous page\" ng-click=\"mdtPaginationHelper.previousPage()\">\n            <ng-md-icon icon=\"keyboard_arrow_left\" size=\"24\"></ng-md-icon>\n        </md-button>\n\n        <md-button class=\"md-icon-button md-primary\" aria-label=\"Next page\" ng-click=\"mdtPaginationHelper.nextPage()\">\n            <ng-md-icon icon=\"keyboard_arrow_right\" size=\"24\"></ng-md-icon>\n        </md-button>\n    </div>\n</div>");
$templateCache.put("/main/templates/mdtCardHeader.html","<div class=\"mdt-header\" layout=\"row\" layout-align=\"start center\" ng-show=\"isTableCardEnabled\">\n    <span flex>{{tableCard.title}}</span>\n<!--\n    <md-button class=\"md-icon-button md-primary\" aria-label=\"Filter\">\n        <ng-md-icon icon=\"filter_list\" size=\"24\"></ng-md-icon>\n    </md-button>\n    <md-button class=\"md-icon-button md-primary\" aria-label=\"More options\">\n        <ng-md-icon icon=\"more_vert\" size=\"24\"></ng-md-icon>\n    </md-button>\n-->\n</div>");
$templateCache.put("/main/templates/mdtGeneratedHeaderCellContent.html","<div>\n    <div layout=\"row\" ng-if=\"sortableColumns\">\n        <md-tooltip ng-show=\"headerRowData.columnDefinition\">{{headerRowData.columnDefinition}}</md-tooltip>\n\n        <span ng-show=\"headerRowData.alignRule == \'right\'\">\n            <span class=\"hoverSortIcons\" ng-if=\"!isSorted()\">\n                <ng-md-icon icon=\"arrow_forward\" size=\"16\"></ng-md-icon>\n            </span>\n\n            <span class=\"sortedColumn\" ng-if=\"isSorted()\" ng-class=\"direction == -1 ? \'ascending\' : \'descending\'\">\n                <ng-md-icon icon=\"arrow_forward\" size=\"16\"></ng-md-icon>\n            </span>\n        </span>\n\n        <span>\n            {{headerRowData.columnName}}\n        </span>\n\n        <span ng-show=\"headerRowData.alignRule == \'left\'\">\n            <span class=\"hoverSortIcons\" ng-if=\"!isSorted()\">\n                <ng-md-icon icon=\"arrow_forward\" size=\"16\"></ng-md-icon>\n            </span>\n\n            <span class=\"sortedColumn\" ng-if=\"isSorted()\" ng-class=\"direction == -1 ? \'ascending\' : \'descending\'\">\n                <ng-md-icon icon=\"arrow_forward\" size=\"16\"></ng-md-icon>\n            </span>\n        </span>\n    </div>\n    <div ng-if=\"!sortableColumns\">\n        <md-tooltip ng-show=\"headerRowData.columnDefinition\">{{headerRowData.columnDefinition}}</md-tooltip>\n\n        <span>\n            {{headerRowData.columnName}}\n        </span>\n    </div>\n</div>");
$templateCache.put("/main/templates/mdtTable.html","<md-content class=\"mdtTable md-whiteframe-z1\" layout=\"column\">\n    <!-- table card -->\n    <mdt-card-header ng-hide=\"alternateHeaders && isAnyRowSelected()\"></mdt-card-header>\n\n    <!-- alternate headers -->\n    <mdt-alternate-headers ng-show=\"alternateHeaders && isAnyRowSelected()\"></mdt-alternate-headers>\n    <!-- alternate headers end -->\n\n    <div id=\"reader\" style=\"display:none;\"></div>\n\n    <table cellpadding=\"0\" cellspacing=\"0\">\n        <thead>\n            <tr class=\"theadTrRow\"\n                mdt-animate-sort-icon-handler>\n\n                <!-- TODO: fix text-align:left, in theory it should not be there to make it work -->\n                <th class=\"checkboxCell\"\n                    style=\"text-align:left;\"\n                    ng-show=\"selectableRows\"\n                    mdt-select-all-rows-handler>\n                    <md-checkbox aria-label=\"select all\" ng-model=\"selectAllRows\"></md-checkbox>\n                </th>\n\n                <th class=\"column\"\n                    ng-repeat=\"headerRowData in tableDataStorageService.header track by $index\"\n                    mdt-add-align-class=\"headerRowData.alignRule\"\n                    mdt-sort-handler\n                    md-ink-ripple=\"{{rippleEffect}}\">\n\n                    <mdt-generated-header-cell-content></mdt-generated-header-cell-content>\n                </th>\n            </tr>\n        </thead>\n        <tbody>\n        <tr ng-repeat=\"rowData in mdtPaginationHelper.getRows() track by $index\"\n            ng-class=\"{\'selectedRow\': rowData.optionList.selected}\"\n            ng-show=\"(isPaginationEnabled() === false || rowData.optionList.visible === true) && rowData.optionList.deleted === false\">\n\n            <td class=\"checkboxCell\" ng-show=\"selectableRows\">\n                <md-checkbox aria-label=\"select\" ng-model=\"rowData.optionList.selected\"></md-checkbox>\n            </td>\n\n            <td class=\"column\"\n                ng-repeat=\"cellData in rowData.data track by $index\"\n                mdt-add-align-class=\"tableDataStorageService.header[$index].alignRule\">\n\n                <span ng-show=\"!cellData.type\">{{cellData}}</span>\n                <span ng-show=\"cellData.type === \'html\'\"\n                      mdt-add-html-content-to-cell=\"cellData.value\"></span>\n            </td>\n        </tr>\n        <tr ng-show=\"mdtPaginationHelper.isLoading\">\n            <td colspan=\"999\">\n                <md-progress-linear md-mode=\"indeterminate\"></md-progress-linear>\n            </td>\n        </tr>\n        <tr ng-show=\"mdtPaginationHelper.isLoadError\">\n            <td colspan=\"999\">\n                {{mdtPaginationHelper.mdtRowPaginatorErrorMessage}}\n            </td>\n        </tr>\n        </tbody>\n    </table>\n\n    <!-- table card -->\n    <mdt-card-footer></mdt-card-footer>\n    <!-- table card end -->\n</md-content>");}]);