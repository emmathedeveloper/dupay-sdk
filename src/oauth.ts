

export default class DUPayOAuth {
  
  apiKey: string;
  serverUrl: string;
  
  constructor(apiKey: string , serverUrl?: string) {
    this.apiKey = apiKey;
    this.serverUrl = serverUrl || 'https://du-pay.onrender.com/api';
  }

  async authorize(options?: { redirectUri: string }) {
    
    const url = `${this.serverUrl}/authorization/generate-oauth-url?redirectUri=${options?.redirectUri}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });
    
    if(!response.ok) throw new Error("Something went wrong")

    const { data } = await response.json() as any;
    
    return data
  }

  async getUserInfo(token: string) {
    
    const url = `${this.serverUrl}/oauth/user`;
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    
    return data;
  }
}