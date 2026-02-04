import { CheckCircle2, Github, MessageCircle, User } from "lucide-react";

type Props = {
    theme: "dark" | "light";
    pointColor: string;
    pointBorder: string;
    glassBase: string;
};

export default function AboutSection({ theme, pointColor, pointBorder, glassBase }: Props) {
    return (
        <section id="about" className="relative py-20 md:py-48 px-6 md:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start relative">
                    <div className="w-full lg:w-[35%] lg:sticky lg:top-32 self-start space-y-6 md:space-y-8">
                        <div className="space-y-3 md:space-y-4">
                            <span
                                className={`${pointColor} font-mono text-xs md:text-sm tracking-widest uppercase block`}
                            >
                                01. About Me
                            </span>
                            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                                CULTIVATING
                                <br />
                                <span
                                    className={`${pointColor} italic font-light text-2xl sm:text-3xl md:text-6xl uppercase`}
                                >
                                    THE INVISIBLE.
                                </span>
                            </h2>
                        </div>
                        <div className="space-y-6">
                            <div
                                className={`w-full aspect-video sm:aspect-[4/3] rounded-[30px] md:rounded-[40px] flex items-center justify-center relative group overflow-hidden border ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-white/40 border-white/90 shadow-md"}`}
                            >
                                <div
                                    className={`absolute inset-0 bg-gradient-to-tr ${theme === "dark" ? "from-yellow-400/10" : "from-amber-400/10"} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
                                />
                                <User
                                    size={40}
                                    className="opacity-10 group-hover:opacity-20 transition-all duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="flex gap-4">
                                <a
                                    href="https://github.com/jiyean99"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub 프로필 (새 탭)"
                                    className={`w-10 h-10 rounded-full border ${theme === "dark" ? "border-white/20" : "border-black/10 bg-white/40"
                                        } flex items-center justify-center hover:${pointBorder} hover:${pointColor} transition-all`}
                                >
                                    <Github size={16} />
                                </a>

                                <a
                                    href="https://open.kakao.com/o/s081A11h"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="KakaoTalk 오픈채팅 (새 탭)"
                                    className={`w-10 h-10 rounded-full border ${theme === "dark" ? "border-white/20" : "border-black/10 bg-white/40"
                                        } flex items-center justify-center hover:${pointBorder} hover:${pointColor} transition-all`}
                                >
                                    <MessageCircle size={16} />
                                </a>
                            </div>

                        </div>
                    </div>

                    <div className="w-full lg:w-[65%] flex flex-col gap-8">
                        <div
                            className={`${glassBase} p-8 md:p-14 rounded-[35px] md:rounded-[50px] space-y-12 md:space-y-16 border`}
                        >
                            <div className="space-y-6 md:space-y-8">
                                <div
                                    className={`${theme === "dark" ? "bg-white/5 border-yellow-400/50" : "bg-amber-400/10 border-amber-400/40"} p-5 md:p-6 rounded-2xl border-l-4 italic font-light opacity-90 text-sm md:text-base shadow-sm`}
                                >
                                    “좋았다면 추억이고 나빴다면 경험이다.”
                                </div>
                                <p className="text-sm sm:text-base md:text-lg font-light opacity-80 leading-relaxed">
                                    어떤 상황에서도 배움을 놓치지 않으려는 태도로 성장해 온 이지연입니다.
                                </p>
                            </div>

                            <div className="space-y-6 md:space-y-8">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-1 h-5 md:w-1.5 md:h-6 ${theme === "dark" ? "bg-green-500" : "bg-green-500 shadow-sm"} rounded-full`}
                                    />
                                    <h3 className="text-xs md:text-sm font-black tracking-[0.2em] uppercase">
                                        KEYWORDS & VALUES
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                                    {[
                                        "책임감 있는 태도",
                                        "빠른 수긍과 존중",
                                        "긍정적인 문제 해결",
                                        "자전거 타기",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className={`flex items-center gap-3 text-xs md:text-sm opacity-80 ${theme === "dark" ? "bg-white/5 border-white/5" : "bg-white/40 border-white/80"} p-3 rounded-xl border`}
                                        >
                                            <CheckCircle2 size={14} className={pointColor} />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-8 md:space-y-10">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-1 h-5 md:w-1.5 md:h-6 ${theme === "dark" ? "bg-purple-500" : "bg-purple-400 shadow-sm"} rounded-full`}
                                    />
                                    <h3 className="text-xs md:text-sm font-black tracking-[0.2em] uppercase">
                                        TECH STACK
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 text-left">
                                    <div className="group/stack">
                                        <h4
                                            className={`text-[9px] md:text-[10px] font-bold opacity-40 uppercase tracking-[0.3em] mb-4 group-hover/stack:${pointColor} transition-colors`}
                                        >
                                            Frontend
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                "React",
                                                "Vue",
                                                "TypeScript",
                                                "Javascript",
                                                "Styled-Components",
                                                "Emotion",
                                                "Tailwind",
                                                "Three.js",
                                                "Zustand",
                                                "MobX",
                                            ].map((t) => (
                                                <span
                                                    key={t}
                                                    className={`px-2.5 py-1 ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-white/60 border-white/80"} border rounded-lg text-[10px] md:text-xs font-medium shadow-sm`}
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="group/stack">
                                        <h4
                                            className={`text-[9px] md:text-[10px] font-bold opacity-40 uppercase tracking-[0.3em] mb-4 group-hover/stack:${pointColor} transition-colors`}
                                        >
                                            Backend
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                "Java",
                                                "Node.js",
                                                "Spring Boot",
                                                "NestJS",
                                                "JPA",
                                                "MariaDB",
                                                "MySQL",
                                                "Redis",
                                                "RabbitMQ",
                                                "Kafka",
                                                "Docker",
                                                "Kubernetes",
                                                "Security",
                                                "Apache JMeter",
                                                "Swagger",
                                                "QueryDSL",
                                            ].map((t) => (
                                                <span
                                                    key={t}
                                                    className={`px-2.5 py-1 ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-white/60 border-white/80"} border rounded-lg text-[10px] md:text-xs font-medium shadow-sm`}
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6 md:space-y-8">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-1 h-5 md:w-1.5 md:h-6 ${theme === "dark" ? "bg-blue-500" : "bg-blue-400 shadow-sm"} rounded-full`}
                                    />
                                    <h3 className="text-xs md:text-sm font-black tracking-[0.2em] uppercase">
                                        CREDENTIAL
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                                    {[
                                        "PCCE level 2",
                                        "웹디자인 기능사",
                                        "GTQ 1급",
                                        "GTQ-i 1급",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className={`flex items-center gap-3 text-xs md:text-sm opacity-80 ${theme === "dark" ? "bg-white/5 border-white/5" : "bg-white/40 border-white/80"} p-3 rounded-xl border`}
                                        >
                                            <CheckCircle2 size={14} className={pointColor} />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
