import { useEffect, useRef } from "react";
import * as THREE from "three";

type Theme = "dark" | "light";

type UseGardenSceneParams = {
    theme: Theme;
    onBloom?: () => void; // 꽃 1송이 피었을 때 plantsCount++ 용도 [file:1]
    onFirstBloom?: () => void; // 첫 클릭 여부 처리 (hasClicked=true) 용도 [file:1]
    cursorEl?: HTMLDivElement | null; // 커서 DOM 업데이트 용도 [file:1]
};

export function useGardenScene(
    containerEl: HTMLDivElement | null,
    { theme, onBloom, onFirstBloom, cursorEl }: UseGardenSceneParams,
) {
    const sceneRef = useRef<THREE.Scene | null>(null);
    const groundRef = useRef<THREE.Mesh | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

    // 1) theme 변경 시 색상 업데이트 (원래 App의 useEffect(theme) 분리) [file:1]
    useEffect(() => {
        if (!sceneRef.current || !groundRef.current) return;

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

        const mat = groundRef.current.material as THREE.MeshStandardMaterial;
        mat.color.set(groundColor);
        mat.emissive.set(groundEmissive);
    }, [theme]);

    // 2) scene 초기화 + 이벤트/애니메이션 (원래 App의 useEffect([]) 분리) [file:1]
    useEffect(() => {
        if (!containerEl) return;

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

        // 기존 renderer DOM 제거 후 새로 append (원본 코드 유지) [file:1]
        if (rendererRef.current?.domElement?.parentNode) {
            rendererRef.current.domElement.parentNode.removeChild(
                rendererRef.current.domElement,
            );
        }
        containerEl.appendChild(renderer.domElement);
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
            onFirstBloom?.();

            const group = new THREE.Group();
            const height = 18 + Math.random() * 8;
            const curvePoints: THREE.Vector3[] = [];
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

            const startTime = Date.now();
            const animateGrowth = () => {
                const elapsed = (Date.now() - startTime) / 1000;

                if (group.position.y < 0) group.position.y += 0.6;

                head.children.forEach((child) => {
                    if (child.userData.delay !== undefined && elapsed > child.userData.delay) {
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
            onBloom?.();
        };

        const mouse = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();

        const onPointerDown = (e: MouseEvent | TouchEvent) => {
            const target = e.target as HTMLElement;

            // 기존 방어 로직 유지: UI 클릭이면 bloom 방지 [file:1]
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

            if (intersects.length > 0) {
                createDaisy(intersects[0].point.x, intersects[0].point.z);
            }
        };

        const onMouseMove = (e: MouseEvent) => {
            const clientX = e.clientX;
            const clientY = e.clientY;

            mouse.x = (clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(clientY / window.innerHeight) * 2 + 1;

            if (cursorEl) {
                cursorEl.style.left = `${clientX}px`;
                cursorEl.style.top = `${clientY}px`;
            }
        };

        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };

        window.addEventListener("mousedown", onPointerDown);
        window.addEventListener("touchstart", onPointerDown);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("resize", handleResize);

        let rafId = 0;
        const animate = () => {
            camera.position.x += (mouse.x * 12 - camera.position.x) * 0.03;
            camera.lookAt(0, 15 + window.scrollY * 0.02, 0);
            renderer.render(scene, camera);
            rafId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener("mousedown", onPointerDown);
            window.removeEventListener("touchstart", onPointerDown);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", handleResize);

            cancelAnimationFrame(rafId);
            renderer.dispose();

            // container에서 domElement 제거(남아있으면 다음 mount 때 중복될 수 있음)
            if (renderer.domElement.parentNode) {
                renderer.domElement.parentNode.removeChild(renderer.domElement);
            }

            sceneRef.current = null;
            groundRef.current = null;
            rendererRef.current = null;
        };
        // containerEl이 바뀌면 재초기화, theme은 색상 useEffect에서 처리 [file:1]
    }, [containerEl]);
}
