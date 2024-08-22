import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import * as React from "react";

//importing necessary wagmi contracts integrations
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from "wagmi";

// importing contract ABI
import abi from "@tokenization-platform/contracts/abi_ts/contracts/Presale.sol/Presale";

export function WithdrawToken() {
  const { data: hash, isPending, error, writeContract } = useWriteContract();
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const tokenAddress = formData.get("tokenAddress") as "0x{string}";

    writeContract({
      address: "0xE3920963fedC0b83cdd8CBdAB0fce942ee95eD59",
      abi,
      functionName: "withdrawToken",
      args: [tokenAddress],
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <form onSubmit={submit}>
      <div>
        <label htmlFor="recipient" className="block text-muted-foreground mb-1">
          Token Address
        </label>
        <Input
          id="recipient"
          type="text"
          name="tokenAddress"
          placeholder="0x..."
          className="w-full"
        />
      </div>
      <div className="grid gap-4">
        <Button
          type="submit"
          disabled={isPending}
          variant="outline"
          className="bg-black text-white"
        >
          {isPending ? "Confirming..." : "Withdraw Tokens"}
        </Button>
        {hash && <div>Transaction Hash: {hash}</div>}
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
        {error && (
          <div>Error: {(error as BaseError).shortMessage || error.message}</div>
        )}
      </div>
    </form>
  );
}
