import {
  loadFixture,
  time,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { parseEther } from "viem";

describe("Presale", function () {
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
    it("should have 0 for the initial supply at presale intial creation", async function () {
      const { owner, presaleFactory, publicClient, token, presale } =
        await loadFixture(deployPresale);

      const initialSupply = 1000n; // Define the initial supply
      const currentTime = BigInt(Math.floor(Date.now() / 1000));
      const futureTime = currentTime + 3600n; // 1 hour from now

      const hash = await presaleFactory.write.createPresale([
        "Example",
        "EXM",
        initialSupply,
        parseEther("0.01"),
        parseEther("10"), // hardCap
        currentTime, // startTime
        futureTime, // endTime
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
      const ownerAddressBalance = await token.read.balanceOf([
        owner.account.address,
      ]);
      //debugging
      console.log(
        "This is to see the owner address \n" +
          owner.account.address +
          "\nis it the same as 0xA0Cf798816D4b9b9866b5330EEa46a18382f251e?",
        publicClientBalance.toString()
      );

      await expect(publicClientBalance).to.equal(0n);
      await expect(ownerAddressBalance).to.equal(0n);
    });
  });

  describe("Presale Initialization", function () {
    it("should have 0x0.. for the owner address at presale intial creation", async function () {
      const { owner, presaleFactory, publicClient, presale } =
        await loadFixture(deployPresale);

      const initialSupply = 1000n; // Define the initial supply
      const currentTime = BigInt(Math.floor(Date.now() / 1000));
      const futureTime = currentTime + 3600n; // 1 hour from now

      const hash = await presaleFactory.write.createPresale([
        "Example",
        "EXM",
        initialSupply,
        parseEther("0.01"),
        parseEther("10"), // hardCap
        currentTime, // startTime
        futureTime, // endTime
      ]);

      await publicClient.waitForTransactionReceipt({ hash });
      const address = "0x0000000000000000000000000000000000000000";
      const presaleEvents = await presaleFactory.getEvents.PresaleCreated();
      await expect(presaleEvents).to.have.lengthOf(1);

      const presaleAddress = presaleEvents[0].args.presale; // Accessing the first argument, which is the presale address

      // Verify the owner of the cloned presale contract
      const clonedPresale = await hre.viem.getContractAt(
        "Presale",
        presaleAddress as `0x${string}`,
        {
          client: { wallet: owner },
        }
      );

      const ownerAddress = await clonedPresale.read.owner();

      // The owner should be the account that called createPresale (the owner account)
      await expect(ownerAddress.toLowerCase()).to.equal(owner.account.address.toLowerCase());
    });
  });

  describe("Contribute Function", function () {
    it("Should revert if contribution is made before startTime", async function () {
      const { presaleFactory, publicClient, otherAccount } = await loadFixture(
        deployPresale
      );

      const currentTime = BigInt(Math.floor(Date.now() / 1000));
      const futureTime = currentTime + 3600n; // 1 hour from now
      const veryFutureTime = futureTime + 3600n; // 2 hours from now

      const hash = await presaleFactory.write.createPresale([
        "Example",
        "EXM",
        1000n,
        parseEther("0.01"),
        parseEther("10"), // hardCap
        futureTime, // startTime
        veryFutureTime, // endTime
      ]);
      await publicClient.waitForTransactionReceipt({ hash });

      const presaleEvents = await presaleFactory.getEvents.PresaleCreated();
      const presaleAddress = presaleEvents[0].args.presale;

      const presale = await hre.viem.getContractAt(
        "Presale",
        presaleAddress as `0x${string}`,
        {
          client: { wallet: otherAccount },
        }
      );

      await expect(
        presale.write.contribute([1n], { value: parseEther("0.01") })
      ).to.be.rejectedWith("PresaleNotActive");
    });

    it("Should revert if contribution is made after endTime", async function () {
      const { presaleFactory, publicClient, otherAccount } = await loadFixture(
        deployPresale
      );

      const currentTime = BigInt(Math.floor(Date.now() / 1000));
      const pastTime = currentTime - 3600n; // 1 hour ago
      const veryPastTime = pastTime - 3600n; // 2 hours ago

      const hash = await presaleFactory.write.createPresale([
        "Example",
        "EXM",
        1000n,
        parseEther("0.01"),
        parseEther("10"), // hardCap
        veryPastTime, // startTime
        pastTime, // endTime
      ]);
      await publicClient.waitForTransactionReceipt({ hash });

      const presaleEvents = await presaleFactory.getEvents.PresaleCreated();
      const presaleAddress = presaleEvents[0].args.presale;

      const presale = await hre.viem.getContractAt(
        "Presale",
        presaleAddress as `0x${string}`,
        {
          client: { wallet: otherAccount },
        }
      );

      await expect(
        presale.write.contribute([1n], { value: parseEther("0.01") })
      ).to.be.rejectedWith("PresaleNotActive");
    });

    it("Should revert if hardCap is exceeded", async function () {
      const { presaleFactory, publicClient, otherAccount } = await loadFixture(
        deployPresale
      );

      const currentTime = BigInt(Math.floor(Date.now() / 1000));
      const futureTime = currentTime + 3600n; // 1 hour from now

      const hash = await presaleFactory.write.createPresale([
        "Example",
        "EXM",
        1000n,
        parseEther("0.01"),
        parseEther("0.01"), // hardCap - very small for testing
        currentTime, // startTime
        futureTime, // endTime
      ]);
      await publicClient.waitForTransactionReceipt({ hash });

      const presaleEvents = await presaleFactory.getEvents.PresaleCreated();
      const presaleAddress = presaleEvents[0].args.presale;

      const presale = await hre.viem.getContractAt(
        "Presale",
        presaleAddress as `0x${string}`,
        {
          client: { wallet: otherAccount },
        }
      );

      await presale.write.contribute([1n], { value: parseEther("0.01") });

      await expect(
        presale.write.contribute([1n], { value: parseEther("0.01") })
      ).to.be.rejectedWith("HardCapExceeded");
    });

    it("Should update totalContributed after a successful contribution", async function () {
      const { presaleFactory, publicClient, otherAccount } = await loadFixture(
        deployPresale
      );

      const currentTime = BigInt(Math.floor(Date.now() / 1000));
      const futureTime = currentTime + 3600n; // 1 hour from now

      const hash = await presaleFactory.write.createPresale([
        "Example",
        "EXM",
        1000n,
        parseEther("0.01"),
        parseEther("1"), // hardCap
        currentTime, // startTime
        futureTime, // endTime
      ]);
      await publicClient.waitForTransactionReceipt({ hash });

      const presaleEvents = await presaleFactory.getEvents.PresaleCreated();
      const presaleAddress = presaleEvents[0].args.presale;

      const presale = await hre.viem.getContractAt(
        "Presale",
        presaleAddress as `0x${string}`,
        {
          client: { wallet: otherAccount },
        }
      );

      const initialTotalContributed = await presale.read.totalContributed();
      expect(initialTotalContributed).to.equal(0n);

      const contributionAmount = parseEther("0.01");
      await presale.write.contribute([1n], { value: contributionAmount });

      const updatedTotalContributed = await presale.read.totalContributed();
      expect(updatedTotalContributed).to.equal(contributionAmount);
    });

    it("Should allow contribution when endTime is 0 (no time limit)", async function () {
      const { presaleFactory, publicClient, otherAccount } = await loadFixture(
        deployPresale
      );

      const currentTime = BigInt(Math.floor(Date.now() / 1000));
      const pastTime = currentTime - 3600n; // 1 hour ago

      const hash = await presaleFactory.write.createPresale([
        "Example",
        "EXM",
        1000n,
        parseEther("0.01"),
        parseEther("1"), // hardCap
        pastTime, // startTime (in the past)
        0n, // endTime (0 means no time limit)
      ]);
      await publicClient.waitForTransactionReceipt({ hash });

      const presaleEvents = await presaleFactory.getEvents.PresaleCreated();
      const presaleAddress = presaleEvents[0].args.presale;

      const presale = await hre.viem.getContractAt(
        "Presale",
        presaleAddress as `0x${string}`,
        {
          client: { wallet: otherAccount },
        }
      );

      // Should be able to contribute even though endTime is 0 (no time limit)
      const contributionAmount = parseEther("0.01");
      await presale.write.contribute([1n], { value: contributionAmount });

      const updatedTotalContributed = await presale.read.totalContributed();
      expect(updatedTotalContributed).to.equal(contributionAmount);
    });
  });
});
