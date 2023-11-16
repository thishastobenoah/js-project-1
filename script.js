const items = [
  { name: "Coffee", price: 4 },
  { name: "Cappuccino", price: 6 },
  { name: "Americano", price: 3.5 },
  { name: "Espresso", price: 2 },
  { name: "Gingerbread Latte", price: 4.5 },
  { name: "Peppermint Mocha", price: 4.5 },
  { name: "Chai Latte", price: 3.75 },
  { name: "Matcha", price: 5 },
  { name: "Hot Chocolate", price: 4 },
  { name: "Blueberry Muffin", price: 3 },
  { name: "Pain aux Raisin", price: 3.75 },
  { name: "Avocado Sourdough Toast", price: 7.5 },
  { name: "Croissant", price: 2.5 },
  { name: "Yogurt, Berries, & Granola", price: 4.75 },
];

let cart = [];

function addToCart(itemName) {
  const selectedItem = items.find((item) => item.name === itemName);
  cart.push(selectedItem);
}
document.addEventListener("DOMContentLoaded", function () {
  const cartButton = document.getElementById("view-cart-btn");
  console.log(cartButton); // Check if the button is found

  if (cartButton) {
    cartButton.addEventListener("click", function () {
      displayCart();
    });
  }
});

function displayCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  let totalPrice = 0;

  cartContainer.innerHTML = "";
  console.log(cart);
  cart.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} - Price: $${item.price}`;
    cartContainer.appendChild(listItem);
    totalPrice += item.price;
  });

  totalPriceElement.textContent = `Total Price: $${totalPrice}`;
}
