/**
 * v0 by Vercel.
 * @see https://v0.dev/t/AfrseW2hwAf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Presale Platform</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Home
          </Link>
        </nav>
      </header>
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Your Presale Contributions
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                View the details of the presales you have participated in,
                including the token information and your contribution amounts.
              </p>
            </div>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Acme Token</CardTitle>
                  <CardDescription>Presale #1</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Token Name</p>
                      <p>Acme Token</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Token Symbol</p>
                      <p>ACM</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Amount Contributed</p>
                      <p>0.5 ETH</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Tokens Received</p>
                      <p>5,000 ACM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Zeta Token</CardTitle>
                  <CardDescription>Presale #2</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Token Name</p>
                      <p>Zeta Token</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Token Symbol</p>
                      <p>ZET</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Amount Contributed</p>
                      <p>1 ETH</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Tokens Received</p>
                      <p>10,000 ZET</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Omega Token</CardTitle>
                  <CardDescription>Presale #3</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Token Name</p>
                      <p>Omega Token</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Token Symbol</p>
                      <p>OMG</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Amount Contributed</p>
                      <p>0.75 ETH</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Tokens Received</p>
                      <p>7,500 OMG</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Presale Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function MountainIcon(props: any) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
