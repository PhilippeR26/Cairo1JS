import type { StarknetWindowObject as SNWO } from "get-starknet-core";
type StarknetWindowObject = typeof SNWO;

export function scanObjectForWallets(
  obj: Record<string, any>,
  isWalletObject: (wallet: any) => boolean,
): StarknetWindowObject[] {
  return Object.values(
    Object.getOwnPropertyNames(obj).reduce<
      Record<string, StarknetWindowObject>
    >((wallets, key) => {
      if (key.startsWith("starknet")) {
        const wallet = obj[key]

        if (isWalletObject(wallet) && !wallets[wallet.id]) {
          wallets[wallet.id] = wallet
        }
      }
      return wallets
    }, {}),
  )
}

export const isWalletObj = (wallet: any): boolean => {
  try {
    return (
      wallet &&
      [
        // wallet's must have methods/members, see IStarknetWindowObject
        "request",
        "on",
        "off",
        "version",
        "id",
        "name",
        "icon",
      ].every((key) => key in wallet)
    )
  } catch (err) { }
  return false
}
