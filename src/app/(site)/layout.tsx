import { Provider } from "@/components/ui/provider"
import './globals.css'

export const metadata = {
  title: 'Cairo1-JS',
  description: 'Demo of Starknet.js with Cairo 1',
  icons: {
    icon: "./favicon.ico",
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
