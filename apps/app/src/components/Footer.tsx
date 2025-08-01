import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-100 p-6 md:p-12 w-full">
        <div className="container max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-sm">
          {/* Legal Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-gray-800">Legal</h3>
            <Link to="/" className="text-gray-600 hover:text-gray-800 block">
              Privacy Policy
            </Link>
            <Link to="/" className="text-gray-600 hover:text-gray-800 block">
              Terms of Service
            </Link>
          </div>
        </div>

        <div className="text-center mt-8 text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Tokenization Platform. All rights
          reserved.
        </div>
      </footer>
    </>
  );
}
