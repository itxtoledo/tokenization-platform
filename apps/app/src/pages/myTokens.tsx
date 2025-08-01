import { useAccount, useReadContract } from 'wagmi';
import { PRESALE_FACTORY_CONTRACT_ADDRESS } from '../config/contracts';
import PresaleFactory from '@tokenization-platform/contracts/abi_ts/contracts/PresaleFactory.sol/PresaleFactory';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Link } from '@tanstack/react-router';

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

  if (isLoading) return <div>Loading tokens...</div>;
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
                <Link to={'/token/$address'} params={{ address: tokenAddress }} className="text-blue-500 hover:underline mt-2 block">
                  View Details
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>You haven't created any tokens yet.</p>
      )}
    </div>
  );
}
