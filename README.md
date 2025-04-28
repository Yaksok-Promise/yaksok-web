## Library설치

- `pnpm add "library name" -F "package name"`
-  package name은 각 project package.json의 `name`에서 확인할 수 있습니다.

## Lint
- biome로 대체합니다. 
- vscode extension의 biome를 설치한후 해당 설명대로 Default Format을 biome로 설정합니다.
- biome 설정을 참고하려면 root 경로에서 다음과 같은 명령어로 접근할 수 있습니다. 
    - `pnpm run lint` : biome 환경에 따라 lint 검사를 실행합니다.
    - `pnpm run lint:fix` : biome 환경에 따라 lint 검사를 실행후 error를 수정합니다.


## Git hooks
```bash
pnpm install
pnpm run lefthook
```