"use client";

import { useStoreWallet } from './walletContext';

import { Button } from "@chakra-ui/react";

import { Account, encode, Provider, RpcProvider, constants as SNconstants } from "starknet";
import SelectWallet from './SelectWallet';


export default function ConnectWallet() {
    // const addressAccount = useStoreWallet(state => state.addressAccount);
    // const wallet = useStoreWallet(state => state.wallet);
    const setSelectWalletUI = useStoreWallet(state => state.setSelectWalletUI);
    const displaySelectWalletUI = useStoreWallet(state => state.displaySelectWalletUI);



    // const handleConnectClick = async () => {
    //     const getWallet = await connect({ modalMode: "alwaysAsk", modalTheme: "light" });
    //     await getWallet?.enable({ starknetVersion: "v5" } as any);
    //     useStoreWallet.setState({ wallet: getWallet });
    //     useStoreWallet.setState({ providerW: getWallet?.provider });
    //     const addr = encode.addHexPrefix(encode.removeHexPrefix(getWallet?.selectedAddress ?? "0x").padStart(64, "0"));
    //     useStoreWallet.setState({ addressAccount: addr });
    //     useStoreWallet.setState({ isConnected: getWallet?.isConnected });
    //     if (getWallet?.account) {
    //         useStoreWallet.setState({ accountW: getWallet.account });
    //         !!(getWallet.chainId) ?
    //             useStoreWallet.setState({ chainId: getWallet.chainId }) :
    //             useStoreWallet.setState({ chainId: SNconstants.StarknetChainId.SN_SEPOLIA });
    //     }
    //     console.log("myProvider url =",process.env.NEXT_PUBLIC_PROVIDER_URL);

    //     console.log("handleClick =",useStoreWallet.getState().isConnected);
    // }
    return (
        <>
            <Button
                ml="4"
                textDecoration="none !important"
                outline="none !important"
                boxShadow="none !important"
                onClick={() => setSelectWalletUI(true)}
            >
                Connect Wallet
            </Button>
            {displaySelectWalletUI && <SelectWallet></SelectWallet>}
        </>
    )
}
