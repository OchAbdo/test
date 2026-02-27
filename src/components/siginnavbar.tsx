"use client";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

function SignInNavbar() {
  let [language, setlanguage] = useState("EN");
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-[#125BE4] bg-white">
      <Image src="/logo_1.png" alt="HealthNova Logo" width={80} height={100} />

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/*Button Sign Up*/}
        <Button className="bg-[#125BE4] ">Sign Up</Button>
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 w-20">
              <Globe className="h-4 w-4" />
              {language}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setlanguage("EN")}>
              EN
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setlanguage("FR")}>
              FR
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setlanguage("AR")}>
              AR
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default SignInNavbar;
