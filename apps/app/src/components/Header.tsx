import { Link } from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-md">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8">
        {/* Logo - Hidden on small screens */}
        <Link
          to="/"
          className="hidden md:flex items-center gap-2"
        >
          <MountainIcon className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">Acme Inc</span>
        </Link>

        {/* Navigation for Medium and Larger Screens */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/About"
            className="text-sm font-medium text-gray-600 hover:text-orange-800 transition duration-150"
          >
            About
          </Link>
          <Link
            to="/PresaleCreation"
            className="text-sm font-medium text-gray-600 hover:text-orange-800 transition duration-150"
          >
            Presale Creation
          </Link>
          <Link
            to="/PresaleDetails"
            className="text-sm font-medium text-gray-600 hover:text-orange-800 transition duration-150"
          >
            Presale Details
          </Link>
        </nav>

        {/* Connect Button */}
        <div className="flex items-center space-x-4">
          <ConnectButton />
        </div>

        {/* Hamburger Menu for Mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6 text-gray-800" />
              <span className="sr-only">Open Menu</span>
            </Button>
          </SheetTrigger>

          {/* Mobile Menu Content */}
          <SheetContent side="left" className="md:hidden bg-white">
            <div className="p-4 space-y-4">
              {/* Mobile Logo */}
              <Link to="/" className="flex items-center gap-2">
                <MountainIcon className="h-8 w-8 text-blue-600" />
                <span className="text-lg font-bold text-gray-800">
                  Acme Inc
                </span>
              </Link>

              {/* Mobile Navigation Links */}
              <Link
                to="/"
                className="block text-sm font-medium text-gray-600 hover:text-orange-800 transition duration-150"
              >
                Home
              </Link>
              <Link
                to="/About"
                className="block text-sm font-medium text-gray-600 hover:text-orange-800 transition duration-150"
              >
                About
              </Link>
              <Link
                to="/PresaleCreation"
                className="block text-sm font-medium text-gray-600 hover:text-orange-800 transition duration-150"
              >
                Presale Creation
              </Link>
              <Link
                to="/PresaleDetails"
                className="block text-sm font-medium text-gray-600 hover:text-orange-800 transition duration-150"
              >
                Presale Details
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
