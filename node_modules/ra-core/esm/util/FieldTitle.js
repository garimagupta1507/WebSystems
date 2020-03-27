import React from 'react';
import pure from 'recompose/pure';
import compose from 'recompose/compose';
import translateHoc from '../i18n/translate';
import getFieldLabelTranslationArgs from './getFieldLabelTranslationArgs';
export var FieldTitle = function (_a) {
    var resource = _a.resource, source = _a.source, label = _a.label, isRequired = _a.isRequired, _b = _a.translate, translate = _b === void 0 ? function (name, options) { return name; } : _b;
    return (React.createElement("span", null,
        translate.apply(void 0, getFieldLabelTranslationArgs({ label: label, resource: resource, source: source })),
        isRequired && ' *'));
};
// wat? TypeScript looses the displayName if we don't set it explicitly
FieldTitle.displayName = 'FieldTitle';
var enhance = compose(translateHoc, pure);
export default enhance(FieldTitle);
