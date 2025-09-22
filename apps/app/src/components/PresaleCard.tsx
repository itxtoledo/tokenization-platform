import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePresale } from "@/hooks/usePresale";
import { useNativeCurrency } from "@/hooks";
import { Link } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";

interface PresaleCardProps {
  presaleAddress: `0x${string}`;
}

export function PresaleCard({ presaleAddress }: PresaleCardProps) {
  const {
    useTokenAddress,
    useTokenName,
    useTokenSymbol,
    useTotalContributed,
    useHardCap,
    useStartTime,
    useEndTime,
  } = usePresale(presaleAddress);

  const { data: tokenAddress } = useTokenAddress();
  const { data: tokenName, isLoading: isLoadingName } = useTokenName(tokenAddress!);
  const { data: tokenSymbol, isLoading: isLoadingSymbol } = useTokenSymbol(tokenAddress!);
  const { data: totalContributed, isLoading: isLoadingContributed } =
    useTotalContributed();
  const { data: hardCap, isLoading: isLoadingHardCap } = useHardCap();
  const { data: startTime, isLoading: isLoadingStartTime } = useStartTime();
  const { data: endTime, isLoading: isLoadingEndTime } = useEndTime();

  const nativeCurrencySymbol = useNativeCurrency();

  const isLoading =
    isLoadingName ||
    isLoadingSymbol ||
    isLoadingContributed ||
    isLoadingHardCap ||
    isLoadingStartTime ||
    isLoadingEndTime;

  const progress = hardCap ? (Number(totalContributed) / Number(hardCap)) * 100 : 0;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-3/4 mb-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-10 w-full mt-4" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {tokenName} ({tokenSymbol})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <p>Progress</p>
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between">
            <span>
              {totalContributed ? Number(totalContributed) / 1e18 : 0} {nativeCurrencySymbol}
            </span>
            <span>
              {hardCap ? Number(hardCap) / 1e18 : 0} {nativeCurrencySymbol}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <p>
            Start:{" "}
            {startTime
              ? format(new Date(Number(startTime) * 1000), "PPpp")
              : "..."}
          </p>
          <p>
            End:{" "}
            {endTime ? format(new Date(Number(endTime) * 1000), "PPpp") : "..."}
          </p>
        </div>
        <Link to={`/presale-details/${presaleAddress}`}>
          <Button className="mt-4 w-full">View Details</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
