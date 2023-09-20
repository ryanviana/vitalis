"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenfdaService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let OpenfdaService = class OpenfdaService {
    async fetchDrugByPartialName(query) {
        try {
            const response = await axios_1.default.get(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:${query}&limit=10`);
            return response.data.results.map((result) => result.openfda);
        }
        catch (error) {
            throw new common_1.HttpException('Error fetching data from OpenFDA', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async fetchData(endpoint) {
        try {
            const response = await axios_1.default.get(`https://api.fda.gov/${endpoint}`);
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Error fetching data from OpenFDA', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.OpenfdaService = OpenfdaService;
exports.OpenfdaService = OpenfdaService = __decorate([
    (0, common_1.Injectable)()
], OpenfdaService);
//# sourceMappingURL=openfda.service.js.map