"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dataFetchActions_1 = require("../../dataFetchActions");
exports.crudGetManyReference = function (reference, target, id, relatedTo, pagination, sort, filter, source) { return ({
    type: exports.CRUD_GET_MANY_REFERENCE,
    payload: { target: target, id: id, pagination: pagination, sort: sort, filter: filter, source: source },
    meta: {
        resource: reference,
        relatedTo: relatedTo,
        fetch: dataFetchActions_1.GET_MANY_REFERENCE,
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
}); };
exports.CRUD_GET_MANY_REFERENCE = 'RA/CRUD_GET_MANY_REFERENCE';
exports.CRUD_GET_MANY_REFERENCE_LOADING = 'RA/CRUD_GET_MANY_REFERENCE_LOADING';
exports.CRUD_GET_MANY_REFERENCE_FAILURE = 'RA/CRUD_GET_MANY_REFERENCE_FAILURE';
exports.CRUD_GET_MANY_REFERENCE_SUCCESS = 'RA/CRUD_GET_MANY_REFERENCE_SUCCESS';
