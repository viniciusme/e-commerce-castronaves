const searchDiv = document.getElementById('search-autocomplet');
const searchInput = document.querySelector('.fulltext-search-box');
const uiAutoComplet = document.querySelector('.ui-autocomplete');
const liElement = document.querySelector('.ui-menu-item');
let timer;
const itemsTest = {
  itemsReturned: [
    {
      items: [],
      thumb: '',
      thumbUrl: null,
      name: 'leite  Alimentos e Descartáveis',
      href: 'https://www.castronaves.com.br/alimentos-e-descartaveis/leite',
      criteria:
        '£leite  Alimentos e Descartáveis¢/alimentos-e-descartaveis/leite',
    },
    {
      items: [],
      thumb: '',
      thumbUrl: null,
      name: 'leite  Saúde',
      href: 'https://www.castronaves.com.br/saude/leite',
      criteria: '£leite  Saúde¢/saude/leite',
    },
    {
      items: [],
      thumb: '',
      thumbUrl: null,
      name: 'leite  Condomínios',
      href: 'https://www.castronaves.com.br/condominios/leite',
      criteria: '£leite  Condomínios¢/condominios/leite',
    },
    {
      items: [],
      thumb: '',
      thumbUrl: null,
      name: 'leite  Hotelaria',
      href: 'https://www.castronaves.com.br/hotelaria/leite',
      criteria: '£leite  Hotelaria¢/hotelaria/leite',
    },
    {
      items: [],
      thumb: '',
      thumbUrl: null,
      name: 'leite  Black November',
      href: 'https://www.castronaves.com.br/black-november/leite',
      criteria: '£leite  Black November¢/black-november/leite',
    },
    {
      items: [],
      thumb: '',
      thumbUrl: null,
      name: 'leite  Outlet',
      href: 'https://www.castronaves.com.br/outlet/leite',
      criteria: '£leite  Outlet¢/outlet/leite',
    },
    {
      items: [
        {
          productId: '4033',
          itemId: '4034',
          name: 'Leite em Pó Integral Italac Sachê de 400g',
          nameComplete: 'Leite em Pó Integral Italac Sachê de 400g',
          imageUrl:
            'https://castronaves.vteximg.com.br/arquivos/ids/165079-25-25/167694_1.jpg?v=636620792271570000',
        },
      ],
      thumb:
        '<img src="https://castronaves.vteximg.com.br/arquivos/ids/165079-25-25/167694_1.jpg?v=636620792271570000" width="25" height="25" alt="167694_1" id="" />',
      thumbUrl:
        'https://castronaves.vteximg.com.br/arquivos/ids/165079-25-25/167694_1.jpg?v=636620792271570000',
      name: 'leite em pó integral italac sachê de 400g',
      href: 'https://www.castronaves.com.br/leite-em-po-integral-italac-sache-de-400g/p',
      criteria: null,
    },
    {
      items: [
        {
          productId: '13389',
          itemId: '13377',
          name: 'Leite UHT Integral Italac 1 Litro',
          nameComplete: 'Leite UHT Integral Italac 1 Litro',
          imageUrl:
            'https://castronaves.vteximg.com.br/arquivos/ids/380637-25-25/13590_01.jpg?v=637979970378570000',
        },
      ],
      thumb:
        '<img src="https://castronaves.vteximg.com.br/arquivos/ids/380637-25-25/13590_01.jpg?v=637979970378570000" width="25" height="25" alt="13590_01" id="" />',
      thumbUrl:
        'https://castronaves.vteximg.com.br/arquivos/ids/380637-25-25/13590_01.jpg?v=637979970378570000',
      name: 'leite uht integral italac 1 litro',
      href: 'https://www.castronaves.com.br/leite-uht-integral-italac-1-litro/p',
      criteria: null,
    },
    {
      items: [
        {
          productId: '2127',
          itemId: '2128',
          name: 'Biscoito Passatempo Leite com Recheio de Chocolate 130g',
          nameComplete:
            'Biscoito Passatempo Leite com Recheio de Chocolate 130g',
          imageUrl:
            'https://castronaves.vteximg.com.br/arquivos/ids/347046-25-25/53736_01.jpg?v=637178268967530000',
        },
      ],
      thumb:
        '<img src="https://castronaves.vteximg.com.br/arquivos/ids/347046-25-25/53736_01.jpg?v=637178268967530000" width="25" height="25" alt="53736_01" id="" />',
      thumbUrl:
        'https://castronaves.vteximg.com.br/arquivos/ids/347046-25-25/53736_01.jpg?v=637178268967530000',
      name: 'biscoito passatempo leite com recheio de chocolate 130g',
      href: 'https://www.castronaves.com.br/biscoito-passatempo-leite-com-recheio-de-chocolate-130g/p',
      criteria: null,
    },
    {
      items: [
        {
          productId: '15849',
          itemId: '15836',
          name: 'Bala de Caramelo My Toffee Sabor Leite Pct/ 500g',
          nameComplete: 'Bala de Caramelo My Toffee Sabor Leite Pct/ 500g',
          imageUrl:
            'https://castronaves.vteximg.com.br/arquivos/ids/379084-25-25/15308_01.jpg?v=637902286525870000',
        },
      ],
      thumb:
        '<img src="https://castronaves.vteximg.com.br/arquivos/ids/379084-25-25/15308_01.jpg?v=637902286525870000" width="25" height="25" alt="15308_01" id="" />',
      thumbUrl:
        'https://castronaves.vteximg.com.br/arquivos/ids/379084-25-25/15308_01.jpg?v=637902286525870000',
      name: 'bala de caramelo my toffee sabor leite pct/ 500g',
      href: 'https://www.castronaves.com.br/bala-de-caramelo-my-toffee-sabor-leite-pct--500g/p',
      criteria: null,
    },
    {
      items: [
        {
          productId: '723',
          itemId: '723',
          name: 'Sabonete Líquido Spray Proteínas do Leite Refil com 400ml. Muito mais economia.',
          nameComplete:
            'Sabonete Líquido Spray Proteínas do Leite Refil com 400ml. Muito mais economia.',
          imageUrl:
            'https://castronaves.vteximg.com.br/arquivos/ids/305000-25-25/11091_01.jpg?v=637063077084500000',
        },
      ],
      thumb:
        '<img src="https://castronaves.vteximg.com.br/arquivos/ids/169508-25-25/11091.png?v=636620805648230000" width="25" height="25" alt="11091" id="" />',
      thumbUrl:
        'https://castronaves.vteximg.com.br/arquivos/ids/305000-25-25/11091_01.jpg?v=637063077084500000',
      name: 'sabonete líquido spray proteínas do leite refil com 400ml. muito mais economia.',
      href: 'https://www.castronaves.com.br/sabonete-liquido-spray-proteinas-do-leite-refil-com-400ml--muito-mais-economia-/p',
      criteria: null,
    },
    {
      items: [
        {
          productId: '11751',
          itemId: '11739',
          name: 'Sabonete Líquido Spray Refil Eco Fácil com 800ml Proteínas do Leite',
          nameComplete:
            'Sabonete Líquido Spray Refil Eco Fácil com 800ml Proteínas do Leite',
          imageUrl:
            'https://castronaves.vteximg.com.br/arquivos/ids/304999-25-25/13055_01.jpg?v=637063076389600000',
        },
      ],
      thumb:
        '<img src="https://castronaves.vteximg.com.br/arquivos/ids/293742-25-25/13055_01.jpg?v=637060519517430000" width="25" height="25" alt="13055_01" id="" />',
      thumbUrl:
        'https://castronaves.vteximg.com.br/arquivos/ids/304999-25-25/13055_01.jpg?v=637063076389600000',
      name: 'sabonete líquido spray refil eco fácil com 800ml proteínas do leite',
      href: 'https://www.castronaves.com.br/sabonete-liquido-spray-refil-eco-facil-com-800ml-proteinas-do-leite/p',
      criteria: null,
    },
  ],
};

const itemms = { itemsReturned: [] };

function searchItems(name) {
  searchDiv.style.display = 'block';
  console.log('Pesquisa: ', name);
  // const xhr = new XMLHttpRequest();
  // const getUrl = window.location.host;
  // const url = `/buscaautocomplete/?maxRows=12&productNameContains=${name}&suggestionsStack=`;

  // xhr.open('GET', url, true);
  // xhr.onreadystatechange = function () {
  //   if (xhr.readyState === 4 && xhr.status === 200) {
  //     const response = JSON.parse(xhr.responseText);
  //     // colocar o codigo aqui
  //   }
  // };
  // xhr.send();

  // alterar itemsTest para response
  const items = itemms.itemsReturned;
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
  // copiar
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
