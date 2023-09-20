import { HttpService } from '@nestjs/axios';
export declare class GptService {
    private readonly httpService;
    private readonly apiKey;
    private readonly apiUrl;
    constructor(httpService: HttpService);
    getModels(): Promise<any>;
    analyzeSymptoms(prompt: string): Promise<any>;
}
