import { StarknetProvider } from './components/client/Starknet-provider'
import './globals.css'

export const metadata = {
  title: 'Cairo1-JS',
  description: 'Demo of Starknet.js with Cairo 1',
  icons: {
    icon: "./favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StarknetProvider>
          {children}
        </StarknetProvider>
      </body>
    </html>
  )
}
