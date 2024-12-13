import { StarknetProvider } from './components/client/Starknet-provider'
import './globals.css'
import { Provider } from "@/components/ui/provider"

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <StarknetProvider>
            {children}
          </StarknetProvider>
        </Provider>
      </body>
    </html>
  )
}
