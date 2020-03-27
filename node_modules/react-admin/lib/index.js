"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Admin_1 = __importDefault(require("./Admin"));
exports.Admin = Admin_1.default;
var AdminRouter_1 = __importDefault(require("./AdminRouter"));
exports.AdminRouter = AdminRouter_1.default;
__export(require("ra-core"));
__export(require("ra-ui-materialui"));
