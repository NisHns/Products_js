const Products = [
  { id: 1, name: 'Product-1', price: 100 },
  { id: 2, name: 'Product-2', price: 200 },
  { id: 3, name: 'Product-3', price: 300 },
];

const ProductList = ({ addToCart }) => {
  return `
      <div>
        <h2>Product List</h2>
        <ul>
          ${Products.map(
    (product) => `
              <li key=${product.id}>
                ${product.name} - $${product.price}
                <button onclick="addToCart(${product.id}, 1)">+</button>
                <button onclick="addToCart(${product.id}, -1)">-</button>
              </li>`
  ).join('')}
        </ul>
      </div>`;
};

const Cart = ({ cart, removeItem }) => {
  return `
      <div>
        <h2>Cart</h2>
        ${cart.length === 0
      ? '<p>No Product added to the cart</p>'
      : `<ul>
              ${cart.map(
        (item) => `
                  <li key=${item.product.id}>
                    ${item.product.name} - Quantity: ${item.quantity} - Total: $${item.total}
                    <button onclick="removeItem(${item.product.id})">-</button>
                  </li>`
      ).join('')}
            </ul>`}
      </div>`;
};

const ShoppingCart = () => {
  const appElement = document.getElementById('app');
  const cart = [];

  const addToCart = (productId, quantity) => {
    const productToAdd = Products.find((product) => product.id === productId);

    if (productToAdd) {
      const existingItem = cart.find((item) => item.product.id === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.total += quantity * productToAdd.price;
      } else {
        cart.push({ product: productToAdd, quantity, total: quantity * productToAdd.price });
      }

      render();
    }
  };

  const removeItem = (productId) => {
    const index = cart.findIndex((item) => item.product.id === productId);

    if (index !== -1) {
      cart.splice(index, 1);
      render();
    }
  };

  const render = () => {
    appElement.innerHTML = `
        ${ProductList({ addToCart })}
        ${Cart({ cart, removeItem })}
      `;
  };

  render();
};

ShoppingCart();
