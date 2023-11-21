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
  { name: "Blueberry Scone", price: 3 },
  { name: "Pain aux Raisin", price: 3.75 },
  { name: "Avocado Sourdough Toast", price: 7.5 },
  { name: "Croissant", price: 2.5 },
  { name: "Yogurt, Berries, & Granola", price: 4.75 },
  { name: "Iced Black Tea", price: 2.75},
  { name: "Iced Matcha", price: 4},
  { name: "Cold Brew Coffee", price: 3},
  { name: "Iced Salted Caramel Latte", price: 4.75}
];

let cart = [];

function addToCart(itemName) {
  const selectedItem = items.find((item) => item.name === itemName);
  const existingItem = cart.find((item) => item.name === itemName);

  if (existingItem) {
    // If the item is already in the cart, increase its quantity
    existingItem.quantity += 1;
  } else {
    // If the item is not in the cart, create a new item object with a quantity of 1
    const newItem = {
      name: selectedItem.name,
      price: selectedItem.price,
      quantity: 1,
    };
    cart.push(newItem);
  }

  // After updating the cart, display it
  displayCart();
}

document.addEventListener("DOMContentLoaded", function () {
  const cartButton = document.getElementById("view-cart-btn");
  const cartContainer = document.getElementById("cart-items-container");

  if (cartButton && cartContainer) {
    cartButton.addEventListener("click", function () {
      // Toggle the visibility of the cart container
      cartContainer.style.display =
        cartContainer.style.display === "none" ? "block" : "none";
      // Display the cart if it's not currently visible
      if (cartContainer.style.display === "block") {
        displayCart();
      }
    });
  }
});

function displayCart() {
  const cartContainer = document.getElementById("cart-items-container");
  let totalPrice = 0;

  cartContainer.innerHTML = "";
  cart.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} - Price: $${item.price} - Quantity: ${item.quantity}`;

const increaseButton = document.createElement("button");
increaseButton.textContent = "+";
increaseButton.addEventListener("click", function () {
  increaseQuantity(item);
});

listItem.appendChild(increaseButton);

const decreaseButton = document.createElement("button");
decreaseButton.textContent = "-";
decreaseButton.addEventListener("click", function () {
  decreaseQuantity(item);
});

listItem.appendChild(decreaseButton);

cartContainer.appendChild(listItem);
totalPrice += item.price * item.quantity;
});
const totalPriceElement = document.createElement("div");
  cartContainer.appendChild(totalPriceElement);
  totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}

function increaseQuantity(itemName) {
  const existingItem = cart.find((item) => item.name === itemName.name);
  if(existingItem){
    existingItem.quantity += 1;
  }
  displayCart();
}

function decreaseQuantity(itemName) {
  const existingItem = cart.find((item) => item.name === itemName.name);
  if(existingItem && existingItem.quantity > 0){
    existingItem.quantity -= 1;
  }
  cart.forEach((item) => {
    if(item.quantity <= 0) {
      cart.pop(item);
    }
  });
  displayCart();
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