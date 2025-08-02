import { Link } from "@tanstack/react-router";

import { ConnectButtonComponent } from "../components/ConnectButtonComponent";
import { MountainIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-md hidden md:flex">
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
      </div>
    </header>
  );
}


