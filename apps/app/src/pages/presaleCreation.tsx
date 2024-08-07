import Header from "@/components/Header";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// importing necessary wagmi for contracts integrations
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from "wagmi";

// importing contract ABI
import abi from "@tokenization-platform/contracts/abi_ts/contracts/PresaleFactory.sol/PresaleFactory";

export default function PresaleCreation() {
  const navigate = useNavigate();
  const { data: hash, isPending, error, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const symbol = formData.get("symbol") as string;
    const supply = formData.get("supply") as string;
    const price = formData.get("price") as string;

    writeContract({
      address: "0x016e627e24b8bCD5753afA90FE95E72338f72e12",
      abi,
      functionName: "createPresale",
      args: [name, symbol, BigInt(supply), BigInt(price)],
    });
  }

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    data: receipt,
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirmed && receipt) {
      // Extract the new presale address from the logs
      const newPresaleAddress = receipt.logs[0].address;
      // Redirect to the PresaleDetails page with the new address
      navigate(`/PresaleDetails/${newPresaleAddress}`);
    }
  }, [isConfirmed, receipt, navigate]);

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-[100dvh]">
        <main className="flex-1 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Create a New Presale
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Fill out the form below to create a new presale for your
                  token.
                </p>
              </div>
              <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tokenName">Token Name</Label>
                  <Input
                    id="tokenName"
                    name="name"
                    placeholder="Enter your token name"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    The name of your token that will be displayed.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tokenSymbol">Token Symbol</Label>
                  <Input
                    id="tokenSymbol"
                    name="symbol"
                    placeholder="Enter your token symbol"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    The unique ticker symbol for your token.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="initialSupply">Initial Supply</Label>
                  <Input
                    id="initialSupply"
                    name="supply"
                    type="number"
                    placeholder="Enter the initial supply"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    The total number of tokens that will be created.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tokenPrice">Token Price</Label>
                  <Input
                    id="tokenPrice"
                    name="price"
                    type="number"
                    placeholder="Enter the token price"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    The price per token in the presale.
                  </p>
                </div>
                <Button
                  disabled={isPending}
                  type="submit"
                  variant="outline"
                  className="w-full bg-black text-white"
                >
                  {isPending ? "Confirming..." : "Create Presale"}
                </Button>
                {hash && <div>Transaction Hash: {hash}</div>}
                {isConfirming && <div>Waiting for confirmation...</div>}
                {isConfirmed && <div>Transaction confirmed.</div>}
                {error && (
                  <div>
                    Alert: {(error as BaseError).shortMessage || error.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
