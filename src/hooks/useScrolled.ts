import { useEffect, useState } from "react";

type Options = {
    threshold?: number; // default 80
};

export function useScrolled(options: Options = {}) {
    const { threshold = 80 } = options;
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > threshold);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [threshold]);

    return scrolled;
}
