import { Moon, Sun } from "lucide-react";
import type { Theme } from "../../types/portfolio";

type Props = {
    theme: Theme;
    scrolled: boolean;
    plantsCount: number;
    pointColor: string;

    onToggleTheme: () => void;
};

export default function Navbar({
    theme,
    scrolled,
    plantsCount,
    pointColor,
    onToggleTheme,
}: Props) {
    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 px-4 sm:px-6 md:px-12 py-4 md:py-6 flex justify-between items-center ${scrolled
                ? theme === "dark"
                    ? "bg-black/70 backdrop-blur-md py-3 md:py-4"
                    : "bg-white/60 backdrop-blur-md py-3 md:py-4 shadow-[0_2px_15px_rgba(0,0,0,0.03)] border-b border-white/50"
                : "bg-transparent"
                }`}
        >
            <div className="flex items-center gap-2">
                <div
                    className={`w-7 h-7 md:w-8 md:h-8 ${theme === "dark" ? "bg-yellow-400" : "bg-amber-400"
                        } rounded-full flex items-center justify-center text-black font-black italic text-sm md:text-base`}
                >
                    J
                </div>
                <span className="text-lg md:text-xl font-bold tracking-tighter">
                    JIYEAN.KR
                </span>
            </div>

            <div className="flex items-center gap-3 md:gap-10">
                <div className="hidden lg:flex items-center gap-10 text-[10px] md:text-[11px] font-bold tracking-widest uppercase opacity-60">
                    <a href="#about" className={`hover:${pointColor} transition-colors`}>
                        About Me
                    </a>
                    <a
                        href="#experience"
                        className={`hover:${pointColor} transition-colors`}
                    >
                        Experience
                    </a>
                    <a href="#projects" className={`hover:${pointColor} transition-colors`}>
                        Project
                    </a>
                    <a href="#writing" className={`hover:${pointColor} transition-colors`}>
                        Writing
                    </a>
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                    <button
                        onClick={onToggleTheme}
                        className={`p-2 rounded-full border transition-all ${theme === "dark"
                            ? "border-white/10 bg-white/5 hover:bg-white/10 text-yellow-400"
                            : "border-black/5 bg-black/5 hover:bg-black/10 text-amber-500"
                            }`}
                    >
                        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                    </button>

                    <div
                        className={`${theme === "dark"
                            ? "bg-white/10 border-white/10"
                            : "bg-white/50 border-white/80 shadow-inner"
                            } px-3 md:px-4 py-1.5 md:py-2 rounded-full flex items-center gap-2 border text-[9px] md:text-[11px] font-bold`}
                    >
                        <span
                            className={`w-1.5 h-1.5 ${theme === "dark" ? "bg-yellow-400" : "bg-amber-400"
                                } rounded-full animate-pulse`}
                        />
                        <span className="whitespace-nowrap">{plantsCount} Bloomed</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}
