import { useToken } from "@/hooks/useToken";
import { PresaleCard } from "./PresaleCard";
import { Skeleton } from "./ui/skeleton";

interface TokenCardProps {
  tokenAddress: `0x${string}`;
}

export function TokenCard({ tokenAddress }: TokenCardProps) {
  const { presaleAddress, isLoading } = useToken(tokenAddress);

  if (isLoading) {
    return (
        <Skeleton className="h-40 w-full" />
    );
  }

  if (!presaleAddress) {
    return <div>Error: Presale address not found for this token.</div>;
  }

  return <PresaleCard presaleAddress={presaleAddress} />;
}
