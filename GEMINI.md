# Gemini Project Analysis

This document provides a summary of the project's structure, technologies, and key commands, as analyzed by Gemini.

## Project Overview

This project is a monorepo for a "Tokenization Platform." It includes a decentralized application (dApp) and the underlying smart contracts.

The platform allows for the tokenization of assets, and the dApp provides a user interface for interacting with these assets on the blockchain.

## Technology Stack

The project is built using the following technologies:

- **Monorepo Management**: The project is structured as a monorepo using `pnpm` workspaces and `Turborepo` for efficient build and task management.

- **Frontend (`apps/app`)**:
  - **Framework**: React with Vite
  - **Language**: TypeScript
  - **Styling**: CSS with `shadcn/ui` components.
  - **Blockchain Interaction**: `wagmi` and `viem` for interacting with the Ethereum blockchain, and `@rainbow-me/rainbowkit` for wallet connectivity.
  - **Routing**: `@tanstack/react-router` for client-side routing.
  - **State Management**: `@tanstack/react-query` for server state management.

- **Smart Contracts (`packages/contracts`)**:
  - **Language**: Solidity
  - **Framework**: Hardhat for development, testing, and deployment.
  - **Libraries**: OpenZeppelin contracts for secure, reusable smart contract components.

## Key Commands

- **Installation**: `pnpm install`
- **Development**: `pnpm dev`
- **Build**: `pnpm build`
- **Testing**: `pnpm test`
- **Linting**: `pnpm lint`

### Frontend Commands (`apps/app`)

- **Start Development Server**: `pnpm dev`
- **Build for Production**: `pnpm build`
- **Type Checking**: `pnpm check-types`
- **Linting**: `pnpm lint`

### Smart Contract Commands (`packages/contracts`)

- **Compile Contracts**: `npx hardhat compile`
- **Run Tests**: `npx hardhat test`
- **Export ABI**: `npx hardhat export-abi`

## Directory Structure

- `apps/app`: Contains the frontend React application.
- `packages/contracts`: Contains the Solidity smart contracts, tests, and deployment scripts.
