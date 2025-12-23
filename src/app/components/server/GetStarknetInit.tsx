"use client";
import { GetStarknetProvider } from "@starknet-io/get-starknet-ui";

export default function GetStarknetInit(props: { children: React.ReactNode }) {
    const { children } = props
    return (
        <GetStarknetProvider>
            {children}
        </GetStarknetProvider>
    );
}