"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IcdService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const dotenv = __importStar(require("dotenv"));
const rxjs_1 = require("rxjs");
dotenv.config();
let IcdService = class IcdService {
    constructor(httpService) {
        this.httpService = httpService;
        this.apiUrl = 'http://id.who.int/icd/entity';
        this.scope = 'icdapi_access';
        this.tokenEndpoint = 'https://icdaccessmanagement.who.int/connect/token';
        this.clientId = process.env.ICD_CLIENT_ID;
        this.clientSecret = process.env.ICD_CLIENT_SECRET;
    }
    async getToken() {
        const req = this.httpService.post(this.tokenEndpoint, `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.clientSecret}&scope=${this.scope}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const token = (await (0, rxjs_1.lastValueFrom)(req)).data.access_token;
        return token;
    }
    async getIcdSymptoms(symptom) {
        const queryUrl = this.apiUrl + '/search?q=' + symptom + '&useFlexisearch=true';
        return await this.fetchData(queryUrl);
    }
    async getIcdDiagnosisById(id) {
        const queryUrl = this.apiUrl + '/' + id;
        return await this.fetchData(queryUrl);
    }
    extractNumberFromUrl(url) {
        const regex = /(\d+)$/;
        const match = url.match(regex);
        if (match) {
            return match[1];
        }
        else {
            return null;
        }
    }
    fixName(input) {
        const emRegex = /<em class='found'>(.*?)<\/em>/g;
        const formattedText = input.replace(emRegex, (_, match) => {
            return `${match}`;
        });
        return formattedText;
    }
    async fetchData(queryUrl) {
        this.accessToken = await this.getToken();
        const headers = {
            Authorization: `Bearer ${this.accessToken}`,
            Accept: 'application/json',
            'Accept-Language': 'en',
            'API-Version': 'v2',
        };
        const req = this.httpService.get(queryUrl, { headers });
        const data = await (0, rxjs_1.lastValueFrom)(req);
        const response = data.data.destinationEntities.map((e) => {
            return {
                id: this.extractNumberFromUrl(e.stemId),
                name: this.fixName(e.title),
                leaf: e.isLeaf,
            };
        });
        return response.filter((item) => item.leaf === true);
    }
};
exports.IcdService = IcdService;
exports.IcdService = IcdService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], IcdService);
//# sourceMappingURL=icd.service.js.map