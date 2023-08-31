## ?using only accessToken

Client 와 Server 가 있다고 가정하고 설명하면,

1. Client 가 Server에 login 요청을 한다.

   1-1.로그인이 성공이라면, **secret**과 **algorithm**으로 보호된 JWT token(access Token)을 발급

   1-2. 로그인이 실패하면, 실패 메세지 보냄.

2. Client 가 accessToken을 건네며, protected한 resource에 접근 요청을한다.

   2-1. accessToken이 유효 하다면, protected한 resource 접근가능

   2-2. 아니라면 불가능

> 위의 형태가 accessToken만을 운용했을 떄 저런형태로 된다.

- 단점

  - accessToken의 운용 시간이 길면, 보안상 문제가 발생하고, 너무 짧으면 사용자가 불편함을 겪는다.(다시 로그인)

  - 로그아웃이 거의 불가하다. 로그아웃을 원한다면, 캐시내에 acceesToken을 블랙리스트화 해야한다.

## ?using both accessToken and refreshToken

Client 와 Server 가 있다고 가정하고 설명하면,

1. Client 가 Server에 login 요청을 한다.

   1-1.로그인이 성공이라면, 서로 다른 **secret**과 **algorithm**으로 보호된 JWT token(access Token, refresh Token) 2개를 발급

   1-2. 로그인이 실패하면, 실패 메세지 보냄.

2. Client 가 accessToken을 건네며, protected한 resource에 접근 요청을한다.

   2-1. accessToken이 유효 하다면, protected한 resource 접근가능

   2-2. 아니라면 불가능

   2-3. 만료 되었다면 3번 진행

3. refresh endpoint로 refresh token을 보낸다.

   3-1. refresh token이 유효하다면, 새로운 access token을 발급해준다.

   3-2. 아니라면 로그인 상태 유지가 불가하다.

> 위의 형태가 accessToken과 그 단점을 보완하기 위해 refreshToken으로 운용되는 매커니즘이다.

- 특징

  - refresh token은 expir 기간을 길게 잡고, access token 은 expir 기간을 짧게 잡는다.

  - 로그아웃이 가능하다. (refresh token을 삭제해버리면 된다. )

  > refresh token이 없으면 로그인 유지 자체가 불가하게 해도 된다.
  > 하지만 그렇지 않아도, access token의 유효기간이 매우 짧기때문에,
  > 상관없다.
