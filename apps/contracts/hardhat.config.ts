import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.26",
    settings: {
      // https://hardhat.org/hardhat-runner/docs/reference/solidity-support#support-for-ir-based-codegen
      viaIR: false, // change to true after hardhat update
    }
  },
};

export default config;
