import Link from "next/link";
import Logo from "../common/Logo";
import { Button } from "../ui/button";
import ThemeToggle from "../common/ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/">Home</Link>
          <Link href="#">Templates</Link>
          <Link href="#">Marketplace</Link>
          <Link href="#">AI Builder</Link>
          <Link href="#">Pricing</Link>
        </nav>

       <div className="flex items-center gap-3">
    <ThemeToggle />

    <Button variant="ghost">
        Login
    </Button>

    <Button>
        Get Started
    </Button>
</div>

      </div>
    </header>
  );
}