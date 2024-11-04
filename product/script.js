document.addEventListener('DOMContentLoaded', function() {
    // Hero section fade-in effect
    const heroSection = document.querySelector('.hero');
    setTimeout(() => {
        heroSection.classList.add('visible');
    }, 500);

    // Collapsible header functionality
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    const banner = document.querySelector('.banner');

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            header.style.top = '-60px'; 
            if (banner) {
                banner.style.top = '0';
            }
        } else {
            header.style.top = '0';
            if (banner) {
                banner.style.top = '60px'; 
            }
        }
        lastScrollTop = scrollTop;
    });

    // 하트 클릭 시 찜하기 기능
    const heartIcons = document.querySelectorAll('.heart-icon');
    heartIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            toggleFavorite(icon);
        });
    });

    // 슬라이더 기능 추가
    const slider = document.querySelector('.hero-content .slider'); // hero 안의 slider 선택
    const slideLis = slider.querySelectorAll('li');
    const moveButton = document.querySelector('.hero-content .arrow');
    
    let currentIdx = 0; // 현재 슬라이드 인덱스
    const liWidth = slideLis[0].clientWidth; // 각 슬라이드의 너비
    const totalSlides = slideLis.length; // 총 슬라이드 수

    moveButton.addEventListener('click', function(event) {
        event.preventDefault(); // 기본 링크 동작 방지
        if (event.target.classList.contains('next')) {
            if (currentIdx < totalSlides - 1) {
                currentIdx++;
                slider.style.transform = `translateX(${-liWidth * currentIdx}px)`; // 슬라이드 이동
            }
        } else if (event.target.classList.contains('prev')) {
            if (currentIdx > 0) {
                currentIdx--;
                slider.style.transform = `translateX(${-liWidth * currentIdx}px)`; // 슬라이드 이동
            }
        }
    });
});

// 하트 아이콘의 찜하기 기능을 토글하는 함수
function toggleFavorite(element) {
    const isFavorited = element.classList.toggle('favorited');
    if (isFavorited) {
        element.innerHTML = '♡'; 
    } else {
        element.innerHTML = '♥';
    }
}
