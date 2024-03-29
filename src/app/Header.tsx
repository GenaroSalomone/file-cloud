import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useSession,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="relative z-10 border-b py-4 bg-gray-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex gap-2 items-center">
          <Image src="/logo.png" width="40" height="40" alt="filecloud logo" />
          <h1 className="text-xl">FileCloud</h1>
        </Link>

        <SignedIn>
          <Link href="/dashboard/files">
            <Button variant="outline">Your files</Button>
          </Link>
        </SignedIn>

        <nav className="flex gap-2">
          <OrganizationSwitcher />
          <UserButton />
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </nav>
      </div>
    </header>
  );
};

export default Header;
