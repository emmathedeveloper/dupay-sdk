export default class DUPayWallet {
    apiKey: string;
    serverUrl: string;
    constructor(apiKey: string, serverUrl?: string);
    getWalletInfo(userId: string): Promise<unknown>;
}
