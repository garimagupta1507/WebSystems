"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var pure_1 = __importDefault(require("recompose/pure"));
var compose_1 = __importDefault(require("recompose/compose"));
var translate_1 = __importDefault(require("../i18n/translate"));
var getFieldLabelTranslationArgs_1 = __importDefault(require("./getFieldLabelTranslationArgs"));
exports.FieldTitle = function (_a) {
    var resource = _a.resource, source = _a.source, label = _a.label, isRequired = _a.isRequired, _b = _a.translate, translate = _b === void 0 ? function (name, options) { return name; } : _b;
    return (react_1.default.createElement("span", null,
        translate.apply(void 0, getFieldLabelTranslationArgs_1.default({ label: label, resource: resource, source: source })),
        isRequired && ' *'));
};
// wat? TypeScript looses the displayName if we don't set it explicitly
exports.FieldTitle.displayName = 'FieldTitle';
var enhance = compose_1.default(translate_1.default, pure_1.default);
exports.default = enhance(exports.FieldTitle);
