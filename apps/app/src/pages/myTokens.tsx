import { useAccount, useReadContract } from 'wagmi';
import { PRESALE_FACTORY_CONTRACT_ADDRESS } from '../config/contracts';
import PresaleFactory from '@tokenization-platform/contracts/abi_ts/contracts/PresaleFactory.sol/PresaleFactory';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export function MyTokens() {
  const { address: userAddress } = useAccount();

  const { data: userCreatedTokens, isLoading, isError } = useReadContract({
    address: PRESALE_FACTORY_CONTRACT_ADDRESS,
    abi: PresaleFactory,
    functionName: 'getUserCreatedTokens',
    args: [userAddress!],
    query: {
      enabled: !!userAddress,
    },
  });

  if (isLoading) return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Created Tokens</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
  if (isError) return <div>Error loading tokens.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Created Tokens</h1>
      {userCreatedTokens && userCreatedTokens.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userCreatedTokens.map((tokenAddress) => (
            <Card key={tokenAddress}>
              <CardHeader>
                <CardTitle>Token Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 break-all">{tokenAddress}</p>
                <Link to={'/token/$address'} params={{ address: tokenAddress }}>
                  <Button className="mt-2 w-full">View Details</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>You haven&apos;t created any tokens yet.</p>
      )}
    </div>
  );
}
