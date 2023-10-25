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
  const getUrl = window.location.host;
  const url = `/api/checkout/pub/orderForm?refreshOutdatedData=true`;
  const badgeElement = document.querySelectorAll('.mini-cart-qty-admake');

  xhr.open('GET', url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      for (let i = 0; i < badgeElement.length; i++) {
        badgeElement[i].textContent = `${response.items.length}`;
      }
    }
  };
  xhr.send();
}

updateNumberBadgeCart();
