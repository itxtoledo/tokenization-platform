import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { parseEther } from "viem";

describe("PresaleFactory", function () {
  async function deployPresale() {
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

  describe("Presale Initialization", function () {
    it("should have 0n for the initial supply at presale intial creation", async function () {
      const { owner, presaleFactory, publicClient, token, presale } = await loadFixture(deployPresale);

      const initialSupply = 1000n;  // Define the initial supply
      const hash = await presaleFactory.write.createPresale([
        "Example",
        "EXM",
        initialSupply,
        parseEther("0.01"),
      ]);

      await publicClient.waitForTransactionReceipt({ hash });
      
      const presaleEvents = await presaleFactory.getEvents.PresaleCreated();
      await expect(presaleEvents).to.have.lengthOf(1);

      const presaleAddress = presaleEvents[0].args.presale; // Accessing the first argument, which is the presale address

      // Verify the owner of the cloned presale contract
      await hre.viem.getContractAt(
        "PresaleFactory",
        presaleAddress as `0x${string}`,
        {
          client: { wallet: owner },
        }
      );

        const publicClientBalance = await token.read.balanceOf([presale.address]);
        const ownerAddressBalance = await token.read.balanceOf([owner.account.address]);
      //debugging
      console.log('This is to see the owner address \n' + owner.account.address + '\nis it the same as 0xA0Cf798816D4b9b9866b5330EEa46a18382f251e?', publicClientBalance.toString());
      
        await expect(publicClientBalance).to.equal(0n);
        await expect(ownerAddressBalance).to.equal(0n);
    });
  });
    
    describe("Presale Initialization", function () {
    it("should have 0x0.. for the owner address at presale intial creation", async function () {
      const { owner, presaleFactory, publicClient, presale } = await loadFixture(deployPresale);

      const initialSupply = 1000n;  // Define the initial supply
      const hash = await presaleFactory.write.createPresale([
        "Example",
        "EXM",
        initialSupply,
        parseEther("0.01"),
      ]);

      await publicClient.waitForTransactionReceipt({ hash });
      
      const presaleEvents = await presaleFactory.getEvents.PresaleCreated();
      await expect(presaleEvents).to.have.lengthOf(1);

      const presaleAddress = presaleEvents[0].args.presale; // Accessing the first argument, which is the presale address

      // Verify the owner of the cloned presale contract
      await hre.viem.getContractAt(
        "PresaleFactory",
        presaleAddress as `0x${string}`,
        {
          client: { wallet: owner },
        }
      );
      
        const ownerAddress = await presale.read.owner();

        console.log('debugging ' + ownerAddress);
      
        // if the owner is not initialized then 0x0000000000000000000000000000000000000000 should be passed 
        await expect(ownerAddress.toString()).to.equal('0x0000000000000000000000000000000000000000');
    });
  });
});