import { useEffect, useRef, useState } from "react";
import {
    Activity,
    BarChart3,
    Briefcase,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Check,
    ExternalLink,
    Gamepad2,
    MapPin,
    Trophy,
    X,
    Zap,
} from "lucide-react";
import type { Theme } from "../../types/portfolio";

/** 스크롤에 따라 변하는 선의 투명도 범위*/
const LINE_OPACITY_MIN = 0.5;
const LINE_OPACITY_MAX = 0.7;
/** 뷰포트에 보일 때 선의 최소 높이 비율 (0~1) - 이만큼은 항상 보이게 */
const LINE_HEIGHT_MIN = 0.5;
/** sticky 선이 차지하는 뷰포트 높이 비율 (스크롤 따라갈 때 최대 높이) */
const LINE_STICKY_MAX_VH = 70;
/** 섹션 스크롤의 이 비율만큼 지나면 선 확장 멈춤 (0~1, 예: 0.3 = 섹션 30% 지날 때 최대) */
const SECTION_END_CAP = 0.1;

type Props = {
    theme: Theme;
    pointColor: string;
    pointBg: string;
    pointBorder: string;
    glassBase: string;
};

type ExperienceItem = {
    title: string;
    desc: string;
    skills: string[];
    role: string;
    contributions: string[];
    outcome: string;
    previewImages: string[];
    duration: string;
    contributionLevel: string;
    liveUrl?: string;
};

const JAM_PUBLIC_EXPERIENCES: ExperienceItem[] = [
    {
        title: "승부사온라인",
        desc: "모바일 중심 실시간 스포츠베팅 웹게임 유지 보수",
        skills: ["Spring Boot", "MySQL", "WebSocket", "AWS", "Redis"],
        role: "실시간 게임 서비스 유지보수 및 성능 안정화",
        contributions: [
            "Spring Boot 기반 API와 WebSocket 이벤트 흐름을 개선해 실시간 처리 안정성을 높였습니다.",
            "Redis 캐시 전략과 MySQL 쿼리 구조를 점검해 빈번한 조회 구간의 응답 지연을 줄였습니다.",
            "AWS 운영 환경에서 배포/로그 모니터링 포인트를 정리해 장애 대응 속도를 개선했습니다.",
        ],
        outcome: "서비스 운영 안정성과 실시간 응답 품질을 높여 유지보수 효율을 개선했습니다.",
        previewImages: [
            "/mock/project-preview-sports.svg",
            "/mock/project-preview-unity.svg",
        ],
        duration: "약 6개월 (더미)",
        contributionLevel: "프론트 기여도 80% (더미)",
        liveUrl: "https://www.adventurer.co.kr/",
    },
    {
        title: "사내 매출 관리 대시보드",
        desc: "Vue.js 및 Chart.js를 활용한 매출 분석 대시보드 개발",
        skills: ["Vue.js", "Chart.js", "REST API", "JavaScript", "MySQL"],
        role: "매출 데이터 시각화 대시보드 프론트엔드 개발",
        contributions: [
            "Vue.js 컴포넌트 구조를 설계해 필터/기간/지표 변경 시 재사용 가능한 UI를 구성했습니다.",
            "Chart.js로 핵심 지표를 시각화하고, REST API 연동으로 데이터 동기화를 자동화했습니다.",
            "사용자 관점에서 탐색 흐름을 개선해 리포트 조회 시간을 단축할 수 있도록 구성했습니다.",
        ],
        outcome: "매출 추이 확인과 의사결정에 필요한 데이터 접근성을 크게 높였습니다.",
        previewImages: [
            "/mock/dashboard/project-preview-dashboard-1.png",
            "/mock/dashboard/project-preview-dashboard-2.png",
        ],
        duration: "약 4개월 (더미)",
        contributionLevel: "프론트 기여도 90% (더미)",
    },
    {
        title: "챔프포커",
        desc: "Unity 엔진 기반 게임 웹뷰 최적화",
        skills: ["Unity", "WebView", "JavaScript Bridge", "Performance"],
        role: "Unity 웹뷰 인터페이스 최적화 및 브릿지 안정화",
        contributions: [
            "웹뷰 내 렌더링 병목 구간을 점검해 초기 로딩과 화면 전환 체감 속도를 개선했습니다.",
            "Unity-JavaScript Bridge 통신 규격을 정리해 이벤트 누락/중복 이슈를 줄였습니다.",
            "반복 동작 시 메모리 사용 패턴을 점검해 장시간 실행 안정성을 높였습니다.",
        ],
        outcome: "웹뷰 기반 플레이 경험을 개선하고 브릿지 연동 신뢰도를 높였습니다.",
        previewImages: [
            "/mock/project-preview-unity.svg",
            "/mock/project-preview-sports.svg",
        ],
        duration: "약 5개월 (더미)",
        contributionLevel: "프론트 기여도 75% (더미)",
        liveUrl: "https://champpoker.co.kr/",
    },
    {
        title: "러닝 서비스 프로토타입",
        desc: "React Native 어플리케이션 프로토타입 설계 및 구현 참여",
        skills: ["React Native", "Expo", "API Integration", "UI/UX"],
        role: "모바일 러닝 앱 프로토타입 구현",
        contributions: [
            "React Native + Expo 기반으로 핵심 플로우를 빠르게 구현해 기능 검증 속도를 높였습니다.",
            "API 연동 구조를 정리해 화면별 데이터 패칭과 에러 처리 패턴을 통일했습니다.",
            "UI/UX 프로토타입을 반복 개선해 사용자 피드백 반영 주기를 단축했습니다.",
        ],
        outcome: "아이디어 검증에 필요한 MVP 품질의 프로토타입을 빠르게 확보했습니다.",
        previewImages: [
            "/mock/project-preview-running.svg",
        ],
        duration: "약 3개월 (더미)",
        contributionLevel: "프론트 기여도 70% (더미)",
    },
];

