// 일간, 주간 및 월간 그래프 표시 함수
function showDaily() {
    updateGraph('일별');
}

function showWeekly() {
    updateGraph('주간');
}

function showMonthly() {
    updateGraph('월간');
}

function updateGraph(type) {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    
    // 데이터 설정
    let labels = [];
    let data = [];
    
    if (type === '일별') {
        labels = ['월', '화', '수', '목', '금', '토', '일']; // 일별 라벨
        data = [50, 75, 100, 80, 120, 200, 180]; // 일별 지출 데이터 예시
    }else if (type === '주간') {
        labels = ['1주차', '2주차', '3주차', '4주차']; // 주간 라벨 (주간 기준)
        data = [300, 500, 400, 600]; // 주간 지출 데이터 예시
    
    }else if (type === '월간') {
        labels = ['1월', '2월', '3월', '4월','5월','6월','7월','8월','9월','10월','11월','12월']; // 월간 라벨 (월간 기준)
        data = [300, 500, 400, 600,400,500,700,800,1200,100,200]; // 월간 지출 데이터 예시
    }

    // 그래프에 해당하는 기간 텍스트 업데이트
    const periodText = document.getElementById('period-text');
    periodText.innerText = `${type} 지출 내역`;

    // 그래프 업데이트
    if (window.chart) {
        window.chart.destroy(); // 기존 차트 삭제
    }

    window.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: `${type} 지출`,
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                    display : false //범례 표시 비활성화
                }
            },
            layout: {
                padding: {
                    top: -10 // 상단 여백 줄이기
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// 탭 전환 기능
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    const activeTab = document.getElementById(tabId);
    activeTab.classList.add('active');

    const buttons = document.querySelectorAll('.menu-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`button[onclick="showTab('${tabId}')"]`).classList.add('active');
}

// 탭 전환 대신 스크롤 기능
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    window.scrollTo({
        top: section.offsetTop - 20, // 섹션 바로 위로 스크롤
        behavior: 'smooth' // 부드러운 스크롤 애니메이션
    });

    // 탭 전환 (스크롤 후)
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active')); // 기존 활성 탭 비활성화

    const activeTab = document.getElementById(sectionId);
    activeTab.classList.add('active'); // 해당 섹션을 활성화
    
    const buttons = document.querySelectorAll('.menu-btn');   // 활성화된 버튼 스타일 적용
    buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`button[onclick="scrollToSection('${sectionId}')"]`).classList.add('active');
}

// 페이지 로드 시 기본적으로 주간 지출로 초기화
document.addEventListener('DOMContentLoaded', () => {
    showWeekly();  // 주간 지출로 초기화
});


// 프로필 정보 저장 함수
function saveProfile() {
    // 모달 입력에서 업데이트된 값 가져오기
    const newName = document.getElementById("modal-username").value;
    const newContact = document.getElementById("modal-user-contact").value;
    const newEmail = document.getElementById("modal-user-email").value;
    const newProfileImageSrc = document.getElementById("modal-profile-img-preview").src;

    // 메인 프로필에 업데이트된 값 적용
    document.getElementById("username").innerText = newName;
    document.getElementById("user-contact").innerText = "연락처: " + newContact;
    document.getElementById("user-email").innerText = "이메일: " + newEmail;
    
    // 새로운 이미지가 선택되었다면 메인 프로필 이미지 업데이트
    if (newProfileImageSrc) {
        document.getElementById("profile-img").src = newProfileImageSrc;
    }

    alert("프로필이 수정되었습니다!");
    closeEditProfileModal(); // 모달 닫기
}

// 프로필 사진 미리보기 함수
function previewProfileImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function() {
        document.getElementById("modal-profile-img-preview").src = reader.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}

// 프로필 사진 업데이트 함수
function updateProfileImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function() {
        // 프로필 이미지 업데이트 (사용자 정보 섹션)
        document.getElementById('profile-img').src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file); // 파일을 읽어서 이미지로 변환
    }
}
// 프로필 수정 모달 열기
function openEditProfileModal() {
    document.getElementById('edit-profile-modal').style.display = 'block';

    // 현재 프로필 정보로 초기화
    document.getElementById('modal-username').value = document.getElementById('username').innerText;
    document.getElementById('modal-user-contact').value = document.getElementById('user-contact').innerText.replace('연락처: ', '');
    document.getElementById('modal-user-email').value = document.getElementById('user-email').innerText.replace('이메일: ', '');
}

// 프로필 수정 모달 닫기
function closeEditProfileModal() {
    document.getElementById('edit-profile-modal').style.display = 'none';
}

// 로그아웃 함수
function logout() {
    // 로그아웃 후 로그인 페이지로 이동
    window.location.href = '/main.html';
}

// Collapsible header 스크롤 이벤트
function initCollapsibleHeader() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    const banner = document.querySelector('.banner');

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            header.style.top = '-60px'; // 헤더 숨기기
            banner.style.top = '0';
        } else {
            header.style.top = '0'; // 헤더 표시
            banner.style.top = '60px';
        }
        lastScrollTop = scrollTop;
    });
}

// 페이지 로드 시 Collapsible Header 초기화
document.addEventListener('DOMContentLoaded', () => {
    initCollapsibleHeader();
});
