// SignInNavbar.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SignInNavbar from "@/components/siginnavbar";
import { useLocale } from "next-intl";

// Mocks

const mockReplace = jest.fn();
const mockPathname = "/test-path";

jest.mock("@/i18n/navigation", () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({ replace: mockReplace }),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { src: string; alt: string }) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

jest.mock("next-intl", () => ({
  useLocale: jest.fn(),
  useTranslations: () => (key: string) => key,
}));


jest.mock("../components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownMenuItem: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => <button onClick={onClick}>{children}</button>,
}));

// Helper 

jest.mock("next-intl", () => ({
  useLocale: jest.fn(),
  useTranslations: () => (key: string) => key,
}));

function renderWithLocale(locale: string) {
  jest.mocked(useLocale).mockReturnValue(locale);
  return render(<SignInNavbar />);
}

// Tests 

describe("SignInNavbar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Rendu de base

  describe("Rendu de base", () => {
    it("affiche le logo avec le bon alt et src", () => {
      renderWithLocale("fr");
      const logo = screen.getByAltText("HealthNova Logo");
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute("src", "/logo_1.png");
    });

    it("le logo est un lien vers la page d'accueil", () => {
      renderWithLocale("fr");
      expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");
    });

    it("affiche le bouton Sign Up avec la traduction", () => {
      renderWithLocale("fr");
      expect(screen.getByRole("button", { name: /signup/i })).toBeInTheDocument();
    });

    it("affiche les 3 options de langue", () => {
      renderWithLocale("fr");
      expect(screen.getByText("🇬🇧 English")).toBeInTheDocument();
      expect(screen.getByText("🇫🇷 Français")).toBeInTheDocument();
      expect(screen.getByText("🇸🇦 العربية")).toBeInTheDocument();
    });
  });

  // Affichage du code langue 

  describe("Affichage du code langue", () => {
    it("affiche FR pour la locale 'fr'", () => {
      renderWithLocale("fr");
      expect(screen.getByText("FR")).toBeInTheDocument();
    });

    it("affiche EN pour la locale 'en'", () => {
      renderWithLocale("en");
      expect(screen.getByText("EN")).toBeInTheDocument();
    });

    it("affiche AR pour la locale 'ar'", () => {
      renderWithLocale("ar");
      expect(screen.getByText("AR")).toBeInTheDocument();
    });
  });

  // Changement de langue

  describe("Changement de langue", () => {
    it("appelle router.replace avec 'en' au clic sur English", () => {
      renderWithLocale("fr");
      fireEvent.click(screen.getByText("🇬🇧 English"));
      expect(mockReplace).toHaveBeenCalledTimes(1);
      expect(mockReplace).toHaveBeenCalledWith(
        { pathname: mockPathname },
        { locale: "en" }
      );
    });

    it("appelle router.replace avec 'fr' au clic sur Français", () => {
      renderWithLocale("en");
      fireEvent.click(screen.getByText("🇫🇷 Français"));
      expect(mockReplace).toHaveBeenCalledTimes(1);
      expect(mockReplace).toHaveBeenCalledWith(
        { pathname: mockPathname },
        { locale: "fr" }
      );
    });

    it("appelle router.replace avec 'ar' au clic sur العربية", () => {
      renderWithLocale("fr");
      fireEvent.click(screen.getByText("🇸🇦 العربية"));
      expect(mockReplace).toHaveBeenCalledTimes(1);
      expect(mockReplace).toHaveBeenCalledWith(
        { pathname: mockPathname },
        { locale: "ar" }
      );
    });

    it("n'appelle pas router.replace si aucun item n'est cliqué", () => {
      renderWithLocale("fr");
      expect(mockReplace).not.toHaveBeenCalled();
    });
  });

  //  Structure / accessibilité

  describe("Structure et accessibilité", () => {
    it("le lien logo a un aria-label 'Home'", () => {
      renderWithLocale("fr");
      expect(screen.getByLabelText("Home")).toBeInTheDocument();
    });
  });
});
