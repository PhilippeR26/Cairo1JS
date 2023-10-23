export interface WatchAssetParameters {
    type: "ERC20" // The asset's interface, e.g. 'ERC20'
    options: {
        address: string // The hexadecimal StarkNet address of the token contract
        symbol?: string // A ticker symbol or shorthand, up to 5 alphanumerical characters
        decimals?: number // The number of asset decimals
        image?: string // A string url of the token logo
        name?: string // The name of the token - not in spec
    }
}

export interface SwitchStarknetChainParameter {
    chainId: string // A 0x-prefixed hexadecimal string
}

export interface AddStarknetChainParameters {
    id: string
    chainId: string // A 0x-prefixed hexadecimal string
    chainName: string
    baseUrl: string
    rpcUrls?: string[]
    blockExplorerUrls?: string[]

    nativeCurrency?: {
        address: string // Not part of the standard, but required by StarkNet as it can work with any ERC20 token as the fee token
        name: string
        symbol: string // 2-6 characters long
        decimals: number
    } // Currently ignored.
    iconUrls?: string[] // Currently ignored.
}