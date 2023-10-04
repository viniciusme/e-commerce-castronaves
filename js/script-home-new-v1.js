setTimeout(function () {
  $('#ajaxBusy').remove();
}, 5000);

window.onload = function () {
  removeAttributes('bannersproductstopmobileone');
  removeAttributes('bannersproductstopmobiletwo');
  removeAttributes('bannersproductstopdesktopone');
  removeAttributes('bannersproductstopdesktoptwo');
  removeAttributes('bannersproductstopdesktopthree');
  removeAttributes('bannersproductstopdesktopfour');
  removeAttributes('bannersproductstopdesktopfive');
};

function removeAttributes(attributeName) {
  const elementRemove = document.querySelector(`img[alt="${attributeName}"]`);

  if (elementRemove) {
    elementRemove.removeAttribute('width');
    elementRemove.removeAttribute('height');
  }
}

$(document).ready(function () {
  $('.owl-carousel').owlCarousel({
    stagePadding: 40,
    loop: true,
    margin: 0,
    padding: 0,
    nav: true,
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
      1200: {
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

//Newsletter
$(function () {
  $('input#newsletterButtonOK').val('Cadastrar');
});

$('.news-form .newsletter').on('DOMSubtreeModified', function () {
  $('input#newsletterButtonOK').val('Cadastrar');
});
