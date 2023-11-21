const items = [
  { name: "Coffee", price: 4, category: "hot", description: "Choose from our Ethiopian, Colombian, or Brazilian blends." },
  { name: "Cappuccino", price: 6, category: "hot", description: "Your choice of steamed milk." },
  { name: "Americano", price: 3.5, category: "hot", description: "Espresso shot diluted with filtered water." },
  { name: "Espresso", price: 2, category: "hot", description: "A strong and concentrated shot of espresso." },
  { name: "Chai Latte", price: 3.75, category: "hot", description: "A delicious blend of spices with your choice of steamed milk." },
  { name: "Matcha", price: 5, category: "hot", description: "Premium grade green tea whisked by hand." },
  { name: "Hot Chocolate", price: 4, category: "hot", description: "Shaved chocolate flakes melted into your choice of steamed milk. Whipped cream optional." },
  { name: "Iced Black Tea", price: 2.75, category: "cold", description: "Classic black iced tea." },
  { name: "Iced Matcha", price: 4, category: "cold", description: "Your choice of cold foamed milk in our premium matcha." },
  { name: "Cold Brew Coffee", price: 3, category: "cold", description: "Brewed for 12+ hours for the strongest flavor." },
  { name: "Iced Salted Caramel Latte", price: 4.75, category: "cold", description: "House-made caramel syrup with flaky sea salt." },
  { name: "Gingerbread Latte", price: 4.5, category: "seasonal", description: "Delicious spiced syrup added to our classic latte." },
  { name: "Peppermint Mocha", price: 4.5, category: "seasonal", description: "Seasonal syrup mixed with coffee and hot chocolate." },
  { name: "Blueberry Scone", price: 3, category: "bakery", description: "A bakery staple made with wild blueberries." },
  { name: "Pain aux Raisin", price: 3.75, category: "bakery", description: "Decadent croissant dough spiraled with custard and raisins." },
  { name: "Avocado Sourdough Toast", price: 10, category: "bakery", description: "Our famous sourdough bread toasted with smashed avocado." },
  { name: "Croissant", price: 2.5, category: "bakery", description: "Perfectly laminated dough rolled to flaky, buttery perfection." },
  { name: "Yogurt, Berries, & Granola", price: 4.75, category: "bakery", description: "Vanilla Greek yogurt with seasonal berries and our house-made cinnamon granola." }
];

let cart = [];

function addToCart(itemName) {
  const selectedItem = items.find((item) => item.name === itemName);
  const existingItem = cart.find((item) => item.name === itemName);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const newItem = {
      name: selectedItem.name,
      price: selectedItem.price,
      quantity: 1,
    };
    cart.push(newItem);
  }

  displayCart();
}

document.addEventListener("DOMContentLoaded", function () {
  const cartButton = document.getElementById("view-cart-btn");
  const cartContainer = document.getElementById("cart-items-container");

  if (cartButton && cartContainer) {
    cartButton.addEventListener("click", function () {
      cartContainer.style.display =
        cartContainer.style.display === "none" ? "block" : "none";
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
    totalPrice += item.price * item.quantity;
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
    listItem.textContent = `${item.name} - Price: $${(item.price * item.quantity).toFixed(2)} - Quantity: ${item.quantity}`;
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