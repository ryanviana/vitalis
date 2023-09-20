import { IcdService } from './icd.service';
export declare class IcdController {
    private readonly icdService;
    constructor(icdService: IcdService);
    getSymptomList(prompt: string): Promise<any>;
}
