## using cookie

cookie login 방식은 res.cookie에 담고 user에게 주는 형태로 진행 되는다. 그리고 user 정보를 가지고 있으면 인증 되게 하는 매커니즘을 띄고 있다.

- cookie 에 httponly 같은 여러 옵션으로 보안성을 증진할 수 있다.

- 클라이언트에서 전적으로 관리하기 때문에, 보안성에는 취약하다.

## using session

session login 방식은 req.session 에 담기 때문에 기본적으로 서버에서 session을 관리하게 됩니다. 그리고 user 가 session 정보를 credential 옵션으로 유지를 하게 되면 지속적으로 로그인상태를 유지할 수 있습니다.

- user의 모든 정보가 아닌 pk(primary key) 정보만 주기 때문에, deserialize 를 거쳐서 전체정보를 req.user 로 서버의 미들웨어에서 변환 시킴으로서, 보안성 증진이 가능하다.

- 또한 사용자가 api 에 접근할 때마다 상태를 업데이트해주는 미들웨어를 둠으로써, 사용자의 상태를 추적할 수 있다. 이는 비활동 시기의 사용자에게 자동 로그아웃이 되도록 할 수 있다.

- session을 만료값을 따로 관리해야하고, 서버의 자원을 사용하기 떄문에 cookie 로그인에 비해서 무겁지만, 반대로 보안성은 cookie 보다 더 높게 평갑 된다.
