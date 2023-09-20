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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GptService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const dotenv = __importStar(require("dotenv"));
const openai_1 = __importDefault(require("openai"));
dotenv.config();
let GptService = class GptService {
    constructor(httpService) {
        this.httpService = httpService;
        this.apiKey = process.env.OPENAI_API_KEY;
        this.apiUrl = 'https://api.openai.com/v1/chat/completions';
    }
    async getModels() {
        try {
            const openai = new openai_1.default({ apiKey: this.apiKey });
            const list = await openai.models.list();
            const models = list.data;
            for await (const model of list) {
                console.log(model);
            }
            return models;
        }
        catch (error) {
            console.log('Error: ', error);
        }
    }
    async analyzeSymptoms(prompt) {
        try {
            const openai = new openai_1.default({ apiKey: this.apiKey });
            const response = await openai.chat.completions.create({
                model: 'gpt-4',
                temperature: 0.0,
                messages: [
                    {
                        role: 'system',
                        content: 'Analyze the list of symptoms provided by the user and return only a JSON structured as [{disease: string, chance: number}], where the chance value should be a decimal between 0 and 1, rounded to two decimal places (e.g., 0.32), not using multiples of 5 or 0. Do not provide any additional text or explanations. Handle insufficient, invalid, or repeated symptoms appropriately within the JSON format. Begin analysis immediately after receiving user input.',
                    },
                    { role: 'user', content: prompt },
                ],
            });
            const responseList = response.choices[0].message.content;
            const responseJson = JSON.parse(responseList);
            return responseJson;
        }
        catch (error) {
            console.log('Error: ', error);
        }
    }
};
exports.GptService = GptService;
exports.GptService = GptService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], GptService);
//# sourceMappingURL=gpt.service.js.map