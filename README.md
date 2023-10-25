# Cairo1JS

## Presentation

This small project demonstrates how to create a DAPP to interact with the Starknet blockchain.  
You can interact easily with Cairo 1 smart-contract, using your Argent-X or Braavos wallets (installed in your browser).  

Analyze the code to see how to create a such DAPP (start [here](src/app/page.tsx))  

The DAPP is made in the next.js framework, using the experimental **appDir** feature. Coded in Typescript. Using React, Zustand context & Chaka-ui components.

As the get-starknet.js library isn't today compatible with starknet.js V5, a temporary solution is implemented in this project, with the get-wallet-starknet.js library. To use only for development purpose.  
🚨 🚨 🚨 Do not use this lib to handle accounts containing valuable tokens 🚨 🚨 🚨.

## Getting Started 🚀

First, run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.  
<kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>I</kbd> to see debug informations.  
In `src/app/(site)/components/server/VisualWrapper.tsx`, you can set `DEBUG` to `true` to visualize which component are server rendered (RSC).

## Deploy on Vercel 🎊

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

> You can test this DAPP ; it's already deployed at [https://cairo1-js.vercel.app/](https://cairo1-js.vercel.app/).
