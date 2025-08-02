import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useState } from "react";


import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";






import {
  useReadContract,
  useReadContracts,
} from "wagmi";
import { type Address } from "viem";
import { formatEther, formatUnits } from "viem";

import presaleFactoryAbi from "@tokenization-platform/contracts/abi_ts/contracts/PresaleFactory.sol/PresaleFactory";
import presaleAbi from "@tokenization-platform/contracts/abi_ts/contracts/Presale.sol/Presale";
import tokenAbi from "@tokenization-platform/contracts/abi_ts/contracts/MintableERC20.sol/MintableERC20";

export default function Home() {
  const [page, setPage] = useState(1);

  const { data: presaleAddresses, isLoading: isLoadingPresaleAddresses } = useReadContract({
    address: import.meta.env.VITE_PRESALE_FACTORY,
    abi: presaleFactoryAbi,
    functionName: "getPaginatedPresales",
    args: [BigInt(page)],
  });

  const presaleDetailsQueries = (presaleAddresses || []).map((presaleAddress) => ({
    address: presaleAddress as Address,
    abi: presaleAbi,
    functionName: "token",
  }));

  const { data: tokenAddresses, isLoading: isLoadingTokenAddresses } = useReadContracts({
    contracts: presaleDetailsQueries,
    query: {
      enabled: !isLoadingPresaleAddresses && (presaleAddresses?.length ?? 0) > 0,
      select: (data) => data.map((item) => item.result),
    },
  });

  const allPresaleDetailsQueries = (presaleAddresses || []).flatMap((presaleAddress, index) => {
    const tokenAddress = tokenAddresses?.[index];
    if (!tokenAddress) return [];

    return [
      {
        address: presaleAddress as Address,
        abi: presaleAbi,
        functionName: "price",
      },
      {
        address: presaleAddress as Address,
        abi: presaleAbi,
        functionName: "hardCap",
      },
      {
        address: presaleAddress as Address,
        abi: presaleAbi,
        functionName: "softCap",
      },
      {
        address: presaleAddress as Address,
        abi: presaleAbi,
        functionName: "startTime",
      },
      {
        address: presaleAddress as Address,
        abi: presaleAbi,
        functionName: "endTime",
      },
      {
        address: presaleAddress as Address,
        abi: presaleAbi,
        functionName: "totalContributed",
      },
      {
        address: tokenAddress as Address,
        abi: tokenAbi,
        functionName: "name",
      },
      {
        address: tokenAddress as Address,
        abi: tokenAbi,
        functionName: "symbol",
      },
      {
        address: tokenAddress as Address,
        abi: tokenAbi,
        functionName: "totalSupply",
      },
      {
        address: tokenAddress as Address,
        abi: tokenAbi,
        functionName: "decimals",
      },
    ];
  });

  const { data: allPresaleDetails, isLoading: isLoadingAllPresaleDetails } = useReadContracts({
    contracts: allPresaleDetailsQueries,
    query: {
      enabled: !isLoadingTokenAddresses && (tokenAddresses?.length ?? 0) > 0,
    },
  });

  const presales = (presaleAddresses || []).map((address, index) => {
    const details = allPresaleDetails?.slice(index * 10, (index + 1) * 10); // Assuming 10 calls per presale
    if (!details || details.length === 0) return null;

    const [price, hardCap, softCap, startTime, endTime, totalContributed, name, symbol, totalSupply, decimals] = details.map(d => d?.result);

    return {
      address,
      name: name as string,
      symbol: symbol as string,
      price: price ? formatEther(price as bigint) : "0",
      hardCap: hardCap ? formatEther(hardCap as bigint) : "0",
      softCap: softCap ? formatEther(softCap as bigint) : "0",
      startTime: startTime ? new Date(Number(startTime) * 1000).toLocaleString() : "N/A",
      endTime: endTime ? new Date(Number(endTime) * 1000).toLocaleString() : "N/A",
      totalContributed: totalContributed ? formatEther(totalContributed as bigint) : "0",
      totalSupply: totalSupply && decimals ? formatUnits(totalSupply as bigint, decimals as number) : "0",
    };
  }).filter(Boolean);

  const isLoading = isLoadingPresaleAddresses || isLoadingTokenAddresses || isLoadingAllPresaleDetails;

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="bg-primary text-primary-foreground py-12 px-4 md:px-6">
          <div className="container max-w-5xl mx-auto space-y-4">
            <h1 className="text-4xl font-bold">Welcome to Presale Platform</h1>
            <p className="text-lg">
              Discover and participate in the latest presales, invest in
              promising projects, and manage your investments with ease.
            </p>
          </div>
        </header>
        <main className="flex-1">
          <section className="py-12 md:py-16 px-4 md:px-6">
            <div className="container max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Active Presales</h2>
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-2">
                          {Array.from({ length: 7 }).map((_, itemIndex) => (
                            <div key={itemIndex}>
                              <Skeleton className="h-4 w-1/3 mb-1" />
                              <Skeleton className="h-5 w-2/3" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Skeleton className="h-10 w-full" />
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {presales.length === 0 ? (
                    <p>No presales found.</p>
                  ) : (
                    presales.map((presale, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle>{presale!.name}</CardTitle>
                          <CardDescription>{presale!.symbol}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-sm text-muted-foreground">Price</p>
                              <p>{presale!.price} ETH</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Supply</p>
                              <p>{presale!.totalSupply}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Raised</p>
                              <p>{presale!.totalContributed} ETH</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Hard Cap</p>
                              <p>{presale!.hardCap} ETH</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Soft Cap</p>
                              <p>{presale!.softCap} ETH</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Starts</p>
                              <p>{presale!.startTime}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Ends</p>
                              <p>{presale!.endTime}</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Link to={`/presale-details/${presale!.address}`} className="w-full">
                            <Button
                              variant="outline"
                              className="w-full bg-black text-white"
                            >
                              Participate
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))
                  )}
                </div>
              )}
              <div className="flex justify-between mt-4">
                <Button onClick={() => setPage(prev => Math.max(1, prev - 1))} disabled={page === 1}>
                  Previous Page
                </Button>
                <Button onClick={() => setPage(prev => prev + 1)} disabled={presales.length < 10}>
                  Next Page
                </Button>
              </div>
            </div>
          </section>
          

          
        </main>
      </div>
      </>
  );
}




