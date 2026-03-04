import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignInPage from "@/app/[locale]/signin/page";

//Types

interface ImageProps {
  src: string;
  alt: string;
}
interface IconProps {
  className?: string;
  onClick?: () => void;
}

// Mocks

jest.mock("@/i18n/navigation", () => ({
  usePathname: () => "/signin",
  useRouter: () => ({ replace: jest.fn() }),
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      "Welcome back": "Welcome back",
      "Please enter your details to": "Please enter your details to",
      login: "login",
      "Email Address": "Email Address",
      Password: "Password",
      "Forgot password?": "Forgot password?",
      "Remember me for 30 days": "Remember me for 30 days",
      "Login to Account": "Login to Account",
      signup: "Sign Up",
      privacyPolicy: "Privacy Policy",
      termsService: "Terms of Service",
      helpCenter: "Help Center",
      allrights: "© 2026 HealthNova",
    };
    return translations[key] ?? key;
  },
  useLocale: jest.fn().mockReturnValue("fr"),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt }: ImageProps) => <img src={src} alt={alt} />,
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
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock("lucide-react", () => {
  const icon = (name: string) => {
    function Icon({ className, onClick }: IconProps) {
      return (
        <svg
          data-testid={`icon-${name}`}
          className={className}
          onClick={onClick}
        />
      );
    }
    Icon.displayName = `Icon-${name}`; 
    return Icon;
  };
  return {
    LogIn: icon("login"),
    Mail: icon("mail"),
    Lock: icon("lock"),
    Eye: icon("eye"),
    EyeOff: icon("eye-off"),
    Globe: icon("globe"),
    ChevronDown: icon("chevron-down"),
  };
});

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
  }) => (
    <button role="menuitem" onClick={onClick}>
      {children}
    </button>
  ),
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

// Setup

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => undefined);
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

const renderPage = () => render(<SignInPage />);

// Tests

describe("Intégration - Structure", () => {
  it("page se rend sans crash", () => {
    expect(() => renderPage()).not.toThrow();
  });

  it("rend les 3 sections : navbar, formulaire, footer", () => {
    renderPage();

    const navs = screen.getAllByRole("navigation");
    expect(navs).toHaveLength(2);

    expect(
      screen.getByRole("form", { name: /sign-in form/i }),
    ).toBeInTheDocument();

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("navbar en premier, footer en dernier", () => {
    const { container } = renderPage();
    expect(container.firstChild?.nodeName.toLowerCase()).toBe("nav");
    expect(container.lastChild?.nodeName.toLowerCase()).toBe("footer");
  });

  it("navbar apparaît avant le formulaire dans le DOM", () => {
    renderPage();
    const navbar = screen.getAllByRole("navigation")[0];
    const form = screen.getByRole("form", { name: /sign-in form/i });
    expect(navbar.compareDocumentPosition(form)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });

  it("formulaire apparaît avant le footer dans le DOM", () => {
    renderPage();
    const form = screen.getByRole("form", { name: /sign-in form/i });
    const footer = screen.getByRole("contentinfo");
    expect(form.compareDocumentPosition(footer)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });
});
