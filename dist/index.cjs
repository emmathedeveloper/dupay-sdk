"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  DUPayOAuth: () => DUPayOAuth,
  DUPayWallet: () => DUPayWallet
});
module.exports = __toCommonJS(index_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DUPayOAuth,
  DUPayWallet
});
