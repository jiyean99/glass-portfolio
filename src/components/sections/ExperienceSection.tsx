import { Briefcase, Zap } from "lucide-react";
import type { Theme } from "../../types/portfolio";

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
    return (
        <section id="experience" className="relative py-20 md:py-48 px-6 md:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-baseline gap-4 md:gap-6 mb-16 md:mb-24">
                    <span
                        className={`${pointColor} font-mono text-xs md:text-sm tracking-widest uppercase block`}
                    >
                        02. Experience
                    </span>
                    <h2 className="text-4xl sm:text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">
                        PROFESSIONAL
                        <br />
                        <span className={`italic ${pointColor}`}>EVOLUTION.</span>
                    </h2>
                </div>

                <div className="relative">
                    <div
                        className={`absolute left-[15px] md:left-[50%] top-0 bottom-0 w-[1px] ${theme === "dark"
                            ? "bg-gradient-to-b from-yellow-400"
                            : "bg-gradient-to-b from-amber-400"
                            } via-transparent to-transparent md:-translate-x-1/2 opacity-30`}
                    />

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

                            <div className="flex flex-wrap gap-2">
                                {[
                                    "Java",
                                    "Spring Boot",
                                    "JPA",
                                    "MySQL",
                                    "Redis",
                                    "REST API",
                                    "AWS",
                                    "Docker",
                                    "Kubernetes",
                                    "Architecture",
                                    "DevOps",
                                ].map((skill) => (
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

                    <div className="relative grid md:grid-cols-2 gap-8 md:gap-32 group">
                        <div className="md:order-2 md:pl-10">
                            <div className="inline-flex items-center gap-4 mb-3">
                                <div
                                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full border ${theme === "dark"
                                        ? "border-yellow-400/30"
                                        : "border-amber-400/40 bg-white/40"
                                        } flex items-center justify-center font-black shrink-0 group-hover:${pointBg} group-hover:text-white md:group-hover:text-black transition-all`}
                                >
                                    <Briefcase size={16} />
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
                                    },
                                    {
                                        title: "사내 매출 관리 대시보드 구축",
                                        desc: "Vue.js 및 Chart.js를 활용한 매출 분석 대시보드 개발",
                                    },
                                    {
                                        title: "챔프포커",
                                        desc: "unity 엔진 기반 게임 웹뷰 최적화",
                                    },
                                    {
                                        title: "러닝 서비스 프로토타입",
                                        desc: "React Native 어플리케이션 프로토타입 설계 및 구현 참여",
                                    },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex flex-col md:items-end group/item">
                                        <span
                                            className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-1 ${pointColor} opacity-70`}
                                        >
                                            {item.title}
                                        </span>
                                        <span className="text-xs md:text-base opacity-60 font-light group-hover/item:opacity-100 transition-opacity">
                                            {item.desc}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
