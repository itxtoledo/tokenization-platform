import { http } from "wagmi";
import { bscTestnet } from "wagmi/chains";
import { connectorsForWallets, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, injectedWallet } from "@rainbow-me/rainbowkit/wallets";

export const CHAINS = [bscTestnet];

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet, injectedWallet],
    },
  ],
  {
    appName: "Tokenization Platform",
    projectId: import.meta.env.VITE_WC_PROJECT_ID,
  }
);

export const config = getDefaultConfig({
  projectId: import.meta.env.VITE_WC_PROJECT_ID,
  appName: "Tokenization Platform",
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  chains: CHAINS,
  connectors: connectors,
  transports: Object.fromEntries(CHAINS.map((chain) => [chain.id, http()])),
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
