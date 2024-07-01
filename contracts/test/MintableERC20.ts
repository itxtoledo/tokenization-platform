import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { parseEther } from "viem";

describe("MintableERC20", function() {
  async function deployMintableERC20() {
    const presale = await hre.viem.deployContract("Presale");
    const token = await hre.viem.deployContract("MintableERC20");

    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const presaleFactory = await hre.viem.deployContract("PresaleFactory", [
      presale.address,
      token.address,
    ]);

    const publicClient = await hre.viem.getPublicClient();

    return {
      presaleFactory,
      presale,
      token,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe("initialize", function() {
    it("Should have the correct initial supply", async function() {
      const { token, owner } = await loadFixture(deployMintableERC20);

      const initialSupply = parseEther("10");

      await token.write.initialize([
        owner.account.address,
        "TestToken",
        "TKN",
        initialSupply,
      ]);

      const actualInitialSupply = await token.read.totalSupply();

      await expect(actualInitialSupply.toString()).to.equal(
        initialSupply.toString()
      );
    });
  });

  // describe("MintableERC20", function() {
  //   it("Should set the correct owner", async function() {
  //     //for some reasons I have mismatch in addresses here!
  //     const { token, owner } = await loadFixture(deployMintableERC20);

  //     //debuging
  //     console.log(
  //       "addresses, owner:" +
  //         owner.account +
  //         " owner.account.address " +
  //         owner.account.address
  //     );
  //     //I am recieving [object object] I think because I am not identifying the owner correctly

  //     const contractOwnerAddress = await token.read.owner(); //another error I get here is that this is not calldata !

  //     // Compare the contract owner's address with the expected owner's address
  //     expect(contractOwnerAddress).to.equal(owner.account.address);
  //   });
  // });

  // describe("MintableERC20", function() {
  //   it("Should assign the initial supply to the owner", async function() {
  //     const { token, owner } = await loadFixture(deployMintableERC20);

  //     // Define the initial supply to mint to the owner
  //     const initialSupply = parseEther("100");

  //     // Mint the initial supply to the owner's address
  //     await token.write.mint(owner.account.address, initialSupply);

  //     //why it is not accepting owner.account.address?
  //     // Fetch the owner's balance
  //     const ownerBalance = await token.read.balanceOf(owner.account.address);

  //     // Assert that the owner's balance equals the initial supply
  //     expect(ownerBalance.toString()).to.equal(initialSupply.toString());
  //   });
  // });
});
