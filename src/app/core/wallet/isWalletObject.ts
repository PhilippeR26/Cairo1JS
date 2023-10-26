export const isWalletObj = (wallet: any): boolean => {
  try {
    return (
      wallet &&
      [
        // wallet's must have methods/members, see IStarknetWindowObject
        "request",
        "isConnected",
        "isPreauthorized",
        "on",
        "off",
        "provider",
        "version",
        "id",
        "name",
        "icon",
      ].every((key) => key in wallet)
    )
  } catch (err) {}
  return false
}
