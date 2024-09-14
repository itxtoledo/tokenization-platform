import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-100 p-6 md:p-12 w-full">
        <div className="container max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-sm">
          {/* Company Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-gray-800">Company</h3>
            <Link to="/" className="text-gray-600 hover:text-gray-800 block">
              About Us
            </Link>
            <Link to="/" className="text-gray-600 hover:text-gray-800 block">
              Our Team
            </Link>
            <Link to="/" className="text-gray-600 hover:text-gray-800 block">
              Careers
            </Link>
            <Link to="/" className="text-gray-600 hover:text-gray-800 block">
              News
            </Link>
          </div>

          {/* Resources Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-gray-800">Resources</h3>
            <Link to="/" className="text-gray-600 hover:text-gray-800 block">
              Blog
            </Link>
            <Link to="/" className="text-gray-600 hover:text-gray-800 block">
              Community
            </Link>
            <Link to="/" className="text-gray-600 hover:text-gray-800 block">
              Support
            </Link>
            <Link to="/" className="text-gray-600 hover:text-gray-800 block">
              FAQs
            </Link>
          </div>

          {/* Legal Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-gray-800">Legal</h3>
            <Link to="/" className="text-gray-600 hover:text-gray-800 block">
              Privacy Policy
            </Link>
            <Link to="/" className="text-gray-600 hover:text-gray-800 block">
              Terms of Service
            </Link>
            <Link to="/" className="text-gray-600 hover:text-gray-800 block">
              Cookie Policy
            </Link>
          </div>

          {/* Contact Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-gray-800">Contact</h3>
            <Link
              to="/Form"
              className="text-gray-600 hover:text-gray-800 block"
            >
              Support
            </Link>
            <Link to="/" className="text-gray-600 hover:text-gray-800 block">
              Sales
            </Link>
            <Link to="/" className="text-gray-600 hover:text-gray-800 block">
              Press
            </Link>
            <Link to="/" className="text-gray-600 hover:text-gray-800 block">
              Partnerships
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
