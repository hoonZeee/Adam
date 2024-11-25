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

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const submenuContainer = document.querySelector('.submenu-container');
    let timeout;

    header.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
        submenuContainer.style.display = 'block';
        setTimeout(() => {
            submenuContainer.style.opacity = '1';
        }, 10);
    });

    header.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
            submenuContainer.style.opacity = '0';
            setTimeout(() => {
                submenuContainer.style.display = 'none';
            }, 300);
        }, 100);
    });

    submenuContainer.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
    });

    submenuContainer.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
            submenuContainer.style.opacity = '0';
            setTimeout(() => {
                submenuContainer.style.display = 'none';
            }, 300);
        }, 100);
    });
});

//마이페이지 로그인시에만 허용
document.addEventListener('DOMContentLoaded', function() {
    const mypageLink = document.getElementById('mypage-link');

    mypageLink.addEventListener('click', (event) => {
        event.preventDefault();
        
        // Replace this with actual login status check from the server
        fetch('/session-user')
            .then(response => response.json())
            .then(data => {
                if (data.userName) {
                    // Redirect to mypage.html if logged in
                    window.location.href = '/mypage/mypage.html';
                } else {
                    // Redirect to login.html if not logged in
                    alert("로그인이 필요합니다.");
                    setTimeout(() => {
                        window.location.href = '../login/login.html';
                    }, 10); // 1초 후 이동
                }
            })
            .catch(error => {
                console.error('Failed to check login status:', error);
                // Optionally, redirect to login page if an error occurs
                window.location.href = '../login/login.html';
            });
    });
});

//장바구니 로그인시에만 허용
document.addEventListener('DOMContentLoaded', function() {

    const cartLinks = document.querySelectorAll('a[href="../cart/rentalcart.html"], .icon-btn');


    cartLinks.forEach(cartLink => {
        cartLink.addEventListener('click', (event) => {
            event.preventDefault();

            fetch('/session-user')
                .then(response => response.json())
                .then(data => {
                    if (data.userName) {
                        // User is logged in, navigate to the cart page
                        window.location.href = '../cart/rentalcart.html';

                    } else {
                        // User is not logged in, show an alert and redirect to the login page
                        alert("로그인이 필요합니다.");
                        setTimeout(() => {
                            window.location.href = '../login/login.html';
                        }, 10);
                    }
                })
                .catch(error => {
                    console.error('Failed to check login status:', error);
                    // Redirect to login page if an error occurs
                    window.location.href = '../login/login.html';
                });
        });
    });
});
