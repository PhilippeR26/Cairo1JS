# Cairo1JS

## Presentation

This small project demonstrates how to create a DAPP to interact with the Starknet blockchain.  
You can interact easily with Cairo 1 smart-contract, using your Argent-X or Braavos wallets (installed in your browser).  

Analyze the code to see how to create a such DAPP (start [here](src/app/page.tsx))  

The DAPP is made in the next.js framework, using the experimental **appDir** feature. Coded in Typescript. Using React, Zustand context & Chaka-ui components.

## Getting Started 🚀

First, create a `.env.local` file in the root, including your configuration :
```bash
PROVIDER_URL = "https://json-rpc.starknet-testnet.xxx"
ACCOUNT_PRIV_KEY = "0x123"
```

Then, run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.  

## Deploy on Vercel 🎊

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

> You can test this DAPP ; it's already deployed at [https://cairo1-js.vercel.app/](https://cairo1-js.vercel.app/).

If you fork this repo, you need a Vercel account, and you have to configure your own environment variables for the Server side :  
![](./Images/vercelEnv.png)
