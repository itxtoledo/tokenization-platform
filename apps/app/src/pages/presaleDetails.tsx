import Header from "@/components/Header";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// importing necessary wagmi contract integration
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
  useReadContract,
} from "wagmi";
import { type Address } from "viem";

// importing contract ABI
import abi from "@tokenization-platform/contracts/abi_ts/contracts/Presale.sol/Presale";

export default function PresaleDetails() {
  // extract address from react-router-dom
  const { address } = useParams();
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const readTokenAddress = useReadContract({
    abi,
    address: address as Address,
    functionName: "token",
  });

  useEffect(() => {
    console.log(readTokenAddress.data);

    if (readTokenAddress.isSuccess) {
      console.log(readTokenAddress.data);
    }
  }, [readTokenAddress]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const amount = formData.get("amount") as string;

    writeContract({
      address: address?.startsWith("0x")
        ? (address as Address)
        : `0x${address ?? ""}`,
      abi,
      functionName: "contribute",
      args: [BigInt(amount)],
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-[100dvh] bg-background text-foreground">
        <main className="flex-1 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Acme Token Presale
                  </h1>
                  <p className="text-muted-foreground">
                    Get in early on the Acme Token presale.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">
                      Token Name
                    </div>
                    <div>Acme Token</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">
                      Token Symbol
                    </div>
                    <div>ACME</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">
                      Price
                    </div>
                    <div>0.01 ETH</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">
                      Total Supply
                    </div>
                    <div>100,000,000</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Presale Progress
                  </div>
                  <Progress value={45} />
                  <div className="flex justify-between text-sm">
                    <div>45,000,000 ACME sold</div>
                    <div>100,000,000 ACME total</div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Contribute</h2>
                  <p className="text-muted-foreground">
                    Enter the amount of ACME tokens you want to purchase.
                  </p>
                </div>
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount (ACME)</Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      min="0.0001"
                      step="0.00000001"
                      placeholder="Enter amount"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isPending}
                    variant="outline"
                    className="w-full bg-black text-white"
                  >
                    {isPending ? "Confirming..." : "Contribute"}
                  </Button>
                  {hash && <div>Transaction Hash: {hash}</div>}
                  {isConfirming && <div>Waiting for confirmation...</div>}
                  {isConfirmed && <div>Transaction confirmed.</div>}
                  {error && (
                    <div>
                      Alert:{" "}
                      {(error as BaseError).shortMessage || error.message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
