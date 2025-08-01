import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReadContract } from "wagmi";
import presaleFactoryAbi from "@tokenization-platform/contracts/abi_ts/contracts/PresaleFactory.sol/PresaleFactory";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

export default function PresaleList() {
  const [page, setPage] = useState(0); // Start with page 0

  const presaleFactoryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your deployed PresaleFactory address

  const { data: presaleAddresses, isLoading, isError } = useReadContract({
    abi: presaleFactoryAbi,
    address: presaleFactoryAddress,
    functionName: "getPaginatedPresales",
    args: [BigInt(page)],
  });

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(0, prevPage - 1));
  };

  return (
    <>
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
            All Presales
          </h1>
          {isLoading && <p>Loading presales...</p>}
          {isError && <p>Error loading presales.</p>}
          {presaleAddresses && presaleAddresses.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {presaleAddresses.map((address) => (
                <Card key={address}>
                  <CardHeader>
                    <CardTitle>Presale Contract</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="truncate">{address}</p>
                    <Link to={`/presale-details/${address}`}>
                      <Button className="mt-4 w-full">View Details</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            !isLoading && <p>No presales found.</p>
          )}
          <div className="flex justify-between mt-8">
            <Button onClick={handlePreviousPage} disabled={page === 0}>
              Previous Page
            </Button>
            <Button onClick={handleNextPage}>Next Page</Button>
          </div>
        </div>
      </main>
      </>
  );
}
