import './globals.css'

export const metadata = {
  title: 'Airdrop-for-Starknet',
  description: 'Airdrop on Starknet network',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}</body>
    </html>
  )
}
