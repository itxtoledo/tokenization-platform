import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Buffer } from 'buffer'
import { WagmiProvider } from 'wagmi'
import { config } from './wagmi.ts'
import * as React from "react";
import * as ReactDOM from "react-dom/client";

import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from './pages/about.tsx';
import AdminDashboard from "./pages/adminDashboard.tsx";
import FAQ from "./pages/FAQ.tsx";
import Home from "./pages/home.tsx";
import PresaleCreation from "./pages/PresaleCreation.tsx";
import PresaleDetails from "./pages/PresaleDetails.tsx";
import TokenManagement from "./pages/tokenManagement.tsx";
import UserContribution from "./pages/userContribution.tsx";

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
]);

globalThis.Buffer = Buffer

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
