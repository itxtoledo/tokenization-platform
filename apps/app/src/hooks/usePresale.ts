import { useReadContract } from "wagmi";
import PresaleABI from "@launchpad-platform/contracts/abi_ts/contracts/Presale.sol/Presale";
import MintableERC20ABI from "@launchpad-platform/contracts/abi_ts/contracts/MintableERC20.sol/MintableERC20";

export function usePresale(presaleAddress: `0x${string}`) {
  // Return functions that encapsulate the useReadContract hooks
  const useTokenAddress = () =>
    useReadContract({
      address: presaleAddress,
      abi: PresaleABI,
      functionName: "token",
      query: {
        enabled: !!presaleAddress,
      },
    });

  const useTokenName = (tokenAddress: `0x${string}`) =>
    useReadContract({
      address: tokenAddress,
      abi: MintableERC20ABI,
      functionName: "name",
      query: {
        enabled: !!tokenAddress,
      },
    });

  const useTokenSymbol = (tokenAddress: `0x${string}`) =>
    useReadContract({
      address: tokenAddress,
      abi: MintableERC20ABI,
      functionName: "symbol",
      query: {
        enabled: !!tokenAddress,
      },
    });

  const usePrice = () =>
    useReadContract({
      address: presaleAddress,
      abi: PresaleABI,
      functionName: "price",
      query: {
        enabled: !!presaleAddress,
      },
    });

  const useTotalContributed = () =>
    useReadContract({
      address: presaleAddress,
      abi: PresaleABI,
      functionName: "totalContributed",
      query: {
        enabled: !!presaleAddress,
      },
    });

  const useHardCap = () =>
    useReadContract({
      address: presaleAddress,
      abi: PresaleABI,
      functionName: "hardCap",
      query: {
        enabled: !!presaleAddress,
      },
    });

  const useStartTime = () =>
    useReadContract({
      address: presaleAddress,
      abi: PresaleABI,
      functionName: "startTime",
      query: {
        enabled: !!presaleAddress,
      },
    });

  const useEndTime = () =>
    useReadContract({
      address: presaleAddress,
      abi: PresaleABI,
      functionName: "endTime",
      query: {
        enabled: !!presaleAddress,
      },
    });

  return {
    useTokenAddress,
    useTokenName,
    useTokenSymbol,
    usePrice,
    useTotalContributed,
    useHardCap,
    useStartTime,
    useEndTime,
  };
}
