import { Link } from "@tanstack/react-router";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { ConnectButtonComponent } from "../components/ConnectButtonComponent";
import { MenuIcon, MountainIcon } from "lucide-react";

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
          <span className="text-xl font-bold text-gray-800">Tokenization Platform</span>
        </Link>

        {/* Navigation for Medium and Larger Screens */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/presales"
            className="text-sm font-medium text-gray-600 hover:text-orange-800 transition duration-150"
          >
            All Presales
          </Link>
          <Link
            to="/presale-creation"
            className="text-sm font-medium text-gray-600 hover:text-orange-800 transition duration-150"
          >
            Presale Creation
          </Link>
          <Link
            to="/my-tokens"
            className="text-sm font-medium text-gray-600 hover:text-orange-800 transition duration-150"
          >
            My Tokens
          </Link>
        </nav>

        {/* Connect Button */}
        <div className="flex items-center space-x-4">
          <ConnectButtonComponent />
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
                  Tokenization Platform
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
                to="/presales"
                className="block text-sm font-medium text-gray-600 hover:text-orange-800 transition duration-150"
              >
                All Presales
              </Link>
              <Link
                to="/presale-creation"
                className="block text-sm font-medium text-gray-600 hover:text-orange-800 transition duration-150"
              >
                Presale Creation
              </Link>
              <Link
                to="/my-tokens"
                className="block text-sm font-medium text-gray-600 hover:text-orange-800 transition duration-150"
              >
                My Tokens
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}


