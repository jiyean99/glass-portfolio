import { ChevronDown } from "lucide-react";

type Props = {
    theme: "dark" | "light";
    pointColor: string;
};

export default function HeroSection({ theme }: Props) {
    return (
        <section className="relative h-[90vh] md:h-screen flex flex-col justify-center items-start px-6 md:px-24 pointer-events-none">
            <div className="max-w-6xl w-full pt-20">
                <div
                    className={`flex items-center gap-3 mb-6 ${theme === "dark" ? "bg-yellow-400/10 border-yellow-400/20" : "bg-amber-400/10 border-amber-400/30"} border px-4 py-1.5 rounded-full w-fit backdrop-blur-sm`}
                >
                    <span
                        className={`text-[9px] md:text-[10px] font-bold tracking-widest uppercase ${theme === "dark" ? "text-yellow-400" : "text-amber-600"}`}
                    >
                        Frontend & Fullstack Engineer
                    </span>
                </div>
                <h1 className="text-[14vw] sm:text-[12vw] md:text-[10vw] font-black leading-[0.9] tracking-tighter uppercase break-words">
                    GROWING
                    <br />
                    <span
                        className={`${theme === "dark" ? "text-yellow-400" : "text-amber-500"} italic font-light`}
                    >
                        FULLSTACK
                    </span>
                    <br />
                    VISION.
                </h1>
                <p
                    className="mt-6 md:mt-8 text-sm sm:text-base md:text-xl opacity-60 max-w-xl font-light leading-relaxed"
                    style={{ textWrap: "nowrap" }}
                >
                    3년의 필드 경력을 바탕으로 탄탄한 프론트엔드를 구축하고,
                    <br className="hidden sm:block" />
                    이제는 Spring 생태계를 품은 풀스택 개발자로 성장하고 있습니다.
                    <br className="hidden sm:block" />
                    바닥을 클릭하여 꽃을 피워주세요.
                </p>
                <div className="mt-10 md:mt-12 flex items-center gap-4 animate-bounce">
                    <ChevronDown size={20} className="opacity-30" />
                    <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold opacity-40">
                        Scroll Down
                    </span>
                </div>
            </div>
        </section>
    );
}
