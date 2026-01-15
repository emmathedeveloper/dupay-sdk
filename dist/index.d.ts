declare class DUPayOAuth {
    apiKey: string;
    serverUrl: string;
    constructor(apiKey: string, serverUrl?: string);
    authorize(options?: {
        redirectUri: string;
    }): Promise<string>;
    getUserInfo(token: string): Promise<any>;
}

type TransferPayload = {
    from: string;
    to: string;
    amount: number;
    narration?: string;
    pin: string;
};
type TransferResponse = {
    id: number;
    type: "credit" | "debit";
    createdAt: Date;
    updatedAt: Date;
    amount: number;
    walletId: number;
    description: string | null;
    senderId: number;
    receiverId: number;
};
declare class DUPayWallet {
    apiKey: string;
    serverUrl: string;
    constructor(apiKey: string, serverUrl?: string);
    getWalletInfo(userId: string): Promise<any>;
    initiateTransfer(payload: TransferPayload): Promise<TransferResponse>;
}

export { DUPayOAuth, DUPayWallet };
