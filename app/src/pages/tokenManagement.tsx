/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ZWZYO78jP0U
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TokenManagement() {
    return (
      <>
        <Header />
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Mintable ERC20 Tokens</CardTitle>
                <CardDescription>
                  View and manage the mintable ERC20 tokens created on the
                  Presale Platform.
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
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Mint Tokens</DropdownMenuItem>
                            <DropdownMenuItem>Burn Tokens</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Presale Token
                      </TableCell>
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
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Mint Tokens</DropdownMenuItem>
                            <DropdownMenuItem>Burn Tokens</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Mint New Tokens</CardTitle>
                <CardDescription>
                  Mint new tokens for the selected ERC20 contract. This action
                  can only be performed by the contract owner.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="recipient">Recipient Address</Label>
                    <Input id="recipient" type="text" placeholder="0x..." />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount to Mint</Label>
                    <Input id="amount" type="number" placeholder="100" />
                  </div>
                  <Button type="submit" className="w-full">
                    Mint Tokens
                  </Button>
                </form>
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