const BOOTCAMP_HIGHLIGHTS = [
    "Spring Boot 기반 REST API 구현 및 DB 연동 실습",
    "Docker/Kubernetes 기반 배포 흐름과 운영 기초 학습",
    "Vue.js 화면 구현과 API 연동을 통한 프론트-백 통합 실습",
    "팀 프로젝트를 통해 협업 방식과 개발 프로세스 경험",
];

const BOOTCAMP_SKILLS = [
    "Java",
    "Spring Boot",
    "JPA",
    "MySQL",
    "Redis",
    "AWS",
    "Docker",
    "Kubernetes",
    "Vue.js",
];

const JAM_PUBLIC_HIGHLIGHTS = [
    "실시간 웹게임 유지보수와 대시보드 개발 등 다양한 서비스 개선 업무를 수행했습니다.",
    "프론트엔드와 백엔드 연동 구간을 안정화하며 기능 배포와 운영 대응을 지원했습니다.",
    "프로젝트별 요구사항에 맞춰 성능, 데이터 시각화, 웹뷰 최적화 작업을 진행했습니다.",
];

const JAM_PUBLIC_CORE_SKILLS = [
    "Spring Boot",
    "MySQL",
    "WebSocket",
    "AWS",
    "Redis",
    "Vue.js",
    "Chart.js",
    "JavaScript",
    "Unity",
    "React Native",
];

const PROJECT_ICON_BY_TITLE = {
    승부사온라인: Trophy,
    "사내 매출 관리 대시보드": BarChart3,
    챔프포커: Gamepad2,
    "러닝 서비스 프로토타입": Activity,
} as const;

