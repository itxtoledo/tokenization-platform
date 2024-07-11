import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function UserContribution() {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-[100dvh]">
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
