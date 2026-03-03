import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardLogin from "@/components/cardlogin";

// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock("next-intl", () => ({
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

jest.mock("@/components/ui/card", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
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

// ─── Helper ──────────────────────────────────────────────────────────────────

function renderComponent() {
  return render(<CardLogin />);
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("CardLogin [intégration]", () => {

  beforeEach(() => {
    renderComponent();
  });

  // ── Structure ──────────────────────────────────────────────────────────────

  describe("Structure", () => {
    it("affiche le titre 'Welcome back'", () => {
      expect(screen.getByRole("heading", { name: /welcome back/i }))
        .toBeInTheDocument();
    });

    it("affiche le formulaire avec aria-label 'Sign-In Form'", () => {
      expect(screen.getByRole("form", { name: /sign-in form/i }))
        .toBeInTheDocument();
    });

  });

  // ── Champs du formulaire ───────────────────────────────────────────────────

  describe("Champs du formulaire", () => {
    it("affiche le champ email avec le bon type", () => {
      const emailInput = screen.getByRole("textbox", { name: /email address/i });
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute("type", "email");
    });

    it("affiche le champ email avec le placeholder correct", () => {
      const emailInput = screen.getByPlaceholderText("name@company.com");
      expect(emailInput).toBeInTheDocument();
    });

    it("affiche le champ password avec le type 'password' par défaut", () => {
      const passwordInput = screen.getByPlaceholderText("••••••••");
      expect(passwordInput).toHaveAttribute("type", "password");
    });

    it("affiche le champ email comme requis", () => {
      const emailInput = screen.getByRole("textbox", { name: /email address/i });
      expect(emailInput).toBeRequired();
    });

    it("affiche le champ password comme requis", () => {
      const passwordInput = screen.getByPlaceholderText("••••••••");
      expect(passwordInput).toBeRequired();
    });

    it("affiche la checkbox 'Remember me'", () => {
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("la checkbox 'Remember me' est associée à son label", () => {
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("id", "remember");
      expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument();
    });
  });

  // ── Toggle mot de passe ────────────────────────────────────────────────────

  describe("Toggle visibilité du mot de passe", () => {
    it("le mot de passe est masqué par défaut", () => {
      const passwordInput = screen.getByPlaceholderText("••••••••");
      expect(passwordInput).toHaveAttribute("type", "password");
    });

    it("clic sur Eye → affiche le mot de passe en clair", () => {
      const passwordInput = screen.getByPlaceholderText("••••••••");
      // L'icône Eye est le seul svg cliquable quand password est masqué
      const eyeIcon = passwordInput.parentElement?.querySelector(".lucide-eye");
      fireEvent.click(eyeIcon!);
      expect(passwordInput).toHaveAttribute("type", "text");
    });

    it("clic sur EyeOff → remasque le mot de passe", () => {
      const passwordInput = screen.getByPlaceholderText("••••••••");
      const eyeIcon = passwordInput.parentElement?.querySelector(".lucide-eye");
      fireEvent.click(eyeIcon!);
      expect(passwordInput).toHaveAttribute("type", "text");

      const eyeOffIcon = passwordInput.parentElement?.querySelector(".lucide-eye-off");
      fireEvent.click(eyeOffIcon!);
      expect(passwordInput).toHaveAttribute("type", "password");
    });
  });

  // ── Liens ──────────────────────────────────────────────────────────────────

  describe("Liens", () => {
    it("affiche le lien 'Forgot password?'", () => {
      const link = screen.getByRole("link", { name: /forgot password/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "#");
    });
  });

  // ── Bouton de soumission ───────────────────────────────────────────────────

  describe("Bouton de soumission", () => {
    it("affiche le bouton 'Login to Account'", () => {
      expect(
        screen.getByRole("button", { name: /login to account/i })
      ).toBeInTheDocument();
    });

    it("le bouton est de type 'submit'", () => {
      expect(
        screen.getByRole("button", { name: /login to account/i })
      ).toHaveAttribute("type", "submit");
    });
  });

  // ── Accessibilité ──────────────────────────────────────────────────────────

  describe("Accessibilité", () => {
    it("le champ email est lié à son label via htmlFor/id", () => {
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    });

    it("le champ password est lié à son label via htmlFor/id", () => {
      expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    });

    it("le champ email a l'autoComplete 'email'", () => {
      const emailInput = screen.getByRole("textbox", { name: /email address/i });
      expect(emailInput).toHaveAttribute("autocomplete", "email");
    });

    it("le champ password a l'autoComplete 'current-password'", () => {
      const passwordInput = screen.getByPlaceholderText("••••••••");
      expect(passwordInput).toHaveAttribute("autocomplete", "current-password");
    });
  });
});