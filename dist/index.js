// src/oauth.ts
var DUPayOAuth = class {
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
        "Authorization": `Bearer ${this.apiKey}`
      }
    });
    if (!response.ok) throw new Error("Something went wrong");
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
    if (!response.ok) throw new Error("Something went wrong");
    const { data } = await response.json();
    return data;
  }
};

// src/wallet.ts
var DUPayWallet = class {
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
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    const { success, message, data } = result;
    if (!success) throw new Error(message);
    return data;
  }
  async initiateTransfer(payload) {
    const url = `${this.serverUrl}/integration/wallet/transfer`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    const { success, message, data } = result;
    if (!success) throw new Error(message);
    return data;
  }
};
export {
  DUPayOAuth,
  DUPayWallet
};
