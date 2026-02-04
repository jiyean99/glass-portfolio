import type React from "react";
import {
    ArrowUpRight,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Clock,
    Github,
} from "lucide-react";
import type { Project, ProjectCategory, Theme } from "../../types/portfolio";

type Props = {
    theme: Theme;
    pointColor: string;
    pointBg: string;
    pointBorder: string;
    pointFilterActive: string;
    glassProject: string;

    filterOptions: ProjectCategory[];
    activeFilter: ProjectCategory;
    setActiveFilter: (v: ProjectCategory) => void;

    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;

    currentProjects: Project[];
};

export default function ProjectsSection({
    theme,
    pointColor,
    pointBg,
    pointBorder,
    pointFilterActive,
    glassProject,
    filterOptions,
    activeFilter,
    setActiveFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    currentProjects,
}: Props) {
    return (
        <section id="projects" className="relative py-20 md:py-32 px-6 md:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 lg:mb-16 gap-8 lg:gap-10">
                    <div className="space-y-3 md:space-y-4">
                        <span
                            className={`${pointColor} font-mono text-xs md:text-sm tracking-widest uppercase block`}
                        >
                            03. Project
                        </span>
                        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
                            PROJECT
                            <br />
                            <span className={`italic ${pointColor}`}>ARCHIVE.</span>
                        </h2>
                    </div>

                    <div className="w-full lg:w-auto flex flex-col items-center lg:items-end gap-5 md:gap-6">
                        <div className="flex flex-wrap justify-center lg:justify-end gap-2 pointer-events-auto w-full max-w-md lg:max-w-none">
                            {filterOptions.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setActiveFilter(option)}
                                    className={`px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest transition-all border ${activeFilter === option
                                        ? pointFilterActive
                                        : theme === "dark"
                                            ? "bg-white/5 text-white/40 border-white/10 hover:border-white/30"
                                            : "bg-white/40 text-black/40 border-black/10 hover:border-black/30 backdrop-blur-md"
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex items-center gap-4 pointer-events-auto">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className={`p-2 rounded-full border transition-all ${theme === "dark"
                                        ? "border-white/10"
                                        : "border-black/10 bg-white/20 backdrop-blur-md"
                                        } ${currentPage === 1
                                            ? "opacity-20 cursor-not-allowed"
                                            : `hover:${pointBorder} hover:${pointColor}`
                                        }`}
                                >
                                    <ChevronLeft size={18} />
                                </button>

                                <span className="text-[9px] md:text-[10px] font-mono font-bold opacity-50 uppercase tracking-widest">
                                    <span className={pointColor}>{currentPage}</span> / {totalPages}
                                </span>

                                <button
                                    onClick={() =>
                                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                                    }
                                    disabled={currentPage === totalPages}
                                    className={`p-2 rounded-full border transition-all ${theme === "dark"
                                        ? "border-white/10"
                                        : "border-black/10 bg-white/20 backdrop-blur-md"
                                        } ${currentPage === totalPages
                                            ? "opacity-20 cursor-not-allowed"
                                            : `hover:${pointBorder} hover:${pointColor}`
                                        }`}
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-[500px]">
                    {currentProjects.map((project) => (
                        <div
                            key={project.title}
                            className={`group relative ${glassProject} border rounded-[35px] md:rounded-[40px] overflow-hidden transition-all duration-700 flex flex-col h-full animate-in fade-in slide-in-from-bottom-4`}
                        >
                            <div
                                className={`relative h-40 md:h-48 ${theme === "dark" ? "bg-[#0a120e]" : "bg-amber-400/5"
                                    } flex items-center justify-center overflow-hidden border-b ${theme === "dark" ? "border-white/5" : "border-white/90"
                                    }`}
                            >
                                <div
                                    className="absolute inset-0 opacity-10 group-hover:scale-110 transition-transform duration-700"
                                    style={{
                                        backgroundImage: `radial-gradient(circle at 2px 2px, ${theme === "dark" ? "#ffd700" : "#f59e0b"
                                            } 1px, transparent 0)`,
                                        backgroundSize: "24px 24px",
                                    }}
                                />

                                <div
                                    className={`relative w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl ${theme === "dark"
                                        ? "bg-white/5 border-white/10"
                                        : "bg-white/80 border-white/90 shadow-lg"
                                        } border flex items-center justify-center ${pointColor} group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
                                >
                                    {project.icon}
                                </div>
                            </div>

                            <div className="p-6 md:p-8 flex flex-col flex-grow">
                                <div className="flex justify-between items-center mb-3 md:mb-4">
                                    <span
                                        className={`text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-widest ${pointColor}`}
                                    >
                                        {project.category}
                                    </span>

                                    <div className="flex items-center gap-1.5 text-[8px] md:text-[9px] font-bold opacity-40 group-hover:opacity-80 transition-opacity">
                                        <Clock size={10} />
                                        <span>{project.period}</span>
                                    </div>
                                </div>

                                <h3
                                    className={`text-xl md:text-2xl font-black mb-1 group-hover:${pointColor} transition-colors uppercase tracking-tighter leading-tight`}
                                >
                                    {project.title}
                                </h3>

                                <div className="flex items-center gap-1.5 mb-3 md:mb-4 text-[10px] md:text-[11px] font-medium opacity-60">
                                    <CheckCircle2
                                        size={12}
                                        className={`${pointColor} opacity-80`}
                                    />
                                    <span>{project.contribution}</span>
                                </div>

                                <p className="opacity-50 font-light mb-6 md:mb-8 text-xs md:text-sm leading-relaxed line-clamp-2">
                                    {project.desc}
                                </p>

                                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-6 md:mb-8">
                                    {project.tech.map((t) => (
                                        <span
                                            key={t}
                                            className={`text-[8px] md:text-[9px] font-bold px-2 py-0.5 ${theme === "dark"
                                                ? "bg-white/5 border-white/5"
                                                : "bg-white/60 border-white/80 shadow-sm"
                                                } border rounded-md opacity-50`}
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto flex items-center gap-3">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 md:py-3 ${theme === "dark"
                                            ? "bg-white/5 border-white/10 hover:bg-white text-black"
                                            : "bg-black/5 border-black/10 hover:bg-black text-white shadow-sm"
                                            } rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all border`}
                                    >
                                        <Github size={12} /> Github
                                    </a>

                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 md:py-3 ${pointBg} text-white md:text-black border-transparent rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all border shadow-lg`}
                                    >
                                        Demo <ArrowUpRight size={12} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
