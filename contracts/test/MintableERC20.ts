import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { parseEther } from "viem";

describe("PresaleFactory", function () {
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

  // describe("createPresale", function () {
  //   it("should create a presale contract successfully and verify presale address does not equal cloned presale address", async function () {
  //     const { presaleFactory, presale, publicClient, otherAccount } = await loadFixture(deployMintableERC20);

  //     const hash = await presaleFactory.write.createPresale([
  //       "Example",
  //       "EXM",
  //       1000n,
  //       parseEther("0.01"),
  //     ]);

  //     await publicClient.waitForTransactionReceipt({ hash });
      
  //     const presaleEvents = await presaleFactory.getEvents.PresaleCreated();
  //     await expect(presaleEvents).to.have.lengthOf(1);

  //     const presaleAddress = presaleEvents[0].args.presale; // Accessing the first argument, which is the presale address

  //     // Verify the owner of the cloned presale contract
  //     const clonedPresale = await hre.viem.getContractAt(
  //       "Presale",
  //       presaleAddress as `0x${string}`,
  //       {
  //         client: { wallet: otherAccount },
  //       }
  //     );

  //     const presaleContract = await presale.address.toString();

  //     const presaleOwner = await clonedPresale.address.toString();

  //     await expect(presaleOwner.toLowerCase()).to.not.equal(presaleContract.toLowerCase());
  //   });
  // });

// describe("MintableERC20", function () {
//   it("Should assign the initial supply to the owner", async function () {
//     const { owner, presaleFactory, publicClient, token } = await loadFixture(deployMintableERC20);

//     const initialSupply = 1000n;  // Define the initial supply
//     const hash = await presaleFactory.write.createPresale([
//       "Example",
//       "EXM",
//       initialSupply,
//       parseEther("0.01"),
//     ]);

//     await publicClient.waitForTransactionReceipt({ hash });
    
//     const presaleEvents = await presaleFactory.getEvents.PresaleCreated();
//     await expect(presaleEvents).to.have.lengthOf(1);

//     const presaleAddress = presaleEvents[0].args.presale; // Accessing the first argument, which is the presale address

//     // Verify the owner of the cloned presale contract
//     await hre.viem.getContractAt(
//       "PresaleFactory",
//       presaleAddress as `0x${string}`,
//       {
//         client: { wallet: owner },
//       }
//     );
    
//     const publicClientBalance = await publicClient.
//     console.log('This is to see the owner address \n ' + owner.account.address + '\nis it the same as 0xA0Cf798816D4b9b9866b5330EEa46a18382f251e');
    
//     await expect(publicClientBalance).to.equal(0.000000000000000000);
//   });
// });


  describe("MintableERC20 Initialization", function () {
    it("should create a presale with an empty token name", async function () {
      const { token, presaleFactory, owner, publicClient } = await loadFixture(deployMintableERC20);
      const hash = await presaleFactory.write.createPresale([
        "Example",
        "EXM",
        1000n,
        parseEther("0.01"),
      ]);

      await publicClient.waitForTransactionReceipt({ hash });
      
      const presaleEvents = await presaleFactory.getEvents.PresaleCreated();
      await expect(presaleEvents).to.have.lengthOf(1);

      const factoryAddress = presaleEvents[0].args.presale; // Accessing the first argument, which is the presale address

      // Verify the owner of the cloned presale contract
      await hre.viem.getContractAt(
        "PresaleFactory",
        factoryAddress as `0x${string}`,
        {
          client: { wallet: owner },
        }
      );

      const name = await token.read.name();

      await expect(name).to.equal("");
    });
  });

  describe("MintableERC20 Initialization", function () {
    it("should create a presale with a token having 18 decimals", async function () {
      const { token, presaleFactory, owner, publicClient } = await loadFixture(deployMintableERC20);
      const hash = await presaleFactory.write.createPresale([
        "Example",
        "EXM",
        1000n,
        parseEther("0.01"),
      ]);

      await publicClient.waitForTransactionReceipt({ hash });
      
      const presaleEvents = await presaleFactory.getEvents.PresaleCreated();
      await expect(presaleEvents).to.have.lengthOf(1);

      const factoryAddress = presaleEvents[0].args.presale; // Accessing the first argument, which is the presale address

      // Verify the owner of the cloned presale contract
      await hre.viem.getContractAt(
        "PresaleFactory",
        factoryAddress as `0x${string}`,
        {
          client: { wallet: owner },
        }
      );

      const decimals = await token.read.decimals();

      await expect(decimals).to.equal(18);
    });
  });

  describe("MintableERC20 Initialization", function () {
    it("should create a presale with a token having an empty symbol", async function () {
      const { token, presaleFactory, owner, publicClient } = await loadFixture(deployMintableERC20);
      const hash = await presaleFactory.write.createPresale([
        "Example",
        "EXM",
        1000n,
        parseEther("0.01"),
      ]);

      await publicClient.waitForTransactionReceipt({ hash });
      
      const presaleEvents = await presaleFactory.getEvents.PresaleCreated();
      await expect(presaleEvents).to.have.lengthOf(1);

      const factoryAddress = presaleEvents[0].args.presale; // Accessing the first argument, which is the presale address

      // Verify the owner of the cloned presale contract
      await hre.viem.getContractAt(
        "PresaleFactory",
        factoryAddress as `0x${string}`,
        {
          client: { wallet: owner },
        }
      );

      const symbol = await token.read.symbol();

      await expect(symbol).to.equal("");
    });
  });

  // describe("Initialization", function () {
  //   it("Should have 0 balance", async function () {
  //     const { token, owner, presale } = await loadFixture(deployMintableERC20);

  //     const ownerAddress = presale.address.toString();

  //     const balance = await token.read.balanceOf(ownerAddress);

  //     await expect(balance).to.equal(0);
  //   });
  // });
  });