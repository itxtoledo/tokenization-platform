import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Buffer } from 'buffer'
import { WagmiProvider } from 'wagmi'
import { config } from './wagmi.ts'
import * as React from "react";
import * as ReactDOM from "react-dom/client";

import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from './pages/about.tsx';
import Home from './pages/home.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/",
    element: <About />,
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
