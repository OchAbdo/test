import React from "react";
import { render, screen } from "@testing-library/react";
import FooterSign from "@/components/footer";

// Mocks

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
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Tests 

describe("FooterSign [intégration]", () => {
  beforeEach(() => {
    render(<FooterSign />);
  });

  // Structure 

  describe("Structure", () => {
    it("rend un élément <footer>", () => {
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("affiche le texte de copyright", () => {
      expect(screen.getByText("allrights")).toBeInTheDocument();
    });
  });

  // Liens de navigation 

  describe("Liens de navigation", () => {
    it("affiche exactement 3 liens", () => {
      const nav = screen.getByRole("navigation", {
        name: /footer navigation/i,
      });
      const links = nav.querySelectorAll("a");
      expect(links).toHaveLength(3);
    });
  });

  // Traductions

  describe("Traductions", () => {
    it("appelle t() avec la clé 'privacyPolicy'", () => {
      expect(screen.getByText("privacyPolicy")).toBeInTheDocument();
    });

    it("appelle t() avec la clé 'termsService'", () => {
      expect(screen.getByText("termsService")).toBeInTheDocument();
    });

    it("appelle t() avec la clé 'helpCenter'", () => {
      expect(screen.getByText("helpCenter")).toBeInTheDocument();
    });

    it("appelle t() avec la clé 'allrights'", () => {
      expect(screen.getByText("allrights")).toBeInTheDocument();
    });
  });
});
