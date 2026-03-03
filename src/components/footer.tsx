import { useTranslations } from "next-intl";
import Link from "next/link";

function FooterSign() {
  const t = useTranslations("SignIn");

  return (
    <footer className="bg-white py-6 ">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Links */}
        <nav
          aria-label="Footer Navigation"
          className="flex justify-center gap-8 text-sm text-gray-600"
        >
          <Link href="/privacy" className="hover:text-[#125BE4] transition">
            {t("privacyPolicy")}
          </Link>

          <Link href="/terms" className="hover:text-[#125BE4] transition">
            {t("termsService")}
          </Link>

          <Link href="/help" className="hover:text-[#125BE4] transition">
            {t("helpCenter")}
          </Link>
        </nav>

        {/* Copyright */}
        <p className="text-xs text-gray-500 mt-4">{t("allrights")}</p>
      </div>
    </footer>
  );
}

export default FooterSign;
