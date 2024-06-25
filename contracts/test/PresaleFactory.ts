import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("PresaleFactory", function () {
  async function deployFactory() {
    const presale = await hre.viem.deployContract("Presale");
    const token = await hre.viem.deployContract("MintableERC20");

    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const presaleFactory = await hre.viem.deployContract("PresaleFactory", [presale.address, token.address]);

    const publicClient = await hre.viem.getPublicClient();

    return {
      presaleFactory,
      owner,
      otherAccount,
      publicClient,
    };
  }

  // describe("Deployment", function () {
  //   it("Should set the right unlockTime", async function () {
  //     const { lock, unlockTime } = await loadFixture(deployFactory);

  //     expect(await lock.read.unlockTime()).to.equal(unlockTime);
  //   });

  //   it("Should set the right owner", async function () {
  //     const { lock, owner } = await loadFixture(deployFactory);

  //     expect(await lock.read.owner()).to.equal(
  //       getAddress(owner.account.address)
  //     );
  //   });

  //   it("Should receive and store the funds to lock", async function () {
  //     const { lock, lockedAmount, publicClient } = await loadFixture(
  //       deployFactory
  //     );

  //     expect(
  //       await publicClient.getBalance({
  //         address: lock.address,
  //       })
  //     ).to.equal(lockedAmount);
  //   });

  //   it("Should fail if the unlockTime is not in the future", async function () {
  //     // We don't use the fixture here because we want a different deployment
  //     const latestTime = BigInt(await time.latest());
  //     await expect(
  //       hre.viem.deployContract("Lock", [latestTime], {
  //         value: 1n,
  //       })
  //     ).to.be.rejectedWith("Unlock time should be in the future");
  //   });
  // });

  describe("Withdrawals", function () {
    // describe("Validations", function () {
    //   it("Should revert with the right error if called too soon", async function () {
    //     const { lock } = await loadFixture(deployFactory);

    //     await expect(lock.write.withdraw()).to.be.rejectedWith(
    //       "You can't withdraw yet"
    //     );
    //   });

    //   it("Should revert with the right error if called from another account", async function () {
    //     const { lock, unlockTime, otherAccount } = await loadFixture(
    //       deployFactory
    //     );

    //     // We can increase the time in Hardhat Network
    //     await time.increaseTo(unlockTime);

    //     // We retrieve the contract with a different account to send a transaction
    //     const lockAsOtherAccount = await hre.viem.getContractAt(
    //       "Lock",
    //       lock.address,
    //       { client: { wallet: otherAccount } }
    //     );
    //     await expect(lockAsOtherAccount.write.withdraw()).to.be.rejectedWith(
    //       "You aren't the owner"
    //     );
    //   });

    //   it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
    //     const { lock, unlockTime } = await loadFixture(
    //       deployFactory
    //     );

    //     // Transactions are sent using the first signer by default
    //     await time.increaseTo(unlockTime);

    //     await expect(lock.write.withdraw()).to.be.fulfilled;
    //   });
    // });

    describe("Events", function () {
      it("Should emit an event on new Presale creation", async function () {
        const { presaleFactory, publicClient } =
          await loadFixture(deployFactory);


        const hash = await presaleFactory.write.createPresale(["Example", "EXM", 1000n, 1n]);
        await publicClient.waitForTransactionReceipt({ hash });

        // get the withdrawal events in the latest block
        const withdrawalEvents = await presaleFactory.getEvents.PresaleCreated();
        expect(withdrawalEvents).to.have.lengthOf(1);
        expect(withdrawalEvents[0].args.presale).to.be.an("string");
      });
    });
  });
});
