"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var prop_types_1 = __importDefault(require("prop-types"));
exports.fieldPropTypes = {
    addLabel: prop_types_1.default.bool,
    sortBy: prop_types_1.default.string,
    source: prop_types_1.default.string,
    label: prop_types_1.default.string,
    sortable: prop_types_1.default.bool,
    className: prop_types_1.default.string,
    cellClassName: prop_types_1.default.string,
    headerClassName: prop_types_1.default.string,
    textAlign: prop_types_1.default.oneOf(['right', 'left']),
};
