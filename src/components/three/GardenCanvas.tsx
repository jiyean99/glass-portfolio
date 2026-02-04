import { useEffect, useRef, useState } from "react";
import { useGardenScene } from "../../hooks/useGardenScene";

type Theme = "dark" | "light";

type Props = {
    theme: Theme;
    cursorRef: React.RefObject<HTMLDivElement | null>;
    onBloom: () => void;
    onFirstBloom: () => void;
};

export default function GardenCanvas({
    theme,
    cursorRef,
    onBloom,
    onFirstBloom,
}: Props) {
    const canvasContainerRef = useRef<HTMLDivElement | null>(null);
    const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        setContainerEl(canvasContainerRef.current);
    }, []);

    useGardenScene(containerEl, {
        theme,
        onBloom,
        onFirstBloom,
        cursorEl: cursorRef.current,
    });

    return (
        <div
            ref={canvasContainerRef}
            className="fixed inset-0 z-0 pointer-events-auto"
        />
    );
}
