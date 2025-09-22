import { useChainId } from 'wagmi';
import { CHAINS } from '../wagmi';

export function useNativeCurrency() {
  const chainId = useChainId();
  const chain = CHAINS.find(chain => chain.id === chainId);
  return chain?.nativeCurrency?.symbol || 'ETH';
}