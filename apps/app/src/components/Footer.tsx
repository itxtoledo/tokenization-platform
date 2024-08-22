import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="bg-muted p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <Link to="/">About Us</Link>
            <Link to="/">Our Team</Link>
            <Link to="/">Careers</Link>
            <Link to="/">News</Link>
          </div>

          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <Link to="/">Blog</Link>
            <Link to="/">Community</Link>
            <Link to="/">Support</Link>
            <Link to="/">FAQs</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms of Service</Link>
            <Link to="/">Cookie Policy</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Contact</h3>
            <Link to="/Form">Support</Link>
            <Link to="/">Sales</Link>
            <Link to="/">Press</Link>
            <Link to="/">Partnerships</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
