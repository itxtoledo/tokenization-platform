import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
// import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import * as React from "react";

// imprting wagmi for contract integration
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from "wagmi";

//importing contract ABI
import abi from "@tokenization-platform/contracts/abi_ts/contracts/Presale.sol/Presale";

export default function TokenManagement() {
  const { data: hash, isPending, error, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const addressTo = formData.get("addressTo") as "0x{string}";
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
      <div className="flex min-h-screen  flex-col bg-muted/40">
        <main className="grid w-full gap-4 sm:grid-cols-1 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Mint New Tokens</CardTitle>
              <CardDescription>
                Mint new tokens for the selected ERC20 contract. This action can
                only be performed by the contract owner.
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                      name="amount"
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
                      Error:{" "}
                      {(error as BaseError).shortMessage || error.message}
                    </div>
                  )}
                </form>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Mintable ERC20 Tokens</CardTitle>
              <CardDescription>
                View and manage the mintable ERC20 tokens created on the Presale
                Platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Total Supply</TableHead>
                    <TableHead>Circulating Supply</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Acme Token</TableCell>
                    <TableCell>ACME</TableCell>
                    <TableCell>1,000,000</TableCell>
                    <TableCell>750,000</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoveVerticalIcon className="h-4 w-4" />
                            <span className="sr-only">Token actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-white hover:cursor-pointer"
                        >
                          <DropdownMenuItem className="bg-white hover:cursor-pointer">
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="bg-white hover:cursor-pointer">
                            Mint Tokens
                          </DropdownMenuItem>
                          <DropdownMenuItem className="bg-white hover:cursor-pointer">
                            Burn Tokens
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Presale Token</TableCell>
                    <TableCell>PSALE</TableCell>
                    <TableCell>500,000</TableCell>
                    <TableCell>300,000</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoveVerticalIcon className="h-4 w-4" />
                            <span className="sr-only">Token actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-white hover:cursor-pointer"
                        >
                          <DropdownMenuItem className="bg-white hover:cursor-pointer">
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="bg-white hover:cursor-pointer">
                            Mint Tokens
                          </DropdownMenuItem>
                          <DropdownMenuItem className="bg-white hover:cursor-pointer">
                            Burn Tokens
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
      <Footer />
    </>
  );
}

function MoveVerticalIcon(props: any) {
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
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>
  );
}
