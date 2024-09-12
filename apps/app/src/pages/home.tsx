import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WithdrawETH } from "@/components/intgration_components/withdrawETH";
import { WithdrawToken } from "@/components/intgration_components/withdrawTokens";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        <header className="bg-primary text-primary-foreground py-12 px-4 md:px-6">
          <div className="container max-w-5xl mx-auto space-y-4">
            <h1 className="text-4xl font-bold">Welcome to Presale Platform</h1>
            <p className="text-lg">
              Discover and participate in the latest presales, invest in
              promising projects, and manage your investments with ease.
            </p>
          </div>
        </header>
        <main className="flex-1">
          <section className="py-12 md:py-16 px-4 md:px-6">
            <div className="container max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Active Presales</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Acme Token</CardTitle>
                    <CardDescription>ACME</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p>$0.10</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Supply</p>
                        <p>100,000,000</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Raised</p>
                        <p>$5,000,000</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Ends in</p>
                        <p>7 days</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full bg-black text-white"
                    >
                      Participate
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Nebula Coin</CardTitle>
                    <CardDescription>NBC</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p>$0.50</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Supply</p>
                        <p>50,000,000</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Raised</p>
                        <p>$10,000,000</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Ends in</p>
                        <p>14 days</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full bg-black text-white"
                    >
                      Participate
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Quantum Crypto</CardTitle>
                    <CardDescription>QTC</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p>$0.25</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Supply</p>
                        <p>75,000,000</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Raised</p>
                        <p>$7,500,000</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Ends in</p>
                        <p>21 days</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full bg-black text-white"
                    >
                      Participate
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>
          <section className="py-12 md:py-16 px-4 md:px-6 bg-muted">
            <div className="container max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Past Presales</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Solaris Protocol</CardTitle>
                    <CardDescription>SLP</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p>$0.15</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Supply</p>
                        <p>60,000,000</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Raised</p>
                        <p>$6,000,000</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Ended</p>
                        <p>30 days ago</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to="#" className="text-primary hover:underline">
                      View Details
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Lunar Coin</CardTitle>
                    <CardDescription>LNC</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p>$0.20</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Supply</p>
                        <p>40,000,000</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Raised</p>
                        <p>$4,000,000</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Ended</p>
                        <p>45 days ago</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to="#" className="text-primary hover:underline">
                      View Details
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Galactic Crypto</CardTitle>
                    <CardDescription>GLC</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p>$0.30</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Supply</p>
                        <p>50,000,000</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Raised</p>
                        <p>$5,000,000</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Ended</p>
                        <p>60 days ago</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to="#" className="text-primary hover:underline">
                      View Details
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>

          <div className="grid w-full gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Presale Overview</CardTitle>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-black text-white"
                      >
                        <FilterIcon className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-white hover:cursor-pointer"
                    >
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Active
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Paused
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Completed
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-black text-white"
                      >
                        <ListOrderedIcon className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Sort</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-white hover:cursor-pointer"
                    >
                      <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Token Name
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Token Symbol
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Price</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Supply
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Status
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader className="bg-white hover:cursor-pointer">
                    <TableRow>
                      <TableHead>Token</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Supply</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="bg-white hover:cursor-pointer">
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Acme Token</div>
                        <div className="text-sm text-muted-foreground">ACM</div>
                      </TableCell>
                      <TableCell>$0.10</TableCell>
                      <TableCell>100,000,000</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Active</Badge>
                      </TableCell>
                      <TableCell className="bg-white hover:cursor-pointer">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoveHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-white hover:cursor-pointer"
                          >
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Pause</DropdownMenuItem>
                            <DropdownMenuItem>Resume</DropdownMenuItem>
                            <DropdownMenuItem>Cancel</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Crypto Coin</div>
                        <div className="text-sm text-muted-foreground">CRC</div>
                      </TableCell>
                      <TableCell>$0.50</TableCell>
                      <TableCell>50,000,000</TableCell>
                      <TableCell>
                        <Badge variant="outline">Paused</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoveHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-white hover:cursor-pointer"
                          >
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Resume</DropdownMenuItem>
                            <DropdownMenuItem>Cancel</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-white hover:cursor-pointer">
                      <TableCell>
                        <div className="font-medium">Metaverse Token</div>
                        <div className="text-sm text-muted-foreground">
                          META
                        </div>
                      </TableCell>
                      <TableCell>$0.25</TableCell>
                      <TableCell>75,000,000</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoveHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-white hover:cursor-pointer"
                          >
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Pause</DropdownMenuItem>
                            <DropdownMenuItem>Cancel</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-white hover:cursor-pointer">
                      <TableCell className="bg-white hover:cursor-pointer">
                        <div className="font-medium">DeFi Coin</div>
                        <div className="text-sm text-muted-foreground">DFC</div>
                      </TableCell>
                      <TableCell>$0.75</TableCell>
                      <TableCell>25,000,000</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoveHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-white hover:cursor-pointer"
                          >
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Pause</DropdownMenuItem>
                            <DropdownMenuItem>Cancel</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-white hover:cursor-pointer">
                      <TableCell>
                        <div className="font-medium">GameFi Token</div>
                        <div className="text-sm text-muted-foreground">GFT</div>
                      </TableCell>
                      <TableCell>$0.15</TableCell>
                      <TableCell>150,000,000</TableCell>
                      <TableCell>
                        <Badge variant="outline">Completed</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoveHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-white hover:cursor-pointer"
                          >
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Withdraw Tokens</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>15</strong>
                  presales
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Withdrawal Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <WithdrawETH />
                  <WithdrawToken />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Presale Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="font-medium">Acme Token</div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Active</Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-black text-white"
                      >
                        Pause
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-black text-white"
                      >
                        Cancel
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Start Date
                        </div>
                        <div>2023-06-01</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          End Date
                        </div>
                        <div>2023-06-30</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Hard Cap
                        </div>
                        <div>$1,000,000</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}



function FilterIcon(props: any) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function ListOrderedIcon(props: any) {
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
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  );
}

function MoveHorizontalIcon(props: any) {
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
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}
