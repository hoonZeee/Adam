document.addEventListener('DOMContentLoaded', function() {
    // FAQ accordion with animation
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease';

        question.addEventListener('click', () => {
            if (answer.style.maxHeight === '0px' || answer.style.maxHeight === '') {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });

    // Hero section fade-in effect on window load for all assets to be ready
    window.addEventListener('load', () => {
        const heroSection = document.querySelector('.hero');
        setTimeout(() => {
            heroSection.classList.add('visible');
        }, 500);
    });
});

startSlidingImages({
    containerSelector: '.feature-grid',
    slideSpeed: 1,
    interval: 16
});

// Collapsible header functionality with banner check
let lastScrollTop = 0;
const header = document.querySelector('.header');
const banner = document.querySelector('.banner');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        header.style.top = '-60px'; // Hide header
        if (banner) banner.style.top = '0';
    } else {
        header.style.top = '0'; // Show header
        if (banner) banner.style.top = '60px';
    }
    lastScrollTop = scrollTop;
});


// Improved sliding image function with requestAnimationFrame
function startSlidingImages({ containerSelector, slideSpeed = 1, interval = 16 }) {
    const featureGrid = document.querySelector(containerSelector);
    const featureItems = document.querySelectorAll(`${containerSelector} .feature-item`);

    // Clone original images to create continuous loop
    featureItems.forEach(item => {
        const clone1 = item.cloneNode(true);
        featureGrid.appendChild(clone1);
    });

    let scrollAmount = 0;
    let lastTime = 0;

    function slideImages(timestamp) {
        if (!lastTime) lastTime = timestamp;
        const elapsed = timestamp - lastTime;

        if (elapsed > interval) {
            scrollAmount -= slideSpeed;
            featureGrid.style.transform = `translateX(${scrollAmount}px)`;
            lastTime = timestamp;

            // Reset position for a seamless loop
            if (Math.abs(scrollAmount) >= featureItems[0].clientWidth * featureItems.length) {
                scrollAmount = 0;
            }
        }
        requestAnimationFrame(slideImages);
    }
    requestAnimationFrame(slideImages);
}

document.addEventListener('DOMContentLoaded', function() {
    const mainMenu = document.querySelector('.main-menu');
    const submenus = document.querySelectorAll('.submenu');

    // 메뉴에 마우스를 가져가면 모든 서브메뉴가 보임
    mainMenu.addEventListener('mouseenter', () => {
        submenus.forEach(submenu => {
            submenu.style.display = 'block';
            submenu.style.opacity = '1';
            submenu.style.transform = 'translateY(0)';
        });
    });

    // 메뉴에서 마우스를 벗어나면 모든 서브메뉴가 사라짐
    mainMenu.addEventListener('mouseleave', () => {
        submenus.forEach(submenu => {
            submenu.style.opacity = '0';
            submenu.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                submenu.style.display = 'none';
            }, 300); // 애니메이션 시간 후 숨김
        });
    });
});
