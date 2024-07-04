/**
 * v0 by Vercel.
 * @see https://v0.dev/t/AKgNDvr2ZWe
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
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
        </nav>
      </header>
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Create a New Presale
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Fill out the form below to create a new presale for your token.
              </p>
            </div>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tokenName">Token Name</Label>
                <Input
                  id="tokenName"
                  placeholder="Enter your token name"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  The name of your token that will be displayed.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tokenSymbol">Token Symbol</Label>
                <Input
                  id="tokenSymbol"
                  placeholder="Enter your token symbol"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  The unique ticker symbol for your token.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="initialSupply">Initial Supply</Label>
                <Input
                  id="initialSupply"
                  type="number"
                  placeholder="Enter the initial supply"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  The total number of tokens that will be created.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tokenPrice">Token Price</Label>
                <Input
                  id="tokenPrice"
                  type="number"
                  placeholder="Enter the token price"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  The price per token in the presale.
                </p>
              </div>
              <Button
                type="submit"
                className="w-full"
                onClick={(e) => {
                  e.preventDefault();
                  alert("createPresale();");
                }}
              >
                Create Presale
              </Button>
            </form>
          </div>
        </div>
      </main>
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
