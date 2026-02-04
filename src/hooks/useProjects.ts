import { useEffect, useMemo, useState, type SetStateAction } from "react";
import type { Project, ProjectCategory } from "../types/portfolio";

const FILTER_OPTIONS: ProjectCategory[] = [
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

    const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");
    const [currentPage, setCurrentPage] = useState(1);

    const [projectsPerPage, setProjectsPerPage] = useState(() =>
        typeof window === "undefined" ? 3 : calcPerPage(window.innerWidth)
    );

    // App에 있던 resize 로직을 훅으로 이동 [file:1]
    useEffect(() => {
        const updatePerPage = () => setProjectsPerPage(calcPerPage(window.innerWidth));
        updatePerPage();
        window.addEventListener("resize", updatePerPage);
        return () => window.removeEventListener("resize", updatePerPage);
    }, []);

    const filteredProjects = useMemo(() => {
        return activeFilter === "All"
            ? allProjects
            : allProjects.filter((p) => p.category === activeFilter);
    }, [activeFilter, allProjects]);

    const totalPages = useMemo(() => {
        return Math.ceil(filteredProjects.length / projectsPerPage);
    }, [filteredProjects.length, projectsPerPage]);

    const currentProjects = useMemo(() => {
        return filteredProjects.slice(
            (currentPage - 1) * projectsPerPage,
            currentPage * projectsPerPage
        );
    }, [filteredProjects, currentPage, projectsPerPage]);

    const handleFilterChange = (filter: SetStateAction<ProjectCategory>) => {
        setActiveFilter(filter as ProjectCategory);
        setCurrentPage(1);
    };

    // totalPages가 줄어들 때 currentPage 보정 (빈 목록 방지)
    useEffect(() => {
        setCurrentPage((p) => Math.min(p, Math.max(1, totalPages)));
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
