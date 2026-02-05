import { useMemo } from "react";
import type { Theme } from "../types/portfolio";

export type ThemeClasses = {
    appTheme: any;
    appShell: any;
    pointColor: string;
    pointBg: string;
    pointBorder: string;
    pointFilterActive: string;
    glassBase: string;
    glassProject: string;
};

export function useThemeClasses(theme: Theme): ThemeClasses {
    return useMemo(() => {
        const pointColor = theme === "dark" ? "text-yellow-400" : "text-amber-500";
        const pointBg = theme === "dark" ? "bg-yellow-400" : "bg-amber-400";
        const pointBorder = theme === "dark" ? "border-yellow-400" : "border-amber-400";

        const pointFilterActive =
            theme === "dark"
                ? "bg-yellow-400 text-black border-yellow-400"
                : "bg-amber-400 text-white border-amber-400 shadow-lg";

        const glassBase =
            theme === "dark"
                ? "bg-white/[0.03] border-white/10 backdrop-blur-2xl"
                : "bg-white/60 border-white/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]";

        const glassProject =
            theme === "dark"
                ? "bg-white/[0.04] border-white/10 hover:bg-white/[0.08]"
                : "bg-white/70 border-white/90 backdrop-blur-lg hover:border-amber-400/50 shadow-[0_4px_24px_rgba(0,0,0,0.04)]";

        return {
            appShell:
                "min-h-screen transition-colors duration-1000 font-sans selection:bg-yellow-400 selection:text-black overflow-x-hidden overflow-x-hidden lg:overflow-x-visible",
            appTheme:
                theme === "dark"
                    ? "bg-[#010804] text-white"
                    : "bg-[#f2f7f3] text-[#111111]",
            pointColor,
            pointBg,
            pointBorder,
            pointFilterActive,
            glassBase,
            glassProject,
        };
    }, [theme]);
}
