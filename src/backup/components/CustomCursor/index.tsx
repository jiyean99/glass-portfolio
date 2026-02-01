import { useEffect, useRef } from "react";

function CustomCursor() {
  const cursorDotOutline = useRef<HTMLDivElement | null>(null);
  const cursorDot = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number>(0);

  const cursorVisible = useRef<boolean>(false);
  const cursorEnlarged = useRef<boolean>(false);

  // 따라다니는 커서 위치 (useRef로 관리)
  const endX = useRef<number>(window.innerWidth / 2);
  const endY = useRef<number>(window.innerHeight / 2);
  const animX = useRef<number>(window.innerWidth / 2);
  const animY = useRef<number>(window.innerHeight / 2);

  // 마우스 이벤트 핸들러
  const onMouseMove = (event: MouseEvent) => {
    endX.current = event.pageX;
    endY.current = event.pageY;
    cursorVisible.current = true;
    toggleCursorVisibility();

    if (cursorDot.current) {
      cursorDot.current.style.top = `${endY.current}px`;
      cursorDot.current.style.left = `${endX.current}px`;
    }
  };

  const onMouseEnter = () => {
    cursorVisible.current = true;
    toggleCursorVisibility();
  };

  const onMouseLeave = () => {
    cursorVisible.current = false;
    toggleCursorVisibility();
  };

  const onMouseDown = () => {
    cursorEnlarged.current = true;
    toggleCursorSize();
  };

  const onMouseUp = () => {
    cursorEnlarged.current = false;
    toggleCursorSize();
  };

  const onResize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    // 커서 위치도 화면 중앙으로 리셋
    endX.current = w / 2;
    endY.current = h / 2;
    animX.current = w / 2;
    animY.current = h / 2;
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    window.addEventListener("resize", onResize);

    requestRef.current = requestAnimationFrame(animateDotOutline);
    handleLinks();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", onResize);

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  function toggleCursorVisibility() {
    if (!cursorDot.current || !cursorDotOutline.current) return;
    if (cursorVisible.current) {
      cursorDot.current.style.opacity = "1";
      cursorDotOutline.current.style.opacity = "1";
    } else {
      cursorDot.current.style.opacity = "0";
      cursorDotOutline.current.style.opacity = "0";
    }
  }

  function toggleCursorSize() {
    if (!cursorDot.current || !cursorDotOutline.current) return;
    if (cursorEnlarged.current) {
      cursorDot.current.style.transform = "translate(-50%, -50%) scale(0.7)";
      cursorDotOutline.current.style.transform =
        "translate(-50%, -50%) scale(5)";
    } else {
      cursorDot.current.style.transform = "translate(-50%, -50%) scale(1)";
      cursorDotOutline.current.style.transform =
        "translate(-50%, -50%) scale(1)";
    }
  }

  function handleLinks() {
    document.querySelectorAll("a").forEach((el) => {
      el.addEventListener("mouseover", () => {
        cursorEnlarged.current = true;
        toggleCursorSize();
      });
      el.addEventListener("mouseout", () => {
        cursorEnlarged.current = false;
        toggleCursorSize();
      });
    });
  }

  function animateDotOutline(time: number) {
    if (previousTimeRef.current !== undefined && cursorDotOutline.current) {
      animX.current += (endX.current - animX.current) / 8;
      animY.current += (endY.current - animY.current) / 8;

      cursorDotOutline.current.style.top = `${animY.current}px`;
      cursorDotOutline.current.style.left = `${animX.current}px`;
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateDotOutline);
  }

  return (
    <>
      <div ref={cursorDotOutline} id="cursor-dot-outline" />
      <div ref={cursorDot} id="cursor-dot" />
    </>
  );
}

export default CustomCursor;
