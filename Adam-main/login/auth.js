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