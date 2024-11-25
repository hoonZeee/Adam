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
});
document.getElementById('rent-btn').addEventListener('click', (event) => {
    const button = event.target;
    const productInfo = {
        product_id: button.getAttribute('data-product-id'),
        product_name: button.getAttribute('data-product-name'),
        price: parseInt(button.getAttribute('data-price')),
        amount: 1,
        image_url: button.getAttribute('data-image-url'),
    };

    fetch('/add-to-rentalcart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productInfo),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert('상품이 렌탈 장바구니에 추가되었습니다!');
                window.location.href = '/cart/rentalcart.html';
            } else {
                alert('장바구니 추가 실패: ' + data.message);
            }
        })
        .catch((error) => console.error('Error:', error));
});

document.getElementById('buy-btn').addEventListener('click', () => {
    const button = document.getElementById('buy-btn');
    const productInfo = {
        product_id: button.getAttribute('data-product-id'),
        product_name: button.getAttribute('data-product-name'),
        price: parseInt(button.getAttribute('data-price')),
        amount: 1,
        image_url: button.getAttribute('data-image-url'), // Check if this is being set
    };

    console.log(productInfo); // Debug: Check the values being sent to the server

    fetch('/add-to-purchasecart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productInfo),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data); // Debug: Check server response
            if (data.success) {
                alert('상품이 구매 장바구니에 추가되었습니다!');
                window.location.href = '/cart/purchaseCart.html';
            } else {
                alert('장바구니 추가 실패: ' + data.message);
            }
        })
        .catch((error) => console.error('Error:', error));
});
fetch('/product/{product_id}')
    .then(response => response.json())
    .then(data => {
        document.querySelector('.product-image').src = data.image_url;
    })
    .catch(err => console.error('Error fetching product data:', err));
    const productId = window.location.pathname.split('/').pop();

fetch(`/product/${productId}`)
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const product = data.data;
            document.querySelector('.product-image').src = product.image_url || '/images/default.jpg';
            document.querySelector('.product-name').innerText = product.product_name;
            document.querySelector('.description').innerText = product.description;
            document.querySelector('.product-price').innerText = `구매 가격: ${product.product_price}원`;
        } else {
            alert(data.message || 'Product not found.');
        }
    })
    .catch(error => console.error('Error fetching product details:', error));
