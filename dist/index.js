// src/oauth.ts
class DUPayOAuth {
  apiKey;
  serverUrl;
  constructor(apiKey, serverUrl) {
    this.apiKey = apiKey;
    this.serverUrl = serverUrl || "https://du-pay.onrender.com/api";
  }
  async authorize(options) {
    const url = `${this.serverUrl}/authorization/generate-oauth-url?redirectUri=${options?.redirectUri}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`
      }
    });
    if (!response.ok)
      throw new Error("Something went wrong");
    const { data } = await response.json();
    return data;
  }
  async getUserInfo(token) {
    const url = `${this.serverUrl}/oauth/user`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const { data } = await response.json();
    return data;
  }
}

// src/wallet.ts
class DUPayWallet {
  apiKey;
  serverUrl;
  constructor(apiKey, serverUrl) {
    this.apiKey = apiKey;
    this.serverUrl = serverUrl || "https://du-pay.onrender.com/api";
  }
  async getWalletInfo(userId) {
    const url = `${this.serverUrl}/wallet/${userId}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`
      }
    });
    const data = await response.json();
    return data;
  }
}
export {
  DUPayWallet,
  DUPayOAuth
};
