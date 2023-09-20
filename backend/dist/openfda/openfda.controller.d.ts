import { OpenfdaService } from './openfda.service';
export declare class OpenfdaController {
    private readonly openfdaService;
    constructor(openfdaService: OpenfdaService);
    fetchData(endpoint: string): Promise<any>;
    searchDrug(name: string): Promise<any>;
}
