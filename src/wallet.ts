
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
}

export default class DUPayWallet {
  
  apiKey: string;
  serverUrl: string;
  
  constructor(apiKey: string , serverUrl?: string) {
    this.apiKey = apiKey;
    this.serverUrl = serverUrl || 'https://du-pay.onrender.com/api';
  }

  async getWalletInfo(userId: string) {
    
    const url = `${this.serverUrl}/wallet/${userId}`;
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    
    if(!response.ok) throw new Error("Something went wrong")
    
    const {data} = await response.json() as any;
    
    return data;
  }
  
  async initiateTransfer(payload: TransferPayload) : Promise<TransferResponse> {
    
    const url = `${this.serverUrl}/integration/wallet/transfer`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if(!response.ok) throw new Error("Something went wrong")
    
    const {data} = await response.json() as any;
    
    return data as TransferResponse;
  }
}
