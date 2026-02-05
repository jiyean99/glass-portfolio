# Glass Portfolio

3D Garden 인터랙션과 Glassmorphism UI를 결합한 개인 포트폴리오 웹사이트입니다. 다크/라이트 테마 전환, 프로젝트 필터·페이지네이션, 글(블로그) 섹션까지 한 페이지에서 자연스럽게 탐색할 수 있도록 구성했습니다.

- Live Demo: https://jiyean99.github.io/glass-portfolio/
- GitHub: https://github.com/jiyean99/glass-portfolio

---

## Highlights

- **3D Garden Bloom**: 화면 빈 공간을 클릭하면 Raycasting으로 지면(Plane)을 판별해 클릭 위치에 데이지(줄기+꽃잎)를 생성하고, 성장 애니메이션으로 “피어나는” 경험을 구현했습니다.
- **Theme System (3D까지 연동)**: 테마 전환 시 UI뿐 아니라 Three.js Scene의 background/fog/ground material까지 동기화했습니다.
- **Projects UX**:
  - 카테고리 필터 (All / Frontend / Backend / Data / Creative)
  - 반응형 페이지네이션(화면 폭에 따라 1/2/3개 표시; resize 감지)
- **UI Polish**: 커스텀 커서 DOM을 마우스 이동 좌표로 동기화해 인터랙션 몰입감을 높였습니다.
- **Navigation**: 스크롤 감지(`useScrolled`)로 Navbar 상태 변화

---

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Three.js
- lucide-react

---

## Project Structure

```
src/
  components/
    layout/
      Navbar.tsx
    sections/
      HeroSection.tsx
      AboutSection.tsx
      ExperienceSection.tsx
      ProjectsSection.tsx
      WritingSection.tsx
      ContactSection.tsx
    three/
      GardenCanvas.tsx
    ui/
      BloomHint.tsx
      GardenCursor.tsx

  data/
    projects.tsx
    blogPosts.ts

  hooks/
    useGardenScene.ts
    useProjects.ts
    useScrolled.ts
    useThemeClasses.ts

  types/
    portfolio.ts

  App.tsx
  index.css
```

---

## Core Implementation Notes

### 1) 3D Bloom Interaction (Three.js)

- `GardenCanvas`는 화면 전체에 고정된 컨테이너(`fixed inset-0`)에 renderer DOM을 붙입니다.
- `useGardenScene`에서 Scene/Camera/Light/Ground를 초기화하고, `Raycaster`로 클릭 지점을 계산해 꽃(데이지)을 생성합니다.
- UI 요소 클릭 시에는 bloom이 발생하지 않도록 `closest(button/nav/section/a)`로 방어 로직을 넣었습니다.
- 생성된 데이지는 Group 단위로 관리되며, 줄기는 `CatmullRomCurve3 + TubeGeometry`, 꽃잎은 `ShapeGeometry`로 구성하고, 꽃잎은 delay 기반 scale 애니메이션으로 순차 성장 효과를 냅니다.
- 애니메이션 루프에서 카메라 위치를 mouse 좌표에 살짝 따라가게 해(패럴럭스 느낌) 정적인 화면이 아니라 “살아있는” 느낌을 주도록 했습니다.

### 2) Theme Sync (UI + 3D)

- UI 테마: `useThemeClasses(theme)`에서 pointColor/glass class 등을 계산해 섹션 컴포넌트에 주입합니다.
- 3D 테마: `useGardenScene` 내부에서 `theme` 변경을 감지해 Scene의 background/fog, 지면 material(color/emissive)을 업데이트합니다.

### 3) Projects Filtering (Category as Array)

프로젝트의 `category`는 배열이며, 필터는 `includes()` 기반으로 동작합니다.

- `ProjectCategory`: `"All" | "Frontend" | "Backend" | "Data" | "Creative"`
- `Project.category`: `Exclude<ProjectCategory, "All">[]`

---

## Troubleshooting & Improvements

### A) Sticky Layout 이슈 (Overflow)

레이아웃에서 `overflow-x-hidden`이 상위 컨테이너에 걸려 있을 경우 `position: sticky`가 기대대로 동작하지 않는 케이스가 있어, sticky가 필요한 영역의 조상 요소 overflow를 최소화하고 가로 오버플로우 원인을 줄이는 방향으로 레이아웃을 조정했습니다.

### B) Filter 타입 설계 (All은 “필터 값”, 카테고리는 “데이터 값”)

`"All"`은 프로젝트 카테고리가 아니라 UI 필터 값이므로, 필터 타입과 프로젝트 카테고리 타입을 분리해 관리했습니다(프로젝트는 Exclude로 제한).

### C) 페이지네이션 UX

필터 변경 또는 화면 크기 변경으로 totalPages가 줄어들 때 빈 목록이 보이지 않도록 currentPage를 보정하고, 필터 변경 시 page를 1로 리셋했습니다.

### D) Three.js Cleanup

컨테이너가 변경되거나 컴포넌트가 언마운트될 때:
- 이벤트 리스너 제거
- RAF 취소
- renderer dispose
- renderer DOMElement 제거
위 작업사항을 수행하여 중복 mount/메모리 누수를 방지했습니다.

---

## Getting Started

### Prerequisites
- Node.js (LTS 권장)

### Install & Run

```bash
git clone https://github.com/jiyean99/glass-portfolio.git
cd glass-portfolio

npm install
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

---

## Deploy (GitHub Pages + Vite)

GitHub Pages는 레포지토리 경로 하위로 배포되므로, Vite 설정에서 `base` 경로가 필요할 수 있습니다.

- Repo 배포 예) `https://<USER>.github.io/<REPO>/`
- 이 프로젝트 예) `base: "/glass-portfolio/"`

Vite 공식 가이드: https://ko.vite.dev/guide/static-deploy

---

## Customization

- 프로젝트 목록: `src/data/projects.tsx`
- 글 목록: `src/data/blogPosts.ts`
- 테마/글래스 스타일: `src/hooks/useThemeClasses.ts`
- 3D 연출/상호작용: `src/hooks/useGardenScene.ts`, `src/components/three/GardenCanvas.tsx`
