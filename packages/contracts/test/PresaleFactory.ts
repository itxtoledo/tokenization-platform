import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { parseEther } from "viem";

describe("PresaleFactory", function () {
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
      presale,
      token,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe("Initialization", function () {
    it("should initialize with correct presale and token addresses", async function () {
      const { presaleFactory, presale, token } = await loadFixture(
        deployFactory
      );

      const factoryPresaleAddress = await presaleFactory.read.presale();
      const factoryTokenAddress = await presaleFactory.read.token();

      // Convert both addresses to lowercase for comparison (to handle case sensitivity)
      const expectedPresaleAddress = presale.address.toLowerCase();
      const expectedTokenAddress = token.address.toLowerCase();

      expect(factoryPresaleAddress.toLowerCase()).to.equal(
        expectedPresaleAddress
      );
      expect(factoryTokenAddress.toLowerCase()).to.equal(expectedTokenAddress);
    });
  });

  describe("Presale Creation and Pagination", function () {
    it("Should create a presale and return it in paginated results", async function () {
      const { presaleFactory, publicClient } = await loadFixture(deployFactory);

      const currentTime = BigInt(Math.floor(Date.now() / 1000));
      const futureTime = currentTime + 3600n; // 1 hour from now

      const hash = await presaleFactory.write.createPresale([
        "Example",
        "EXM",
        1000n,
        parseEther("0.01"),
        parseEther("10"), // hardCap
        currentTime, // startTime
        futureTime, // endTime
      ]);
      await publicClient.waitForTransactionReceipt({ hash });

      const presaleEvents = await presaleFactory.getEvents.PresaleCreated();
      expect(presaleEvents).to.have.lengthOf(1);
      const createdPresaleAddress = presaleEvents[0].args.presale;

      const paginatedPresales = await presaleFactory.read.getPaginatedPresales([
        1,
      ]);
      expect(paginatedPresales).to.have.lengthOf(1);
      expect(paginatedPresales[0]).to.equal(createdPresaleAddress);
    });

    it("Should return empty array for out of bounds page", async function () {
      const { presaleFactory } = await loadFixture(deployFactory);
      const paginatedPresales = await presaleFactory.read.getPaginatedPresales([
        2,
      ]);
      expect(paginatedPresales).to.have.lengthOf(0);
    });

    it("Should return multiple presales in paginated results", async function () {
      const { presaleFactory, publicClient } = await loadFixture(deployFactory);

      const currentTime = BigInt(Math.floor(Date.now() / 1000));
      const futureTime = currentTime + 3600n; // 1 hour from now

      for (let i = 0; i < 12; i++) {
        const hash = await presaleFactory.write.createPresale([
          `Example${i}`,
          `EXM${i}`,
          1000n,
          parseEther("0.01"),
          parseEther("10"), // hardCap
          currentTime, // startTime
          futureTime, // endTime
        ]);
        await publicClient.waitForTransactionReceipt({ hash });
      }

      const page1 = await presaleFactory.read.getPaginatedPresales([1]);
      expect(page1).to.have.lengthOf(10);

      const page2 = await presaleFactory.read.getPaginatedPresales([2]);
      expect(page2).to.have.lengthOf(2);
    });
  });

  describe("Sales", function () {
    describe("Could buy tokens at presale", function () {
      it("Should buy tokens", async function () {
        const { presaleFactory, publicClient, otherAccount } =
          await loadFixture(deployFactory);

        const currentTime = BigInt(Math.floor(Date.now() / 1000));
        const futureTime = currentTime + 3600n; // 1 hour from now

        const hash = await presaleFactory.write.createPresale([
          "Example",
          "EXM",
          1000n,
          parseEther("0.01"),
          parseEther("10"), // hardCap
          currentTime, // startTime
          futureTime, // endTime
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
    });

    describe("Events", function () {
      it("Should emit an event on new Presale creation", async function () {
        const { presaleFactory, publicClient } = await loadFixture(
          deployFactory
        );

        const currentTime = BigInt(Math.floor(Date.now() / 1000));
        const futureTime = currentTime + 3600n; // 1 hour from now

        const hash = await presaleFactory.write.createPresale([
          "Example",
          "EXM",
          1000n,
          1n,
          parseEther("10"), // hardCap
          currentTime, // startTime
          futureTime, // endTime
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
