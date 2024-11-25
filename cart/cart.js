fetch('/cart')
    .then(response => response.json())
    .then(data => {
        const cartContainer = document.querySelector('#cartList tbody');
        cartContainer.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${item.product_image}" alt="${item.cart_name}" width="100"></td>
                <td>${item.cart_name}</td>
                <td>${item.price}</td>
                <td>${item.amount}</td>
            `;
            cartContainer.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching cart data:', error));

function removeFromCart(cartId) {
    fetch(`/cart/${cartId}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                alert('Item removed from cart');
                location.reload();
            } else {
                alert('Error removing item');
            }
        });
}

function addToCart(productId, rental = false) {
  fetch('/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, rental })
  }).then(response => {
      if (response.ok) {
          alert('Item added to cart');
      } else {
          alert('Error adding to cart');
      }
  });
}
