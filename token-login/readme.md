## ?using only accessToken

Client �� Server �� �ִٰ� �����ϰ� �����ϸ�,

1. Client �� Server�� login ��û�� �Ѵ�.

   1-1.�α����� �����̶��, **secret**�� **algorithm**���� ��ȣ�� JWT token(access Token)�� �߱�

   1-2. �α����� �����ϸ�, ���� �޼��� ����.

2. Client �� accessToken�� �ǳ׸�, protected�� resource�� ���� ��û���Ѵ�.

   2-1. accessToken�� ��ȿ �ϴٸ�, protected�� resource ���ٰ���

   2-2. �ƴ϶�� �Ұ���

> ���� ���°� accessToken���� ������� �� �������·� �ȴ�.

- ����

  - accessToken�� ��� �ð��� ���, ���Ȼ� ������ �߻��ϰ�, �ʹ� ª���� ����ڰ� �������� �޴´�.(�ٽ� �α���)

  - �α׾ƿ��� ���� �Ұ��ϴ�. �α׾ƿ��� ���Ѵٸ�, ĳ�ó��� acceesToken�� ������Ʈȭ �ؾ��Ѵ�.

## ?using both accessToken and refreshToken

Client �� Server �� �ִٰ� �����ϰ� �����ϸ�,

1. Client �� Server�� login ��û�� �Ѵ�.

   1-1.�α����� �����̶��, ���� �ٸ� **secret**�� **algorithm**���� ��ȣ�� JWT token(access Token, refresh Token) 2���� �߱�

   1-2. �α����� �����ϸ�, ���� �޼��� ����.

2. Client �� accessToken�� �ǳ׸�, protected�� resource�� ���� ��û���Ѵ�.

   2-1. accessToken�� ��ȿ �ϴٸ�, protected�� resource ���ٰ���

   2-2. �ƴ϶�� �Ұ���

   2-3. ���� �Ǿ��ٸ� 3�� ����

3. refresh endpoint�� refresh token�� ������.

   3-1. refresh token�� ��ȿ�ϴٸ�, ���ο� access token�� �߱����ش�.

   3-2. �ƴ϶�� �α��� ���� ������ �Ұ��ϴ�.

> ���� ���°� accessToken�� �� ������ �����ϱ� ���� refreshToken���� ���Ǵ� ��Ŀ�����̴�.

- Ư¡

  - refresh token�� expir �Ⱓ�� ��� ���, access token �� expir �Ⱓ�� ª�� ��´�.

  - �α׾ƿ��� �����ϴ�. (refresh token�� �����ع����� �ȴ�. )

  > refresh token�� ������ �α��� ���� ��ü�� �Ұ��ϰ� �ص� �ȴ�.
  > ������ �׷��� �ʾƵ�, access token�� ��ȿ�Ⱓ�� �ſ� ª�⶧����,
  > �������.
