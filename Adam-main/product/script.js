document.addEventListener('DOMContentLoaded', function() {
    // Hero section fade-in effect
    const heroSection = document.querySelector('.hero');
    setTimeout(() => {
        heroSection.classList.add('visible');
    }, 500);
});

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


