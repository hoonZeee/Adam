document.addEventListener('DOMContentLoaded', () => {
    // 회원가입 폼 처리
    const signupForm = document.querySelector('#signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // 기본 폼 제출 동작 방지

            const userName = document.getElementById('NAME').value;
            const userId = document.getElementById('ID').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // 비밀번호 확인
            if (password !== confirmPassword) {
                alert("비밀번호가 일치하지 않습니다.");
                return;
            }

            // 서버로 데이터 전송
            try {
                const response = await fetch('/process/adduser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ NAME: userName, ID: userId, password }),
                });

                const result = await response.json();
                if (result.success) {
                    alert("회원가입 성공!");
                    window.location.href = "./login.html"; // 회원가입 성공 시 로그인 페이지로 이동
                } else {
                    alert("회원가입 실패: " + result.message);
                }
            } catch (error) {
                console.error("회원가입 중 오류 발생:", error);
                alert("회원가입에 실패했습니다. 다시 시도해주세요.");
            }
        });
    }

    // 로그인 폼 처리
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // 기본 폼 제출 동작 방지

            const userId = document.getElementById('id').value; // 아이디 가져오기
            const password = document.getElementById('password').value; // 비밀번호 가져오기

            // 서버로 데이터 전송
            try {
                const response = await fetch('/process/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_id: userId, password }),
                });

                const result = await response.json();
                if (result.success) {
                    alert("로그인 성공!");
                    window.location.href = result.redirectUrl; // 응답에서 받은 URL로 이동
                } else {
                    alert("로그인 실패: " + result.message);
                }
            } catch (error) {
                console.error("로그인 중 오류 발생:", error);
                alert("로그인에 실패했습니다. 다시 시도해주세요.");
            }
        });
    }
});
// 이메일 형식 확인 함수
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// 로그인 폼 제출 처리
function handleLogin(event) {
    event.preventDefault(); // 페이지 리로드 방지

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!isValidEmail(email)) {
        alert("올바른 이메일 형식을 입력해주세요.");
        return;
    }

    if (password.length < 6) {
        alert("비밀번호는 6자 이상이어야 합니다.");
        return;
    }

    // 로그인 로직 (예시)
    alert("로그인이 완료되었습니다.");
    // 실제 로그인 요청은 서버와 통신 필요
    window.location.href = '/';
}

// 회원가입 폼 제출 처리
function handleSignup(event) {
    event.preventDefault(); // 페이지 리로드 방지

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!isValidEmail(email)) {
        alert("올바른 이메일 형식을 입력해주세요.");
        return;
    }

    if (password.length < 6) {
        alert("비밀번호는 6자 이상이어야 합니다.");
        return;
    }

    if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    // 회원가입 로직 (예시)
    alert("회원가입이 완료되었습니다.");
    // 실제 회원가입 요청은 서버와 통신 필요
    window.location.href = '/login';
}

// 이벤트 리스너 추가
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector("form[action='login']");
    const signupForm = document.querySelector("form[action='signup']");

    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }

    if (signupForm) {
        signupForm.addEventListener("submit", handleSignup);
    }
});