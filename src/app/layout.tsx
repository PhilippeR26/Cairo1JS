
import { Provider as ChakraProvider } from "@/components/ui/provider";
import './globals.css';
import type { Metadata } from "next";
import GetStarknetInit from "./components/server/GetStarknetInit";

export const metadata: Metadata = {
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
        <GetStarknetInit>
          <ChakraProvider>
            {children}
          </ChakraProvider>
        </GetStarknetInit>
      </body>
    </html>
  )
}
