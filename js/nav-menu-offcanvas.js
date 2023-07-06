// Show Div And Hide Div

function ShowDiv(el) {
  var display = document.getElementById(el).style.display;
  document.getElementById(el).style.display = 'flex';
}

function hideDiv(el) {
  var display = document.getElementById(el).style.display;
  document.getElementById(el).style.display = 'none';
}

async function updateNumberBadgeCart() {
  const xhr = new XMLHttpRequest();
  const url = 'https://www.castronaves.com.br/api/checkout/pub/orderForm?refreshOutdatedData=true';
  const badgeElement = document.querySelector('.mini-cart-qty-admake');

  xhr.open('GET', url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      badgeElement.textContent = `${response.items.length}`;
    }
  };
  xhr.send();
}

updateNumberBadgeCart();