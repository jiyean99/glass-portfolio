import type { BlogPost } from "../types/portfolio";

export const blogPosts: BlogPost[] = [
    {
        title: "백엔드 시리즈",
        excerpt:
            "이 시리즈에서는 백엔드 개발의 핵심 개념과 실무 적용 방법을 다룹니다. Java 언어 기초부터 Spring Boot 프레임워크 활용까지 단계별로 설명합니다.",
        date: "2025.12.08",
        tags: ["Java", "Spring Boot", "Backend"],
        link: "https://velog.io/@jiyean99/series/%EB%B0%B1%EC%97%94%EB%93%9C",
    },
    {
        title: "기반기술 시리즈",
        excerpt:
            "이 시리즈에서는 소프트웨어 개발에 필수적인 기반 기술들을 다룹니다. 운영체제의 기본 개념부터 데이터베이스 관리, 버전 관리 시스템 git, 소프트웨어 공학 원칙까지 폭넓게 설명합니다.",
        date: "2025.11.20",
        tags: ["OS", "Database", "Git", "SW공학"],
        link: "https://velog.io/@jiyean99/series/%EA%B8%B0%EB%B0%98%EA%B8%B0%EC%88%A0",
    },
    {
        title: "프론트엔드 시리즈",
        excerpt: "이 시리즈에서는 프론트엔드 개발의 기초부터 심화까지 다룹니다. HTML과 CSS를 이용한 웹 페이지 구조와 스타일링, JavaScript를 활용한 동적 기능 구현 방법을 단계별로 설명합니다.",
        date: "2025.10.05",
        tags: ["HTML", "CSS", "JavaScript", "Frontend"],
        link: "https://velog.io/@jiyean99/series/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C",
    },
    {
        title: "네트워크 시리즈",
        excerpt: "이 시리즈에서는 네트워크의 기본 개념부터 실무 적용까지 다룹니다. TCP/IP, HTTP/HTTPS, DNS 등 네트워크 핵심 프로토콜과 웹 통신의 원리를 단계별로 설명합니다.",
        date: "2025.10.05",
        tags: ["Network", "TCP/IP", "HTTP", "DNS"],
        link: "https://velog.io/@jiyean99/series/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC",
    },
];
