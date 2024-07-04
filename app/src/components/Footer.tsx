import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-muted py-6 w-full shrink-0">
      <div className="container px-4 md:px-6 flex items-center justify-between">
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Create Presale
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            My Contributions
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Admin Dashboard
          </Link>
        </nav>
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Presale Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
