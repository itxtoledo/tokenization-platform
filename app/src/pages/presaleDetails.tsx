/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Zgl8IDg4DpD
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PresaleDetails() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
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
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            My Contributions
          </Link>
        </nav>
      </header>
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Acme Token Presale
                </h1>
                <p className="text-muted-foreground">
                  Get in early on the Acme Token presale.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Token Name
                  </div>
                  <div>Acme Token</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Token Symbol
                  </div>
                  <div>ACME</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Price
                  </div>
                  <div>0.01 ETH</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Total Supply
                  </div>
                  <div>100,000,000</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  Presale Progress
                </div>
                <Progress value={45} />
                <div className="flex justify-between text-sm">
                  <div>45,000,000 ACME sold</div>
                  <div>100,000,000 ACME total</div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Contribute</h2>
                <p className="text-muted-foreground">
                  Enter the amount of ACME tokens you want to purchase.
                </p>
              </div>
              <form className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="amount">Amount (ACME)</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="Enter amount"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="eth">ETH Required</Label>
                  <Input
                    id="eth"
                    type="text"
                    value="0.5 ETH"
                    readOnly
                    className="bg-muted"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  onClick={() =>
                    alert(
                      "function should be here contected to our smart contarcts."
                    )
                  }
                >
                  Contribute
                </Button>
              </form>
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
