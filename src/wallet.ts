

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
    
    const data = await response.json();
    
    return data;
  }
}
