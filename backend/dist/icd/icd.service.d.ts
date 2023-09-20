import { HttpService } from '@nestjs/axios';
export declare class IcdService {
    private readonly httpService;
    private readonly apiUrl;
    private readonly scope;
    private readonly tokenEndpoint;
    private readonly clientId;
    private readonly clientSecret;
    private accessToken;
    constructor(httpService: HttpService);
    getToken(): Promise<string>;
    getIcdSymptoms(symptom: string): Promise<any>;
    getIcdDiagnosisById(id: string): Promise<any>;
    private extractNumberFromUrl;
    private fixName;
    fetchData(queryUrl: string): Promise<any>;
}
