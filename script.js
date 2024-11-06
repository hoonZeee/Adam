document.addEventListener('DOMContentLoaded', function() {
    

    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        answer.style.display = 'none';
        question.addEventListener('click', () => {
            answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
        });
    });

    // Hero section fade-in effect
    const heroSection = document.querySelector('.hero');
    setTimeout(() => {
        heroSection.classList.add('visible');
    }, 500);
});

startSlidingImages({
    containerSelector: '.feature-grid',
    slideSpeed: 1,
    interval: 16
});


// Collapsible header functionality
let lastScrollTop = 0;
const header = document.querySelector('.header');
const banner = document.querySelector('.banner');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        header.style.top = '-60px'; // Adjust based on your header height
        banner.style.top = '0';
    } else {
        header.style.top = '0';
        banner.style.top = '60px'; // Adjust based on your header height
    }
    lastScrollTop = scrollTop;
});



function startSlidingImages({ containerSelector, slideSpeed = 1, interval = 16 }) {
    const featureGrid = document.querySelector(containerSelector);
    const featureItems = document.querySelectorAll(`${containerSelector} .feature-item`);

    // 원본 이미지를 여러 번 복제해서 추가
    featureItems.forEach(item => {
        const clone1 = item.cloneNode(true);
        featureGrid.appendChild(clone1);
    });

    let scrollAmount = 0;

    setInterval(() => {
        scrollAmount -= slideSpeed;
        featureGrid.style.transform = `translateX(${scrollAmount}px)`;

        // 모든 이미지들이 지나갔을 때 초기화하여 자연스러운 순환을 만듦
        if (Math.abs(scrollAmount) >= featureItems[0].clientWidth * featureItems.length) {
            scrollAmount = 0; // 원래 위치로 되돌리기
        }
    }, interval);
}

document.addEventListener('DOMContentLoaded', function() {
    const mainMenu = document.querySelector('.main-menu');
    const submenus = document.querySelectorAll('.submenu');

    // Show all submenus when hovering over the main menu
    mainMenu.addEventListener('mouseenter', () => {
        submenus.forEach(submenu => {
            submenu.style.display = 'block';
            submenu.style.opacity = '1';
            submenu.style.transform = 'translateY(0)';
        });
    });

    // Hide all submenus when leaving the main menu
    mainMenu.addEventListener('mouseleave', () => {
        submenus.forEach(submenu => {
            submenu.style.opacity = '0';
            submenu.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                submenu.style.display = 'none';
            }, 300); // Adjust for fade-out timing
        });
    });
});
