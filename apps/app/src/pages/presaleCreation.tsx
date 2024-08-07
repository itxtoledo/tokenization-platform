import Header from "@/components/Header";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import PRESALE_ABI from "@tokenization-platform/contracts/abi_ts/contracts/PresaleFactory.sol/PresaleFactory";
import { useWriteContract } from "wagmi";
import { useCallback } from "react";

export default function PresaleCreation() {
  const presale = useWriteContract();

  const createPreSale = useCallback(() => {
    presale.writeContract({
      abi: PRESALE_ABI,
      functionName: "createPresale",
      address: "0x",
      args: ["0x", "", 0n, 0n],
    });
  }, [presale]);

  const onSubmit = (e) => {};

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
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tokenName">Token Name</Label>
                  <Input
                    id="tokenName"
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
                    type="number"
                    placeholder="Enter the token price"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    The price per token in the presale.
                  </p>
                </div>
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full bg-black text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("createPresale();");
                  }}
                >
                  Create Presale
                </Button>
              </form>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
