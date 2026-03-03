import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignInPage from "@/app/[locale]/signin/page";
import { useLocale } from "next-intl";

// Mocks

const mockReplace = jest.fn();
const mockPathname = "/test-path";

jest.mock("@/i18n/navigation", () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({ replace: mockReplace }),
}));

jest.mock("next-intl", () => ({
  useLocale: jest.fn(),
  useTranslations: () => (key: string) => key,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href} {...props}>{children}</a>,
}));

jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt, ...props }: { src: string; alt: string }) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

jest.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuItem: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => <button onClick={onClick}>{children}</button>,
}));

jest.mock("@/components/ui/card", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("@/components/ui/label", () => ({
  Label: ({
    children,
    htmlFor,
  }: {
    children: React.ReactNode;
    htmlFor?: string;
  }) => <label htmlFor={htmlFor}>{children}</label>,
}));

jest.mock("@/components/ui/input", () => ({
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} />
  ),
}));

jest.mock("@/components/ui/checkbox", () => ({
  Checkbox: (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input type="checkbox" {...props} />
  ),
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props}>{children}</button>
  ),
}));

//Helper

function renderPage(locale = "fr") {
  jest.mocked(useLocale).mockReturnValue(locale);
  return render(<SignInPage />);
}

// Tests

describe("SignInPage [intégration]", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Assemblage des 3 composants

  describe("Assemblage des composants", () => {
    it("rend les 3 sections : navbar, formulaire, footer", () => {
      renderPage();
      expect(screen.getByRole("navigation", { name: "" }))
        .toBeInTheDocument(); // SignInNavbar
      expect(screen.getByRole("form", { name: /sign-in form/i }))
        .toBeInTheDocument(); // CardLogin
      expect(screen.getByRole("contentinfo"))
        .toBeInTheDocument(); // FooterSign
    });

    it("la navbar apparaît avant le formulaire dans le DOM", () => {
      renderPage();
      const navbar = screen.getByAltText("HealthNova Logo").closest("nav");
      const form   = screen.getByRole("form", { name: /sign-in form/i });
      expect(navbar!.compareDocumentPosition(form))
        .toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });

    it("le formulaire apparaît avant le footer dans le DOM", () => {
      renderPage();
      const form   = screen.getByRole("form", { name: /sign-in form/i });
      const footer = screen.getByRole("contentinfo");
      expect(form.compareDocumentPosition(footer))
        .toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });
  });

  //SignInNavbar

  describe("SignInNavbar", () => {
    it("affiche le logo HealthNova", () => {
      renderPage();
      expect(screen.getByAltText("HealthNova Logo")).toBeInTheDocument();
    });

    it("affiche le bouton Sign Up", () => {
      renderPage();
      expect(screen.getByRole("button", { name: /signup/i }))
        .toBeInTheDocument();
    });

    it("affiche le sélecteur de langue avec FR par défaut", () => {
      renderPage("fr");
      expect(screen.getByText("FR")).toBeInTheDocument();
    });

    it("affiche le sélecteur de langue avec EN", () => {
      renderPage("en");
      expect(screen.getByText("EN")).toBeInTheDocument();
    });

    it("affiche le sélecteur de langue avec AR", () => {
      renderPage("ar");
      expect(screen.getByText("AR")).toBeInTheDocument();
    });

    it("le clic sur 'English' appelle router.replace avec 'en'", () => {
      renderPage("fr");
      fireEvent.click(screen.getByText("🇬🇧 English"));
      expect(mockReplace).toHaveBeenCalledWith(
        { pathname: mockPathname },
        { locale: "en" }
      );
    });
  });

  // CardLogin

  describe("CardLogin", () => {
    it("affiche le titre 'Welcome back'", () => {
      renderPage();
      expect(screen.getByRole("heading", { name: /welcome back/i }))
        .toBeInTheDocument();
    });

    it("affiche le champ email", () => {
      renderPage();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    });

    it("affiche le champ password masqué par défaut", () => {
      renderPage();
      expect(screen.getByPlaceholderText("••••••••"))
        .toHaveAttribute("type", "password");
    });

    it("toggle Eye révèle le mot de passe", () => {
      renderPage();
      const passwordInput = screen.getByPlaceholderText("••••••••");
      const eyeIcon = passwordInput.parentElement
        ?.querySelector(".lucide-eye");
      fireEvent.click(eyeIcon!);
      expect(passwordInput).toHaveAttribute("type", "text");
    });

    it("affiche le lien 'Forgot password?'", () => {
      renderPage();
      expect(screen.getByRole("link", { name: /forgot password/i }))
        .toBeInTheDocument();
    });

    it("affiche la checkbox 'Remember me'", () => {
      renderPage();
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("affiche le bouton submit 'Login to Account'", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: /login to account/i })
      ).toHaveAttribute("type", "submit");
    });
  });

  // FooterSign

  describe("FooterSign", () => {
    it("affiche la nav footer avec aria-label", () => {
      renderPage();
      expect(
        screen.getByRole("navigation", { name: /footer navigation/i })
      ).toBeInTheDocument();
    });

    it.each([
      ["privacyPolicy", "/privacy"],
      ["termsService",  "/terms"  ],
      ["helpCenter",    "/help"   ],
    ])(
      "affiche le lien footer '%s' → '%s'",
      (translationKey, expectedHref) => {
        renderPage();
        expect(
          screen.getByRole("link", { name: translationKey })
        ).toHaveAttribute("href", expectedHref);
      }
    );

    it("affiche le texte de copyright", () => {
      renderPage();
      expect(screen.getByText("allrights")).toBeInTheDocument();
    });
  });

  // Accessibilité globale

  describe("Accessibilité globale", () => {
    it("le lien logo a un aria-label 'Home'", () => {
      renderPage();
      expect(screen.getByLabelText("Home")).toBeInTheDocument();
    });

    it("le champ email est lié à son label", () => {
      renderPage();
      expect(screen.getByLabelText(/email address/i))
        .toHaveAttribute("type", "email");
    });

    it("le champ password est lié à son label", () => {
      renderPage();
      expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    });

    it("la page contient au moins 4 liens au total", () => {
      renderPage();
      expect(screen.getAllByRole("link").length).toBeGreaterThanOrEqual(4);
    });
  });
});
