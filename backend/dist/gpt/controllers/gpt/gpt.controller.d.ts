import { GptService } from 'src/gpt/services/gpt/gpt.service';
export declare class OpenaiController {
    private readonly gptService;
    constructor(gptService: GptService);
    createChatCompletion(prompt: string): Promise<any>;
    getModels(): Promise<any>;
}
