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
  console.log(cartButton);

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
function validateCreditCardNumber() {
  const cardNumber = document.getElementById("cardNumber").value;
  const cleanedCardNumber = cardNumber.replace(/\s/g, "").replace(/-/g, "");

  if (!/^\d{13,16}$/.test(cleanedCardNumber)) {
    console.log("Invalid credit card number.");
    return;
  }

  console.log("The credit card number is valid.");
}


function processCashPayment() {
  const totalAmount = calculateTotalAmount();
  const amountTendered = promptForAmountTendered();

  if (isNaN(amountTendered)) {
    console.log("Invalid amount tendered.");
    return;
  }

  const change = amountTendered - totalAmount;

  if (change < 0) {
    console.log("Insufficient funds.");
    return;
  }

  displayReceipt("Cash", totalAmount, change);

  cart = [];
  displayCart();
}

function promptForAmountTendered() {
  const amountTendered = prompt("Enter the amount tendered:");
  return parseFloat(amountTendered);
}

function calculateTotalAmount() {
  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice += item.price;
  });
  return totalPrice;
}

function displayReceipt(paymentMethod, totalAmount, change) {
  var modal = document.getElementById("receipt-modal");
  var modalContent = document.getElementById("modal-content");

  modalContent.innerHTML = `<p>Payment Method: ${paymentMethod}</p><p>Total Amount: $${totalAmount.toFixed(2)}</p><p>Change: $${change.toFixed(2)}</p>`;

  var itemsList = document.createElement("ul");
  cart.forEach((item) => {
    let listItem = document.createElement("li");
    listItem.textContent = `${item.name} - Price: $${item.price.toFixed(2)}`;
    itemsList.appendChild(listItem);
  });
  modalContent.appendChild(itemsList);

  modal.style.display = "block";
  document.getElementById("overlay").style.display = "block";

  document.getElementById("overlay").addEventListener("click", closeModal);
  document.getElementById("close-modal").addEventListener("click", closeModal);
}


function closeModal() {
  var modal = document.getElementById("receipt-modal");

  modal.style.display = "none";
  document.getElementById("overlay").style.display = "none";
}