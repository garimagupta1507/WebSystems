"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dataFetchActions_1 = require("../../dataFetchActions");
exports.crudDelete = function (resource, id, previousData, basePath, redirectTo, refresh) {
    if (redirectTo === void 0) { redirectTo = 'list'; }
    if (refresh === void 0) { refresh = true; }
    return ({
        type: exports.CRUD_DELETE,
        payload: { id: id, previousData: previousData },
        meta: {
            resource: resource,
            fetch: dataFetchActions_1.DELETE,
            onSuccess: {
                notification: {
                    body: 'ra.notification.deleted',
                    level: 'info',
                    messageArgs: {
                        smart_count: 1,
                    },
                },
                refresh: refresh,
                redirectTo: redirectTo,
                basePath: basePath,
            },
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning',
                },
            },
        },
    });
};
exports.CRUD_DELETE = 'RA/CRUD_DELETE';
exports.CRUD_DELETE_LOADING = 'RA/CRUD_DELETE_LOADING';
exports.CRUD_DELETE_FAILURE = 'RA/CRUD_DELETE_FAILURE';
exports.CRUD_DELETE_SUCCESS = 'RA/CRUD_DELETE_SUCCESS';
