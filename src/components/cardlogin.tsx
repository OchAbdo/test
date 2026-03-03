"use client";
import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Link from "next/link";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";

function CardLogin() {
  const t = useTranslations("SignIn");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-8 space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="bg-blue-100 p-4 rounded-full">
              <LogIn className="text-blue-600 w-6 h-6" aria-hidden="true" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl font-bold">{t("Welcome back")}</h1>
            <p className="text-sm text-gray-500">
              {t("Please enter your details to")}{" "}
              <span className="text-[#125BE4] font-medium">{t("login")}</span>.
            </p>
          </div>

          <form aria-label="Sign-In Form" className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">{t("Email Address")}</Label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-3 w-4 h-4 text-gray-400"
                  aria-hidden="true"
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  className="pl-10"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">{t("Password")}</Label>
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-3 w-4 h-4 text-gray-400"
                  aria-hidden="true"
                />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  required
                  autoComplete="current-password"
                />
                {showPassword ? (
                  <EyeOff
                    className="absolute right-3 top-3 w-4 h-4 text-gray-400 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <Eye
                    className="absolute right-3 top-3 w-4 h-4 text-gray-400 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
              <div
                className={`pt-2`}
              >
                <Link
                  href="#"
                  className="text-sm text-[#125BE4] hover:underline"
                >
                  {t("Forgot password?")}
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm font-normal">
                {t("Remember me for 30 days")}
              </Label>
            </div>

            {/* Button */}
            <Button type="submit" className="w-full bg-[#125BE4]">
              {t("Login to Account")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CardLogin;
