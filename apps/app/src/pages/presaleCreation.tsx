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
import { useEffect, useState } from "react";
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
  useWaitForTransactionReceipt,
  type BaseError,
} from "wagmi";

// importing our custom hook and ABI
import { usePresaleFactory } from "@/hooks/usePresaleFactory";
import { useNativeCurrency } from "@/hooks";
import PresaleFactoryABI from "@tokenization-platform/contracts/abi_ts/contracts/PresaleFactory.sol/PresaleFactory";
import { parseEther, parseEventLogs } from "viem";
import { formatNumberWithThousands, removeThousandSeparators } from "@/lib/utils";

export default function PresaleCreation() {
  const nativeCurrencySymbol = useNativeCurrency();
  const navigate = useNavigate();
  const {
    contractAddress,
    createPresale,
    createPresaleData,
    isCreatePresalePending,
    isCreatePresaleError,
    createPresaleError,
  } = usePresaleFactory();

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
    // Remove any formatting from the supply value before converting to BigInt
    const cleanSupply = values.supply.toString().replace(/\s/g, "");
    const priceinETH = parseEther(values.price);
    const hardCapInETH = parseEther(values.hardCap);
    const softCapInETH = parseEther(values.softCap);
    
    // Convert date strings to Unix timestamps
    const startTimeUnix = Math.floor(new Date(values.startTime).getTime() / 1000);
    const endTimeUnix = Math.floor(new Date(values.endTime).getTime() / 1000);

    if (contractAddress) {
      createPresale({
        address: contractAddress,
        abi: PresaleFactoryABI,
        functionName: "createPresale",
        args: [
          values.name,
          values.symbol,
          BigInt(cleanSupply),
          priceinETH,
          hardCapInETH,
          softCapInETH,
          BigInt(startTimeUnix),
          BigInt(endTimeUnix),
        ],
      });
    }
  }

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    data: receipt,
  } = useWaitForTransactionReceipt({
    hash: createPresaleData,
  });

  useEffect(() => {
    if (isConfirmed && receipt) {
      // Import the ABI locally for parsing logs
      import("@tokenization-platform/contracts/abi_ts/contracts/PresaleFactory.sol/PresaleFactory")
        .then((module) => {
          const abi = module.default;
          const parsedLogs = parseEventLogs({
            abi,
            logs: receipt.logs,
            eventName: "PresaleCreated",
          });

          // Extract the new presale address from the logs
          const newPresaleAddress = parsedLogs[0].args.presale;
          // Redirect to the PresaleDetails page with the new address
          navigate({ to: `/presale-details/${newPresaleAddress}` });
        });
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
                    (e.g., &quot;My Awesome Token&quot;).
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
                    The symbol of the token (e.g., &quot;MAT&quot;). This is a shorter,
                    often 3-5 character, identifier.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="supply"
              render={({ field }) => {
                const [displayValue, setDisplayValue] = useState(
                  formatNumberWithThousands(field.value)
                );

                return (
                  <FormItem>
                    <FormLabel>Initial Supply</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter the initial supply"
                        value={displayValue}
                        onChange={(e) => {
                          const rawValue = removeThousandSeparators(e.target.value);
                          // Only update if the raw value is a valid number
                          if (rawValue === "" || (!isNaN(Number(rawValue)) && Number(rawValue) >= 0)) {
                            field.onChange(rawValue);
                            setDisplayValue(e.target.value);
                          }
                        }}
                        onBlur={(e) => {
                          // Format the value on blur
                          const rawValue = removeThousandSeparators(e.target.value);
                          setDisplayValue(formatNumberWithThousands(rawValue));
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      The total number of tokens that will be minted and
                      available for the presale.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
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
                      step="any"
                      placeholder={`Enter the token price in ${nativeCurrencySymbol}`}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The price of a single token in {nativeCurrencySymbol}. For example,
                    0.001 {nativeCurrencySymbol} per token.
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
                  <FormLabel>Hard Cap ({nativeCurrencySymbol})</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="any"
                      placeholder={`Enter the hard cap in ${nativeCurrencySymbol}`}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The maximum amount of {nativeCurrencySymbol} to be raised in the presale. If
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
                  <FormLabel>Soft Cap ({nativeCurrencySymbol})</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="any"
                      placeholder={`Enter the soft cap in ${nativeCurrencySymbol}`}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The minimum amount of {nativeCurrencySymbol} that must be raised for the
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
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The start date and time of the presale.
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
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The end date and time of the presale.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isCreatePresalePending} type="submit" className="w-full">
              {isCreatePresalePending ? "Confirming..." : "Create Presale"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        {createPresaleData && <div>Transaction Hash: {createPresaleData}</div>}
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
        {(isCreatePresaleError || createPresaleError) && (
          <div>
            Alert: {(createPresaleError as BaseError)?.shortMessage || createPresaleError?.message}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
