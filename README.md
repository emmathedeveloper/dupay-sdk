---

# @emmathedeveloper/dupay-sdk

An official JavaScript/TypeScript SDK for integrating **DuPay OAuth authentication** and **wallet services** into your application.

This SDK provides simple, fetch-based wrappers around DuPay’s API and works in **Node.js, Bun, browsers, and modern runtimes**.

---

## ✨ Features

* 🔐 OAuth authorization flow
* 👤 Fetch authenticated user info
* 💼 Retrieve user wallet details
* 📦 Lightweight & dependency-free
* 🧩 TypeScript-friendly
* 🌍 Works with Node, Bun, Nitro, Cloudflare, etc.

---

## 📦 Installation

```bash
npm install @emmathedeveloper/dupay-sdk
```

or

```bash
bun add @emmathedeveloper/dupay-sdk
```

---

## 🚀 Quick Start

```ts
import { DUPayOAuth, DUPayWallet } from "@emmathedeveloper/dupay-sdk";

const apiKey = process.env.DUPAY_API_KEY!;
```

---

## 🔐 OAuth Authentication

### Generate Authorization URL

Use this to redirect users to DuPay for authentication.

```ts
const oauth = new DUPayOAuth(apiKey);

const authUrl = await oauth.authorize({
  redirectUri: "https://yourapp.com/oauth/callback",
});

console.log(authUrl);
```

➡️ Redirect the user to the returned URL.

---

### Get Authenticated User Info

After OAuth completes, DUPay will provide an access token. Use it to fetch user details.

```ts
const user = await oauth.getUserInfo(accessToken);

console.log(user);
```

---

## 💼 Wallet API

### Get User Wallet Info

```ts
const wallet = new DUPayWallet(apiKey);

const walletInfo = await wallet.getWalletInfo(userId);

console.log(walletInfo);
```

---

## ⚙️ Configuration

Both `DUPayOAuth` and `DUPayWallet` accept the same constructor arguments:

```ts
new DUPayOAuth(apiKey, serverUrl?);
new DUPayWallet(apiKey, serverUrl?);
```

### Parameters

| Name        | Required | Description                                 |
| ----------- | -------- | ------------------------------------------- |
| `apiKey`    | ✅ Yes    | Your DuPay API key                          |
| `serverUrl` | ❌ No     | Custom API base URL (defaults to DuPay API) |

**Default API URL:**

```
https://du-pay.onrender.com/api
```

---

## 🛡 Error Handling

Non-successful requests will throw an error:

```ts
try {
  await oauth.authorize({ redirectUri });
} catch (err) {
  console.error("DuPay error:", err);
}
```

---

## 🌐 Runtime Support

* ✅ Node.js 18+
* ✅ Bun
* ✅ Browsers
* ✅ Nitro / H3
* ✅ Cloudflare Workers (fetch-based)

> ⚠️ Ensure `fetch` is available or polyfilled in older Node versions.

---

## 📄 License

MIT © Emmanuel Evberin

---

## 🔗 Links

* npm: [https://www.npmjs.com/package/@emmathedeveloper/dupay-sdk](https://www.npmjs.com/package/@emmathedeveloper/dupay-sdk)
* GitHub: [https://github.com/emmathedeveloper2](https://github.com/emmathedeveloper)

---

## 🛠 Roadmap

* [ ] Token refresh support
* [ ] Wallet funding & transfers
* [ ] Webhook verification helpers
* [ ] Typed API responses

---
