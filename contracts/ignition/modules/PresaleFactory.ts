import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PresaleFactoryModule = buildModule("PresaleFactoryModule", (m) => {
  const token = m.contract("MintableERC20");
  const presale = m.contract("Presale");

  const presaleFactory = m.contract("PresaleFactory", [presale, token]);

  return { presaleFactory };
});

export default PresaleFactoryModule;
