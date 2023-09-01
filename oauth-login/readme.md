## implement through google

## implement through naver

## implement through kakao

3가지 구현 방식 모두 거의 동일 하다.

일단 각 Oauth 을 지원하는 개발자 사이트 내에서 ClientId 와 ClientSecret 을 가지고 온다. ClientId와 ClientSecret을 통해서 passport 내에서 지원하는 모듈을 통해서 인증을 진행하게 된다.

현재 예제는 session을 통해서 로그인 유지를 진행하였고, 상황에 맞게 정보를 저장하는 매커니즘은 변경 가능하다.

- 필요한 것
  - callback url
  - access할 url (client)

callback url은 각 로그인 전략에 따라 url 과 mapping 되며, axios 로 부르는 것이 아닌, redirect 로 url에 접근한다.

- 장점

  - 보안 향상
  - 사용자 편의성
  - 개발 효율성
  - 타사 통합 (kakao, facebook etc..)

- 단점

  - 구현이 복잡해진다.

    > 보안 설정및 관리를 하기 위해 구현의 난이도가 올라가게 된다.

  - 서비스에 대한 의존성

  - flow 이해에 어려움이 생길 수도 있다.
