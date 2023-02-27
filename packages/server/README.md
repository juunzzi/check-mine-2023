# Payment Server Project

모듈이 수행하는 기능을 기준으로 응집시키기 보단 모듈이 속하게 되는 데이터 모델 영역을 기준으로 모듈들을 응집시켜보았습니다. 폴더 구조는 다음 Code Block과 같습니다. (비즈니스 로직이 담긴 @domains 폴더의 내용에 대해서만 첨부합니다.)

```bash
├── src
│   ├── @domains
│   │    ├── account
│   │    │    ├── router.ts
│   │    │    ├── service.ts
│   │    │    ├── type.ts
│   │    │    └── modules
│   │    │        ├── query.ts
│   │    │        └── validation.ts
│   │    ├── order
│   │    │    ├── router.ts
│   │    │    ├── service.ts
│   │    │    ├── type.ts
│   │    │    └── modules
│   │    │        ├── util.ts
│   │    │        └── validation.ts
│   │    ├── product
│   │    │    ├── router.ts
│   │    │    ├── service.ts
│   │    │    ├── type.ts
│   │    │    └── modules
│   │    │        └── query.ts
│   │    ├── user
│   │    │    ├── router.ts
│   │    │    ├── service.ts
│   │    │    ├── type.ts
│   │    │    └── modules
│   │    │        ├── jwt.ts
│   │    │        ├── middleware.ts
│   │    │        ├── payment-token-store.ts
│   │    │        ├── query.ts
│   │    │        └── validation.ts
```

-   **`@domains`** : 비즈니스 로직이 선언되어 있는 모듈들이 배치되어 있는 폴더입니다. 서비스의 중추 폴더라고 할 수 있습니다.

-   **`@domains/[data-model]`** : `@domains` 폴더 하위에는 데이터 모델 영역을 기준으로 생성된 폴더들이 존재합니다.

    -   **`router.ts`** : `[data-model]` 폴더 하위에는 하나의 `router.ts` 파일이 존재합니다. API의 엔드포인트 별로 선언된 `API Handler` 가 작성, 바인딩 되어있습니다. 사용자의 요청을 최초 받아내는 역할을 수행합니다.

    -   **`service.ts`** : `[data-model]` 폴더 하위에는 하나의 `service.ts` 파일이 존재합니다. 실제 DB 작업을 트리거하는 등 실제 비즈니스 로직이 선언되어 있는 모듈입니다.

    -   **`type.ts`** : `[data-model]` 폴더 하위에는 하나의 `type.ts` 파일이 존재합니다. 데이터 모델 영역에서 작성될 타입들이 선언되어 있는 모듈입니다.

    -   **`modules`** : 데이터 모델 영역의 `router` 로직, `service` 로직이 작성됨에 있어 부차적으로 필요한 모듈들이 선언되어 있는 폴더입니다. 하위에는 `middleware`, `util func`, `DB query func` 등이 선언되어 있는 모듈들이 존재합니다.
