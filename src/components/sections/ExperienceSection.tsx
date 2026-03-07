import { useEffect, useRef, useState } from "react";
import { Briefcase, Download, Zap } from "lucide-react";
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

export default function ExperienceSection({
    theme,
    pointColor,
    pointBg,
    pointBorder,
    glassBase,
}: Props) {
    const sectionRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const [lineProgress, setLineProgress] = useState(0);
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

    const lineOpacity = LINE_OPACITY_MIN + (LINE_OPACITY_MAX - LINE_OPACITY_MIN) * lineProgress;
    const lineHeightVh = (LINE_HEIGHT_MIN + lineProgress * (1 - LINE_HEIGHT_MIN)) * LINE_STICKY_MAX_VH;

    return (
        <section ref={sectionRef} id="experience" className="relative py-20 md:py-48 px-6 md:px-24 z-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-baseline gap-4 md:gap-6 mb-16 md:mb-24">
                    <span
                        className={`${pointColor} font-mono text-xs md:text-sm tracking-widest uppercase block`}
                    >
                        02. Experience
                    </span>
                    <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none max-w-[18ch] md:max-w-none mx-auto md:mx-0">
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
                            <p className="text-sm md:text-lg font-light leading-relaxed opacity-70 mb-6 md:mb-8 italic">
                                프론트엔드 경력을 기반으로 Spring Boot 생태계를 마스터하며 풀스택
                                역량을 강화하고 있습니다.
                            </p>

                            <div className="space-y-6 md:space-y-8">
                                {[
                                    {
                                        title: "BACKEND",
                                        desc: "Java와 Spring Boot를 기반으로 서버 구조를 설계하고, JPA와 MySQL, Redis를 활용해 안정적인 데이터 처리와 캐싱 구조를 구현했습니다. REST API를 중심으로 서비스 로직을 구성했습니다.",
                                        skills: ["Java", "Spring Boot", "JPA", "MySQL", "Redis", "REST API"],
                                    },
                                    {
                                        title: "INFRA",
                                        desc: "AWS 환경에서 서비스 배포 인프라를 구축하고, Docker와 Kubernetes를 사용해 컨테이너 기반 운영 환경을 구성했습니다. CI/CD 파이프라인을 통해 자동 배포 및 서비스 운영 효율화를 실현했습니다.",
                                        skills: ["AWS", "Docker", "Kubernetes", "Architecture", "DevOps"],
                                    },
                                    {
                                        title: "FRONTEND",
                                        desc: "Vue.js를 활용해 사용자 인터페이스를 개발하고, 백엔드 API 연동을 통해 실시간 데이터가 반영되는 화면을 구현했습니다. 반응형 레이아웃 설계로 다양한 환경에 대응하는 UI를 완성했습니다.",
                                        skills: ["HTML", "CSS", "JavaScript", "Vue.js"],
                                    },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex flex-col md:items-start group/item">
                                        <span
                                            className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-1 ${pointColor} opacity-70`}
                                        >
                                            {item.title}
                                        </span>
                                        <span className="text-xs md:text-base opacity-60 font-light group-hover/item:opacity-100 transition-opacity mb-2">
                                            {item.desc}
                                        </span>

                                        {/* skill map */}
                                        <div className="flex flex-wrap gap-2">
                                            {item.skills.map((skill) => (
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
                                ))}
                            </div>
                            <div className="flex justify-start mt-6 md:mt-8">
                                <a
                                    href="/resume.pdf"
                                    download
                                    className={`inline-flex items-center justify-center gap-2 py-2.5 md:py-3 px-4 md:px-5 ${pointBg} text-white md:text-black border-transparent rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all border shadow-lg`}
                                >
                                    <Download size={12} className="shrink-0" />
                                    포트폴리오
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="relative grid md:grid-cols-2 gap-8 md:gap-32 group">
                        <div className="md:order-2 md:pl-10">
                            <div className="inline-flex items-center gap-4 mb-3">
                                <div
                                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full border ${theme === "dark"
                                        ? "border-yellow-400/30"
                                        : "border-amber-400/40 bg-white/40"
                                        } flex items-center justify-center font-black shrink-0 group-hover:${pointBg} group-hover:text-white md:group-hover:text-black transition-all`}
                                >
                                    <Briefcase
                                        size={16}
                                        className={`
                                            ${theme === "dark" ? "text-white" : "text-black"}
                                            hover:${pointColor}
                                            transition-colors
                                        `}
                                    />
                                </div>

                                <span
                                    className={`font-mono text-xs md:text-sm font-bold tracking-widest uppercase opacity-40 group-hover:opacity-100 group-hover:${pointColor}`}
                                >
                                    2023.03 — 2025.08
                                </span>
                            </div>

                            <h3
                                className={`text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter uppercase mb-2 group-hover:${pointColor} transition-colors`}
                            >
                                (주)잼퍼블릭
                            </h3>

                            <p className="text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-40 mb-4 md:mb-8">
                                Web Solution Developer
                            </p>
                        </div>

                        <div
                            className={`${glassBase} p-7 md:p-10 rounded-[30px] md:rounded-[40px] group-hover:${pointBorder}/20 transition-all duration-500 md:text-right border`}
                        >
                            <div className="space-y-4 md:space-y-6">
                                {[
                                    {
                                        title: "승부사온라인",
                                        desc: "모바일 중심 실시간 스포츠베팅 웹게임 유지 보수",
                                        skills: ["Spring Boot", "MySQL", "WebSocket", "AWS", "Redis"],
                                    },
                                    {
                                        title: "사내 매출 관리 대시보드 구축",
                                        desc: "Vue.js 및 Chart.js를 활용한 매출 분석 대시보드 개발",
                                        skills: ["Vue.js", "Chart.js", "REST API", "JavaScript", "MySQL"],
                                    },
                                    {
                                        title: "챔프포커",
                                        desc: "Unity 엔진 기반 게임 웹뷰 최적화",
                                        skills: ["Unity", "WebView", "JavaScript Bridge", "Performance"],
                                    },
                                    {
                                        title: "러닝 서비스 프로토타입",
                                        desc: "React Native 어플리케이션 프로토타입 설계 및 구현 참여",
                                        skills: ["React Native", "Expo", "API Integration", "UI/UX"],
                                    },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex flex-col md:items-end group/item">
                                        <span
                                            className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-1 ${pointColor} opacity-70`}
                                        >
                                            {item.title}
                                        </span>
                                        <span className="text-xs md:text-base opacity-60 font-light group-hover/item:opacity-100 transition-opacity mb-2">
                                            {item.desc}
                                        </span>

                                        {/* skills map */}
                                        <div className="flex flex-wrap justify-end gap-2">
                                            {item.skills.map((skill) => (
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
                                ))}
                            </div>

                            <div className="flex justify-end mt-6 md:mt-8">
                                <a
                                    href="/resume.pdf"
                                    download
                                    className={`inline-flex items-center justify-center gap-2 py-2.5 md:py-3 px-4 md:px-5 ${pointBg} text-white md:text-black border-transparent rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all border shadow-lg`}
                                >
                                    <Download size={12} className="shrink-0" />
                                    경력기술서
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
