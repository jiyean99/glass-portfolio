import { useEffect, useMemo, useState } from "react";
import type { Project, ProjectCategory } from "../types/portfolio";

type ProjectFilter = "All" | ProjectCategory;

const FILTER_OPTIONS: ProjectFilter[] = [
    "All",
    "Frontend",
    "Backend",
    "Data",
    "Creative",
];

function calcPerPage(width: number) {
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return 3;
}

export function useProjects(allProjects: Project[]) {
    const filterOptions = FILTER_OPTIONS;

    const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
    const [currentPage, setCurrentPage] = useState(1);

    const [projectsPerPage, setProjectsPerPage] = useState(() =>
        typeof window === "undefined" ? 3 : calcPerPage(window.innerWidth)
    );

    useEffect(() => {
        const updatePerPage = () => setProjectsPerPage(calcPerPage(window.innerWidth));
        updatePerPage();
        window.addEventListener("resize", updatePerPage);
        return () => window.removeEventListener("resize", updatePerPage);
    }, []);

    const filteredProjects = useMemo(() => {
        if (activeFilter === "All") return allProjects;
        return allProjects.filter((p) => p.category.includes(activeFilter));
    }, [activeFilter, allProjects]);

    const totalPages = useMemo(() => {
        return Math.max(1, Math.ceil(filteredProjects.length / projectsPerPage));
    }, [filteredProjects.length, projectsPerPage]);

    const currentProjects = useMemo(() => {
        return filteredProjects.slice(
            (currentPage - 1) * projectsPerPage,
            currentPage * projectsPerPage
        );
    }, [filteredProjects, currentPage, projectsPerPage]);

    const handleFilterChange = (filter: ProjectFilter) => {
        setActiveFilter(filter);
        setCurrentPage(1);
    };

    useEffect(() => {
        setCurrentPage((p) => Math.min(p, totalPages));
    }, [totalPages]);

    return {
        filterOptions,
        activeFilter,
        setActiveFilter: handleFilterChange,
        currentPage,
        setCurrentPage,
        projectsPerPage,
        filteredProjects,
        currentProjects,
        totalPages,
    };
}
