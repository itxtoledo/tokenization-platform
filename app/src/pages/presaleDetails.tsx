/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Zgl8IDg4DpD
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Header from "@/components/Header";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

export default function PresaleDetails() {
    return (
      <>
        <Header />
        <div className="flex flex-col min-h-[100dvh] bg-background text-foreground">
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
                      className="w-full bg-black text-zinc-400"
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
        </div>
        <Footer />
      </>
    );
}
