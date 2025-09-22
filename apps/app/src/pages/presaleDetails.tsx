import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useParams } from "@tanstack/react-router";

// importing necessary wagmi contract integration
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
  useReadContract,
} from "wagmi";
import { formatEther, formatUnits, type Address } from "viem";

// importing contract ABI
import presaleAbi from "@tokenization-platform/contracts/abi_ts/contracts/Presale.sol/Presale";
import tokenAbi from "@tokenization-platform/contracts/abi_ts/contracts/MintableERC20.sol/MintableERC20";
import { useReadContracts } from "wagmi";

export default function PresaleDetails() {
  const { address } = useParams({ from: "/presale-details/$address" });
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const presaleContract = {
    abi: presaleAbi,
    address: address as Address,
  } as const;

  const readTokenAddress = useReadContract({
    ...presaleContract,
    functionName: "token",
  });

  const tokenContract = {
    abi: tokenAbi,
    address: readTokenAddress.data,
  } as const;

  const multicallQuery = useReadContracts({
    contracts: [
      {
        ...tokenContract,
        functionName: "name",
      },
      {
        ...tokenContract,
        functionName: "symbol",
      },
      {
        ...tokenContract,
        functionName: "totalSupply",
      },
      {
        ...presaleContract,
        functionName: "price",
      },
      {
        ...tokenContract,
        functionName: "decimals",
      },
      {
        ...presaleContract,
        functionName: "hardCap",
      },
      {
        ...presaleContract,
        functionName: "softCap",
      },
      {
        ...presaleContract,
        functionName: "startTime",
      },
      {
        ...presaleContract,
        functionName: "endTime",
      },
      {
        ...presaleContract,
        functionName: "totalContributed",
      },
    ],
    query: {
      enabled: readTokenAddress.data !== undefined,
    },
  });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const amount = formData.get("amount") as string;

    writeContract({
      address: (address as string)?.startsWith("0x")
        ? (address as Address)
        : (`0x${address ?? ""}` as Address),
      abi: presaleAbi,
      functionName: "contribute",
      args: [BigInt(amount)],
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const hardCap = multicallQuery.data?.[5].result ?? 0n;
  const softCap = multicallQuery.data?.[6].result ?? 0n;
  const startTime = multicallQuery.data?.[7].result ?? 0n;
  const endTime = multicallQuery.data?.[8].result ?? 0n;
  const totalContributed = multicallQuery.data?.[9].result ?? 0n;

  const progressValue =
    hardCap > 0 ? Number((totalContributed * 100n) / hardCap) : 0;

  return (
    <>
      {(multicallQuery.isLoading || readTokenAddress.isLoading) && (
        <Card className="w-full max-w-4xl mx-auto my-8">
          <CardHeader>
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-5 w-full" />
          </CardHeader>
          <CardContent className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="space-y-1">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-5 w-3/4" />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-8 w-full" />
                <div className="flex justify-between text-sm">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-5 w-full" />
              </div>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {multicallQuery.isSuccess && (
        <Card className="w-full max-w-4xl mx-auto my-8">
          <CardHeader>
            <CardTitle>{multicallQuery.data[0].result} Presale</CardTitle>
            <CardDescription>
              Get in early on the {multicallQuery.data[0].result} presale.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Token Name
                  </div>
                  <div>{multicallQuery.data[0].result}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Token Symbol
                  </div>
                  <div>{multicallQuery.data[1].result}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Price
                  </div>
                  <div>
                    {formatEther(multicallQuery.data[3].result ?? 0n)} ETH
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Total Supply
                  </div>
                  <div>
                    {formatUnits(
                      multicallQuery.data[2].result ?? 0n,
                      multicallQuery.data[4].result ?? 0
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Hard Cap
                  </div>
                  <div>{formatEther(hardCap)} ETH</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Soft Cap
                  </div>
                  <div>{formatEther(softCap)} ETH</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Start Time
                  </div>
                  <div>
                    {new Date(Number(startTime) * 1000).toLocaleString()}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    End Time
                  </div>
                  <div>{new Date(Number(endTime) * 1000).toLocaleString()}</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  Presale Progress
                </div>
                <Progress value={progressValue} />
                <div className="flex justify-between text-sm">
                  <div>{formatEther(totalContributed)} ETH contributed</div>
                  <div>{formatEther(hardCap)} ETH hard cap</div>
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
                <Button type="submit" disabled={isPending} className="w-full">
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
          </CardContent>
        </Card>
      )}
    </>
  );
}
