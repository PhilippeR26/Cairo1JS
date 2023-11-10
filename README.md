# Cairo1JS

## Presentation

This small project demonstrates how to create a DAPP to interact with the Starknet blockchain. 

> This branch has been created to test an architecture where all activities that needs your node API key are executed in the server. By this way, this key is never exposed to the front-end.   
> Accounts private keys are either in the server, or in the browser wallet, but are never exposed in the front-end. 
> This architecture is based on the Server Actions of Next.JS.

You can interact easily with Cairo 1 smart-contract, using your Argent-X or Braavos wallets (installed in your browser).  

Analyze the code to see how to create a such DAPP (start [here](src/app/page.tsx))  

The DAPP is made in the next.js framework. Coded in Typescript. Using Starknet.js, React, Zustand context & Chaka-ui components.

## Getting Started 🚀

First, create a `.env.local` file in the root, including your configuration :
```bash
PROVIDER_URL = "https://json-rpc.starknet-testnet.xxx"
ACCOUNT_PRIV_KEY0 = "0x123"
ACCOUNT_PRIV_KEY1 = "0xabc"
```

Then, run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.  
<kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>I</kbd> to see debug informations.  

## Deploy on Vercel 🎊

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

> You can test this DAPP ; it's already deployed [here](https://cairo1-js-git-servercomponents-philipper26.vercel.app/).
