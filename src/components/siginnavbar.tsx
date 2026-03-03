"use client";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown, Globe } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import Link from "next/link";

function SignInNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  function switchLanguage(requestLocale: string) {
    router.replace({ pathname }, { locale: requestLocale });
  }
  const t = useTranslations("SignIn");
  const lang = locale === "ar" ? "AR" : locale === "en" ? "EN" : "FR";
  return (
    <nav
      className="flex items-center justify-between px-6 py-4 border-b border-[#125BE4] bg-white"
    >
      <Link href="/" aria-label="Home">
        <Image
          src="/logo_1.png"
          alt="HealthNova Logo"
          width={80}
          height={100}
        />
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Button Sign Up */}
        <Button className="bg-[#125BE4]">{t("signup")}</Button>

        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 w-20"
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase">{lang}</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => switchLanguage("en")}>
              🇬🇧 English
            </DropdownMenuItem>
            <DropdownMenuItem  onClick={() => switchLanguage("fr")}>
              🇫🇷 Français
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => switchLanguage("ar")}>
              🇸🇦 العربية
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default SignInNavbar;
