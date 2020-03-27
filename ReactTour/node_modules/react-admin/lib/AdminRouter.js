"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ra_core_1 = require("ra-core");
var ra_ui_materialui_1 = require("ra-ui-materialui");
var AdminRouter = ra_core_1.CoreAdminRouter;
AdminRouter.defaultProps = {
    loading: ra_ui_materialui_1.Loading,
};
exports.default = AdminRouter;
