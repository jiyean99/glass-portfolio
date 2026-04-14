import type React from "react";
import { useEffect, useRef, useState } from "react";
import {
    ArrowUpRight,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Clock,
    Github,
    X,
} from "lucide-react";
import type { Project, ProjectCategory, Theme } from "../../types/portfolio";

type ProjectFilter = "All" | ProjectCategory;

type Props = {
    theme: Theme;
    pointColor: string;
    pointBg: string;
    pointBorder: string;
    pointFilterActive: string;
    glassProject: string;

    filterOptions: ProjectFilter[];
    activeFilter: ProjectFilter;
    setActiveFilter: (v: ProjectFilter) => void;

    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;

    currentProjects: Project[];
};

type ProjectDetail = {
    intro: string;
    role: string;
    outcomes: string[];
    previewImages: string[];
};

const PROJECT_DETAIL_MAP: Record<string, ProjectDetail> = {
    "Gymkkong : 헬스장 운영 DB 설계": {
        intro: "헬스장 운영 핵심 데이터를 구조화하고, 지점-회원-트레이너-강좌 간 관계를 정합성 있게 설계한 데이터 중심 프로젝트입니다.",
        role: "DB 모델링, DDL/프로시저 설계 및 동작 검증 담당",
        outcomes: [
            "핵심 엔티티 관계를 정규화해 운영 데이터 확장성과 조회 효율을 확보했습니다.",
            "DDL/프로시저를 통해 예약/운영 시나리오를 검증해 초기 데이터 무결성을 강화했습니다.",
            "팀 협업에 필요한 DB 규칙과 기준 테이블 구조를 문서화했습니다.",
        ],
        previewImages: [
            "/mock/gymkkkong/project-preview-gymkkong.png",
        ],
    },
    "Articket : 공연 예매 플랫폼": {
        intro: "실시간 좌석 배정과 결제 플로우를 중심으로, 사용자 예매 경험과 운영자 관리 기능을 함께 고려해 설계한 공연 예매 플랫폼입니다.",
        role: "팀장, 백엔드 아키텍처 및 핵심 예매 API 구현 주도",
        outcomes: [
            "좌석/예약/결제 핵심 흐름을 안정적으로 연결해 예매 처리 일관성을 높였습니다.",
            "운영 관점의 관리자 기능과 서비스 구조를 정리해 유지보수성을 개선했습니다.",
            "인프라 구성과 코드 리뷰를 병행해 팀 개발 생산성과 품질을 끌어올렸습니다.",
        ],
        previewImages: [
            "/mock/dashboard/project-preview-dashboard-1.png",
            "/mock/dashboard/project-preview-dashboard-2.png",
        ],
    },
    "Workforce : B2B HR 플랫폼": {
        intro: "B2B 인사관리 도메인을 기준으로 인증/조직/대시보드 흐름을 통합해 설계한 HR 프로젝트입니다.",
        role: "Spring + FastAPI 백엔드 연동, 핵심 API/인증 구조 구현 및 프론트 협업",
        outcomes: [
            "Spring Boot와 FastAPI를 역할 분리해 운영 가능한 백엔드 구조를 구성했습니다.",
            "Spring Security/JWT 기반 인증 흐름과 조직 데이터 처리 로직을 정리했습니다.",
            "Vue 대시보드 연동과 AWS 리소스 구성을 통해 실서비스 형태에 가까운 개발 경험을 확보했습니다.",
        ],
        previewImages: [
            "/mock/project-preview-dashboard.svg",
            "/mock/project-preview-unity.svg",
        ],
    },
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
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [activePreviewIndex, setActivePreviewIndex] = useState(0);
    const [expandedPreviewImage, setExpandedPreviewImage] = useState<string | null>(null);
    const [isExpandedZoomed, setIsExpandedZoomed] = useState(false);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const panStartRef = useRef({ x: 0, y: 0 });
    const panOriginRef = useRef({ x: 0, y: 0 });

    const toAssetUrl = (path: string) =>
        `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

    useEffect(() => {
        if (!selectedProject) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (event: KeyboardEvent) => {
            if (expandedPreviewImage && event.key === "Escape") {
                setExpandedPreviewImage(null);
                setIsExpandedZoomed(false);
                setPanOffset({ x: 0, y: 0 });
                return;
            }

            if (event.key === "Escape") {
                setSelectedProject(null);
                return;
            }

            const detail = PROJECT_DETAIL_MAP[selectedProject.title];
            if (!detail || detail.previewImages.length < 2) return;

            if (event.key === "ArrowLeft") {
                setActivePreviewIndex((prev) =>
                    prev === 0 ? detail.previewImages.length - 1 : prev - 1
                );
                setIsExpandedZoomed(false);
                setPanOffset({ x: 0, y: 0 });
            }
            if (event.key === "ArrowRight") {
                setActivePreviewIndex((prev) =>
                    prev === detail.previewImages.length - 1 ? 0 : prev + 1
                );
                setIsExpandedZoomed(false);
                setPanOffset({ x: 0, y: 0 });
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = originalOverflow;
        };
    }, [selectedProject]);

    useEffect(() => {
        setActivePreviewIndex(0);
        setExpandedPreviewImage(null);
        setIsExpandedZoomed(false);
        setPanOffset({ x: 0, y: 0 });
    }, [selectedProject?.title]);

    return (
        <section id="projects" className="relative py-20 md:py-32 px-6 md:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 lg:mb-16 gap-8 lg:gap-10">
                    <div className="space-y-3 md:space-y-4">
                        <span className={`${pointColor} font-mono text-xs md:text-sm tracking-widest uppercase block`}>
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
                                    onClick={() => {
                                        setActiveFilter(option);
                                        setCurrentPage(1);
                                    }}
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
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
                                        {project.category.join(" · ")}
                                    </span>

                                    <div className="flex items-center gap-1.5 text-[8px] md:text-[9px] font-bold opacity-40 group-hover:opacity-80 transition-opacity">
                                        <Clock size={10} />
                                        <span>{project.period}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl md:text-2xl font-black mb-1 uppercase tracking-tighter leading-tight">
                                    {project.title}
                                </h3>

                                <div className="flex items-center gap-1.5 mb-3 md:mb-4 text-[10px] md:text-[11px] font-medium opacity-60">
                                    <CheckCircle2 size={12} className={`${pointColor} opacity-80`} />
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
                                            ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                                            : "bg-white/85 border-black/10 text-black hover:bg-black/5 shadow-sm"
                                            } rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all border`}
                                    >
                                        <Github size={12} /> Github
                                    </a>

                                    <a
                                        href="#"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            setSelectedProject(project);
                                        }}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 md:py-3 ${pointBg} text-white md:text-black border-transparent rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all border shadow-lg`}
                                    >
                                        View More <ArrowUpRight size={12} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedProject ? (
                <div
                    className={`fixed inset-0 z-[220] flex items-center justify-center p-0 md:p-8 ${theme === "dark"
                        ? "bg-black/80 backdrop-blur-sm"
                        : "bg-[#f8f8f8]/75 backdrop-blur-[2px]"
                        }`}
                    onClick={() => setSelectedProject(null)}
                    role="presentation"
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${selectedProject.title} 상세 정보`}
                        className={`${theme === "dark"
                            ? "bg-white/[0.03] border-white/10"
                            : "bg-white/70 border-white/90"
                            } relative w-full h-[100dvh] max-h-[100dvh] md:h-auto md:max-h-[88vh] max-w-none md:max-w-5xl border-0 md:border rounded-none md:rounded-[30px] overflow-hidden shadow-none md:shadow-[0_16px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl`}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setSelectedProject(null)}
                            className={`absolute top-4 right-4 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full border inline-flex items-center justify-center ${theme === "dark"
                                ? "border-white/25 bg-black/35 text-white"
                                : "border-black/15 bg-white/85 text-[#111111]"
                                }`}
                            aria-label="프로젝트 상세 닫기"
                        >
                            <X size={16} />
                        </button>

                        {(() => {
                            const detail = PROJECT_DETAIL_MAP[selectedProject.title];
                            const previewImages = detail?.previewImages ?? ["/mock/project-preview-running.svg"];
                            const previewImage = previewImages[activePreviewIndex] ?? previewImages[0];
                            return (
                                <div className="grid md:grid-cols-[1.05fr_0.95fr] h-full overflow-y-auto md:overflow-hidden">
                                    <div className="px-5 pt-16 pb-6 md:px-8 md:py-8 overflow-visible md:overflow-y-auto border-b md:border-b-0 md:border-r border-white/10">
                                        <p className={`text-[10px] md:text-xs font-black uppercase tracking-widest mb-2 ${pointColor}`}>
                                            Project Detail
                                        </p>
                                        <h4 className="text-2xl md:text-3xl font-black tracking-tight">{selectedProject.title}</h4>
                                        <p className="mt-2 text-sm md:text-base opacity-75 leading-relaxed">
                                            {detail?.intro ?? selectedProject.desc}
                                        </p>
                                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm opacity-75">
                                            <span className="inline-flex items-center gap-1.5">
                                                <Clock size={13} />
                                                소요 기간: {selectedProject.period}
                                            </span>
                                            <span className="inline-flex items-center gap-1.5">
                                                <CheckCircle2 size={13} className={pointColor} />
                                                기여도: {selectedProject.contribution}
                                            </span>
                                        </div>

                                        <div className="mt-6 space-y-5">
                                            <div>
                                                <p className={`text-[10px] md:text-xs font-black uppercase tracking-widest mb-2 ${pointColor}`}>
                                                    역할
                                                </p>
                                                <p className="text-sm md:text-base opacity-90 leading-relaxed">
                                                    {detail?.role ?? selectedProject.contribution}
                                                </p>
                                            </div>

                                            <div>
                                                <p className={`text-[10px] md:text-xs font-black uppercase tracking-widest mb-2 ${pointColor}`}>
                                                    성과
                                                </p>
                                                <ul className="space-y-2 text-sm md:text-base opacity-90 list-disc pl-5">
                                                    {(detail?.outcomes ?? [selectedProject.desc]).map((outcome) => (
                                                        <li key={outcome} className="leading-relaxed">{outcome}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative px-5 py-6 md:px-7 md:py-8 overflow-visible md:overflow-y-auto border-t md:border-t-0 border-white/10">
                                        <p className={`text-[10px] md:text-xs font-black uppercase tracking-widest mb-3 ${pointColor}`}>
                                            Preview
                                        </p>
                                        <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-2 md:p-2.5 mb-4">
                                            <div className="relative">
                                                <img
                                                    src={toAssetUrl(previewImage)}
                                                    alt={`${selectedProject.title} 프리뷰 ${activePreviewIndex + 1}`}
                                                    className="w-full h-52 md:h-64 object-cover object-top rounded-xl border border-white/10 cursor-zoom-in"
                                                    onClick={() => setExpandedPreviewImage(previewImage)}
                                                />
                                                {previewImages.length > 1 ? (
                                                    <>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setActivePreviewIndex((prev) =>
                                                                    prev === 0 ? previewImages.length - 1 : prev - 1
                                                                )
                                                            }
                                                            className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border inline-flex items-center justify-center ${theme === "dark"
                                                                ? "border-white/25 bg-black/35 text-white"
                                                                : "border-black/15 bg-white/90 text-[#111111]"
                                                                }`}
                                                            aria-label="이전 프로젝트 프리뷰"
                                                        >
                                                            <ChevronLeft size={14} />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setActivePreviewIndex((prev) =>
                                                                    prev === previewImages.length - 1 ? 0 : prev + 1
                                                                )
                                                            }
                                                            className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border inline-flex items-center justify-center ${theme === "dark"
                                                                ? "border-white/25 bg-black/35 text-white"
                                                                : "border-black/15 bg-white/90 text-[#111111]"
                                                                }`}
                                                            aria-label="다음 프로젝트 프리뷰"
                                                        >
                                                            <ChevronRight size={14} />
                                                        </button>
                                                    </>
                                                ) : null}
                                            </div>
                                            {previewImages.length > 1 ? (
                                                <div className="mt-3 flex items-center justify-center gap-1.5">
                                                    {previewImages.map((img, index) => (
                                                        <button
                                                            key={`${img}-${index}`}
                                                            type="button"
                                                            onClick={() => setActivePreviewIndex(index)}
                                                            className={`h-1.5 rounded-full transition-all ${index === activePreviewIndex
                                                                ? theme === "dark"
                                                                    ? "w-5 bg-yellow-300"
                                                                    : "w-5 bg-amber-500"
                                                                : "w-1.5 bg-white/35"
                                                                }`}
                                                            aria-label={`프리뷰 ${index + 1} 보기`}
                                                        />
                                                    ))}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div>
                                            <p className={`text-[10px] md:text-xs font-black uppercase tracking-widest mb-2 ${pointColor}`}>
                                                    주요기술
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.tech.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className={`px-3 py-1.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest border ${theme === "dark"
                                                            ? "bg-white/8 border-white/15 text-white/90"
                                                            : "bg-white/85 border-black/10 text-[#111111]"
                                                            }`}
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            ) : null}
            {expandedPreviewImage ? (
                <div
                    className="fixed inset-0 z-[260] bg-black/92 backdrop-blur-sm flex items-center justify-center p-1 md:p-2"
                    onClick={() => {
                        setExpandedPreviewImage(null);
                        setIsExpandedZoomed(false);
                        setPanOffset({ x: 0, y: 0 });
                    }}
                    role="presentation"
                >
                    <button
                        type="button"
                        onClick={() => {
                            setExpandedPreviewImage(null);
                            setIsExpandedZoomed(false);
                            setPanOffset({ x: 0, y: 0 });
                        }}
                        className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full border inline-flex items-center justify-center transition-colors ${theme === "dark"
                            ? "border-white/30 bg-black/40 hover:bg-black/60 text-white"
                            : "border-black/20 bg-white/92 hover:bg-white text-[#111111]"
                            }`}
                        aria-label="확대 이미지 닫기"
                    >
                        <X size={16} />
                    </button>
                    {selectedProject && PROJECT_DETAIL_MAP[selectedProject.title]?.previewImages.length > 1 ? (
                        <>
                            <button
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    const imgs = PROJECT_DETAIL_MAP[selectedProject.title].previewImages;
                                    setActivePreviewIndex((prev) => (prev === 0 ? imgs.length - 1 : prev - 1));
                                    setIsExpandedZoomed(false);
                                    setPanOffset({ x: 0, y: 0 });
                                }}
                                className={`absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border inline-flex items-center justify-center transition-colors ${theme === "dark"
                                    ? "border-white/30 bg-black/45 hover:bg-black/65 text-white"
                                    : "border-black/20 bg-white/92 hover:bg-white text-[#111111]"
                                    }`}
                                aria-label="이전 확대 이미지"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    const imgs = PROJECT_DETAIL_MAP[selectedProject.title].previewImages;
                                    setActivePreviewIndex((prev) => (prev === imgs.length - 1 ? 0 : prev + 1));
                                    setIsExpandedZoomed(false);
                                    setPanOffset({ x: 0, y: 0 });
                                }}
                                className={`absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border inline-flex items-center justify-center transition-colors ${theme === "dark"
                                    ? "border-white/30 bg-black/45 hover:bg-black/65 text-white"
                                    : "border-black/20 bg-white/92 hover:bg-white text-[#111111]"
                                    }`}
                                aria-label="다음 확대 이미지"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </>
                    ) : null}
                    <img
                        src={toAssetUrl(
                            selectedProject
                                ? (PROJECT_DETAIL_MAP[selectedProject.title]?.previewImages[activePreviewIndex] ?? expandedPreviewImage)
                                : expandedPreviewImage
                        )}
                        alt="확대된 프로젝트 프리뷰"
                        className={`w-auto h-auto max-w-[98vw] max-h-[96vh] md:max-w-[97vw] md:max-h-[97vh] object-contain rounded-lg md:rounded-xl transition-transform duration-200 ${isExpandedZoomed
                            ? isPanning
                                ? "cursor-grabbing"
                                : "cursor-grab"
                            : "cursor-zoom-in"
                            }`}
                        style={{
                            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${isExpandedZoomed ? 2.25 : 1})`,
                            transformOrigin: "center center",
                        }}
                        onClick={(event) => event.stopPropagation()}
                        onDoubleClick={() => {
                            setIsExpandedZoomed((prev) => {
                                const next = !prev;
                                if (!next) setPanOffset({ x: 0, y: 0 });
                                return next;
                            });
                        }}
                        onMouseDown={(event) => {
                            if (!isExpandedZoomed) return;
                            event.preventDefault();
                            setIsPanning(true);
                            panStartRef.current = { x: event.clientX, y: event.clientY };
                            panOriginRef.current = { ...panOffset };
                        }}
                        onMouseMove={(event) => {
                            if (!isExpandedZoomed || !isPanning) return;
                            setPanOffset({
                                x: panOriginRef.current.x + (event.clientX - panStartRef.current.x),
                                y: panOriginRef.current.y + (event.clientY - panStartRef.current.y),
                            });
                        }}
                        onMouseUp={() => setIsPanning(false)}
                        onMouseLeave={() => setIsPanning(false)}
                        onTouchStart={(event) => {
                            if (!isExpandedZoomed) return;
                            const touch = event.touches[0];
                            setIsPanning(true);
                            panStartRef.current = { x: touch.clientX, y: touch.clientY };
                            panOriginRef.current = { ...panOffset };
                        }}
                        onTouchMove={(event) => {
                            if (!isExpandedZoomed || !isPanning) return;
                            const touch = event.touches[0];
                            setPanOffset({
                                x: panOriginRef.current.x + (touch.clientX - panStartRef.current.x),
                                y: panOriginRef.current.y + (touch.clientY - panStartRef.current.y),
                            });
                        }}
                        onTouchEnd={() => setIsPanning(false)}
                    />
                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation();
                            setIsExpandedZoomed((prev) => {
                                const next = !prev;
                                if (!next) setPanOffset({ x: 0, y: 0 });
                                return next;
                            });
                        }}
                        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 rounded-full border text-xs font-bold tracking-wide transition-colors ${theme === "dark"
                            ? "border-white/30 bg-black/45 hover:bg-black/65 text-white"
                            : "border-black/20 bg-white/92 hover:bg-white text-[#111111]"
                            }`}
                    >
                        {isExpandedZoomed ? "축소" : "확대"}
                    </button>
                </div>
            ) : null}
        </section>
    );
}
