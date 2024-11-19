# Project Update
###  npm install mysql,express,express-session,multer
---
### 2024년 11월 1일(21:53) 이지훈
1. 서버 구축 및 메인 페이지 구현
- **메인 페이지**
  - **배너 및 서브 배너 기능 구현**
  - **메인 이미지 팝업 효과 및 서브 타이틀 흐름도 구현**
2. 작가 페이지
- **작가 리스트 구성**
  - 3x3 크기로 구성된 작가 프로필 카드
  - 기능: 프로필 이미지, 좋아요(찜하기), 대표 이미지, 해시태그 
- **작가 페이지 생성 기능**
  - 페이지 생성 버튼을 통해 새로운 작가 스퀘어 생성 가능

  ### 2024년 11월 1일(23:50) 정현성
1. 서버 구축 및 작품 페이지 구현
- **작품 페이지**
  - **배너 및 서브 배너 기능 구현**
  - **메인 이미지 팝업 효과 구현**
2. 작품 페이지
- **작품 리스트 구성**
  - 작품으로 구성된 상품 프로필 정렬
  - 기능: 상품 이미지, 좋아요(찜하기), 해시태그 , 정렬 , 필터

    ### 2024년 11월 3일(02:30) 정현성
1. 서버 구축 및 작품 상세 페이지 구현
- **작품 상세 페이지**
  - **구매하기 와 렌탈하기**
  - **작품 상세페이지 구현**
2. 작품상세 페이지
- **작품 상세페이지 구성**
  - 작품으로 구성된 상품 상세 프로필 페이지
  - 기능: 상품 이미지, 좋아요(찜하기), 구매하기 , 렌탈하기 , 상품의 상세설명


### 2024년 11월 4일(12:40) 권진호
- **무료체험 안내 페이지** 
  - 무료체험 안내
  - 유의사항 안내
- **결제 정보 입력 페이지**
  - 3개월 무상이용 후 결제카드정보등록
- **결제 완료 페이지**
  - 결제 완료 시 주문 내역 및 결제 정보 확인 페이지
  - 결제 성공 시 홈으로 돌아가기 버튼 구현

  ### 2024년 11월 4일(17:00) 정현성
- **회원가입 기능구현** 
  - 회원가입 db생성 및 회원가입 기능구현
  - 로그인 기능 구현
- **메인페이지**
  - 회원가입후 로그인 -> 메인페이지 연결 메인페이지 배너 사용자명 및 로그아웃기능구현

### 2024년 11월 6일(01:00) 이지훈
- **이미지 슬라디어기능구현** 
-js이미지 무한복사, 슬라디어 기능, 부드러운 이미지 넘김 효과

### 2024년 11월 6일(02:00) 정현성
- **버튼 변경**
- css버튼 여러이미지 추가 14가지 효과 버튼생성

### 2024년 11월 6일(04:00) 권진호
- **장바구니페이지** 
  - 갯수추가, 장바구니삭제, 추가기능, 금액합산 기능 
- **결제페이지**
  - 작품보기에서 구매버튼 클릭시 결제페이지로 이동
  - ing..
- **메인화면**
  - 로그인 회원가입 버튼 위치,모양 수정
  - 메뉴에 마우스 대면 서브메뉴 모두보이게 수정
  - ing..

  ### 2024년 11월 8일(02:00) 정현성
- **작품페이지** 
  - 작품 리스트 대거추가 및 전체적인 스타일 변경
- **상세페이지**
  - 작품보기에서 작품 클릭시 상세페이지로 이동
  - 상세페이지안의 이미지들 작성 및 전체적인 스타일 변경
- **스크롤기능**
  - info박스의 스크롤 기능 추가
 
  ### 2024년 11월 8일(04:00) 김민서
- **마이페이지**
- 초안 생성.
- 개인 프로필 설정, 지출 그래프 추가
- 수정 및 보안 작업중.

### 2024년 11월 1일(21:53) 이지훈
1. **신인작가페이지**
  - 피드형식으로 스크롤하여 감상하고 좋아요, 코멘트 기능 구현.
  - 글작성시 프로필과, 날짜를 기본정보에서 불러오고 이미지 및 db연동 기능 구현
2.  메인페이지 전체적인 백그라운드 개발 및 지출 그래프 구현
3.  user , post db 구축 및 코드 리팩토링
4. 전체적인 홈페이지 컨테이너css 재배치

### 2024년 11월 19일(12:53) 정현성
1. **서버**
  - 데이터베이스 모델링
  - db연동 기능 구현
  - server.js db구축
  - Get-ExecutionPolicy 정책확인 - RemoteSigned 으로 변경되어야함,Set-ExecutionPolicy RemoteSigned -Scope CurrentUser 설정 , Set-ExecutionPolicy Restricted -Scope CurrentUser 설정복원
