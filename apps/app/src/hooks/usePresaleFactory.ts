import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { contracts } from '../config/contracts';
import PresaleFactoryABI from '@tokenization-platform/contracts/abi_ts/contracts/PresaleFactory.sol/PresaleFactory';

export function usePresaleFactory() {
  const { chainId } = useAccount();
  
  // Get the contract address based on chainId
  const contractAddress = chainId ? contracts[chainId as keyof typeof contracts] as `0x${string}` : undefined;

  // Write contract functions
  const {
    data: createPresaleData,
    writeContract: createPresale,
    isPending: isCreatePresalePending,
    isError: isCreatePresaleError,
    error: createPresaleError,
  } = useWriteContract();

  // Read contract hooks with parameters - these are custom hooks that encapsulate useReadContract
  const useGetAllPresales = (index: number) => 
    useReadContract({
      address: contractAddress,
      abi: PresaleFactoryABI,
      functionName: 'allPresales',
      args: [BigInt(index)],
      query: {
        enabled: !!contractAddress,
      },
    });

  const useGetPaginatedPresales = (page: number) => 
    useReadContract({
      address: contractAddress,
      abi: PresaleFactoryABI,
      functionName: 'getPaginatedPresales',
      args: [BigInt(page)],
      query: {
        enabled: !!contractAddress,
      },
    });

  const useGetUserCreatedTokens = (user: `0x${string}`) => 
    useReadContract({
      address: contractAddress,
      abi: PresaleFactoryABI,
      functionName: 'getUserCreatedTokens',
      args: [user],
      query: {
        enabled: !!contractAddress && !!user,
      },
    });

  const useGetPresaleAddress = () => 
    useReadContract({
      address: contractAddress,
      abi: PresaleFactoryABI,
      functionName: 'presale',
      query: {
        enabled: !!contractAddress,
      },
    });

  const useGetTokenAddress = () => 
    useReadContract({
      address: contractAddress,
      abi: PresaleFactoryABI,
      functionName: 'token',
      query: {
        enabled: !!contractAddress,
      },
    });

  return {
    // Contract address
    contractAddress,
    
    // Read functions (custom hooks that encapsulate wagmi hooks)
    useGetAllPresales,
    useGetPaginatedPresales,
    useGetUserCreatedTokens,
    useGetPresaleAddress,
    useGetTokenAddress,
    
    // Write functions
    createPresale,
    createPresaleData,
    isCreatePresalePending,
    isCreatePresaleError,
    createPresaleError,
  };
}
