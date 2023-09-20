//Adiciona Input de Quantidade nas Prateleiras
function addShelfQtd() {
  $('.prateleira .box-item').each(function () {
    var $btnComprarProduto = $(this).find('.btn-add-buy-button-asynchronous');
    $btnComprarProduto.html('Adicionar');

    var $recebeQtyForm = $btnComprarProduto.parents('.add');
    if ($recebeQtyForm.length) {
      $recebeQtyForm.prepend(
        '<span class="box-qtd">\
					<button class="btn btn-menos">-</button>\
					<input type="text" class="qtd" value="1" />\
					<button class="btn btn-mais">+</button>\
				</span>'
      );
    }

    //Clique compra
    $btnComprarProduto.click(function () {
      var $this = $(this);
      var url = $this.attr('href');
      if (url.indexOf('qty=1') > 0) {
        $this.attr(
          'href',
          url.replace(
            'qty=1',
            'qty=' + parseInt($this.prev().find('input.qtd').val())
          )
        );
      }
    });
  });

  //BotÃµes de quantidade mais e menos
  $('.add .box-qtd .btn').on('click', function () {
    var $this = $(this);
    var $qtd = $this.parent().find('input.qtd');
    var valor = parseInt($qtd.val());
    if ($this.hasClass('btn-mais')) {
      $qtd.val(valor + 1);
    } else if ($this.hasClass('btn-menos')) {
      if (valor > 1) {
        $qtd.val(valor - 1);
      }
    }
  });

  //Seleciona o valor ao clicar no input de quantidade
  $('.add .box-qtd .qtd').click(function () {
    $(this).select();
  });

  //Retorna o valor inicial quando o input estiver vazio
  $('.add .box-qtd .qtd').on('blur', function () {
    var $this = $(this);
    if ($this.val() === '' || parseInt($this.val()) < 1) {
      $(this).val(1);
    } else {
      $(this).val($this.val());
    }
  });

  //Permite apenas nÃºmeros no input
  $('.add .box-qtd .qtd').on('keypress', function (e) {
    var tecla = window.event ? event.keyCode : e.which;
    if (tecla > 47 && tecla < 58) {
      return true;
    } else {
      if (tecla == 8 || tecla == 0) {
        return true;
      } else {
        return false;
      }
    }
  });
}

