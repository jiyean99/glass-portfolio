import { MousePointer2 } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
    visible: boolean;
    pointBg: string;
    pointBorder: string;
    pointColor: string;
    hideAfterScrollY?: number; // 추가 (기본값 줄 예정)
};

export default function BloomHint({
    visible,
    pointBg,
    pointBorder,
    pointColor,
    hideAfterScrollY = 80,
}: Props) {
    const [hideByScroll, setHideByScroll] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setHideByScroll(window.scrollY > hideAfterScrollY);
        };

        onScroll(); // 초기 1회 동기화
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [hideAfterScrollY]);

    if (!visible || hideByScroll) return null;

    return (
        <div className="fixed bottom-[15vh] md:bottom-[10vh] left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center pointer-events-none transition-all duration-1000 animate-in fade-in slide-in-from-bottom-10">
            {/* 이하 동일 */}
            <div className="relative flex flex-col items-center group">
                <div className={`absolute -inset-10 ${pointBg} opacity-10 blur-[80px] rounded-full animate-pulse`} />
                <div className="flex flex-col items-center gap-3 animate-bounce">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full border border-dashed ${pointBorder} flex items-center justify-center bg-white/5 backdrop-blur-sm`}>
                        <MousePointer2 className={pointColor} size={18} />
                    </div>

                    <div className="flex flex-col items-center">
                        <span className={`text-[10px] md:text-xs font-black tracking-[0.4em] uppercase ${pointColor} drop-shadow-sm`}>
                            Click to Bloom
                        </span>
                        <span className="text-[8px] md:text-[9px] font-bold opacity-30 tracking-[0.2em] uppercase mt-1">
                            메인화면에서 클릭하여 꽃을 피워보세요!
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
