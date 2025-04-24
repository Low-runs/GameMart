const order = JSON.parse(localStorage.getItem("currentOrder"));
const prices = {
  Intel_i9: 154000, AMD_Ryzen_9: 138600, Intel_i7: 92400, AMD_Ryzen_7: 108150, Intel_i5: 61600, AMD_Ryzen_5: 67760,
  MSI_RTX_4090_32GB: 492800, RTX_4080: 369600, RTX_4070: 246400, RX_7900: 246400, RX_7800: 231000, RX_7700: 200200,
  MSI_Z790: 92400, ASUS_X670: 86240, Gigabyte_B660: 67760, ASRock_B550: 61600, MSI_B450: 55440, ASUS_TUF: 77000,
  Corsair_16GB: 24640, GSkill_16GB: 22880, Kingston_32GB: 43200, Corsair_32GB: 46200,
  Samsung_1TB_SSD: 30400, WD_1TB_HDD: 15200, Crucial_500GB_SSD: 18400, Seagate_2TB_HDD: 30400, WD_2TB_SSD: 66600, Samsung_2TB_SSD: 72800
};

const ul = document.getElementById("order-summary");
let total = 0;
for (const id in order) {
  const qty = order[id];
  const price = prices[id] * qty;
  total += price;
  const li = document.createElement("li");
  li.textContent = `${id.replace(/_/g, " ")} - Qty: ${qty} - Rs.${price}`;
  ul.appendChild(li);
}
ul.innerHTML += `<li><strong>Total: Rs.${total}</strong></li>`;

document.getElementById("checkout-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const card = document.getElementById("card").value.trim();

  if (name && email && address && /^\d{9}$/.test(card)) {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5); // 5-day delivery
    alert(`Thank you for your purchase, ${name}! Your order will be delivered by ${deliveryDate.toDateString()}.`);
  } else {
    alert("Please fill in all fields correctly.");
  }

});




function addToCart() {
  const tbody = document.querySelector("#cart-table tbody");
  tbody.innerHTML = "";
  let total = 0;
  for (const id in prices) {
    const qty = parseInt(document.getElementById(id).value || "0");
    if (qty > 0) {
      const price = prices[id] * qty;
      total += price;
      const row = `<tr><td>${id.replace(/_/g, " ")}</td><td>${qty}</td><td>Rs.${price}</td></tr>`;
      tbody.innerHTML += row;
    }
  }
  document.getElementById("total-price").textContent = "Rs." + total;
}

function buyNow() {
  localStorage.setItem("currentOrder", JSON.stringify(getOrderData()));
  window.location.href = "checkout.html";
}

function saveFavourite() {
  localStorage.setItem("favouriteOrder", JSON.stringify(getOrderData()));
  alert("Order saved as favourite.");
}

function applyFavourite() {
  const fav = JSON.parse(localStorage.getItem("favouriteOrder"));
  if (!fav) return alert("No favourite order saved.");
  for (const id in fav) {
    document.getElementById(id).value = fav[id];
  }
  addToCart();
}

function getOrderData() {
  const data = {};
  for (const id in prices) {
    const val = parseInt(document.getElementById(id).value || "0");
    if (val > 0) data[id] = val;
  }
  return data;
}
