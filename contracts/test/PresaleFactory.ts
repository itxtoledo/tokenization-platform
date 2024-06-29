import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { parseEther } from "viem";

describe("PresaleFactory and MintableERC20", function () {
  async function deployFactory() {
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
      token,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe("Sales", function () {
    describe("Could buy tokens at presale", function () {
      it("Shoud buy tokens", async function () {
        const { presaleFactory, publicClient, otherAccount } =
          await loadFixture(deployFactory);

        const hash = await presaleFactory.write.createPresale([
          "Example",
          "EXM",
          1000n,
          parseEther("0.01"),
        ]);

        await publicClient.waitForTransactionReceipt({ hash });

        const presaleEvents = await presaleFactory.getEvents.PresaleCreated();
        expect(presaleEvents).to.have.lengthOf(1);

        const presaleAddress = presaleEvents[0].args.presale;

        const presale = await hre.viem.getContractAt(
          "Presale",
          presaleAddress as `0x${string}`,
          {
            client: { wallet: otherAccount },
          }
        );

        const AMOUNT_TO_BUY = 1n;

        const contributionHash = await presale.write.contribute(
          [AMOUNT_TO_BUY],
          {
            value: parseEther("0.01"),
          }
        );

        await publicClient.waitForTransactionReceipt({
          hash: contributionHash,
        });

        const token = await hre.viem.getContractAt(
          "MintableERC20",
          await presale.read.token()
        );

        const tokenEvents = await token.getEvents.Transfer();

        expect(tokenEvents).to.have.lengthOf(1);
        expect(tokenEvents[0].args.value).to.equal(AMOUNT_TO_BUY * 10n ** 18n);
      });

      // it("Should revert with the right error if called from another account", async function () {
      //   const { lock, unlockTime, otherAccount } = await loadFixture(
      //     deployFactory
      //   );

      //   // We can increase the time in Hardhat Network
      //   await time.increaseTo(unlockTime);

      //   // We retrieve the contract with a different account to send a transaction
      //   const lockAsOtherAccount = await hre.viem.getContractAt(
      //     "Lock",
      //     lock.address,
      //     { client: { wallet: otherAccount } }
      //   );
      //   await expect(lockAsOtherAccount.write.withdraw()).to.be.rejectedWith(
      //     "You aren't the owner"
      //   );
      // });

      // it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
      //   const { lock, unlockTime } = await loadFixture(
      //     deployFactory
      //   );

      //   // Transactions are sent using the first signer by default
      //   await time.increaseTo(unlockTime);

      //   await expect(lock.write.withdraw()).to.be.fulfilled;
      // });
    });

    describe("Events", function () {
      it("Should emit an event on new Presale creation", async function () {
        const { presaleFactory, publicClient } = await loadFixture(
          deployFactory
        );

        const hash = await presaleFactory.write.createPresale([
          "Example",
          "EXM",
          1000n,
          1n,
        ]);
        await publicClient.waitForTransactionReceipt({ hash });

        // get the PresaleCreated events in the latest block
        const presaleEvents = await presaleFactory.getEvents.PresaleCreated();
        expect(presaleEvents).to.have.lengthOf(1);
        expect(presaleEvents[0].args.presale).to.be.an("string");
      });
    });
  });
});

