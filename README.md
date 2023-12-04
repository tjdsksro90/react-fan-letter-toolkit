# 리액트 팬레터 페이지

기존 redux 작업 된 페이지를 새로운 기능들을 추가하고 react-toolkik을 활용해 전부 react-thunk로 리팩토링 작업

## 실행법

이 프로젝트를 실행하기 위해선 아래 명령어 사용

### `yarn start`

---
## 새롭게 추가 된 기능
- 회원가입, 로그인 화면 추가
  - universal-cookie 모듈을 활용해 쿠키로 계정정보 저장활용
  - 로그인 후에도 계속해서 로그인 상태 유지
- 기존 Router 작업 위에 접근자헨 Outlet 사용
  - 메인도 로그인이 되어야만 접근하게 작업
- 상세화면 수정
  - 본인 계정만 수정삭제 할 수 있도록 수정
- 글 작성
  - 본인 닉네임을 자동으로 들어가게끔 수정
- json-server를 통해 db에 데이터 저장
- 프로필 페이지 추가
  - 회원정보 수정 페이지
  - 회원정보 수정하면 게시물들의 내용들도 업데이트
- 팝업창 대신 toast 팝업 사용
