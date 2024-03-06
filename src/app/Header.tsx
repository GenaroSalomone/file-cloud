import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import React from "react";

const Header = () => {
  return (
    <header className="border-b py-4 bg-gray-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1>FileCloud</h1>
        <nav className="flex gap-2">
          <OrganizationSwitcher />
          <UserButton />
        </nav>
      </div>
    </header>
  );
};

export default Header;