function codReferencia() {
  $('.prateleira .box-item').each(function () {
    var $this = $(this);
    var prodUrl = $this.find('a.product-image').attr('href');
    if (prodUrl.indexOf('.br') != -1) {
      prodUrl = prodUrl.split('.br')[1];
      var settings = {
        async: true,
        crossDomain: true,
        url: '/api/catalog_system/pub/products/search' + prodUrl,
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      $.ajax(settings).done(function (response) {
        var productReference = response[0].productReference;
        if (productReference != '' && typeof productReference != 'undefined') {
          $this
            .find('span.shelf-product-id')
            .text('CÃ³digo: ' + productReference);
        }
      });
    }
  });
}

function filterOptionsLimiter() {
  var limiter = 10;
  $('#admake-advanced-filter .opcoes ul').each(function () {
    var j = 0;
    $(this)
      .children('li')
      .each(function () {
        j++;
        if (j > limiter) {
          $(this).addClass('vejaMais');
        }
      });
    if (j > limiter) {
      $(this).append('<li class="maisOpcoes"></li>');
      $(this).append('<li class="linkVejaMais">+ ver todas</li>');
    }
  });

  $('#admake-advanced-filter .opcoes ul li.vejaMais').each(function () {
    $(this).parent().children('.maisOpcoes').append($(this));
  });

  $('#admake-advanced-filter .opcoes ul li.linkVejaMais').click(function () {
    $(this).toggleClass('ocultar');
    $(this).prev().slideToggle();
  });
}

function showPercentDiscountShelf() {
  $('.prateleira .hasBestPrice').each(function () {
    if (!$(this).hasClass('priceModified')) {
      var precoPor = parseFloat(
        $(this)
          .find('.price .best-price')
          .text()
          .replace('R$ ', '')
          .replace('.', '')
          .replace(',', '.')
      );

      var precoDe = parseFloat(
        $(this)
          .find('.price .old-price')
          .text()
          .replace('R$ ', '')
          .replace('.', '')
          .replace(',', '.')
      );

      var porcentagem = (((precoDe - precoPor) / precoDe) * 100).toFixed(2);
      porcentagem = Math.floor(porcentagem);

      $(this)
        .find('.product-image .desc')
        .append('<p class="flag seloBestPrice">' + porcentagem + '% OFF</p>');

      $(this).addClass('priceModified');
    }
  });
}

function showPercentDiscountProductPage() {
  if (!$('body').hasClass('indisponivel')) {
    if (
      $('.product-details .price-box .descricao-preco .valor-por strong').html()
    ) {
      if (
        $(
          '.product-details .price-box .descricao-preco .valor-de strong'
        ).html()
      ) {
        var precoPor = parseFloat(
          $('.product-details .price-box .descricao-preco .valor-por strong')
            .text()
            .replace('R$ ', '')
            .replace('.', '')
            .replace(',', '.')
        );

        var precoDe = parseFloat(
          $('.product-details .price-box .descricao-preco .valor-de strong')
            .text()
            .replace('R$ ', '')
            .replace('.', '')
            .replace(',', '.')
        );

        var porcentagem = (((precoDe - precoPor) / precoDe) * 100).toFixed(2);
        porcentagem = Math.floor(porcentagem);

        $('.product-image .flags').append(
          '<p class="flag seloBestPrice">' + porcentagem + '% OFF</p>'
        );
      }
    }
  }
}

$(document).ready(function () {
  if ($.fn.ADMAKEadvancedFilter) {
    $(document).ADMAKEadvancedFilter({
      tipoFiltros: {},
    });
  }
  if ($.fn.ADMAKEmenu) {
    $(document).ADMAKEmenu();
  }

  var $btnComprar = $('.btn-add-buy-button-asynchronous');
  if ($btnComprar.length) {
    $btnComprar.html('Comprar <i class="fa fa-lock"></i>');
  }

  var $btnComprarProduto = $('.buy-button.buy-button-ref');
  if ($btnComprarProduto.length) {
    if ($('#comprar-flutuante').length) {
      var $comprarFlutuante = $('#comprar-flutuante');
      var btnComprarTop = $('.product-info .buy-button-box').offset().top;
      $(window).scroll(function () {
        if ($(window).width() > 768) {
          if (
            $(this).scrollTop() >= btnComprarTop &&
            !$comprarFlutuante.is(':visible')
          ) {
            $comprarFlutuante.fadeIn(function () {
              var urlImage =
                $('#include #image-main').attr('src') != ''
                  ? $('#include #image-main').attr('src')
                  : '/arquivos/sem-foto.gif';
              $('#foto-comprar-flutuante').attr('src', urlImage);
              $('body').css('padding-bottom', $comprarFlutuante.height() + 30);
            });
          } else if (
            $(this).scrollTop() < btnComprarTop &&
            $comprarFlutuante.is(':visible')
          ) {
            $comprarFlutuante.fadeOut(function () {
              $('body').css('padding-bottom', 0);
            });
          }
        }
      });
    }

    // $btnComprarProduto.html('Comprar');

    $btnComprarProduto.click(function () {
      var $this = $(this);
      var url = $this.attr('href');
      if (url.indexOf('qty=1') > 0) {
        $this.attr(
          'href',
          url.replace(
            'qty=1',
            'qty=' + parseInt($('.buy-button-box .box-qtd .qtd').val())
          )
        );
      }
    });

    var $recebeQtyForm = $btnComprarProduto.parents('.buy-button-box');
    if ($recebeQtyForm.length) {
      $recebeQtyForm.prepend(
        '<div class="box-qtd">\
					<button class="btn btn-menos">-</button>\
					<input type="text" class="qtd" value="1" />\
					<button class="btn btn-mais">+</button>\
				</div>'
      );
      $(document).on('keypress', '.buy-button-box .box-qtd .qtd', function (e) {
        var tecla = window.event ? event.keyCode : e.which;
        if (tecla > 47 && tecla < 58) {
          return true;
        } else {
          if (tecla == 8 || tecla == 0) {
            return true;
          } else {
            return false;
          }
        }
      });
      $(document).on('keyup', '.buy-button-box .box-qtd .qtd', function (e) {
        $('.buy-button-box .box-qtd .qtd').val($(this).val());
      });
      $(document).on('blur', '.buy-button-box .box-qtd .qtd', function (e) {
        var $this = $(this);
        if ($this.val() === '' || parseInt($this.val()) < 1) {
          $('.buy-button-box .box-qtd .qtd').val(1);
        } else {
          $('.buy-button-box .box-qtd .qtd').val($this.val());
        }
      });
      $(document).on('click', '.buy-button-box .box-qtd .btn', function () {
        var $this = $(this);
        var $qtd = $('.buy-button-box .box-qtd .qtd');
        var valor = parseInt($qtd.val());
        if ($this.hasClass('btn-mais')) {
          $qtd.val(valor + 1);
        } else if ($this.hasClass('btn-menos')) {
          if (valor > 1) {
            $qtd.val(valor - 1);
          }
        }
      });
    }
  }

  produtoIndisponivel();

  //MENU MOBILE
  $('.recebe-menu').append($('#top-menu .menu').clone());

  $('#menu-mobile .menu-departamentos h3').click(function () {
    var $menuSub = $(this).find('.menu-level2');

    if ($menuSub.length) {
      var itensMenuSub = $menuSub.children();

      if (itensMenuSub.length) {
        $(this).toggleClass('ativo');
        $menuSub.slideToggle();
      }
    }
  });

  //OWL
  if ($.fn.owlCarousel) {
    var $fullbanner = $('.fullbanner');
    if ($fullbanner.length) {
      $fullbanner.owlCarousel({
        items: 1,
        singleItem: true,
        autoPlay: true,
        stopOnHover: true,
        navigation: true,
        autoHeight: true,
        navigationText: [
          '<i class="fa fa-chevron-left"></i>',
          '<i class="fa fa-chevron-right"></i>',
        ],
      });
    }

    var $showCaseOwl = $('.showcase-owl .prateleira > ul');
    if ($showCaseOwl.length) {
      $showCaseOwl.find('.helperComplement').remove();
      $showCaseOwl.owlCarousel({
        items: 5,
        autoPlay: false,
        stopOnHover: true,
        pagination: true,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [980, 4],
        itemsTablet: [768, 3],
        itemsMobile: [479, 1],
        navigation: true,
        navigationText: [
          '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-left"></i></button>',
          '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-right"></i></button>',
        ],
      });
    }

    // COMPRE POR CATEGORIA HOME
    var $comprePorCat = $(
      '.home-compre-por-categoria .compre-por-categoria, .institucional-compre-por-categoria .compre-por-categoria'
    );
    if ($comprePorCat.length) {
      $comprePorCat.find('.helperComplement').remove();
      $comprePorCat.owlCarousel({
        items: 6,
        autoPlay: true,
        stopOnHover: true,
        pagination: true,
        itemsDesktop: [1199, 6],
        itemsDesktopSmall: [980, 6],
        itemsTablet: [768, 3],
        itemsMobile: [479, 2],
        navigation: true,
        navigationText: [
          '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-left"></i></button>',
          '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-right"></i></button>',
        ],
      });
    }

    // SLIDE VIDEOS HOME
    var $bannerVideos = $('.home-novidades-videos .banner-videos');
    if ($bannerVideos.length) {
      $bannerVideos.find('.helperComplement').remove();
      $bannerVideos.owlCarousel({
        items: 3,
        autoPlay: true,
        stopOnHover: true,
        pagination: true,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [980, 2],
        itemsTablet: [768, 1],
        itemsMobile: [479, 1],
        navigation: true,
        navigationText: [
          '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-left"></i></button>',
          '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-right"></i></button>',
        ],
      });
    }

    //HOME MARCAS
    var $homeMarcas = $('.home-marcas .marcas');
    if ($homeMarcas.length) {
      $homeMarcas.find('.helperComplement').remove();
      $homeMarcas.owlCarousel({
        items: 6,
        autoPlay: true,
        stopOnHover: true,
        pagination: true,
        itemsDesktop: [1199, 5],
        itemsDesktopSmall: [980, 4],
        itemsTablet: [768, 2],
        itemsMobile: [479, 2],
        navigation: true,
        navigationText: [
          '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-left"></i></button>',
          '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-right"></i></button>',
        ],
      });
    }

    //QUICK VIEW
    var $quickviewThumb = $('#productQuickView .thumbs');
    if ($quickviewThumb.length) {
      $quickviewThumb.find('.helperComplement').remove();
      $quickviewThumb.owlCarousel({
        items: 4,
        autoPlay: false,
        stopOnHover: true,
        pagination: false,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [980, 4],
        itemsTablet: [768, 4],
        itemsMobile: [479, 4],
        navigation: true,
        navigationText: [
          '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-left"></i></button>',
          '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-right"></i></button>',
        ],
      });
    }

    //BANNER PRINCIPAL CATEGORIA (DESKTOP E MOBILE)
    var $departamentBanner = $(
      '#departament-banner, .department-banner-mobile'
    );
    if ($departamentBanner.length) {
      $departamentBanner.find('.helperComplement').remove();
      $departamentBanner.owlCarousel({
        items: 1,
        autoPlay: true,
        stopOnHover: true,
        pagination: false,
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [980, 1],
        itemsTablet: [768, 1],
        itemsMobile: [479, 1],
        navigation: true,
        navigationText: [
          '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-left"></i></button>',
          '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-right"></i></button>',
        ],
      });
    }

    //CATEGORIAS EM DESTAQUE
    var $catDestaque = $('.categorias-destaque');
    if ($catDestaque.length) {
      $catDestaque.find('.helperComplement').remove();
      $catDestaque.owlCarousel({
        items: 5,
        autoPlay: true,
        stopOnHover: true,
        pagination: true,
        itemsDesktop: [1199, 5],
        itemsDesktopSmall: [980, 5],
        itemsTablet: [768, 2],
        itemsMobile: [479, 2],
        navigation: true,
        navigationText: [
          '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-left"></i></button>',
          '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-right"></i></button>',
        ],
      });
    }
  }

  showPercentDiscountShelf();
  filterOptionsLimiter();

  if ($('body').hasClass('produto')) {
    showPercentDiscountProductPage();

    if (
      $(
        'div#caracteristicas table.Leve-Mais-Por-Menos td.value-field.Leve-Mais-Por-Menos'
      ).length &&
      $('.product-details .price-box').length
    ) {
      $('.product-details .price-box').after(
        $(
          'div#caracteristicas table.Leve-Mais-Por-Menos td.value-field.Leve-Mais-Por-Menos'
        ).html()
      );
      $('.product-details .price-box').after(
        $(
          'div#caracteristicas table.Leve-Mais-Por-Menos td.value-field.Leve-Mais-Por-Menos-B2B'
        ).html()
      );
    }

    if (
      $('.product-details .sellername .seller-name a')
        .text()
        .indexOf('Castro Naves') != -1
    ) {
      $('.produto-disponibilidade ul li:last-child').css(
        'visibility',
        'visible'
      );
      $('.produto-disponibilidade ul').append(
        '<li style="visibility: visible;">Nossas Lojas</li>'
      );
    }
  }

  codReferencia();
  addShelfQtd();
  compraPopUp();

  $('#home-b2b #cnpj').mask('00.000.000/0000-00', { reverse: true });
  $('#home-b2b #data-nascimento').mask('00/00/0000');
  $('#home-b2b #cpf').mask('000.000.000-00', { reverse: true });
  $('#home-b2b #cep, #home-b2b #cep-entrega').mask('00000-000');
  $('#home-b2b #telefone, #home-b2b #telefone-entrega').mask(
    '(00) 0000-0000Z',
    {
      translation: {
        Z: {
          pattern: /[0-9]/,
          optional: true,
        },
      },
    }
  );

  $('#home-b2b #limite-orcamentario').unmask();
  $('#home-b2b #limite-orcamentario').mask('000.000.000.000.000,00', {
    reverse: true,
  });
  //fim doc ready
});

//Verifica UsuÃ¡rio Logado
$(function () {
  checkUserLoggedIn();
});

function checkUserLoggedIn() {
  var user = '';
  var user_info;

  $.get('/no-cache/profileSystem/getProfile', function (data) {
    user_info = data;

    if (user_info.IsUserDefined) {
      $('.header .sing-in a.header-login').attr('title', 'Minha Conta');
      $('.header .sing-in .head-loginitens .head-loginsepara').hide();
      $(
        '.header .sing-in .head-loginitens ul li.head-loginentrar a, .menu-mobile-account .link-login a'
      ).attr({
        id: 'sair',
        href: '/no-cache/user/logout/',
        title: 'Sair',
      });
      $('.header .sing-in .head-loginitens ul li.head-loginentrar a')
        .addClass('sing-out')
        .text('Sair');
      $('.menu-mobile-account .link-login a').addClass('sing-out');
      $('.menu-mobile-account .link-login a .user-text-mobile').text('Sair');

      if (user_info.FirstName) {
        user = user_info.FirstName;
      } else {
        var email = user_info.Email.split('@');
        user = email[0];
      }

      $('.sing-in .user-text').addClass('user-logged-in');
      $('.sing-in .user-text').html(
        '<span class="user-name">OlÃ¡, ' +
          user +
          '</span><span class="minha-conta-seta"><i class="fa fa-angle-down"></i></span>'
      );
    }
  });
}

//Header Busca Select Todos
$('.header .search .busca select option').each(function () {
  if ($(this).val() == 0) {
    $(this).text('Todos');
  }
});

//HOVER MENU/HEADER
$(function () {
  $('.menu-todascategoriaspri').hover(
    function () {
      var larguraTela = $(window).width();
      if (larguraTela >= 768) {
        $('.blackBox-menu').fadeIn('medium');
      }
    },
    function () {
      $('.blackBox-menu').stop().fadeOut('fast');
    }
  );
});

//Newsletter
$(function () {
  $('input#newsletterButtonOK').val('Cadastrar');
});

$('.news-form .newsletter').on('DOMSubtreeModified', function () {
  $('input#newsletterButtonOK').val('Cadastrar');
});

//BotÃ£o Espiar
function buttonQuickView() {
  $('.prateleira .thickbox').each(function () {
    var link = $(this).attr('href');
    link = link.replace('http:', 'https:');
    $(this).attr('href', link);
  });
}

$(function () {
  buttonQuickView();
});

$(window).load(function () {
  buttonQuickView();
});

$(document).ajaxSuccess(function (event, xhr, settings) {
  if (settings.url.indexOf('buscapagina') !== -1) {
    showPercentDiscountShelf();
    buttonQuickView();
    codReferencia();
    addShelfQtd();
    compraPopUp();
  }
});

// Outras formas de pagamento
function otherPaymentMethods() {
  var skuProd = skuJson_0.skus[0].sku;

  if (typeof skuProd != 'undefined') {
    $.ajax({
      url: '/productotherpaymentsystems/' + skuProd,
      dataType: 'html',
    }).done(function (data) {
      var dataContent = $(data);
      var htmlContent = dataContent.find('.content').html();

      if ($.trim(htmlContent) != '<hr>') {
        $('#product-page #formasPagto').html(htmlContent);
        $('body').append(
          '<link href="https://castronaves.vteximg.com.br/css/vtex.commerce.otherPaymentSystems.css" rel="stylesheet" type="text/css" />'
        );
        $('body').append(
          '<script src="https://castronaves.vteximg.com.br/Scripts/vtex.commerce.productOtherPaymentSystems.js" type="text/javascript"></script>'
        );
        $('div#formasPagto div#divBoleto').remove();
        $('a.pgto').show();
      } else {
        $('a.pgto').hide();
      }
    });
  } else {
    $('a.pgto').hide();
  }
}

// PRODUTO INDISPONÃVEL
function produtoIndisponivel() {
  if (typeof skuJson_0 != 'undefined') {
    var hrefBuyButton = $('.buy-button').attr('href');
    var skuId;

    if (hrefBuyButton.indexOf('sku') != -1) {
      skuId = hrefBuyButton.split('sku=')[1].split('&')[0];
    }

    for (var i = 0; i < skuJson_0.skus.length; i++) {
      var sku = skuJson_0.skus[i].sku;
      var available = skuJson_0.skus[i].available;

      if (skuId == sku && !available) {
        $('body').addClass('produto-indisponivel');
      } else {
        $('body').removeClass('produto-indisponivel');
      }
    }
  }
}

$('.seletor-sku .sku-selector, #productQuickView .sku-selector').change(
  function () {
    produtoIndisponivel();
  }
);

// Fechar Compra Flutuante
$('#comprar-flutuante .compra-flutuante-fechar').click(function () {
  $(this).parent().toggleClass('fechado');
});

//BotÃ£o Calcular CEP Produto
$(window).load(function () {
  var $btnFrete = $('#btnFreteSimulacao');
  if ($btnFrete.length) {
    $btnFrete.val('Calcular');
    $btnFrete.attr('title', 'Calcular');
  }
});

// VÃDEO PÃGINA DE PRODUTO
$(function () {
  var videoURL = $('td.URL-Video').text();

  if (!videoURL) {
    $('.product-image .apresentacao .thumbs').addClass('full');
    $('.prod-video').hide();
  } else {
    $('#image').append('<div id="videoPrincipal" class="productVideo"></div>');

    $('.prod-video').detach().appendTo($('.product-image .thumbs'));
    $('.prod-video').wrap('<li></li>');

    var autoplay = 'manual';

    $('.prod-video').click(function () {
      var widthImagemPrincipal = $('#image').width();
      var heightImagemPrincipal = $('#image').height();

      $('#image .image-zoom').hide();
      $('.zoomWrapper').hide();
      $('.zoomContainer').hide();
      $('#videoPrincipal').show();

      var urlVideo = '//www.youtube.com/embed/';
      var idVideo = videoURL.split('v=')[1];
      if (idVideo != undefined && idVideo != '') urlVideo += idVideo;
      if (autoplay == 'auto') urlVideo += '?autoplay=1';

      if ($('#videoPrincipal').find('iframe').attr('src') != urlVideo) {
        var html_iframe =
          '<iframe width="' +
          widthImagemPrincipal +
          '" height="' +
          heightImagemPrincipal +
          '" src="' +
          urlVideo +
          '" frameborder="0" allowfullscreen></iframe>';
        $('#videoPrincipal').html(html_iframe);
      }
    });

    $('.product-image .thumbs a').click(function () {
      $('#videoPrincipal').hide();
    });
  }

  //THUMBS
  var $thumbs = $('.product-image .thumbs');
  if ($thumbs.length) {
    $thumbs.find('.helperComplement').remove();
    $thumbs.owlCarousel({
      items: 4,
      autoPlay: false,
      stopOnHover: true,
      pagination: false,
      itemsDesktop: [1199, 4],
      itemsDesktopSmall: [980, 3],
      itemsTablet: [767, 4],
      itemsMobile: [369, 3],
      navigation: true,
      navigationText: [
        '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-left"></i></button>',
        '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-right"></i></button>',
      ],
    });
  }
});

//BotÃµes Outras InformaÃ§Ãµes DescriÃ§Ã£o Produto
$(function () {
  if ($('.product-description-box').length) {
    var $thManualMontagem = $('th.URL-Manual-de-Montagem');
    var $tdManualMontagem = $('td.URL-Manual-de-Montagem');

    var $thFichaTecnica = $('th.URL-Ficha-Tecnica');
    var $tdFichaTecnica = $('td.URL-Ficha-Tecnica');

    if ($tdManualMontagem.length || $tdFichaTecnica.length) {
      var htmlOtherInfo =
        '\
				<div id="outras-informacoes">\
					<h4>Outras InformaÃ§Ãµes:</h4>\
					<div class="btn-box"></div>\
				</div>';

      $('#caracteristicas').after(htmlOtherInfo);
    }

    if ($tdManualMontagem.length) {
      var txtManualMontagem = $thManualMontagem.text();
      var urlManualMontagem = $tdManualMontagem.text();
      var classManualMontagem = 'btn-manual-montagem';
      $('#outras-informacoes .btn-box').append(
        otherInfoButton(
          urlManualMontagem,
          txtManualMontagem,
          classManualMontagem
        )
      );
    }

    if ($tdFichaTecnica.length) {
      var txtFichaTecnica = $thFichaTecnica.text();
      var urlFichaTecnica = $tdFichaTecnica.text();
      var classFichaTecnica = 'btn-ficha-tecnica';
      $('#outras-informacoes .btn-box').append(
        otherInfoButton(urlFichaTecnica, txtFichaTecnica, classFichaTecnica)
      );
    }

    function otherInfoButton(url, value, extraClass) {
      return (
        '<a href="' +
        url +
        '" target="_blank" class="btn-other-info ' +
        extraClass +
        '">' +
        value.replace('URL ', '') +
        '</a>'
      );
    }
  }
});

//AvaliaÃ§Ãµes Produto
$(document).ajaxSuccess(function (event, xhr, settings) {
  if (settings.url.indexOf('userreview') !== -1) {
    var $spanRating = $('#spnRatingProdutoBottom');

    $('.avalicao-media-nota').remove();

    if ($spanRating.length) {
      var ratingAttrClass = $spanRating.attr('class');

      if (ratingAttrClass.indexOf(' ') != -1) {
        var ratingSplit = ratingAttrClass.split(' ');
        var ratingClassAval = ratingSplit[1].replace('avaliacao', '');
        var avaliacao = insereVirgula(ratingClassAval);
      } else if (ratingAttrClass.indexOf('avaliacao') != -1) {
        var ratingClassAval = ratingAttrClass.replace('avaliacao', '');
        var avaliacao = insereVirgula(ratingClassAval);
      }

      $spanRating.before(
        '<span class="avalicao-media-nota">' + avaliacao + '</span>'
      );
    }

    function insereVirgula(val) {
      if (val != '0') {
        return val.substr(0, 1) + ',' + val.substr(1, 1);
      } else {
        return val;
      }
    }
  }
});

//CONTINUAR LENDO - CATEGORIA
$(function () {
  if ($('.categoria-descricao').length && $('.texto-oculto').length) {
    $('.categoria-descricao').append(
      '<span class="continuar-lendo">+ continuar lendo</span>'
    );

    $('.continuar-lendo').click(function () {
      $(this).toggleClass('ativo');
      $(this).parent().find('.texto-oculto').slideToggle('fast');

      if ($(this).hasClass('ativo')) {
        $(this).text('- ocultar');
      } else {
        $(this).text('+ continuar lendo');
      }
    });
  }
});

//DROPDOWN FILTROS CATEGORIA
$(function () {
  var $filter = $('#admake-advanced-filter');
  if ($filter.length) {
    $filter.find('.sub-titulo').click(function () {
      $(this).toggleClass('filtro-fechado');
      $(this).next('.opcoes').slideToggle('fast');
    });
  }
});

//MENUS FOOTER MOBILE
$(function () {
  $('.footer b')
    .not('.col-seguranca b')
    .click(function () {
      var larguraTela = $(window).width();
      if (larguraTela < 768) {
        $(this).toggleClass('ativo');
        $(this).next().slideToggle();
      }
    });
});

//FILTRO CATEGORIA MOBILE
$(function () {
  var $depNav = $('#departament-navegador');
  var window_width = $(window).width();

  if ($depNav.length) {
    $('.department-navegador-mobile').append(
      $depNav.find('div[class^="navigation"]').clone(true)
    );

    $('.filtro-mobile').click(function () {
      $(this).toggleClass('ativo');
      $(this).next().slideToggle();
    });
  }

  if (window_width < 768) {
    $('.orderBy select option').first().text('Ordenar por');
  }
});

//SCROLL PASSOS MARCAS
$('.passos-marca li').click(function () {
  var elementToScroll = $('.' + $(this).prop('id'));

  if (elementToScroll.length) {
    $('html, body').animate(
      {
        scrollTop: elementToScroll.position().top,
      },
      1000
    );
  }
});

function checkQuantity(orderForm, skuId, productId) {
  vtexjs.catalog.getProductWithVariations(productId).done(function (product) {
    if (orderForm.messages.length) {
      var skuName;

      for (var x = 0; x < product.skus.length; x++) {
        if (product.skus[x].sku == skuId) {
          skuName = product.skus[x].skuname;
        }
      }

      for (var i = 0; i < orderForm.messages.length; i++) {
        if (orderForm.messages[i].code == 'itemQuantityNotAvailable') {
          var msg = orderForm.messages[i].text;

          if (msg.indexOf(skuName) !== -1) {
            $('.compraPopUp p.popupMessage').text(
              'Erro ao adicionar o produto ao carrinho'
            );
            $('.compraPopUp p.productName').text(msg);
          } else {
            $('.compraPopUp p.popupMessage').text(
              'Produto adicionado ao carrinho'
            );
          }
        }
      }
    }
  });
}

// POPUP BUY
function popupBuy(infoProd, qtd, productId) {
  $('#overlay-compra-popup').fadeIn();

  var sc = infoProd.split('sc=')[1];

  var skuId = infoProd.split('sku=')[1].split('&')[0];

  var productPosition;

  var productQuantity;

  var orderFormItems;

  vtexjs.checkout.getOrderForm().done(function (orderForm) {
    orderFormItems = orderForm;

    for (var i = 0; i < orderFormItems.items.length; i++) {
      var itemId = orderFormItems.items[i].id;

      if (skuId == itemId) {
        productPosition = i;
        productQuantity = orderFormItems.items[i].quantity;
      }
    }

    if (productQuantity) {
      productQuantity += parseInt(qtd);

      vtexjs.checkout
        .getOrderForm()
        .then(function (orderForm) {
          var itemIndex = productPosition;
          var item = orderForm.items[itemIndex];
          var updateItem = {
            index: itemIndex,
            quantity: productQuantity,
          };
          return vtexjs.checkout.updateItems([updateItem], null, false);
        })
        .done(function (orderForm) {
          checkQuantity(orderForm, skuId, productId);

          $('.compraPopUp').fadeIn();
        });
    } else {
      vtexjs.checkout
        .addToCart(
          [
            {
              id: infoProd.split('sku=')[1].split('&')[0],
              quantity: qtd,
              seller: infoProd.split('seller=')[1].split('&')[0],
            },
          ],
          null,
          sc
        )
        .done(function (orderForm) {
          checkQuantity(orderForm, skuId, productId);

          $('.compraPopUp').fadeIn();
        });
    }
  });
}

// INFORMAÃ‡Ã•ES DO PRODUTO NA POPUP
function popupInfoProd(json) {
  if (typeof json != 'undefined') {
    $('.imgProd img').attr('src', json.skus[0].image);
    $('.imgProd img').attr('alt', json.name);
    $('.infosProdBuy p.productName').text(json.name);
  }
}

$(document).on('keypress', 'input.mini-cart-qtd', function (e) {
  var tecla = window.event ? event.keyCode : e.which;
  if (tecla > 47 && tecla < 58) {
    return true;
  } else {
    if (tecla == 8 || tecla == 0) {
      return true;
    } else {
      return false;
    }
  }
});

$(document).on('blur', 'input.mini-cart-qtd', function (e) {
  var productName = $(this)
    .closest('.detalhes')
    .find('.nome-produto')
    .children('a')
    .text();
  var qtd = $(this).val();

  if (qtd == 0) {
    $(this).val(1);
  } else {
    qtd = $(this).val();
  }
});

function compraPopUp() {
  $('.buy-button, .btn-add-buy-button-asynchronous').each(function () {
    $(this).addClass('btnPopUp');
  });

  $(
    '#overlay-compra-popup, .compraPopUp .keepBuying, .compraPopUp .fechar'
  ).click(function (event) {
    event.preventDefault();
    $('#overlay-compra-popup').fadeOut();
    $('.compraPopUp').fadeOut();
  });

  // QUANDO CLICA NOS BOTÃ•ES DE COMPRA (PRODUTO E PRATELEIRA)
  $('.btnPopUp').on('click', function (e) {
    var parent = $(this).parent();
    var src = $(this).attr('href');
    var qtd = $(this).prev('.box-qtd').find('input.qtd').val();

    if (src.indexOf('sku') > -1) {
      e.preventDefault();

      if (parent.hasClass('buy-button-product')) {
        popupInfoProd(skuJson_0);
        popupBuy(src, qtd, skuJson.productId);
      } else {
        var dataId = $(this).closest('.box-item').attr('data-id');

        vtexjs.catalog
          .getProductWithVariations(dataId)
          .done(function (product) {
            popupInfoProd(product);
          });

        popupBuy(src, qtd, dataId);
      }
    }
  });
}

// CONTINUAR COMPRANDO QUICKVIEW
$(
  '#productQuickView .keepBuying, #productQuickView .compraPopUp .fechar'
).click(function () {
  // Executa a funÃ§Ã£o que estÃ¡ na pÃ¡gina principal de dentro do iframe
  parent.tb_remove();
});

// HOME B2B PLANOS VER MAIS
$(function () {
  if ($('#home-b2b .planos').length) {
    $('#home-b2b .planos .btn-veja-mais').toggle(
      function () {
        var tamanhoVerMais =
          $(this).prev().children('.beneficios-ver-mais').height() + 36;

        $(this).prev().addClass('ativo').css('max-height', tamanhoVerMais);
        $(this).text('Veja Menos');
      },
      function () {
        $(this).prev().removeClass('ativo').removeAttr('style');
        $(this).text('Veja Mais');
      }
    );
  }
});

// VERIFICA SE EXISTE MAIS DE UMA IMAGEM PRA CADA PRODUTO DA PRATELEIRA PARA CRIAR O EFEITO DE TROCA
$(function () {
  $('.imagem-secundaria').each(function () {
    if ($(this).children().length) {
      $(this).prev().addClass('imagem-principal');
    } else {
      $(this).remove();
    }
  });
});
