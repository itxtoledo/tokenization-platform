import { Button } from "@/components/ui/button";
import { PresaleCard } from "@/components/PresaleCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";


// importing our custom hook
import { usePresaleFactory } from "@/hooks/usePresaleFactory";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export default function PresaleList() {
  const [page, setPage] = useState(0); // Start with page 0

  const { 
    useGetPaginatedPresales 
  } = usePresaleFactory();

  const { 
    data: presaleAddresses, 
    isLoading, 
    isError 
  } = useGetPaginatedPresales(page);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(0, prevPage - 1));
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
        All Presales
      </h1>
      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-10 w-full mt-4" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {isError && <p>Error loading presales.</p>}
      {presaleAddresses && presaleAddresses.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {presaleAddresses.map((address: any) => (
            <PresaleCard key={address} presaleAddress={address} />
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
  );
}
