export default class DUPayOAuth {
    apiKey: string;
    serverUrl: string;
    constructor(apiKey: string, serverUrl?: string);
    authorize(options?: {
        redirectUri: string;
    }): Promise<string>;
    getUserInfo(token: string): Promise<any>;
}
