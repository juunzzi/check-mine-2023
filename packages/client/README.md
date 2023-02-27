# Payment Client Project

백엔드 프로젝트와 마찬가지로 모듈의 기능을 기준으로 응집시키기 보단, 모듈들이 속하는 데이터 모델 영역을 기준으로 모듈을 응집시켰습니다. 프론트엔드 프로젝트의 구조는 다음과 같습니다. (UI 모듈들이 담긴 `@page, @components`, UI가 트리거하는 비즈니스 로직이 담긴 `@domains` 폴더에 대해서만 첨부합니다.)

```bash
// Business 모듈이 담긴 @domains Code Block

├── src
│   ├── @domain
│   │    ├── account
│   │    │    │── api.ts
│   │    │    │── hooks.ts
│   │    │    └── type.ts
│   │    ├── order
│   │    │    │── api.ts
│   │    │    │── hooks.ts
│   │    │    └── type.ts
│   │    ├── product
│   │    │    │── api.ts
│   │    │    │── hooks.ts
│   │    │    └── type.ts
│   │    ├── user
│   │    │    │── api.ts
│   │    │    │── hooks.ts
│   │    │    └── type.ts
│   │    └── module
```

-   `@domain` : 외부 데이터를 조작하거나 불러오는 기능을 수행하는 등 서비스 모듈들이 배치되어 있는 폴더입니다. 프로젝트의 단일개로 존재하며 하위에는 데이터 모델 영역으로 구분된 폴더들이 존재합니다.

-   `@domain/[data-model]` : 각 데이터 모델에서 작성될 서비스 모듈들이 배치되어 있는 폴더입니다. 기본적으로 `api.ts`, `hooks.ts`, `type.ts` 모듈들이 선언되어 있습니다.

    -   `api.ts` : 실제 외부 데이터와 관련된 비동기 요청 (Ajax) 함수들이 선언되어 있는 모듈입니다. 네트워크 요청을 위해 `axios` 라이브러리를 사용하였으므로 `axios` 기술 기반으로 작성된 함수들이 선언되어 있습니다.

    -   `hooks.ts` : 외부 데이터를 컴포넌트 코드에서 참조하거나 조작할 수 있도록 `React Hook API` 기반으로 작성된 커스텀 훅들이 선언되어 있는 모듈입니다.

        -   외부 데이터의 참조 (`useFetch ~~`): `React Query` 의 `UseQuery API` 를 기반으로 작성된 커스텀 훅

        -   외부 데이터의 조작 (`useMutate ~~`) : `api.ts`에 선언된 함수를 기반으로 추상화된 함수가 선언되어 있는 커스텀 훅

    -   `type.ts` : 프론트엔드 서비스 코드에서 사용될 타입들이 선언되어 있습니다. 해당하는 데이터 모델 영역의 타입들이 선언되어 있습니다.

```bash
// UI 모듈이 담긴 @components, @pages Code Block

├── src
│   │── @pages
│   │    └── A Page
│   │         │── index.tsx
│   │         │── hooks.ts
│   │         │── style.tsx
│   │         │── loading-fallback.tsx
│   │         └── error-fallback.tsx
│   ├── @components
│   │    ├── account
│   │    │    └── A Component
│   │    │         │── index.tsx
│   │    │         │── hooks.ts
│   │    │         │── style.tsx
│   │    │         │── loading-fallback.tsx
│   │    │         └── error-fallback.tsx
│   │    ├── order
│   │    ├── product
│   │    ├── user
│   │    └── common
```

-   `@pages` : 페이지 컴포넌트가 배치되어 있는 폴더입니다.

-   `@components` : 페이지 컴포넌트에서 사용될 UI 컴포넌트가 배치되어 있는 폴더입니다. 하위에는 데이터 모델 기준으로 작성된 폴더와 `common` 폴더 들이 존재합니다.

-   `@components/common` : 도메인에 귀속되지 않은, 프로젝트 전반에서 사용되는 UI 컴포넌트가 배치되어 있는 폴더입니다. (e.g. Toast, Modal, ErrorBoundary, PageTemplate 등)

-   `@components/[data-model]` : `@components` 폴더 내부에는 데이터 모델 별로 각각 폴더가 하나씩 존재합니다. 도메인에 귀속된 컴포넌트들은 `@components`의 각자 속하는 데이터 모델 영역 폴더에 배치됩니다.

    -   `index.tsx` : 페이지 혹은 UI 컴포넌트 폴더에는 Main Resource인 `index.ts` 모듈이 단일개로 존재합니다. 해당 모듈 파일에는 `hooks.ts`, `style.ts`, `loading-fallback.ts`, `error-fallback.ts` 들에 선언된 함수들을 사용하여 작성된 컴포넌트 코드가 선언되어 있습니다.

    -   `hooks.ts` : 해당 컴포넌트 코드에서 작성될 **기능** 코드가 담겨 있는 모듈입니다. `React Hook API` 기반으로 작성된 커스텀 훅들이 배치되어 있습니다. UI가 갖게 되는 기능이 강하게 결합되지 않도록 하기 위해 별도의 `Hook` 으로 컴포넌트의 기능을 분리하여 관리합니다. (기능의 재사용성 ✅, 관심사의 분리 ✅)

    -   `style.tsx` : UI 컴포넌트에서 사용될 스타일 코드가 작성되어 있는 모듈입니다.

    -   `loading-fallback.tsx` : UI 컴포넌트에서 사용될 비동기 요청, 혹은 컴포넌트의 lazy loading 시 Pending 상태의 UI를 표현하는 컴포넌트 코드가 작성되어 있는 모듈입니다.

    -   `error-fallback.tsx` : UI에서 사용될 비동기 요청 혹은 컴포넌트의 lazy loading 시 Failure 상태의 UI를 표현하는 컴포넌트 코드가 작성되어 있는 모듈입니다.
