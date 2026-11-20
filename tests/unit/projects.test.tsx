import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectRail } from "@/components/ui/ProjectRail";
import { getFeaturedProjects } from "@/content/projects";
import { Project } from "@/types/project";

const mockProjectWithoutImage: Project = {
  slug: "test-proj",
  title: "Test System Proj",
  category: "Desktop Application",
  featured: true,
  status: "completed",
  shortDescription: "A test inventory recap application.",
  description: "Detailed system description.",
  image: "",
  technologies: ["C#", "SQLite", ".NET"],
  highlights: ["Fast local database"],
  githubUrl: "https://github.com/example/test-proj",
};

const mockProjectWithImage: Project = {
  ...mockProjectWithoutImage,
  slug: "test-img-proj",
  title: "Test Web Proj",
  image: "/images/projects/test.svg",
  liveUrl: "https://demo.example.com",
};

const mockProjectWithThumb: Project = {
  ...mockProjectWithoutImage,
  slug: "test-thumb-proj",
  title: "Test Thumb Proj",
  thumbnail: "/projects/test-thumb.png",
  liveUrl: "https://demo.example.com",
};

describe("ProjectCard Component", () => {
  it("renders intentional technical placeholder when image and thumbnail are omitted", () => {
    const { queryByRole, getByTestId } = render(<ProjectCard project={mockProjectWithoutImage} />);
    // Should NOT have a broken img element
    expect(queryByRole("img")).not.toBeInTheDocument();
    // Should render the styled technical placeholder with aria-hidden
    const placeholder = getByTestId("project-thumbnail-placeholder");
    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toHaveAttribute("aria-hidden", "true");
  });

  it("renders project image when image property is provided", () => {
    render(<ProjectCard project={mockProjectWithImage} />);
    const img = screen.getByRole("img", { name: /Test Web Proj preview/i });
    expect(img).toBeInTheDocument();
  });

  it("renders thumbnail image when thumbnail property is provided", () => {
    render(<ProjectCard project={mockProjectWithThumb} />);
    const img = screen.getByRole("img", { name: /Test Thumb Proj preview/i });
    expect(img).toBeInTheDocument();
  });

  it("renders project metadata, tags, and accessible action links", () => {
    render(<ProjectCard project={mockProjectWithoutImage} />);
    expect(screen.getByText("Test System Proj")).toBeInTheDocument();
    expect(screen.getByText("Desktop Application")).toBeInTheDocument();
    expect(screen.getByText("completed")).toBeInTheDocument();
    expect(screen.getByText("A test inventory recap application.")).toBeInTheDocument();
    expect(screen.getByText("C#")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /View source code for Test System Proj/i });
    expect(link).toHaveAttribute("href", "https://github.com/example/test-proj");
    expect(link).toHaveAttribute("target", "_blank");
  });
});

describe("ProjectRail Component", () => {
  beforeEach(() => {
    // Provide standard matchMedia implementation
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it("renders all featured projects in horizontal rail", () => {
    const featured = getFeaturedProjects();
    render(<ProjectRail projects={featured} />);

    // All current projects must render in the primary track
    expect(screen.getAllByText(/Lightweight Desktop Inventory System/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Outsole Catalog/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Manufacturing IT & Systems Operations/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Honda Satrya Dealer Group/i)[0]).toBeInTheDocument();
  });

  it("renders primary accessible cards and clone cards with inert/aria-hidden semantics", () => {
    const featured = getFeaturedProjects();
    render(<ProjectRail projects={featured} />);

    const primaryItems = screen.getAllByTestId("primary-project-item");
    const cloneItems = screen.getAllByTestId("clone-project-item");

    expect(primaryItems.length).toBe(featured.length);
    expect(cloneItems.length).toBe(featured.length);
    cloneItems.forEach((item) => {
      expect(item).toHaveAttribute("aria-hidden", "true");
      expect(item).toHaveAttribute("inert");
    });
  });

  it("renders navigation controls with accessible labels including pause/resume", () => {
    const featured = getFeaturedProjects();
    render(<ProjectRail projects={featured} />);

    const prevBtn = screen.getByRole("button", { name: "Previous projects" });
    const nextBtn = screen.getByRole("button", { name: "Next projects" });
    const pauseBtn = screen.getByRole("button", { name: /pause project carousel auto-scroll/i });

    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();
    expect(pauseBtn).toBeInTheDocument();
    expect(pauseBtn).toHaveAttribute("aria-pressed", "false");
  });

  it("toggles pause and resume states when pause button is activated", () => {
    const featured = getFeaturedProjects();
    render(<ProjectRail projects={featured} />);

    const pauseBtn = screen.getByRole("button", { name: /pause project carousel auto-scroll/i });
    expect(screen.getByText("Auto-scrolling")).toBeInTheDocument();

    // Click to pause
    fireEvent.click(pauseBtn);
    expect(pauseBtn).toHaveAttribute("aria-label", "Resume project carousel auto-scroll");
    expect(pauseBtn).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Auto-scroll paused")).toBeInTheDocument();

    // Click to resume
    fireEvent.click(pauseBtn);
    expect(pauseBtn).toHaveAttribute("aria-label", "Pause project carousel auto-scroll");
    expect(pauseBtn).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByText("Auto-scrolling")).toBeInTheDocument();
  });

  it("pauses auto-scroll on pointer hover and resumes on pointer leave", () => {
    const featured = getFeaturedProjects();
    render(<ProjectRail projects={featured} />);

    const rail = screen.getByTestId("project-rail");

    fireEvent.mouseEnter(rail);
    expect(screen.getByText("Hover paused")).toBeInTheDocument();

    fireEvent.mouseLeave(rail);
    expect(screen.getByText("Auto-scrolling")).toBeInTheDocument();
  });

  it("pauses auto-scroll on focus and resumes on blur", () => {
    const featured = getFeaturedProjects();
    render(<ProjectRail projects={featured} />);

    const rail = screen.getByTestId("project-rail");

    fireEvent.focus(rail);
    expect(screen.getByText("Focus paused")).toBeInTheDocument();

    fireEvent.blur(rail, { relatedTarget: document.body });
    expect(screen.getByText("Auto-scrolling")).toBeInTheDocument();
  });

  it("disables auto-scrolling when prefers-reduced-motion is active", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("prefers-reduced-motion: reduce"),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const featured = getFeaturedProjects();
    render(<ProjectRail projects={featured} />);

    expect(screen.getByText("Manual navigation")).toBeInTheDocument();
  });

  it("renders scrollable region with accessible label", () => {
    const featured = getFeaturedProjects();
    render(<ProjectRail projects={featured} />);

    const region = screen.getByRole("region", { name: /Featured projects horizontal rail/i });
    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute("data-testid", "project-rail");
  });
});
