import type { BlogPost } from "../types/portfolio";

export const blogPosts: BlogPost[] = [
    {
        title: "React와 Three.js로 구현하는 인터랙티브 가든",
        excerpt:
            "웹 상에서 3D 요소를 자연스럽게 렌더링하고 사용자 인터랙션을 처리하는 기술적인 도전에 대해 기록합니다.",
        date: "2025.12.15",
        tags: ["Three.js", "React", "WebGL"],
        link: "https://velog.io/jiyean99/posts",
    },
    {
        title: "Spring Boot Security: JWT 인증의 모든 것",
        excerpt:
            "보안이 중요한 엔터프라이즈 환경에서 JWT를 활용한 인증 및 인가 시스템을 구축한 과정을 상세히 공유합니다.",
        date: "2025.11.20",
        tags: ["Spring Boot", "Security", "JWT"],
        link: "https://velog.io/jiyean99/posts",
    },
    {
        title: "프론트엔드 성능 최적화 전략",
        excerpt: "실제 서비스 운영 환경에서 웹 렌더링 성능을 200% 개선하며 얻은 인사이트를 정리했습니다.",
        date: "2025.10.05",
        tags: ["Performance", "Optimization"],
        link: "https://velog.io/jiyean99/posts",
    },
];