export default function ExperienceSection({
    theme,
    pointColor,
    pointBg,
    pointBorder,
    glassBase,
}: Props) {
    const toAssetUrl = (path: string) =>
        `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

    const sectionRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const [lineProgress, setLineProgress] = useState(0);
    const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
    const [activePreviewIndex, setActivePreviewIndex] = useState(0);
    const [expandedPreviewImage, setExpandedPreviewImage] = useState<string | null>(null);
    const [isExpandedZoomed, setIsExpandedZoomed] = useState(false);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const panStartRef = useRef({ x: 0, y: 0 });
    const panOriginRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const onScroll = () => {
            if (rafRef.current != null) return;
            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = null;
                const section = sectionRef.current;
                const timeline = timelineRef.current;
                if (!section || !timeline) return;
                const sectionRect = section.getBoundingClientRect();
                const sectionHeight = sectionRect.height;
                const sectionTop = sectionRect.top;
                const inView = sectionRect.bottom > 0 && sectionRect.top < window.innerHeight;
                // 섹션 기준: 위로 스크롤된 만큼 진행률 증가. SECTION_END_CAP 지나면 확장 멈춤
                const rawProgress = -sectionTop / sectionHeight;
                let progress = rawProgress / SECTION_END_CAP;
                if (inView && progress < LINE_HEIGHT_MIN) progress = LINE_HEIGHT_MIN;
                progress = Math.min(1, Math.max(0, progress));
                setLineProgress(progress);
            });
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    useEffect(() => {
        if (!selectedExperience) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                if (expandedPreviewImage) {
                    setExpandedPreviewImage(null);
                    setIsExpandedZoomed(false);
                    setPanOffset({ x: 0, y: 0 });
                    return;
                }
                setSelectedExperience(null);
            }

            if (!selectedExperience || !expandedPreviewImage) return;

            if (event.key === "ArrowLeft" && selectedExperience.previewImages.length > 1) {
                setActivePreviewIndex((prev) =>
                    prev === 0 ? selectedExperience.previewImages.length - 1 : prev - 1
                );
                setIsExpandedZoomed(false);
                setPanOffset({ x: 0, y: 0 });
            }

            if (event.key === "ArrowRight" && selectedExperience.previewImages.length > 1) {
                setActivePreviewIndex((prev) =>
                    prev === selectedExperience.previewImages.length - 1 ? 0 : prev + 1
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
    }, [selectedExperience, expandedPreviewImage]);

    useEffect(() => {
        setActivePreviewIndex(0);
        setExpandedPreviewImage(null);
        setIsExpandedZoomed(false);
        setPanOffset({ x: 0, y: 0 });
    }, [selectedExperience?.title]);

    const lineOpacity = LINE_OPACITY_MIN + (LINE_OPACITY_MAX - LINE_OPACITY_MIN) * lineProgress;
    const lineHeightVh = (LINE_HEIGHT_MIN + lineProgress * (1 - LINE_HEIGHT_MIN)) * LINE_STICKY_MAX_VH;

    return (
        <section ref={sectionRef} id="experience" className="relative py-20 md:py-48 px-6 md:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center gap-4 md:gap-6 mb-16 md:mb-24 text-center">
                    <span
                        className={`${pointColor} font-mono text-xs md:text-sm tracking-widest uppercase block`}
                    >
                        02. Experience
                    </span>
                    <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none text-center mx-auto">
                        PROFESSIONAL
                        <br />
                        <span className={`italic ${pointColor}`}>EVOLUTION.</span>
                    </h2>
                </div>

                <div ref={timelineRef} className="relative">
                    {/* 스크롤 시 뷰포트에 붙어 따라오는 선 (sticky) */}
                    <div className="sticky top-[15vh] z-0 h-0 pointer-events-none" aria-hidden>
                        <div
                            className={`absolute left-[15px] md:left-[50%] top-0 w-[1px] md:-translate-x-1/2 origin-top transition-all duration-150 ease-out ${theme === "dark"
                                ? "bg-gradient-to-b from-yellow-400 to-yellow-400/20"
                                : "bg-gradient-to-b from-amber-400 to-amber-400/20"
                                }`}
                            style={{
                                height: `${lineHeightVh}vh`,
                                opacity: lineOpacity,
                            }}
                        />
                    </div>

                    <div className="relative grid md:grid-cols-2 gap-8 md:gap-32 mb-16 md:mb-32 group">
                        <div className="md:text-right md:pr-10">
                            <div className="inline-flex items-center gap-4 mb-3 md:flex-row-reverse">
                                <div
                                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${pointBg} text-white md:text-black flex items-center justify-center font-black animate-pulse shrink-0 shadow-lg`}
                                >
                                    <Zap size={16} />
                                </div>
                                <span
                                    className={`${pointColor} font-mono text-xs md:text-sm font-bold tracking-widest uppercase`}
                                >
                                    2025.11 — 2026.05
                                </span>
                            </div>

                            <h3
                                className={`text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter uppercase mb-2 group-hover:${pointColor} transition-colors`}
                            >
                                BEYOND SW CAMP
                            </h3>
                            <p className="text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-40 mb-4 md:mb-8">
                                Fullstack Engineering Immersion
                            </p>
                        </div>

                        <div
                            className={`${glassBase} p-7 md:p-10 rounded-[30px] md:rounded-[40px] group-hover:${pointBorder}/30 transition-all duration-500 border`}
                        >
                            <div className="space-y-6 md:space-y-8">
                                <div>
                                    <h4 className="text-xl md:text-2xl font-black tracking-tight mb-2">
                                        한화시스템 응용 SW 캠프 수료
                                    </h4>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm opacity-65">
                                        <span className="inline-flex items-center gap-1.5">
                                            <MapPin size={13} />
                                            오프라인
                                        </span>
                                        <span className="inline-flex items-center gap-1.5">
                                            <Calendar size={13} />
                                            2025.11 - 2026.05
                                        </span>
                                        <span className="inline-flex items-center gap-1.5">
                                            <Briefcase size={13} />
                                            백엔드 중심 풀스택 실습 프로젝트 참여
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <p className={`text-[10px] md:text-xs font-black uppercase tracking-widest mb-3 ${pointColor}`}>
                                        주요 성과 및 활동
                                    </p>
                                    <ul className="space-y-2.5">
                                        {BOOTCAMP_HIGHLIGHTS.map((highlight) => (
                                            <li key={highlight} className="flex items-start gap-2.5">
                                                <Check size={14} className={`mt-0.5 shrink-0 ${pointColor}`} />
                                                <span className="text-xs md:text-sm opacity-75 leading-relaxed">
                                                    {highlight}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <p className={`text-[10px] md:text-xs font-black uppercase tracking-widest mb-3 ${pointColor}`}>
                                        주요기술
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {BOOTCAMP_SKILLS.map((skill) => (
                                            <span
                                                key={skill}
                                                className={`px-3 py-1.5 md:px-4 md:py-2 ${theme === "dark"
                                                    ? "bg-yellow-400/5 border-yellow-400/10 text-yellow-400/80"
                                                    : "bg-amber-400/10 border-amber-400/40 text-amber-600/80"
                                                    } rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest border shadow-sm`}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative grid md:grid-cols-2 gap-8 md:gap-32 group">
                        <div className="md:text-right md:pr-10">
                            <div className="inline-flex items-center gap-4 mb-3 md:flex-row-reverse">
                                <div
                                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${pointBg} text-white md:text-black flex items-center justify-center font-black animate-pulse shrink-0 shadow-lg`}
                                >
                                    <Briefcase
                                        size={16}
                                    />
                                </div>

                                <span
                                    className={`${pointColor} font-mono text-xs md:text-sm font-bold tracking-widest uppercase`}
                                >
                                    2023.03 — 2025.08
                                </span>
                            </div>

                            <h3
                                className={`text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter uppercase mb-2 group-hover:${pointColor} transition-colors`}
                            >
                                (주) zempublic
                            </h3>

                            <p className="text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-40 mb-4 md:mb-8">
                                Web Front Developer
                            </p>
                        </div>

                        <div
                            className={`${glassBase} p-7 md:p-10 rounded-[30px] md:rounded-[40px] group-hover:${pointBorder}/20 transition-all duration-500 border`}
                        >
                            <div className="space-y-6 md:space-y-8">
                                <div>
                                    <h4 className="text-xl md:text-2xl font-black tracking-tight mb-2">
                                        웹 프론트 개발 및 운영
                                    </h4>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm opacity-65">
                                        <span className="inline-flex items-center gap-1.5">
                                            <MapPin size={13} />
                                            기획디자인실
                                        </span>
                                        <span className="inline-flex items-center gap-1.5">
                                            <Calendar size={13} />
                                            2023.03 - 2025.08
                                        </span>
                                        <span className="inline-flex items-center gap-1.5">
                                            <Briefcase size={13} />
                                            프론트엔드 전담으로 핵심 화면/기능 주도
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <p className={`text-[10px] md:text-xs font-black uppercase tracking-widest mb-3 ${pointColor}`}>
                                        주요 성과 및 활동
                                    </p>
                                    <ul className="space-y-2.5">
                                        {JAM_PUBLIC_HIGHLIGHTS.map((highlight) => (
                                            <li key={highlight} className="flex items-start gap-2.5">
                                                <Check size={14} className={`mt-0.5 shrink-0 ${pointColor}`} />
                                                <span className="text-xs md:text-sm opacity-75 leading-relaxed">
                                                    {highlight}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <p className={`text-[10px] md:text-xs font-black uppercase tracking-widest mb-3 ${pointColor}`}>
                                        주요기술
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {JAM_PUBLIC_CORE_SKILLS.map((skill) => (
                                            <span
                                                key={skill}
                                                className={`px-3 py-1.5 md:px-4 md:py-2 ${theme === "dark"
                                                    ? "bg-yellow-400/5 border-yellow-400/10 text-yellow-400/80"
                                                    : "bg-amber-400/10 border-amber-400/40 text-amber-600/80"
                                                    } rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest border shadow-sm`}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className={`text-[10px] md:text-xs font-black uppercase tracking-widest mb-3 ${pointColor}`}>
                                        참여 프로젝트
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {JAM_PUBLIC_EXPERIENCES.map((item) => (
                                            (() => {
                                                const Icon =
                                                    PROJECT_ICON_BY_TITLE[
                                                    item.title as keyof typeof PROJECT_ICON_BY_TITLE
                                                    ] ?? Briefcase;
                                                return (
                                            <button
                                                key={item.title}
                                                type="button"
                                                onClick={() => setSelectedExperience(item)}
                                                className={`inline-flex items-center justify-center gap-2 py-2.5 md:py-3 px-4 md:px-5 ${pointBg} text-white md:text-black border-transparent rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all border shadow-lg`}
                                            >
                                                <Icon size={12} className="shrink-0" />
                                                {item.title}
                                            </button>
                                                );
                                            })()
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {selectedExperience ? (
                <div
                    className={`fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-8 ${theme === "dark"
                        ? "bg-black/75 backdrop-blur-sm"
                        : "bg-[#f8f8f8]/70 backdrop-blur-[2px]"
                        }`}
                    onClick={() => setSelectedExperience(null)}
                    role="presentation"
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${selectedExperience.title} 상세 정보`}
                        className={`${glassBase} relative w-full h-[100dvh] max-h-[100dvh] md:h-auto md:max-h-[88vh] max-w-none md:max-w-5xl border-0 md:border rounded-none md:rounded-[30px] overflow-hidden shadow-none md:shadow-[0_16px_60px_rgba(0,0,0,0.45)]`}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setSelectedExperience(null)}
                            className={`absolute top-4 right-4 md:top-3 md:right-3 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full border inline-flex items-center justify-center opacity-90 hover:opacity-100 transition-all ${theme === "dark"
                                ? "border-white/20 bg-black/35 hover:bg-white/10 text-white"
                                : "border-black/15 bg-white/85 hover:bg-white text-[#111111]"
                                }`}
                            aria-label="상세 모달 닫기"
                        >
                            <X size={16} />
                        </button>

                        <div className="grid md:grid-cols-[1.1fr_0.9fr] h-full overflow-y-auto md:overflow-hidden">
                            <div className="px-5 pt-16 pb-6 md:px-8 md:py-8 overflow-visible md:overflow-y-auto border-b md:border-b-0 md:border-r border-white/10">
                                <p
                                    className={`text-[10px] md:text-xs font-black uppercase tracking-widest mb-2 ${pointColor} opacity-90`}
                                >
                                    Project Detail
                                </p>
                                <div className="flex items-center gap-2.5">
                                    <h4 className="text-2xl md:text-3xl font-black tracking-tight">
                                        {selectedExperience.title}
                                    </h4>
                                    {selectedExperience.liveUrl ? (
                                        <a
                                            href={selectedExperience.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full border transition-all hover:brightness-110 ${theme === "dark"
                                                ? "border-yellow-400/40 bg-yellow-400/10 text-yellow-300"
                                                : "border-amber-400/50 bg-amber-400/15 text-amber-700"
                                                }`}
                                            aria-label={`${selectedExperience.title} 바로가기`}
                                            title="서비스 바로가기"
                                        >
                                            <ExternalLink size={14} />
                                        </a>
                                    ) : null}
                                </div>
                                <p className="mt-2 text-sm md:text-base opacity-75 leading-relaxed">
                                    {selectedExperience.desc}
                                </p>
                                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm opacity-75">
                                    <span className="inline-flex items-center gap-1.5">
                                        <Calendar size={13} />
                                        {selectedExperience.duration}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5">
                                        <Briefcase size={13} />
                                        {selectedExperience.contributionLevel}
                                    </span>
                                </div>

                                <div className="mt-6 md:mt-7 space-y-5">
                                    <div>
                                        <p className={`text-[10px] md:text-xs font-black uppercase tracking-widest mb-2 ${pointColor} opacity-90`}>
                                            역할
                                        </p>
                                        <p className="text-sm md:text-base opacity-90 leading-relaxed">
                                            {selectedExperience.role}
                                        </p>
                                    </div>

                                    <div>
                                        <p className={`text-[10px] md:text-xs font-black uppercase tracking-widest mb-2 ${pointColor} opacity-90`}>
                                            주요 기여
                                        </p>
                                        <ul className="space-y-2.5 text-sm md:text-base opacity-90 list-disc pl-5">
                                            {selectedExperience.contributions.map((contribution) => (
                                                <li key={contribution} className="leading-relaxed">{contribution}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <p className={`text-[10px] md:text-xs font-black uppercase tracking-widest mb-2 ${pointColor} opacity-90`}>
                                            성과
                                        </p>
                                        <p className="text-sm md:text-base opacity-90 leading-relaxed">
                                            {selectedExperience.outcome}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative px-5 py-6 md:px-7 md:py-8 overflow-visible md:overflow-y-auto border-t md:border-t-0 border-white/10">
                                <div className={`absolute inset-0 ${theme === "dark" ? "bg-gradient-to-br from-yellow-400/12 via-transparent to-yellow-400/6" : "bg-gradient-to-br from-amber-400/18 via-transparent to-amber-400/8"}`} />
                                <div className="relative h-full flex flex-col">
                                    <p className={`text-[10px] md:text-xs font-black uppercase tracking-widest mb-3 ${pointColor} opacity-90`}>
                                        Preview
                                    </p>

                                    <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-2 md:p-2.5 mb-4">
                                        <div className="relative">
                                            <img
                                                src={toAssetUrl(
                                                    selectedExperience.previewImages[activePreviewIndex]
                                                )}
                                                alt={`${selectedExperience.title} 프리뷰 ${activePreviewIndex + 1}`}
                                                className="w-full h-40 md:h-52 object-cover object-top rounded-xl border border-white/10 cursor-zoom-in"
                                                onClick={() =>
                                                    setExpandedPreviewImage(
                                                        selectedExperience.previewImages[activePreviewIndex]
                                                    )
                                                }
                                            />
                                            {selectedExperience.previewImages.length > 1 ? (
                                                <>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setActivePreviewIndex((prev) =>
                                                                prev === 0
                                                                    ? selectedExperience.previewImages.length - 1
                                                                    : prev - 1
                                                            )
                                                        }
                                                        className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border inline-flex items-center justify-center transition-colors ${theme === "dark"
                                                            ? "border-white/25 bg-black/35 hover:bg-black/55 text-white"
                                                            : "border-black/15 bg-white/90 hover:bg-white text-[#111111]"
                                                            }`}
                                                        aria-label="이전 이미지"
                                                    >
                                                        <ChevronLeft size={14} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setActivePreviewIndex((prev) =>
                                                                prev === selectedExperience.previewImages.length - 1
                                                                    ? 0
                                                                    : prev + 1
                                                            )
                                                        }
                                                        className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border inline-flex items-center justify-center transition-colors ${theme === "dark"
                                                            ? "border-white/25 bg-black/35 hover:bg-black/55 text-white"
                                                            : "border-black/15 bg-white/90 hover:bg-white text-[#111111]"
                                                            }`}
                                                        aria-label="다음 이미지"
                                                    >
                                                        <ChevronRight size={14} />
                                                    </button>
                                                </>
                                            ) : null}
                                        </div>

                                        {selectedExperience.previewImages.length > 1 ? (
                                            <div className="mt-3 flex items-center justify-center gap-1.5">
                                                {selectedExperience.previewImages.map((imagePath, index) => (
                                                    <button
                                                        key={`${imagePath}-${index}`}
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
                                            {selectedExperience.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className={`px-3 py-1.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest border ${theme === "dark"
                                                        ? "bg-white/8 border-white/15 text-white/90"
                                                        : "bg-white/85 border-black/10 text-[#111111]"
                                                        }`}
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                    {selectedExperience && selectedExperience.previewImages.length > 1 ? (
                        <>
                            <button
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setActivePreviewIndex((prev) =>
                                        prev === 0 ? selectedExperience.previewImages.length - 1 : prev - 1
                                    );
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
                                    setActivePreviewIndex((prev) =>
                                        prev === selectedExperience.previewImages.length - 1 ? 0 : prev + 1
                                    );
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
                            selectedExperience
                                ? selectedExperience.previewImages[activePreviewIndex]
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
