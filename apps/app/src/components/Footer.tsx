import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="bg-muted p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <Link href="#">
              About Us
            </Link>
            <Link href="#">
              Our Team
            </Link>
            <Link href="#">
              Careers
            </Link>
            <Link href="#">
              News
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Products</h3>
            <Link href="#">
              Men
            </Link>
            <Link href="#">
              Women
            </Link>
            <Link href="#">
              Kids
            </Link>
            <Link href="#">
              Accessories
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <Link href="#">
              Blog
            </Link>
            <Link href="#">
              Community
            </Link>
            <Link href="#">
              Support
            </Link>
            <Link href="#">
              FAQs
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <Link href="#">
              Privacy Policy
            </Link>
            <Link href="#">
              Terms of Service
            </Link>
            <Link href="#">
              Cookie Policy
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Contact</h3>
            <Link href="#">
              Support
            </Link>
            <Link href="#">
              Sales
            </Link>
            <Link href="#">
              Press
            </Link>
            <Link href="#">
              Partnerships
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
