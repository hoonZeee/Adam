document.addEventListener('DOMContentLoaded', function() {
    // 기능 초기화
    initLikeButtons();
    initAuthorCardLinks();
    initCollapsibleHeader();
    initOpenForm();
});

// 좋아요 버튼 기능 설정 함수
function initLikeButtons() {
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('liked');
            updateLikeButton(this);
        });
    });
}

// 좋아요 버튼 아이콘 업데이트
function updateLikeButton(button) {
    if (button.classList.contains('liked')) {
        button.innerHTML = '<i class="fas fa-heart" style="color: #ff4757;"></i>';
    } else {
        button.innerHTML = '<i class="fas fa-heart"></i>';
    }
}

// 작가 카드 클릭 시 URL 이동 기능 설정 함수
function initAuthorCardLinks() {
    const authorCards = document.querySelectorAll('.author-card');
    
    authorCards.forEach(card => {
        card.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            if (url) {
                window.location.href = url;
            }
        });
    });
}

// 헤더를 스크롤에 따라 표시/숨기기
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

// 작가 페이지 개설 버튼 및 폼 초기화
function initOpenForm() {
    const openFormBtn = document.getElementById('open-form-btn');
    const createAuthorForm = document.getElementById('create-author-form');
    const submitAuthorBtn = document.getElementById('submit-author-btn');

    // 개설하기 버튼 클릭 시 폼 표시
    openFormBtn.addEventListener('click', () => {
        createAuthorForm.style.display = 'block';
    });

    // 개설 완료 버튼 클릭 시 작가 카드 추가
    submitAuthorBtn.addEventListener('click', () => {
        addNewAuthorCard();
        createAuthorForm.style.display = 'none'; // 폼 숨기기
        resetFormFields();
    });
}

// 새로운 작가 카드 추가 함수
function addNewAuthorCard() {
    const name = document.getElementById('author-name-input').value;
    const profileImg = document.getElementById('profile-img-input').value;
    const featuredImg = document.getElementById('featured-img-input').value;

    if (name && profileImg && featuredImg) {
        const newAuthorCard = document.createElement('div');
        newAuthorCard.classList.add('author-card');
        newAuthorCard.innerHTML = `
            <div class="author-profile">
                <img src="${profileImg}" alt="작가 프로필" class="profile-img">
                <h2 class="author-name">${name}</h2>
                <button class="like-btn"><i class="fas fa-heart"></i></button>
            </div>
            <img src="${featuredImg}" alt="대표 작품" class="featured-img">
            <p class="author-description">새로운 작가의 소개입니다.</p>
        `;
        document.querySelector('.container').appendChild(newAuthorCard);
        initLikeButtons(); // 추가된 카드의 좋아요 버튼 초기화
    }
}

// 폼 필드 초기화 함수
function resetFormFields() {
    document.getElementById('author-name-input').value = '';
    document.getElementById('profile-img-input').value = '';
    document.getElementById('featured-img-input').value = '';
}
