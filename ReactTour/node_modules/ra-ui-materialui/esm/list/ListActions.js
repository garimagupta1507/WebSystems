var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import { sanitizeListRestProps } from 'ra-core';
import CardActions from '../layout/CardActions';
import { CreateButton, ExportButton } from '../button';
var Actions = function (_a) {
    var bulkActions = _a.bulkActions, currentSort = _a.currentSort, className = _a.className, resource = _a.resource, filters = _a.filters, displayedFilters = _a.displayedFilters, exporter = _a.exporter, filterValues = _a.filterValues, permanentFilter = _a.permanentFilter, hasCreate = _a.hasCreate, basePath = _a.basePath, selectedIds = _a.selectedIds, onUnselectItems = _a.onUnselectItems, showFilter = _a.showFilter, total = _a.total, rest = __rest(_a, ["bulkActions", "currentSort", "className", "resource", "filters", "displayedFilters", "exporter", "filterValues", "permanentFilter", "hasCreate", "basePath", "selectedIds", "onUnselectItems", "showFilter", "total"]);
    return (React.createElement(CardActions, __assign({ className: className }, sanitizeListRestProps(rest)),
        bulkActions &&
            cloneElement(bulkActions, {
                basePath: basePath,
                filterValues: filterValues,
                resource: resource,
                selectedIds: selectedIds,
                onUnselectItems: onUnselectItems,
            }),
        filters &&
            cloneElement(filters, {
                resource: resource,
                showFilter: showFilter,
                displayedFilters: displayedFilters,
                filterValues: filterValues,
                context: 'button',
            }),
        hasCreate && React.createElement(CreateButton, { basePath: basePath }),
        exporter !== false && (React.createElement(ExportButton, { disabled: total === 0, resource: resource, sort: currentSort, filter: __assign({}, filterValues, permanentFilter), exporter: exporter }))));
};
Actions.propTypes = {
    bulkActions: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
    basePath: PropTypes.string,
    className: PropTypes.string,
    currentSort: PropTypes.object,
    displayedFilters: PropTypes.object,
    exporter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    filters: PropTypes.element,
    filterValues: PropTypes.object,
    hasCreate: PropTypes.bool,
    resource: PropTypes.string,
    onUnselectItems: PropTypes.func.isRequired,
    selectedIds: PropTypes.arrayOf(PropTypes.any),
    showFilter: PropTypes.func,
    total: PropTypes.number.isRequired,
};
Actions.defaultProps = {
    selectedIds: [],
};
export default onlyUpdateForKeys([
    'resource',
    'filters',
    'displayedFilters',
    'filterValues',
    'selectedIds',
])(Actions);
