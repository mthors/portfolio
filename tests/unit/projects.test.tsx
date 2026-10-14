import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
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
  it("renders all featured projects in horizontal rail", () => {
    const featured = getFeaturedProjects();
    render(<ProjectRail projects={featured} />);

    // All current projects must render
    expect(screen.getByText(/Lightweight Desktop Inventory System/i)).toBeInTheDocument();
    expect(screen.getByText(/Outsole Catalog/i)).toBeInTheDocument();
    expect(screen.getByText(/Manufacturing IT & Systems Operations/i)).toBeInTheDocument();
  });

  it("renders navigation controls with accessible labels", () => {
    const featured = getFeaturedProjects();
    render(<ProjectRail projects={featured} />);

    const prevBtn = screen.getByRole("button", { name: "Previous projects" });
    const nextBtn = screen.getByRole("button", { name: "Next projects" });

    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();
  });

  it("renders scrollable region with accessible label", () => {
    const featured = getFeaturedProjects();
    render(<ProjectRail projects={featured} />);

    const region = screen.getByRole("region", { name: /Featured projects horizontal rail/i });
    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute("data-testid", "project-rail");
  });
});
