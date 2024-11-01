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
    const heartIcons = document.querySelectorAll('.heart-icon'); // 모든 하트 아이콘 선택
    heartIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            toggleFavorite(icon); // 클릭 시 toggleFavorite 호출
        });
    });
});

// 하트 아이콘의 찜하기 기능을 토글하는 함수
function toggleFavorite(element) {
    const isFavorited = element.classList.toggle('favorited');
    if (isFavorited) {
        element.innerHTML = '❤️'; // 하트가 채워짐
    } else {
        element.innerHTML = '♡'; // 하트가 비어있음
    }
}

