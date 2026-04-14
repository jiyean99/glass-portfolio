import { CheckCircle2, Github, MessageCircle } from "lucide-react";

type Props = {
    theme: "dark" | "light";
    pointColor: string;
    pointBg: string;
    pointBorder: string;
    glassBase: string;
};

export default function AboutSection({ theme, pointColor, pointBg, pointBorder, glassBase }: Props) {
    const profileImageSrc = `${import.meta.env.BASE_URL}profile.png`;

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
                                <img
                                    src={profileImageSrc}
                                    alt="이지연 프로필 사진"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div
                                    className={`absolute inset-0 bg-gradient-to-tr ${theme === "dark" ? "from-yellow-400/10" : "from-amber-400/10"} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
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
                            className={`${glassBase} p-7 md:p-12 lg:p-10 rounded-[35px] md:rounded-[50px] space-y-10 md:space-y-12 border`}
                        >
                            <div className="space-y-5 md:space-y-7">
                                <div
                                    className={`${theme === "dark" ? "bg-white/5 border-yellow-400/50" : "bg-amber-400/10 border-amber-400/40"} p-5 md:p-6 rounded-2xl border-l-4 italic font-light opacity-90 text-sm md:text-base shadow-sm`}
                                >
                                    “좋았다면 추억이고 나빴다면 경험이다.”
                                </div>
                                <p className="text-sm sm:text-base md:text-lg font-light opacity-85 leading-relaxed">
                                    어떤 상황에서도 배움을 놓치지 않으려는 태도로 성장해 온 이지연입니다.
                                </p>
                            </div>

                            <div className="space-y-5 md:space-y-7">
                                <h3 className={`text-xs md:text-sm font-black tracking-[0.2em] uppercase ${pointColor} opacity-90`}>
                                    KEYWORDS & VALUES
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 md:gap-x-8 md:gap-y-3">
                                    {[
                                        "책임감 있는 태도",
                                        "빠른 수긍과 존중",
                                        "긍정적인 문제 해결",
                                        "자전거 타기",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-2 text-xs md:text-sm"
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full ${pointBg} shrink-0`} />
                                            <span className="opacity-80">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6 md:space-y-8">
                                <h3 className={`text-xs md:text-sm font-black tracking-[0.2em] uppercase ${pointColor} opacity-90`}>
                                    TECH STACK
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 md:gap-10 text-left">
                                    <div className="group/stack">
                                        <h4
                                            className={`text-[9px] md:text-[10px] font-bold opacity-55 uppercase tracking-[0.3em] mb-3 group-hover/stack:${pointColor} transition-colors`}
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
                                                    className={`px-3 py-1 ${theme === "dark" ? "bg-white/8 border-white/15 text-white/90" : "bg-white/85 border-black/10 text-[#111111]"} border rounded-full text-[10px] md:text-xs font-medium shadow-sm`}
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="group/stack">
                                        <h4
                                            className={`text-[9px] md:text-[10px] font-bold opacity-55 uppercase tracking-[0.3em] mb-3 group-hover/stack:${pointColor} transition-colors`}
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
                                                "STOMP",
                                                "RabbitMQ",
                                                "Kafka",
                                                "Security",
                                                "Apache JMeter",
                                                "QueryDSL",
                                            ].map((t) => (
                                                <span
                                                    key={t}
                                                    className={`px-3 py-1 ${theme === "dark" ? "bg-white/8 border-white/15 text-white/90" : "bg-white/85 border-black/10 text-[#111111]"} border rounded-full text-[10px] md:text-xs font-medium shadow-sm`}
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="group/stack">
                                        <h4
                                            className={`text-[9px] md:text-[10px] font-bold opacity-55 uppercase tracking-[0.3em] mb-3 group-hover/stack:${pointColor} transition-colors`}
                                        >
                                            DevOps & Cloud
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                "AWS EC2",
                                                "AWS S3",
                                                "AWS RDS",
                                                "Docker",
                                                "Kubernetes",
                                                "Nginx",
                                                "GitHub Actions",
                                                "CI/CD",
                                            ].map((t) => (
                                                <span
                                                    key={t}
                                                    className={`px-3 py-1 ${theme === "dark" ? "bg-white/8 border-white/15 text-white/90" : "bg-white/85 border-black/10 text-[#111111]"} border rounded-full text-[10px] md:text-xs font-medium shadow-sm`}
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="group/stack">
                                        <h4
                                            className={`text-[9px] md:text-[10px] font-bold opacity-55 uppercase tracking-[0.3em] mb-3 group-hover/stack:${pointColor} transition-colors`}
                                        >
                                            Tools
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                "Git",
                                                "GitHub",
                                                "Postman",
                                                "Swagger",
                                                "Jira",
                                                "Notion",
                                                "Figma",
                                                "Slack",
                                                "IntelliJ",
                                                "VS Code",
                                            ].map((t) => (
                                                <span
                                                    key={t}
                                                    className={`px-3 py-1 ${theme === "dark" ? "bg-white/8 border-white/15 text-white/90" : "bg-white/85 border-black/10 text-[#111111]"} border rounded-full text-[10px] md:text-xs font-medium shadow-sm`}
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6 md:space-y-8">
                                <h3 className={`text-xs md:text-sm font-black tracking-[0.2em] uppercase ${pointColor} opacity-90`}>
                                    CREDENTIAL
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 md:gap-y-3">
                                    {[
                                        "PCCE level 2",
                                        "웹디자인 기능사",
                                        "GTQ 1급",
                                        "GTQ-i 1급",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-2.5 text-xs md:text-sm"
                                        >
                                            <CheckCircle2 size={13} className={`${pointColor} shrink-0`} />
                                            <span className="opacity-80">{item}</span>
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
