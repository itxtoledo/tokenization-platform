import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Buffer } from "buffer";
import { WagmiProvider } from "wagmi";
import { config } from "./wagmi.ts";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "@rainbow-me/rainbowkit/styles.css";

import "./index.css";

import {
  RainbowKitProvider,
  DisclaimerComponent,
} from "@rainbow-me/rainbowkit";
import Routes from "./Routes.tsx";

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{" "}
    <Link href="/Disclaimer">Terms of Service</Link> and acknowledge you have
    read and understand the protocol <Link href="/Disclaimer">Disclaimer</Link>
  </Text>
);

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          // showRecentTransactions={true}
          appInfo={{
            appName: "Tokenization Platform",
            disclaimer: Disclaimer,
          }}
          // coolMode
        >
          <Routes />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
