const category = [
  {
    category: {
      title: 'Alimentos e Descartáveis',
      subcategory: [
        {
          title: 'Alimentos e Bebidas',
          subcategory: [
            'Achocolatados',
            'Açúcares',
            'Adoçantes',
            'Água Mineral',
            'Balas e Biscoitos',
            'Cafés',
            'Cappuccinos',
            'Chás',
            'Leite',
            'Refrigerantes',
            'Sucos e Refrescos',
          ],
        },
        {
          title: 'Copos e Potes Descartáveis',
          subcategory: [
            'Copos Descartáveis',
            'Copos em Acrílico',
            'Dispenser Poupa Copos',
            'Organizador para Copos Desc.',
            'Potes Descartáveis',
          ],
        },
        {
          title: 'Descartáveis e Utensílios',
          subcategory: [
            'Abaixador de Língua',
            'Canudos Plásticos',
            'Coletor Perfurocortante',
            'Filme de PVC',
            'Filtros de Papel & Coadores',
            'Folha de Alumínio',
            'Guardanapos de Papel',
            'Mexedores Plásticos',
            'Papel Manteiga',
            'Porta Canudos',
            'Porta Guardanapos',
            'Porta Toalhas de Papel',
            'Pratos Plásticos',
            'Sacos Plásticos',
            'Talheres Descartáveis',
            'Toalhas de Papel para Cozinha',
          ],
        },
        {
          title: 'Eletroportáteis',
          subcategory: [
            'Bebedouros',
            'Cafeteiras',
            'Chaleiras',
            'Filtros e Refis',
            'Forno Elétrico',
            'Grill',
            'Purificadores',
            'Sanduicheiras',
            'Umidificadores',
          ],
        },
        {
          title: 'Garrafas e Copos Térmicos',
          subcategory: [
            'Botijões Térmicos',
            'Copos Térmicos',
            'Garrafas de Inox',
            'Garrafas Plásticas',
          ],
        },
        {
          title: 'Utilidades',
          subcategory: [
            'Abridores',
            'Açucareiros',
            'Balanças de Cozinha',
            'Bandejas',
            'Chaleiras e Fervedores',
            'Colher para Sorvete',
            'Copos de Vidro',
            'Espátulas',
            'Facas e Acessórios',
            'Isqueiros e Acendedores',
            'Jarras',
            'Pegadores',
            'Porta Adoçantes e Sachês',
            'Porta Canudos',
            'Porta Guardanapos',
            'Porta Toalhas de Papel',
            'Pratos de Porcelana',
            'Talheres em Inox',
            'Utensílios de Cozinha',
            'Utensílios de Pia',
            'Xícaras e Pires',
          ],
        },
      ],
    },
  },
];

function createMenu(categoryData, parentElement) {
  const ul = document.createElement('ul');

  categoryData.forEach((category) => {
    const li = document.createElement('li');
    li.innerHTML = `<button class="accordion-button collapsed">${category.title}</button>`;

    if (category.subcategory) {
      li.appendChild(createMenu(category.subcategory, li));
    }

    ul.appendChild(li);
  });

  parentElement.appendChild(ul);
}

const menuContainer = document.getElementById('menu-container-mobile'); // Substitua 'menu-container' pelo ID do elemento onde você deseja criar o menu
createMenu(category, menuContainer);
