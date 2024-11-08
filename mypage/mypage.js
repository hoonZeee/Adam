document.addEventListener('DOMContentLoaded', function() {
    // 월별 사용 현황 차트
    const ctx = document.getElementById('monthlyChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
            datasets: [{
                label: '사용금액',
                data: [3000, 4500, 2800, 5000, 3800, 4200],
                borderColor: 'rgb(255, 0, 0)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value, index, values) {
                            return value.toLocaleString() + '원';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // 포인트 충전 버튼 이벤트
    const chargeButton = document.getElementById('chargeButton');
    chargeButton.addEventListener('click', function() {
        alert('포인트 충전 페이지로 이동합니다.');
    });

    // 네비게이션 항목 호버 효과
    const navItems = document.querySelectorAll('nav ul li a');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#e0e0e0';
        });
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
});

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


function saveProfile(event) {
    event.preventDefault();
    const newName = document.getElementById("modal-username").value;
    const newContact = document.getElementById("modal-user-contact").value;
    const newEmail = document.getElementById("modal-user-email").value;
    const newProfileImageSrc = document.getElementById("modal-profile-img-preview").src;

    // 프로필 정보 업데이트
    document.getElementById("username").innerText = newName;
    document.getElementById("user-contact").innerText = "연락처: " + newContact;
    document.getElementById("user-email").innerText = "이메일: " + newEmail;

    // 새로운 프로필 이미지가 있다면 업데이트
    if (newProfileImageSrc && newProfileImageSrc !== '') {
        document.getElementById("profile-img").src = newProfileImageSrc;
    }

    alert("프로필이 수정되었습니다!");
    closeEditProfileModal();
}

function handleProfileImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function() {
        // 미리보기 이미지 업데이트
        document.getElementById("modal-profile-img-preview").src = reader.result;

    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        console.error("파일이 선택되지 않았습니다.");
    }
}

function openEditProfileModal() {
    document.getElementById('edit-profile-modal').style.display = 'block';

    // 현재 프로필 정보로 모달 초기화
    document.getElementById('modal-username').value = document.getElementById('username').innerText;
    document.getElementById('modal-user-contact').value = document.getElementById('user-contact').innerText.replace('연락처: ', '');
    document.getElementById('modal-user-email').value = document.getElementById('user-email').innerText.replace('이메일: ', '');
}

function closeEditProfileModal() {
    document.getElementById('edit-profile-modal').style.display = 'none';
}

