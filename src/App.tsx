import {
  useState,
  useEffect,
  useRef,
  useMemo,
  type SetStateAction,
} from "react";
import {
  Github,
  Linkedin,
  User,
  Briefcase,
  Send,
  ChevronDown,
  Zap,
  Palette,
  Box,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Terminal,
  ArrowUpRight,
  Smartphone,
  Database,
  CheckCircle2,
  Clock,
  Sun,
  Moon,
} from "lucide-react";
import * as THREE from "three";

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [plantsCount, setPlantsCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>(null);
  const groundRef = useRef<THREE.Mesh>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>(null);

  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(3);

  const projects = [
    {
      title: "Zempublic: Game Webview",
      desc: "승부사 온라인 및 챔프포커 내 하이브리드 웹뷰 환경 최적화 및 UI 개발",
      contribution: "프론트엔드 단일 담당자 (100%)",
      period: "2023.03 - 2025.08",
      tech: ["React", "JavaScript", "WebView", "Performance"],
      category: "Frontend",
      github: "https://github.com",
      demo: "https://demo.com",
      icon: <Smartphone size={24} />,
    },
    {
      title: "Revenue Dashboard",
      desc: "사내 매출 데이터를 실시간으로 시각화하고 관리하는 통합 대시보드 시스템 구축",
      contribution: "프론트엔드 단일 담당자 (100%)",
      period: "2024.01 - 2024.06",
      tech: ["React", "D3.js", "State Management"],
      category: "Data",
      github: "https://github.com",
      demo: "https://demo.com",
      icon: <Database size={24} />,
    },
    {
      title: "Beyond SW: Spring Project",
      desc: "Spring Boot 기반의 백엔드 아키텍처를 포함한 풀스택 커머스/플랫폼 프로젝트",
      contribution: "백엔드 설계 및 API 개발 (팀 프로젝트)",
      period: "2025.09 - 진행 중",
      tech: ["Java", "Spring Boot", "MySQL", "Full Stack"],
      category: "Backend",
      github: "https://github.com",
      demo: "https://demo.com",
      icon: <Terminal size={24} />,
    },
    {
      title: "Interactive Web Garden",
      desc: "Three.js와 실시간 인터랙션을 결합한 3D 디지털 정원 포트폴리오 템플릿 제작",
      contribution: "개인 프로젝트 (100%)",
      period: "2025.11 - 2025.12",
      tech: ["Three.js", "WebGL", "React"],
      category: "Creative",
      github: "https://github.com",
      demo: "https://demo.com",
      icon: <Box size={24} />,
    },
    {
      title: "AI Flower Classifier",
      desc: "TensorFlow.js를 이용한 실시간 식물 및 꽃 종류 식별 웹 애플리케이션",
      contribution: "개인 프로젝트 (100%)",
      period: "2025.07 - 2025.08",
      tech: ["TensorFlow.js", "React", "Python"],
      category: "Data",
      github: "https://github.com",
      demo: "https://demo.com",
      icon: <Cpu size={24} />,
    },
    {
      title: "Nature UI Kit",
      desc: "유기적인 디자인 시스템을 위한 오픈소스 Tailwind CSS 컴포넌트 라이브러리",
      contribution: "UI 컴포넌트 설계 및 배포 (100%)",
      period: "2024.10 - 2024.12",
      tech: ["Tailwind CSS", "React", "TypeScript"],
      category: "Frontend",
      github: "https://github.com",
      demo: "https://demo.com",
      icon: <Palette size={24} />,
    },
  ];

  const filterOptions = ["All", "Frontend", "Backend", "Data", "Creative"];

  const filteredProjects = useMemo(() => {
    return activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);
  }, [activeFilter, projects]);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage,
  );

  const handleFilterChange = (filter: SetStateAction<string>) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    if (sceneRef.current && groundRef.current) {
      const isDark = theme === "dark";
      const bgColor = isDark ? 0x010804 : 0xf2f7f3;
      const fogColor = isDark ? 0x010804 : 0xf2f7f3;
      const groundColor = isDark ? 0x051a0b : 0xe2ede4;
      const groundEmissive = isDark ? 0x020f06 : 0xd2dfd4;

      if (sceneRef.current.background instanceof THREE.Color) {
        sceneRef.current.background.set(bgColor);
      } else {
        sceneRef.current.background = new THREE.Color(bgColor);
      }
      if (sceneRef.current.fog) {
        sceneRef.current.fog.color.set(fogColor);
      }
      (groundRef.current.material as THREE.MeshStandardMaterial).color.set(
        groundColor,
      );
      (groundRef.current.material as THREE.MeshStandardMaterial).emissive.set(
        groundEmissive,
      );
    }
  }, [theme]);

  useEffect(() => {
    const updatePerPage = () => {
      if (window.innerWidth < 640) setProjectsPerPage(1);
      else if (window.innerWidth < 1024) setProjectsPerPage(2);
      else setProjectsPerPage(3);
    };
    updatePerPage();
    window.addEventListener("resize", updatePerPage);
    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

  useEffect(() => {
    if (!canvasContainerRef.current) return;

    const isDark = theme === "dark";
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(isDark ? 0x010804 : 0xf2f7f3);
    scene.fog = new THREE.FogExp2(isDark ? 0x010804 : 0xf2f7f3, 0.007);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000,
    );
    camera.position.set(0, 35, 80);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    if (rendererRef.current?.domElement?.parentNode) {
      rendererRef.current.domElement.parentNode.removeChild(
        rendererRef.current.domElement,
      );
    }

    canvasContainerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(50, 100, 50);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const gardenGroup = new THREE.Group();
    scene.add(gardenGroup);

    const groundGeo = new THREE.PlaneGeometry(2000, 2000);
    const groundMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x051a0b : 0xe2ede4,
      roughness: 0.8,
      metalness: 0.1,
      emissive: isDark ? 0x020f06 : 0xd2dfd4,
      emissiveIntensity: 0.4,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    groundRef.current = ground;
    scene.add(ground);

    const createDaisy = (x: number, z: number) => {
      const group = new THREE.Group();
      const height = 18 + Math.random() * 8;
      const curvePoints = [];
      const segments = 10;
      const waveIntensity = 1.5 + Math.random() * 2.0;
      const waveDirection = Math.random() * Math.PI * 2;

      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const currY = t * height;
        const offsetX =
          Math.sin(t * Math.PI) * Math.cos(waveDirection) * waveIntensity;
        const offsetZ =
          Math.sin(t * Math.PI) * Math.sin(waveDirection) * waveIntensity;
        curvePoints.push(new THREE.Vector3(offsetX, currY, offsetZ));
      }

      const stemCurve = new THREE.CatmullRomCurve3(curvePoints);
      const stemGeo = new THREE.TubeGeometry(stemCurve, 20, 0.15, 8, false);
      const stemMat = new THREE.MeshStandardMaterial({ color: 0x3d7a36 });
      const stem = new THREE.Mesh(stemGeo, stemMat);
      group.add(stem);

      const headPosition = curvePoints[curvePoints.length - 1];
      const head = new THREE.Group();
      head.position.copy(headPosition);
      head.rotation.x = Math.PI / 3;
      group.add(head);

      const coreGroup = new THREE.Group();
      const stamenCount = 120;
      const coreBaseRadius = 1.6;
      const stamenGeo = new THREE.SphereGeometry(0.15, 6, 6);
      const stamenMat = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        emissive: 0xffa500,
        emissiveIntensity: 0.5,
      });

      for (let i = 0; i < stamenCount; i++) {
        const stamen = new THREE.Mesh(stamenGeo, stamenMat);
        const phi = i * Math.PI * (3 - Math.sqrt(5));
        const r = coreBaseRadius * Math.sqrt(i / stamenCount);
        stamen.position.set(
          Math.cos(phi) * r,
          Math.random() * 0.15 +
            Math.cos((r / coreBaseRadius) * Math.PI * 0.5) * 0.4,
          Math.sin(phi) * r,
        );
        coreGroup.add(stamen);
      }
      head.add(coreGroup);

      const petalCount = 22 + Math.floor(Math.random() * 8);
      for (let i = 0; i < petalCount; i++) {
        const petalWidth = 0.7 + Math.random() * 0.4;
        const petalLength = 4.5 + Math.random() * 1.5;
        const bendIntensity = 0.3 + Math.random() * 0.5;

        const petalShape = new THREE.Shape();
        petalShape.moveTo(0, 0);
        petalShape.bezierCurveTo(
          petalWidth / 2,
          0.5,
          petalWidth,
          2,
          petalWidth,
          petalLength / 2,
        );
        petalShape.bezierCurveTo(
          petalWidth,
          petalLength,
          petalWidth / 2,
          petalLength + bendIntensity,
          0,
          petalLength + bendIntensity,
        );
        petalShape.bezierCurveTo(
          -petalWidth / 2,
          petalLength + bendIntensity,
          -petalWidth,
          petalLength,
          -petalWidth,
          petalLength / 2,
        );
        petalShape.bezierCurveTo(-petalWidth, 2, -petalWidth / 2, 0.5, 0, 0);

        const petalGeo = new THREE.ShapeGeometry(petalShape);
        const petalMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.9,
        });
        const petalPivot = new THREE.Group();
        const petal = new THREE.Mesh(petalGeo, petalMat);

        petalPivot.rotation.y =
          (i / petalCount) * Math.PI * 2 + Math.random() * 0.1;
        petal.position.z = coreBaseRadius * 0.4;
        petal.rotation.x = -Math.PI / 2 - Math.random() * 0.2;

        petalPivot.add(petal);
        petalPivot.scale.set(0, 0, 0);
        petalPivot.userData = { delay: i * 0.025 + Math.random() * 0.2 };
        head.add(petalPivot);
      }

      group.position.set(x, -height, z);
      gardenGroup.add(group);

      let startTime = Date.now();
      const animateGrowth = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        if (group.position.y < 0) group.position.y += 0.6;
        head.children.forEach((child) => {
          if (
            child.userData.delay !== undefined &&
            elapsed > child.userData.delay
          ) {
            const s = child.scale.x;
            if (s < 1) {
              const nextS = s + 0.04;
              child.scale.set(nextS, nextS, nextS);
            }
          }
        });
        if (elapsed < 5) requestAnimationFrame(animateGrowth);
      };
      animateGrowth();
      setPlantsCount((prev) => prev + 1);
    };

    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("nav") ||
        target.closest("section") ||
        target.closest("a")
      )
        return;
      const clientX =
        e instanceof MouseEvent ? e.clientX : e.touches[0]?.clientX || 0;
      const clientY =
        e instanceof MouseEvent ? e.clientY : e.touches[0]?.clientY || 0;
      mouse.x = (clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(ground);
      if (intersects.length > 0)
        createDaisy(intersects[0].point.x, intersects[0].point.z);
    };

    const onMouseMove = (e: MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;
      mouse.x = (clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(clientY / window.innerHeight) * 2 + 1;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${clientX}px`;
        cursorRef.current.style.top = `${clientY}px`;
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("touchstart", onPointerDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    const animate = () => {
      camera.position.x += (mouse.x * 12 - camera.position.x) * 0.03;
      camera.lookAt(0, 15 + window.scrollY * 0.02, 0);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  const pointColor = theme === "dark" ? "text-yellow-400" : "text-amber-500";
  const pointBg = theme === "dark" ? "bg-yellow-400" : "bg-amber-400";
  const pointBorder =
    theme === "dark" ? "border-yellow-400" : "border-amber-400";
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

  return (
    <div
      className={`min-h-screen transition-colors duration-1000 ${theme === "dark" ? "bg-[#010804] text-white" : "bg-[#f2f7f3] text-[#111111]"} font-sans selection:bg-yellow-400 selection:text-black overflow-x-hidden`}
    >
      <div
        ref={canvasContainerRef}
        className="fixed inset-0 z-0 pointer-events-auto"
      />

      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
      >
        <div
          className={`w-10 h-10 border ${theme === "dark" ? "border-yellow-400/30" : "border-amber-400/30"} rounded-full animate-ping absolute -inset-4`}
        />
        <div
          className={`w-2 h-2 ${theme === "dark" ? "bg-yellow-400 shadow-[0_0_15px_#ffd000]" : "bg-amber-400 shadow-[0_0_15px_#fbbf24]"} rounded-full`}
        />
      </div>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 px-4 sm:px-6 md:px-12 py-4 md:py-6 flex justify-between items-center ${scrolled ? (theme === "dark" ? "bg-black/70 backdrop-blur-md py-3 md:py-4" : "bg-white/60 backdrop-blur-md py-3 md:py-4 shadow-[0_2px_15px_rgba(0,0,0,0.03)] border-b border-white/50") : "bg-transparent"}`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-7 h-7 md:w-8 md:h-8 ${theme === "dark" ? "bg-yellow-400" : "bg-amber-400"} rounded-full flex items-center justify-center text-black font-black italic text-sm md:text-base`}
          >
            J
          </div>
          <span className="text-lg md:text-xl font-bold tracking-tighter">
            JIYEAN.KR
          </span>
        </div>

        <div className="flex items-center gap-3 md:gap-10">
          <div className="hidden lg:flex items-center gap-10 text-[10px] md:text-[11px] font-bold tracking-widest uppercase opacity-60">
            <a
              href="#about"
              className={`hover:${pointColor} transition-colors`}
            >
              About Me
            </a>
            <a
              href="#experience"
              className={`hover:${pointColor} transition-colors`}
            >
              Experience
            </a>
            <a
              href="#projects"
              className={`hover:${pointColor} transition-colors`}
            >
              Project
            </a>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-all ${theme === "dark" ? "border-white/10 bg-white/5 hover:bg-white/10 text-yellow-400" : "border-black/5 bg-black/5 hover:bg-black/10 text-amber-500"}`}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <div
              className={`${theme === "dark" ? "bg-white/10 border-white/10" : "bg-white/50 border-white/80 shadow-inner"} px-3 md:px-4 py-1.5 md:py-2 rounded-full flex items-center gap-2 border text-[9px] md:text-[11px] font-bold`}
            >
              <span
                className={`w-1.5 h-1.5 ${theme === "dark" ? "bg-yellow-400" : "bg-amber-400"} rounded-full animate-pulse`}
              />
              <span className="whitespace-nowrap">{plantsCount} Bloomed</span>
            </div>
          </div>
        </div>
      </nav>

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
            화면을 클릭하여 꽃을 피워주세요.
          </p>
          <div className="mt-10 md:mt-12 flex items-center gap-4 animate-bounce">
            <ChevronDown size={20} className="opacity-30" />
            <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold opacity-40">
              Scroll Down
            </span>
          </div>
        </div>
      </section>

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
                  <div
                    className={`absolute inset-0 bg-gradient-to-tr ${theme === "dark" ? "from-yellow-400/10" : "from-amber-400/10"} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
                  />
                  <User
                    size={40}
                    className="opacity-10 group-hover:opacity-20 transition-all duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex gap-4">
                  <div
                    className={`w-10 h-10 rounded-full border ${theme === "dark" ? "border-white/20" : "border-black/10 bg-white/40"} flex items-center justify-center hover:${pointBorder} hover:${pointColor} transition-all cursor-pointer`}
                  >
                    <Github size={16} />
                  </div>
                  <div
                    className={`w-10 h-10 rounded-full border ${theme === "dark" ? "border-white/20" : "border-black/10 bg-white/40"} flex items-center justify-center hover:${pointBorder} hover:${pointColor} transition-all cursor-pointer`}
                  >
                    <Linkedin size={16} />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[65%] flex flex-col gap-8">
              <div
                className={`${glassBase} p-8 md:p-14 rounded-[35px] md:rounded-[50px] space-y-12 md:space-y-16 border`}
              >
                <div className="space-y-6 md:space-y-8">
                  <div
                    className={`${theme === "dark" ? "bg-white/5 border-yellow-400/50" : "bg-amber-400/10 border-amber-400/40"} p-5 md:p-6 rounded-2xl border-l-4 italic font-light opacity-90 text-sm md:text-base shadow-sm`}
                  >
                    “좋았다면 추억이고 나빴다면 경험이다.”
                  </div>
                  <p className="text-base sm:text-lg md:text-2xl font-light opacity-80 leading-relaxed">
                    어떤 상황에서도 배움을 놓치지 않으려는 태도로 성장해 온
                    이지연입니다.
                  </p>
                </div>

                <div className="space-y-6 md:space-y-8">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-1 h-5 md:w-1.5 md:h-6 ${theme === "dark" ? "bg-green-500" : "bg-green-500 shadow-sm"} rounded-full`}
                    />
                    <h3 className="text-xs md:text-sm font-black tracking-[0.2em] uppercase">
                      KEYWORDS & VALUES
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                    {[
                      "책임감 있는 태도",
                      "빠른 수긍과 존중",
                      "긍정적인 문제 해결",
                      "자전거 타기",
                    ].map((item) => (
                      <div
                        key={item}
                        className={`flex items-center gap-3 text-xs md:text-sm opacity-80 ${theme === "dark" ? "bg-white/5 border-white/5" : "bg-white/40 border-white/80"} p-3 rounded-xl border`}
                      >
                        <CheckCircle2 size={14} className={pointColor} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8 md:space-y-10">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-1 h-5 md:w-1.5 md:h-6 ${theme === "dark" ? "bg-purple-500" : "bg-purple-400 shadow-sm"} rounded-full`}
                    />
                    <h3 className="text-xs md:text-sm font-black tracking-[0.2em] uppercase">
                      TECH STACK
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 text-left">
                    <div className="group/stack">
                      <h4
                        className={`text-[9px] md:text-[10px] font-bold opacity-40 uppercase tracking-[0.3em] mb-4 group-hover/stack:${pointColor} transition-colors`}
                      >
                        Frontend
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "React",
                          "TypeScript",
                          "Tailwind",
                          "Three.js",
                          "Zustand",
                        ].map((t) => (
                          <span
                            key={t}
                            className={`px-2.5 py-1 ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-white/60 border-white/80"} border rounded-lg text-[10px] md:text-xs font-medium shadow-sm`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="group/stack">
                      <h4
                        className={`text-[9px] md:text-[10px] font-bold opacity-40 uppercase tracking-[0.3em] mb-4 group-hover/stack:${pointColor} transition-colors`}
                      >
                        Backend
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Spring Boot",
                          "JPA",
                          "MariaDB",
                          "Security",
                          "QueryDSL",
                        ].map((t) => (
                          <span
                            key={t}
                            className={`px-2.5 py-1 ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-white/60 border-white/80"} border rounded-lg text-[10px] md:text-xs font-medium shadow-sm`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 md:space-y-8">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-1 h-5 md:w-1.5 md:h-6 ${theme === "dark" ? "bg-blue-500" : "bg-blue-400 shadow-sm"} rounded-full`}
                    />
                    <h3 className="text-xs md:text-sm font-black tracking-[0.2em] uppercase">
                      CREDENTIAL
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                    {[
                      "PCCE level 2",
                      "웹디자인 기능사",
                      "GTQ 1급",
                      "GTQ-i 1급",
                    ].map((item) => (
                      <div
                        key={item}
                        className={`flex items-center gap-3 text-xs md:text-sm opacity-80 ${theme === "dark" ? "bg-white/5 border-white/5" : "bg-white/40 border-white/80"} p-3 rounded-xl border`}
                      >
                        <CheckCircle2 size={14} className={pointColor} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="experience"
        className="relative py-20 md:py-48 px-6 md:px-24"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-baseline gap-4 md:gap-6 mb-16 md:mb-24">
            <span
              className={`${pointColor} font-mono text-xs md:text-sm tracking-widest uppercase block`}
            >
              02. Experience
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">
              PROFESSIONAL
              <br />
              <span className={`italic ${pointColor}`}>EVOLUTION.</span>
            </h2>
          </div>
          <div className="relative">
            <div
              className={`absolute left-[15px] md:left-[50%] top-0 bottom-0 w-[1px] ${theme === "dark" ? "bg-gradient-to-b from-yellow-400" : "bg-gradient-to-b from-amber-400"} via-transparent to-transparent md:-translate-x-1/2 opacity-30`}
            />

            <div className="relative grid md:grid-cols-2 gap-8 md:gap-32 mb-16 md:mb-32 group">
              <div className="md:text-right md:pr-10">
                <div className="inline-flex items-center gap-4 mb-3 md:flex-row-reverse">
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${pointBg} text-white md:text-black flex items-center justify-center font-black animate-pulse shrink-0 shadow-lg`}
                  >
                    <Zap size={16} />
                  </div>
                  <span
                    className={`${pointColor} font-mono text-xs md:text-sm font-bold tracking-widest uppercase`}
                  >
                    2025.11 — 2026.05
                  </span>
                </div>
                <h3
                  className={`text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter uppercase mb-2 group-hover:${pointColor} transition-colors`}
                >
                  BEYOND SW CAMP
                </h3>
                <p className="text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-40 mb-4 md:mb-8">
                  Fullstack Engineering Immersion
                </p>
              </div>
              <div
                className={`${glassBase} p-7 md:p-10 rounded-[30px] md:rounded-[40px] group-hover:${pointBorder}/30 transition-all duration-500 border`}
              >
                <p className="text-sm md:text-lg font-light leading-relaxed opacity-70 mb-6 md:mb-8 italic">
                  프론트엔드 경력을 기반으로 Spring Boot 생태계를 마스터하며
                  풀스택 역량을 강화하고 있습니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Java",
                    "Spring Boot",
                    "JPA",
                    "MySQL",
                    "Redis",
                    "REST API",
                    "AWS",
                    "Docker",
                    "Kubernetes",
                    "Architecture",
                    "DevOps",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1.5 md:px-4 md:py-2 ${theme === "dark" ? "bg-yellow-400/5 border-yellow-400/10 text-yellow-400/80" : "bg-amber-400/10 border-amber-400/40 text-amber-600/80"} rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest border shadow-sm`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative grid md:grid-cols-2 gap-8 md:gap-32 group">
              <div className="md:order-2 md:pl-10">
                <div className="inline-flex items-center gap-4 mb-3">
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full border ${theme === "dark" ? "border-yellow-400/30" : "border-amber-400/40 bg-white/40"} flex items-center justify-center font-black shrink-0 group-hover:${pointBg} group-hover:text-white md:group-hover:text-black transition-all`}
                  >
                    <Briefcase size={16} />
                  </div>
                  <span
                    className={`font-mono text-xs md:text-sm font-bold tracking-widest uppercase opacity-40 group-hover:opacity-100 group-hover:${pointColor}`}
                  >
                    2023.03 — 2025.08
                  </span>
                </div>
                <h3
                  className={`text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter uppercase mb-2 group-hover:${pointColor} transition-colors`}
                >
                  (주)잼퍼블릭
                </h3>
                <p className="text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-40 mb-4 md:mb-8">
                  Web Solution Developer
                </p>
              </div>
              <div
                className={`${glassBase} p-7 md:p-10 rounded-[30px] md:rounded-[40px] group-hover:${pointBorder}/20 transition-all duration-500 md:text-right border`}
              >
                <div className="space-y-4 md:space-y-6">
                  {[
                    {
                      title: "승부사온라인",
                      desc: "모바일 중심 실시간 스포츠베팅 웹게임 유지 보수",
                    },
                    {
                      title: "사내 매출 관리 대시보드 구축",
                      desc: "Vue.js 및 Chart.js를 활용한 매출 분석 대시보드 개발",
                    },
                    {
                      title: "챔프포커",
                      desc: "unity 엔진 기반 게임 웹뷰 최적화",
                    },
                    {
                      title: "러닝 서비스 프로토타입",
                      desc: "React Native 어플리케이션 프로토타입 설계 및 구현 참여",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col md:items-end group/item"
                    >
                      <span
                        className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-1 ${pointColor} opacity-70`}
                      >
                        {item.title}
                      </span>
                      <span className="text-xs md:text-base opacity-60 font-light group-hover/item:opacity-100 transition-opacity">
                        {item.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="relative py-20 md:py-32 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 lg:mb-16 gap-8 lg:gap-10">
            <div className="space-y-3 md:space-y-4">
              <span
                className={`${pointColor} font-mono text-xs md:text-sm tracking-widest uppercase block`}
              >
                03. Project
              </span>
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
                PROJECT
                <br />
                <span className={`italic ${pointColor}`}>ARCHIVE.</span>
              </h2>
            </div>

            <div className="w-full lg:w-auto flex flex-col items-center lg:items-end gap-5 md:gap-6">
              <div className="flex flex-wrap justify-center lg:justify-end gap-2 pointer-events-auto w-full max-w-md lg:max-w-none">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterChange(option)}
                    className={`px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest transition-all border ${activeFilter === option ? pointFilterActive : theme === "dark" ? "bg-white/5 text-white/40 border-white/10 hover:border-white/30" : "bg-white/40 text-black/40 border-black/10 hover:border-black/30 backdrop-blur-md"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center gap-4 pointer-events-auto">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-full border transition-all ${theme === "dark" ? "border-white/10" : "border-black/10 bg-white/20 backdrop-blur-md"} ${currentPage === 1 ? "opacity-20 cursor-not-allowed" : `hover:${pointBorder} hover:${pointColor}`}`}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="text-[9px] md:text-[10px] font-mono font-bold opacity-50 uppercase tracking-widest">
                    <span className={pointColor}>{currentPage}</span> /{" "}
                    {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-full border transition-all ${theme === "dark" ? "border-white/10" : "border-black/10 bg-white/20 backdrop-blur-md"} ${currentPage === totalPages ? "opacity-20 cursor-not-allowed" : `hover:${pointBorder} hover:${pointColor}`}`}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-[500px]">
            {currentProjects.map((project, idx) => (
              <div
                key={idx}
                className={`group relative ${glassProject} border rounded-[35px] md:rounded-[40px] overflow-hidden transition-all duration-700 flex flex-col h-full animate-in fade-in slide-in-from-bottom-4`}
              >
                <div
                  className={`relative h-40 md:h-48 ${theme === "dark" ? "bg-[#0a120e]" : "bg-amber-400/5"} flex items-center justify-center overflow-hidden border-b ${theme === "dark" ? "border-white/5" : "border-white/90"}`}
                >
                  <div
                    className={`absolute inset-0 opacity-10 group-hover:scale-110 transition-transform duration-700`}
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, ${theme === "dark" ? "#ffd700" : "#f59e0b"} 1px, transparent 0)`,
                      backgroundSize: "24px 24px",
                    }}
                  ></div>
                  <div
                    className={`relative w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-white/80 border-white/90 shadow-lg"} border flex items-center justify-center ${pointColor} group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
                  >
                    {project.icon}
                  </div>
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-3 md:mb-4">
                    <span
                      className={`text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-widest ${pointColor}`}
                    >
                      {project.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-[8px] md:text-[9px] font-bold opacity-40 group-hover:opacity-80 transition-opacity">
                      <Clock size={10} />
                      <span>{project.period}</span>
                    </div>
                  </div>
                  <h3
                    className={`text-xl md:text-2xl font-black mb-1 group-hover:${pointColor} transition-colors uppercase tracking-tighter leading-tight`}
                  >
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-1.5 mb-3 md:mb-4 text-[10px] md:text-[11px] font-medium opacity-60">
                    <CheckCircle2
                      size={12}
                      className={`${pointColor} opacity-80`}
                    />
                    <span>{project.contribution}</span>
                  </div>

                  <p className="opacity-50 font-light mb-6 md:mb-8 text-xs md:text-sm leading-relaxed line-clamp-2">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-6 md:mb-8">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className={`text-[8px] md:text-[9px] font-bold px-2 py-0.5 ${theme === "dark" ? "bg-white/5 border-white/5" : "bg-white/60 border-white/80 shadow-sm"} border rounded-md opacity-50`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 md:py-3 ${theme === "dark" ? "bg-white/5 border-white/10 hover:bg-white text-black" : "bg-black/5 border-black/10 hover:bg-black text-white shadow-sm"} rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all border`}
                    >
                      <Github size={12} /> Github
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 md:py-3 ${pointBg} text-white md:text-black border-transparent rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all border shadow-lg`}
                    >
                      Demo <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="relative py-24 md:py-48 px-6 md:px-24 flex flex-col items-center justify-center text-center"
      >
        <div className="relative z-10 max-w-3xl w-full">
          <h2 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase mb-8 md:mb-12 leading-none">
            Let's
            <br />
            Grow.
          </h2>
          <a
            href="mailto:contact@jiyean.kr"
            className={`group flex items-center gap-4 md:gap-6 ${pointBg} text-white md:text-black px-7 py-4 md:px-10 md:py-5 mx-auto rounded-full font-black text-base md:text-xl hover:scale-105 transition-all w-fit uppercase active:scale-95 shadow-xl`}
          >
            <Send size={18} /> Send an Email
          </a>
          <div
            className={`mt-16 md:mt-24 pt-8 md:pt-10 border-t ${theme === "dark" ? "border-white/5" : "border-black/10"} text-[8px] md:text-[10px] opacity-30 font-bold uppercase tracking-widest`}
          >
            © 2026 JIYEAN.LEE — FULLSTACK EVOLUTION.
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
