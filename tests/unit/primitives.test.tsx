import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

describe("UI Primitives & Layout Shell", () => {
  it("renders Button correctly as button and link", () => {
    const { rerender } = render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();

    rerender(
      <Button href="https://example.com" isExternal aria-label="Custom Link Label">
        External Link
      </Button>
    );
    const link = screen.getByRole("link", { name: /custom link label/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAttribute("aria-label", "Custom Link Label");
  });

  it("renders Badge with appropriate variant", () => {
    render(<Badge variant="accent">New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("renders SectionHeading with title, eyebrow, and description", () => {
    render(
      <SectionHeading
        eyebrow="SYSTEM SPEC"
        title="Architecture Foundation"
        description="Core design tokens and layout."
      />
    );
    expect(screen.getByText("SYSTEM SPEC")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /architecture foundation/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Core design tokens and layout.")).toBeInTheDocument();
  });

  it("renders Container with children and responsive class", () => {
    render(
      <Container>
        <p>Inner Content</p>
      </Container>
    );
    expect(screen.getByText("Inner Content")).toBeInTheDocument();
  });

  it("renders Navbar shell with brand and primary navigation items", () => {
    render(<Navbar />);
    expect(screen.getByRole("navigation", { name: /main navigation/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /projects/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contact/i })).toBeInTheDocument();
  });

  it("renders Footer shell with copyright and title", () => {
    render(<Footer />);
    expect(screen.getAllByText(/Moh Thoriqi Sahal/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Git-controlled/i)).toBeInTheDocument();
  });
});
