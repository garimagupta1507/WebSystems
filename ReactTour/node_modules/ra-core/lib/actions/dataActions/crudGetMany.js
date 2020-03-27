"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dataFetchActions_1 = require("../../dataFetchActions");
exports.crudGetMany = function (resource, ids) { return ({
    type: exports.CRUD_GET_MANY,
    payload: { ids: ids },
    meta: {
        resource: resource,
        fetch: dataFetchActions_1.GET_MANY,
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
}); };
exports.CRUD_GET_MANY = 'RA/CRUD_GET_MANY';
exports.CRUD_GET_MANY_LOADING = 'RA/CRUD_GET_MANY_LOADING';
exports.CRUD_GET_MANY_FAILURE = 'RA/CRUD_GET_MANY_FAILURE';
exports.CRUD_GET_MANY_SUCCESS = 'RA/CRUD_GET_MANY_SUCCESS';
