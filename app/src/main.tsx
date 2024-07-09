import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Buffer } from 'buffer'
import { WagmiProvider } from 'wagmi'
import { config } from './wagmi.ts'
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "@rainbow-me/rainbowkit/styles.css";

import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/about.tsx";
import AdminDashboard from "./pages/adminDashboard.tsx";
import FAQ from "./pages/FAQ.tsx";
import Home from "./pages/home.tsx";
import PresaleCreation from "./pages/presaleCreation.tsx";
import PresaleDetails from "./pages/presaleDetails.tsx";
import TokenManagement from "./pages/tokenManagement.tsx";
import UserContribution from "./pages/userContribution.tsx";
import {
  RainbowKitProvider,
  DisclaimerComponent,
} from "@rainbow-me/rainbowkit";
import Disclainer from "./pages/Disclaimer.tsx";

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{" "}
    <Link href="/Disclaimer">Terms of Service</Link> and acknowledge you have
    read and understand the protocol <Link href="/Disclaimer">Disclaimer</Link>
  </Text>
);

const router = createBrowserRouter([
  {
    path: "/AdminDashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/FAQ",
    element: <FAQ />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/PresaleCreation",
    element: <PresaleCreation />,
  },
  {
    path: "/PresaleDetails",
    element: <PresaleDetails />,
  },
  {
    path: "/TokenManagement",
    element: <TokenManagement />,
  },
  {
    path: "/UserContribution",
    element: <UserContribution />,
  },
  {
    path: "/Disclaimer",
    element: <Disclainer />,
  },
]);

globalThis.Buffer = Buffer

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          showRecentTransactions={true}
          appInfo={{
            appName: "RainbowKit Demo",
            disclaimer: Disclaimer,
          }}
          coolMode
        >
          <RouterProvider router={router} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
