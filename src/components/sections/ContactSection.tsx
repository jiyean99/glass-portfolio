import { Send } from "lucide-react";

type Props = {
    theme: "dark" | "light";
    pointBg: string;
};

export default function ContactSection({ theme, pointBg }: Props) {
    return (
        <section
            id="contact"
            className="relative py-24 md:py-48 px-6 md:px-24 flex flex-col items-center justify-center text-center"
        >
            <div className="relative z-10 max-w-3xl w-full">
                <h2 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase mb-8 md:mb-12 leading-none">
                    Lets <br />
                    Grow.
                </h2>

                <a
                    href="mailto:contact@jiyean.kr"
                    className={`group flex items-center gap-4 md:gap-6 ${pointBg} text-white md:text-black px-7 py-4 md:px-10 md:py-5 mx-auto rounded-full font-black text-base md:text-xl hover:scale-105 transition-all w-fit uppercase active:scale-95 shadow-xl`}
                >
                    <Send size={18} />
                    Send an Email
                </a>

                <div
                    className={`mt-16 md:mt-24 pt-8 md:pt-10 border-t ${theme === "dark" ? "border-white/5" : "border-black/10"
                        } text-[8px] md:text-[10px] opacity-30 font-bold uppercase tracking-widest`}
                >
                    2026 JIYEAN.LEE FULLSTACK EVOLUTION.
                </div>
            </div>
        </section>
    );
}
