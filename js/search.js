const searchDiv = document.getElementById('search-autocomplet');
const searchInput = document.querySelector('.fulltext-search-box');
const uiAutoComplet = document.querySelector('.ui-autocomplete');
const liElement = document.querySelector('.ui-menu-item');
let timer;

function searchItems(name) {
  searchDiv.style.display = 'block';
  console.log('Pesquisa: ', name);
  const xhr = new XMLHttpRequest();
  const getUrl = window.location.host;
  const url = `/buscaautocomplete/?maxRows=12&productNameContains=${name}&suggestionsStack=`;

  xhr.open('GET', url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      const items = response.itemsReturned;
      uiAutoComplet.innerHTML = '';
      if (items.length === 0) {
        const itemsEmpty = document.createElement('span');
        itemsEmpty.textContent = `Nenhum item encontrado com a pesquisa acima...`;
        uiAutoComplet.appendChild(itemsEmpty);
      } else {
        items.forEach((item) => {
          if (item.thumbUrl === null) {
            const uiMenuItem = document.createElement('li');
            uiMenuItem.setAttribute('class', 'ui-menu-item');
            uiMenuItem.setAttribute('role', 'menuitem');

            const uiCornerAll = document.createElement('a');
            uiCornerAll.setAttribute('class', 'ui-corner-all');
            uiCornerAll.setAttribute('tabindex', '-1');
            uiCornerAll.setAttribute('href', `${item.href}`);
            uiCornerAll.textContent = `${item.name}`;

            uiMenuItem.appendChild(uiCornerAll);
            uiAutoComplet.appendChild(uiMenuItem);
          } else {
            const uiMenuItem = document.createElement('li');
            uiMenuItem.setAttribute('class', 'ui-menu-item');
            uiMenuItem.setAttribute('role', 'menuitem');

            const uiCornerAll = document.createElement('a');
            uiCornerAll.setAttribute('class', 'ui-corner-all');
            uiCornerAll.setAttribute('tabindex', '-1');
            uiCornerAll.setAttribute('href', `${item.href}`);
            uiCornerAll.textContent = `${item.items[0].nameComplete}`;

            const productImg = document.createElement('img');
            productImg.setAttribute('src', `${item.items[0].imageUrl}`);
            productImg.setAttribute('width', `25`);
            productImg.setAttribute('height', `25`);
            productImg.setAttribute('alt', `${item.items[0].name}`);

            uiMenuItem.appendChild(productImg);
            uiMenuItem.appendChild(uiCornerAll);
            uiAutoComplet.appendChild(uiMenuItem);
          }
        });
      }
    }
  };
  xhr.send();
}

searchInput.addEventListener('input', function () {
  clearTimeout(timer);
  timer = setTimeout(function () {
    const inputValue = searchInput.value;
    if (inputValue.length >= 1) {
      searchItems(inputValue);
    } else {
      searchDiv.style.display = 'none';
    }
  }, 800);
});

uiAutoComplet.addEventListener('mouseover', function (event) {
  if (event.target.classList.contains('ui-menu-item')) {
    const productName = event.target.querySelector('a').textContent;
    searchInput.value = productName;
  }
});

document.addEventListener('click', function (event) {
  const isClickInsideAutoComplet = uiAutoComplet.contains(event.target);
  const isClickInsideSearchDiv = searchDiv.contains(event.target);
  if (!isClickInsideAutoComplet && !isClickInsideSearchDiv) {
    searchDiv.style.display = 'none';
    searchInput.placeholder = `O que você está precisando?`;
  }
});
