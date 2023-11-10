"use client";

import { useStoreWallet } from './walletContext';
import {useStoreServer} from "../provider/serverContext";

import { Button } from "@chakra-ui/react";
import { StarknetWindowObject, connect } from "get-starknet";
import { Account, encode, Provider, ProviderInterface, RpcProvider, SignerInterface, constants as SNconstants } from "starknet";
import { ServerProviderNextJS } from '@/app/(site)/Classes/ServerProvider/ServerProvider';
import { ServerSignerNextJS } from '@/app/(site)/Classes/ServerSigner/ServerSigner';


export default function ConnectWallet() {
    // const addressAccount = useStoreWallet(state => state.addressAccount);
    // const wallet = useStoreWallet(state => state.wallet);


    // Server
    //const setProvider = useStoreBackend(state => state.setProviderBackend);

    const handleConnectClick = async () => {
        const getWallet = await connect({ modalMode: "alwaysAsk", modalTheme: "light" });
        await getWallet?.enable({ starknetVersion: "v5" } as any);
        useStoreWallet.setState({ wallet: getWallet });
        // useStoreWallet.setState({ providerW: getWallet?.provider });
        const addr = encode.addHexPrefix(encode.removeHexPrefix(getWallet?.selectedAddress ?? "0x").padStart(64, "0"));
        useStoreWallet.setState({ addressAccount: addr });
        useStoreWallet.setState({ isConnected: getWallet?.isConnected });
        useStoreServer.setState({providerServer:new ServerProviderNextJS});
        if (getWallet?.account) {
            useStoreWallet.setState({ accountW: getWallet.account });
            !!(getWallet.chainId) ?
                useStoreWallet.setState({ chainId: getWallet.chainId }) :
                useStoreWallet.setState({ chainId: SNconstants.StarknetChainId.SN_GOERLI });
            // const backEndProvider = await providerBackend();
            // setProvider(backEndProvider);
            // const backEndAccount: Account = await initAccountBackend(addressAccount);
        }
        useStoreServer.setState({providerServer:new ServerProviderNextJS});
        useStoreServer.setState({signer0S: new ServerSignerNextJS(0)});
        useStoreServer.setState({signer1S: new ServerSignerNextJS(1)});
        useStoreServer.setState({account0S: new Account(useStoreServer.getState().providerServer as ProviderInterface, "0x045f825D68f5253A546f3E20392cA7159a9B1CABb49EC4285098901a2714d5a4",useStoreServer.getState().signer0S as SignerInterface)});
        useStoreServer.setState({account1S: new Account(useStoreServer.getState().providerServer as ProviderInterface, "0x0777A7de39b5E3cB37343890dd9880a8Db7692e94E0725F40e191Da48a7e23e5",useStoreServer.getState().signer1S as SignerInterface)});

        console.log("handleClick =",useStoreWallet.getState().isConnected);
    }
    return (
        <Button
            ml="4"
            textDecoration="none !important"
            outline="none !important"
            boxShadow="none !important"
            onClick={() => {
                handleConnectClick();
            }}
        >
            Connect Wallet
        </Button>
    )
}
