"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenfdaController = void 0;
const common_1 = require("@nestjs/common");
const openfda_service_1 = require("./openfda.service");
let OpenfdaController = class OpenfdaController {
    constructor(openfdaService) {
        this.openfdaService = openfdaService;
    }
    async fetchData(endpoint) {
        return await this.openfdaService.fetchData(endpoint);
    }
    async searchDrug(name) {
        return await this.openfdaService.fetchDrugByPartialName(name);
    }
};
exports.OpenfdaController = OpenfdaController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('endpoint')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OpenfdaController.prototype, "fetchData", null);
__decorate([
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OpenfdaController.prototype, "searchDrug", null);
exports.OpenfdaController = OpenfdaController = __decorate([
    (0, common_1.Controller)('openfda'),
    __metadata("design:paramtypes", [openfda_service_1.OpenfdaService])
], OpenfdaController);
//# sourceMappingURL=openfda.controller.js.map