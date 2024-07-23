import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// imprting wagmi for contract integration 
import { useWriteContract, useWaitForTransactionReceipt, type BaseError, } from "wagmi";

//importing contract ABI 
import { abi } from "../contracts-ABI/MintableERC20-ABI";


export default function About() {
  const { data: hash, isPending, error, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const addressTo = formData.get("addressTo") as '0x{string}';
    const amount = formData.get("amount") as string;

    writeContract({
      address: "0xebF93A98B359bf783D9528888De2b3f259044276",
      abi,
      functionName: "mint",
      args: [addressTo, BigInt(amount)],
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  
  return (
    <>
      <Header />
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-background rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Token Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground">Token Name</p>
                <p className="font-medium">Acme Token</p>
              </div>
              <div>
                <p className="text-muted-foreground">Token Symbol</p>
                <p className="font-medium">ACT</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Supply</p>
                <p className="font-medium">1,000,000</p>
              </div>
              <div>
                <p className="text-muted-foreground">Circulating Supply</p>
                <p className="font-medium">750,000</p>
              </div>
            </div>
          </div>
          <div className="bg-background rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Mint Tokens</h2>
            {/* The form should be placed here */}
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label
                  htmlFor="recipient"
                  className="block text-muted-foreground mb-1"
                >
                  Recipient Address
                </label>
                <Input
                  id="recipient"
                  type="text"
                  name="addressTo"
                  placeholder="0x..."
                  className="w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="amount"
                  className="block text-muted-foreground mb-1"
                >
                  Amount to Mint
                </label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="100"
                  className="w-full"
                />
              </div>
              <Button
                disabled={isPending}
                type="submit"
                variant="outline"
                className="w-full bg-black text-white"
              >
                {isPending ? "Confirming..." : "Mint Tokens"}
              </Button>
              {hash && <div>Transaction Hash: {hash}</div>}
              {isConfirming && <div>Waiting for confirmation...</div>}
              {isConfirmed && <div>Transaction confirmed.</div>}
              {error && (
                <div>
                  Error: {(error as BaseError).shortMessage || error.message}
                </div>
              )}
            </form>
          </div>
          <div className="bg-background rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">About Token Minting</h2>
            <p className="text-muted-foreground">
              The token minting feature allows the platform owner to create new
              tokens as needed for the presale. This can be used to distribute
              tokens to participants or to adjust the total supply as the
              presale progresses.
            </p>
            <div className="mt-4">
              <Link
                to={"/"}
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function ArrowLeftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}
