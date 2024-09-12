
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import ContentForm from "./form";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function About() {
  
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-[100dvh]">
        <main className="flex-1 py-12 md:py-24 lg:py-32">
          

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
                <h2 className="text-2xl font-bold mb-4">About Token Minting</h2>
                <p className="text-muted-foreground">
                  The token minting feature allows the platform owner to create
                  new tokens as needed for the presale. This can be used to
                  distribute tokens to participants or to adjust the total
                  supply as the presale progresses.
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
              <div className="rounded-md border bg-background p-6 shadow-sm">
                <h2 className="text-xl font-bold">Contact Support</h2>
                <p className="mt-2 text-muted-foreground">
                  Have a question or need help with your presale campaign? Fill
                  out the form below and our support team will get back to you
                  within 1 business day.
                </p>
                <ContentForm />
              </div>
            </div>
          </div>

          <div className="container px-4 md:px-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  About Your Presale Contributions
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
                        <p className="text-sm font-medium">
                          Amount Contributed
                        </p>
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
                        <p className="text-sm font-medium">
                          Amount Contributed
                        </p>
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
                        <p className="text-sm font-medium">
                          Amount Contributed
                        </p>
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
