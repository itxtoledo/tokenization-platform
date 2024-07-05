import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum, base, mainnet, optimism, polygon } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: "process.env.VITE_WC_PROJECT_ID",
  chains: [mainnet, polygon, optimism, arbitrum, base],
});

