//import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";
const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-16 bg-purple-600 text-white px-6">
      <div className="w-1/3"></div>

      <ul className="flex space-x-6">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      <div className="w-1/3 flex justify-end">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
