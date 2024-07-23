import { Button } from "@/components/ui/button";

import * as React from "react";

//importing necessary wagmi contracts integrations
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from "wagmi";

// importing contract ABI
import { abi } from "@/contracts-ABI/Presale-ABI";

export function WithdrawETH() {
  const { data: hash, isPending, error, writeContract } = useWriteContract();
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    writeContract({
      address: "0xE3920963fedC0b83cdd8CBdAB0fce942ee95eD59",
      abi,
      functionName: "withdrawETH",
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <form onSubmit={submit}>
      <div className="grid gap-4">
        <Button
          type="submit"
          disabled={isPending}
          variant="outline"
          className="bg-black text-white"
        >
          {isPending ? "Confirming..." : "Withdraw ETH"}
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
