"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dataFetchActions_1 = require("../../dataFetchActions");
exports.crudGetList = function (resource, pagination, sort, filter) { return ({
    type: exports.CRUD_GET_LIST,
    payload: { pagination: pagination, sort: sort, filter: filter },
    meta: {
        resource: resource,
        fetch: dataFetchActions_1.GET_LIST,
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
}); };
exports.CRUD_GET_LIST = 'RA/CRUD_GET_LIST';
exports.CRUD_GET_LIST_LOADING = 'RA/CRUD_GET_LIST_LOADING';
exports.CRUD_GET_LIST_FAILURE = 'RA/CRUD_GET_LIST_FAILURE';
exports.CRUD_GET_LIST_SUCCESS = 'RA/CRUD_GET_LIST_SUCCESS';
