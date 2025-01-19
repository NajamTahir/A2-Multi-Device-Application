const cartItems = [];

async function addToCart(name, price) {
  cartItems.push({ name, price });
  renderCart();

  // Send the item to the backend
  try {
    const response = await fetch('http://localhost:3000/add-to-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, price }),
    });

    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error('Error adding item to the database:', error);
  }
}

function renderCart() {
  const cartList = document.getElementById('cartItems');
  cartList.innerHTML = ''; // Clear the cart list

  cartItems.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}
