import type { Theme } from "../../types/portfolio";

type Props = {
    theme: Theme;
    cursorRef: React.RefObject<HTMLDivElement | null>;
};

export default function GardenCursor({ theme, cursorRef }: Props) {
    return (
        <div
            ref={cursorRef}
            className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        >
            <div
                className={`w-10 h-10 border ${theme === "dark" ? "border-yellow-400/30" : "border-amber-400/30"
                    } rounded-full animate-ping absolute -inset-4`}
            />
            <div
                className={`w-2 h-2 ${theme === "dark"
                    ? "bg-yellow-400 shadow-[0_0_15px_#ffd000]"
                    : "bg-amber-400 shadow-[0_0_15px_#fbbf24]"
                    } rounded-full`}
            />
        </div>
    );
}
