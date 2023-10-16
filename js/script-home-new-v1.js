setTimeout(function () {
  $('#ajaxBusy').remove();
}, 5000);

// Banner Mobile

window.onload = function () {
  removeAttributes('bannersproductstopmobileone');
  removeAttributes('bannersproductstopmobiletwo');
  removeAttributes('bannersproductstopdesktopone');
  removeAttributes('bannersproductstopdesktoptwo');
  removeAttributes('bannersproductstopdesktopthree');
  removeAttributes('bannersproductstopdesktopfour');
  removeAttributes('bannersproductstopdesktopfive');
};

// Remover atributos de imagens

function removeAttributes(attributeName) {
  const elementRemove = document.querySelector(`img[alt="${attributeName}"]`);

  if (elementRemove) {
    elementRemove.removeAttribute('width');
    elementRemove.removeAttribute('height');
  }
}

// Adicionar classe no carousel de Produtos - Pegar a tag <ul> e adicionar as classes "owl-carousel" e "owl-theme"
let ulElements = document.querySelectorAll('.showcase-kitchen-pantry ul');

console.log(ulElements);

for (let i = 0; i < ulElements.length; i++) {
  ulElements[i].classList.add('owl-carousel', 'owl-theme');
}

// Pegar as classes <li> e adicionar a classe "item"
let liElements = document.querySelectorAll('.showcase-kitchen-pantry ul li');
liElements.forEach(function (liElement) {
  liElement.classList.add('item');
});

// Selecionar as tags <img>
let childDiv = document.querySelectorAll(
  'ul li span.box-item div.box-product-image a.product-image div img'
);
// console.log(childDiv);

// Adicionar a classe "box-product-image"
if (childDiv) {
  for (let i = 0; i < childDiv.length; i++) {
    childDiv[i].classList.add('box-product-img');
  }
}

// Seleciona todos os <li> elementos com a classe "helperComplement"
let liElementsWithClass = document.querySelectorAll('li.helperComplement');

// Loop para remover cada <li> elemento com a classe "helperComplement"
for (let i = 0; i < liElementsWithClass.length; i++) {
  let li = liElementsWithClass[i];
  li.remove();
}

// Selecione todos os elementos h2 sem a classe definida
const h2Elements = document.querySelectorAll(
  '.showcase-default h2:not([class])'
);

// Remova cada um desses elementos
h2Elements.forEach((element) => {
  element.remove();
});

// Selecionar a div com a classe "prateleira"
let prateleira = document.querySelector('.prateleira');

// Verificar se a div foi encontrada
if (prateleira) {
  // Selecionar a ul filha dentro da div "prateleira"
  let ulElement = prateleira.querySelector('ul');

  // Verificar se a ul foi encontrada
  if (ulElement) {
    // Adicionar a classe "owl-carousel" à ul
    ulElement.classList.add('shelf-list-products');
  }
}

// OWL Carousel
$(document).ready(function () {
  $('.owl-carousel').owlCarousel({
    stagePadding: 40,
    loop: true,
    margin: 0,
    padding: 0,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 2,
      },
      500: {
        items: 4,
      },
      700: {
        items: 5,
      },
      900: {
        items: 7,
      },
      1200: {
        items: 8,
      },
      1366: {
        items: 9,
      },
      1400: {
        items: 10,
      },
      1500: {
        items: 11,
      },
    },
  });
});

$('.shelf-list-products').owlCarousel({
  loop: true,
  margin: 10,
  padding: 0,
  responsiveClass: true,
  autoplay: true,
  nav: false,
  dots: false,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1,
    },
    500: {
      items: 3,
    },
    700: {
      items: 5,
    },
    900: {
      items: 7,
    },
    1200: {
      items: 8,
    },
    1366: {
      items: 9,
    },
    1400: {
      items: 10,
    },
  },
});

//Newsletter
$(function () {
  $('input#newsletterButtonOK').val('Cadastrar');
});

$('.news-form .newsletter').on('DOMSubtreeModified', function () {
  $('input#newsletterButtonOK').val('Cadastrar');
});

//
