/**
 * v0 by Vercel.
 * @see https://v0.dev/t/RnwWadF46WG
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Link } from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to={"/"} className="items-center gap-2 hidden md:flex">
          <MountainIcon className="h-6 w-6" />
          <span className="text-lg font-bold">Acme Inc</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to={"/About"} className="text-sm font-medium hover:underline">
            About
          </Link>
          <Link
            to={"/AdminDashboard"}
            className="text-sm font-medium hover:underline"
          >
            Admin Dashboard
          </Link>
          <Link to={"/FAQ"} className="text-sm font-medium hover:underline">
            FAQ
          </Link>
          <Link to={"/"} className="text-sm font-medium hover:underline">
            Home
          </Link>
          <Link
            to={"/PresaleCreation"}
            className="text-sm font-medium hover:underline"
          >
            Presale Creation
          </Link>
          <Link
            to={"/PresaleDetails"}
            className="text-sm font-medium hover:underline"
          >
            Presale Details
          </Link>
          <Link
            to={"/TokenManagement"}
            className="text-sm font-medium hover:underline"
          >
            Token Management
          </Link>
          <Link
            to={"/UserContribution"}
            className="text-sm font-medium hover:underline"
          >
            User Contribution
          </Link>
        </nav>
        <ConnectButton />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="md:hidden bg-white">
            <div className="grid gap-4 p-4">
              <Link to={"/"} className="flex items-center gap-2 ">
                <MountainIcon className="h-6 w-6" />
                <span className="text-lg font-bold">Acme Inc</span>
              </Link>
              <Link
                to={"/About"}
                className="text-sm font-medium hover:underline"
              >
                About
              </Link>
              <Link
                to={"/AdminDashboard"}
                className="text-sm font-medium hover:underline"
              >
                Admin Dashboard
              </Link>
              <Link to={"/FAQ"} className="text-sm font-medium hover:underline">
                FAQ
              </Link>
              <Link to={"/"} className="text-sm font-medium hover:underline">
                Home
              </Link>
              <Link
                to={"/PresaleCreation"}
                className="text-sm font-medium hover:underline"
              >
                Presale Creation
              </Link>
              <Link
                to={"/PresaleDetails"}
                className="text-sm font-medium hover:underline"
              >
                Presale Details
              </Link>
              <Link
                to={"/TokenManagement"}
                className="text-sm font-medium hover:underline"
              >
                Token Management
              </Link>
              <Link
                to={"/UserContribution"}
                className="text-sm font-medium hover:underline"
              >
                User Contribution
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function MenuIcon(props: any) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
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
