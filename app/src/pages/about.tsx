/**
 * v0 by Vercel.
 * @see https://v0.dev/t/rInB4vX3l35
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
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
            <form className="space-y-4">
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
              <Button type="submit" className="w-full bg-black text-zinc-400">
                Mint Tokens
              </Button>
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
                href="#"
                className="inline-flex items-center gap-2 text-primary hover:underline"
                prefetch={false}
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
