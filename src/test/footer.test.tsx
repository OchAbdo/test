import React from "react";
import { render, screen } from "@testing-library/react";
import FooterSign from "@/components/footer";

// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key, // retourne la clé comme valeur
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

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("FooterSign [intégration]", () => {

  beforeEach(() => {
    render(<FooterSign />);
  });

  // ── Structure ──────────────────────────────────────────────────────────────

  describe("Structure", () => {
    it("rend un élément <footer>", () => {
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("rend une nav avec aria-label 'Footer Navigation'", () => {
      expect(
        screen.getByRole("navigation", { name: /footer navigation/i })
      ).toBeInTheDocument();
    });

    it("affiche le texte de copyright", () => {
      expect(screen.getByText("allrights")).toBeInTheDocument();
    });
  });

  // ── Liens de navigation ────────────────────────────────────────────────────

  describe("Liens de navigation", () => {
    it("affiche exactement 3 liens", () => {
      const nav = screen.getByRole("navigation", { name: /footer navigation/i });
      const links = nav.querySelectorAll("a");
      expect(links).toHaveLength(3);
    });

    it.each([
      ["privacyPolicy", "/privacy"],
      ["termsService",  "/terms"  ],
      ["helpCenter",    "/help"   ],
    ])(
      "affiche le lien '%s' avec le bon href '%s'",
      (translationKey, expectedHref) => {
        const link = screen.getByRole("link", { name: translationKey });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", expectedHref);
      }
    );
  });

  // ── Traductions ────────────────────────────────────────────────────────────

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

  // ── Accessibilité ──────────────────────────────────────────────────────────

  describe("Accessibilité", () => {
    it("tous les liens sont accessibles au clavier (role=link)", () => {
      const links = screen.getAllByRole("link");
      expect(links.length).toBeGreaterThanOrEqual(3);
    });

    it("le footer a le role 'contentinfo' implicite", () => {
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("la nav a un aria-label explicite", () => {
      const nav = screen.getByRole("navigation", { name: /footer navigation/i });
      expect(nav).toHaveAttribute("aria-label", "Footer Navigation");
    });
  });
});