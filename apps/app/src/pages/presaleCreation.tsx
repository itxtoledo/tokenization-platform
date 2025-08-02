import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { presaleSchema, PresaleFormData } from "@/schemas/presaleSchemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
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
      navigate({ to: `/presale-details/${newPresaleAddress}` });
    }
  }, [isConfirmed, receipt, navigate]);

  return (
    <Card className="w-full max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Create a New Presale</CardTitle>
        <CardDescription>
          Fill out the form below to create a new presale for your token.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                  <FormDescription>
                    The name of the token for which you are creating a presale
                    (e.g., "My Awesome Token").
                  </FormDescription>
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
                  <FormDescription>
                    The symbol of the token (e.g., "MAT"). This is a shorter,
                    often 3-5 character, identifier.
                  </FormDescription>
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
                    <Input
                      type="number"
                      placeholder="Enter the initial supply"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The total number of tokens that will be minted and
                    available for the presale.
                  </FormDescription>
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
                    <Input
                      type="number"
                      step={0.00000001}
                      placeholder="Enter the token price in ETH"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The price of a single token in Ethereum (ETH). For example,
                    0.001 ETH per token.
                  </FormDescription>
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
                    <Input
                      type="number"
                      step={0.00000001}
                      placeholder="Enter the hard cap in ETH"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The maximum amount of ETH to be raised in the presale. If
                    this amount is reached, the presale ends.
                  </FormDescription>
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
                    <Input
                      type="number"
                      step={0.00000001}
                      placeholder="Enter the soft cap in ETH"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The minimum amount of ETH that must be raised for the
                    presale to be considered successful.
                  </FormDescription>
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
                    <Input
                      type="number"
                      placeholder="Enter start time as Unix timestamp"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The start date and time of the presale, represented as a
                    Unix timestamp (e.g., 1678886400 for March 15, 2023
                    12:00:00 PM UTC).
                  </FormDescription>
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
                    <Input
                      type="number"
                      placeholder="Enter end time as Unix timestamp"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The end date and time of the presale, represented as a Unix
                    timestamp.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Confirming..." : "Create Presale"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        {hash && <div>Transaction Hash: {hash}</div>}
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
        {error && (
          <div>
            Alert: {(error as BaseError).shortMessage || error.message}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
