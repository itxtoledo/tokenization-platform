import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { presaleSchema, PresaleFormData } from "@/schemas/presaleSchemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// importing necessary wagmi for contracts integrations
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from "wagmi";

// importing contract ABI
import abi from "@tokenization-platform/contracts/abi_ts/contracts/PresaleFactory.sol/PresaleFactory";
import { parseEther, parseEventLogs } from "viem";

export default function PresaleCreation() {
  const navigate = useNavigate();
  const { data: hash, isPending, error, writeContract } = useWriteContract();

  const form = useForm<PresaleFormData>({
    resolver: zodResolver(presaleSchema),
    defaultValues: {
      name: "",
      symbol: "",
      supply: "",
      price: "",
      hardCap: "",
      softCap: "",
      startTime: "",
      endTime: "",
    },
  });

  async function onSubmit(values: PresaleFormData) {
    const priceinETH = parseEther(values.price);
    const hardCapInETH = parseEther(values.hardCap);
    const softCapInETH = parseEther(values.softCap);

    writeContract({
      address: import.meta.env.VITE_PRESALE_FACTORY,
      abi,
      functionName: "createPresale",
      args: [
        values.name,
        values.symbol,
        BigInt(values.supply),
        priceinETH,
        hardCapInETH,
        softCapInETH,
        BigInt(values.startTime),
        BigInt(values.endTime),
      ],
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
      const parsedLogs = parseEventLogs({
        abi,
        logs: receipt.logs,
        eventName: "PresaleCreated",
      });

      // Extract the new presale address from the logs
      const newPresaleAddress = parsedLogs[0].args.presale;
      // Redirect to the PresaleDetails page with the new address
      navigate(`/presale-details/${newPresaleAddress}`);
    }
  }, [isConfirmed, receipt, navigate]);

  return (
    <>
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Token Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your token name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="symbol"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Token Symbol</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your token symbol" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="supply"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Initial Supply</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter the initial supply" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Token Price</FormLabel>
                        <FormControl>
                          <Input type="number" step={0.00000001} placeholder="Enter the token price in ETH" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hardCap"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hard Cap (ETH)</FormLabel>
                        <FormControl>
                          <Input type="number" step={0.00000001} placeholder="Enter the hard cap in ETH" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="softCap"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Soft Cap (ETH)</FormLabel>
                        <FormControl>
                          <Input type="number" step={0.00000001} placeholder="Enter the soft cap in ETH" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Time (Unix Timestamp)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter start time as Unix timestamp" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Time (Unix Timestamp)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter end time as Unix timestamp" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
              </Form>
            </div>
          </div>
        </main>
      </div>
      </>
  );
}
