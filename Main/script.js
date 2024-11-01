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