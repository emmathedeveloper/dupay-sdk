export type TransferPayload = {
    from: string;
    to: string;
    amount: number;
    narration?: string;
    pin: string;
};
export type TransferResponse = {
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
export default class DUPayWallet {
    apiKey: string;
    serverUrl: string;
    constructor(apiKey: string, serverUrl?: string);
    getWalletInfo(userId: string): Promise<any>;
    initiateTransfer(payload: TransferPayload): Promise<TransferResponse>;
}
