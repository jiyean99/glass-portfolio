import type { ReactNode } from "react";

export type Theme = "dark" | "light";

export type ProjectCategory = "All" | "Frontend" | "Backend" | "Data" | "Creative";

export type Project = {
    title: string;
    desc: string;
    contribution: string;
    period: string;
    tech: string[];
    category: Exclude<ProjectCategory, "All">;
    github: string;
    demo: string;
    icon: ReactNode;
};

export type BlogPost = {
    title: string;
    excerpt: string;
    date: string;
    tags: string[];
    link: string;
};
