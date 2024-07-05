import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
                    <Link
                      href="#"
                      className="text-primary hover:underline"
                      prefetch={false}
                    >
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
                    <Link
                      href="#"
                      className="text-primary hover:underline"
                      prefetch={false}
                    >
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
                    <Link
                      href="#"
                      className="text-primary hover:underline"
                      prefetch={false}
                    >
                      View Details
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
